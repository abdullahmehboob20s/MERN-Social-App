let TodoSchema = require("../db/models/TodoSchema");
let fs = require("fs");
let path = require("path");

let load_todos = async (req, res) => {
  try {
    let loading_todos = await TodoSchema.find();
    res.status(200).json({ status: "success", data: loading_todos });
  } catch (error) {
    res.status(401).json({ status: "failed", data: error });
  }
};
let addtodo = async (req, res) => {
  try {
    let { todo, userId } = req.body;
    let d1 = new TodoSchema({
      todo,
      todoImg: req.file ? req.file.filename : req.body.todoImg,
      userId,
    });
    let result = await d1.save();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(401).json({ status: "failed", data: error });
    console.log(error);
  }
};
let edittodo = async (req, res) => {
  try {
    let { _id, todo, oldImg, Todo_Image } = req.body;

    var img = "";

    if (oldImg === Todo_Image) {
      img = oldImg;
    } else {
      img = req.file ? req.file.filename : Todo_Image;
      if (oldImg === "none") {
        console.log("null");
      } else {
        fs.unlinkSync(path.join(__dirname, "../uploads/" + oldImg));
      }
    }

    let update = await TodoSchema.findOneAndUpdate(
      { _id },
      { todo, todoImg: img },
      { new: true }
    );

    res.status(200).json({ status: "success", data: update });
  } catch (error) {
    res.status(401).json({ status: "failed ", data: error });
    console.log(error);
  }
};
let deletetodo = async (req, res) => {
  try {
    let { id, img } = req.body;
    let delete_todo = await TodoSchema.deleteOne({ _id: id });
    res.status(200).json({ status: "success", data: delete_todo });
    fs.unlinkSync(path.join(__dirname, "../uploads/" + img));
  } catch (error) {
    res.status(401).json({ status: "failed", data: error });
  }
};

module.exports = {
  addtodo,
  load_todos,
  edittodo,
  deletetodo,
};
