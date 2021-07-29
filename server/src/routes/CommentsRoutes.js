let CommentsRoutes = require("express").Router();
let CommentsSchema = require("../db/models/CommentsSchema");
let {
  comments,
  addcomment,
  deleteComments,
} = require("../controllers/CommentsController");
let { middelWare } = require("../middlewares/AuthMiddleWares");

CommentsRoutes.get("/", comments);
CommentsRoutes.post("/addcomment", middelWare, addcomment);
CommentsRoutes.post("/deleteComments", deleteComments);

module.exports = CommentsRoutes;
