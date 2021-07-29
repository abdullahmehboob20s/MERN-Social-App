let express = require("express");
let jwt = require("jsonwebtoken");
let AuthSchema = require("../db/models/AuthSchema");

let middelWare = async function (req, res, next) {
  try {
    if (!req.cookies.jwt) {
      res.json({ status: "failed", data: "Not Token Found" });
    }
    let verify = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRETE);
    let user = await AuthSchema.findOne({ _id: verify._id }, ["-password"]);

    req.user = user;
    req.token = req.cookies.jwt;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, data: error });
    console.log(error);
  }
};

module.exports = {
  middelWare,
};
