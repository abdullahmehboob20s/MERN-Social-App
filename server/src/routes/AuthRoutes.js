let AuthRoutes = require("express").Router();
let multer = require("multer");
let path = require("path");
let {
  register,
  login,
  auth,
  getCurrentUser,
  updateprofile,
  logout,
  logutfromalldevices,
} = require("../controllers/AuthController");
let { middelWare } = require("../middlewares/AuthMiddleWares");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage }).single("image");

AuthRoutes.get("/", auth);
AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/currentuser", middelWare, getCurrentUser);
AuthRoutes.patch("/updateprofile", [middelWare, upload], updateprofile);
AuthRoutes.get("/logout", middelWare, logout);
AuthRoutes.get("/logutfromalldevices", middelWare, logutfromalldevices);

module.exports = AuthRoutes;
