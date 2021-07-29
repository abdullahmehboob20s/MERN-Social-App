let bcrypt = require("bcrypt");
let AuthSchema = require("../db/models/AuthSchema");
let path = require("path");
let fs = require("fs");

let auth = async (req, res) => {
  try {
    let get_users = await AuthSchema.find().select({
      _id: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
      age: 1,
      profilePhoto: 1,
    });
    res.status(200).json({ status: "success", data: get_users });
  } catch (error) {
    res.status(401).json({ status: "failed", data: error });
  }
};
let register = async (req, res) => {
  try {
    let {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      age,
      profilePhoto,
      todos,
    } = req.body;

    if (!email || !password || !confirmPassword)
      return res
        .status(401)
        .json({ status: "failed", data: "Not All Fields Have Been Entered" });

    if (password !== confirmPassword)
      return res
        .status(401)
        .json({ status: "failed", data: "Passwords Are Not Matching" });

    let existed_user = await AuthSchema.findOne({ email });

    if (existed_user)
      return res
        .status(401)
        .json({ status: "failed", data: "User With This Email Already Exist" });

    let hash_password = await bcrypt.hash(password, 10);

    let data = new AuthSchema({
      firstName,
      lastName,
      age,
      profilePhoto,
      todos,
      email,
      password: hash_password,
    });

    let register_user = await data.save();

    res.status(200).json({ status: "success", data: register_user });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      data: error,
    });
  }
};
let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res
        .status(401)
        .json({ status: "failed", data: "Not All Fields Have Been Entered" });

    let existed_user = await AuthSchema.findOne({ email });

    if (!existed_user)
      return res.status(401).json({
        status: "failed",
        data: "User With This Email Does Not Exists",
      });

    let isPassword = await bcrypt.compare(password, existed_user.password);

    if (!isPassword)
      return res
        .status(401)
        .json({ status: "failed", data: "Invalid Credentials" });

    let token = await existed_user.generateAuthToken();

    res.cookie("jwt", token, { expire: 360000 + Date.now() });

    res.status(200).json({ status: "success", data: existed_user });
  } catch (error) {
    res.status(401).send("inavlid credentials");
    console.log(error);
  }
};
let getCurrentUser = async (req, res) => {
  try {
    let { user, token } = req;
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
};
let updateprofile = async (req, res) => {
  try {
    let { image, firstName, lastName, age, oldImage, _id } = req.body;

    var img = "";

    if (image === oldImage) {
      img = oldImage;
    } else {
      img = req.file ? req.file.filename : image;
      if (oldImage === "none") {
        console.log("null");
      } else {
        fs.unlinkSync(path.join(__dirname, "../uploads/" + oldImage));
      }
    }

    let update = await AuthSchema.findOneAndUpdate(
      { _id },
      {
        firstName,
        lastName,
        age,
        profilePhoto: img,
      },
      { new: true }
    );

    res.status(200).json({ status: "success", data: update });
  } catch (error) {
    res.status(401).json({ status: "failed", data: error });
    console.log(error);
  }
};
let logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ status: "success", msg: "Logout Successfully" });
  } catch (error) {
    res
      .status(401)
      .json({ status: "failed", data: "Could Not Logout Please ! Try Again" });
  }
};
let logutfromalldevices = async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.user.tokens = [];
    await req.user.save();
    res
      .status(200)
      .json({ status: "success", msg: "Logout Successfully From All Devices" });
  } catch (error) {
    res
      .status(401)
      .json({ status: "failed", data: "Could Not Logout Please ! Try Again" });
  }
};

module.exports = {
  register,
  login,
  auth,
  getCurrentUser,
  updateprofile,
  logout,
  logutfromalldevices,
};
