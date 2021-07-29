let TodoRoutes = require("express").Router();
let { middelWare } = require("../middlewares/AuthMiddleWares");
let multer = require("multer");
let {
  addtodo,
  load_todos,
  edittodo,
  deletetodo,
} = require("../controllers/TodoController");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage }).single("Todo_Image");

TodoRoutes.get("/", load_todos);
TodoRoutes.post("/addtodo", [middelWare, upload], addtodo);
TodoRoutes.patch("/edittodo", [middelWare, upload], edittodo);
TodoRoutes.post("/deletetodo", middelWare, deletetodo);

module.exports = TodoRoutes;
