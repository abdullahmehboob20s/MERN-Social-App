let CommentsSchema = require("../db/models/CommentsSchema");

exports.comments = async (req, res) => {
  try {
    let comments = await CommentsSchema.find();
    res.status(200).json({ comments });
  } catch (error) {
    res.status(401).send(error);
  }
};
exports.addcomment = async (req, res) => {
  try {
    let { user_id, post_id, comment } = req.body;

    let d1 = new CommentsSchema({ user_id, post_id, comment });

    let addcomment = await d1.save();

    res.status(200).json({ data: addcomment });
  } catch (error) {
    res.status(401).json({ data: error });
    console.log(error);
  }
};
exports.deleteComments = async (req, res) => {
  try {
    let deletingcomments = await CommentsSchema.deleteMany({
      post_id: req.body.post_id,
    });
    res.send(deletingcomments);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
