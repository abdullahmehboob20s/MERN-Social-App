let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let schema = new mongoose.Schema({
  firstName: { type: String, required: false, trim: true, default: "none" },
  lastName: { type: String, required: false, trim: true, default: "none" },
  age: { type: Number, required: false, default: 0 },
  profilePhoto: { type: String, required: false, default: "none" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ token: { type: String } }],
});

schema.methods.generateAuthToken = async function (req, res) {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRETE);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

let AuthSchema = mongoose.model("User", schema);

module.exports = AuthSchema;
