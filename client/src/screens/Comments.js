import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { load_comments } from "../redux/actions/CommentsReducer_Actions";
import Header from "../components/Header";
import { IoSend } from "react-icons/io5";

function Comments() {
  let [comment, setComment] = useState("");
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const AllUsers = useSelector((state) => state.AllUsers);
  const CommentsReducer = useSelector((state) => state.CommentsReducer);
  const [messages, setmessages] = useState([]);
  const dispatch = useDispatch();
  let { id } = useParams();

  let give_comment = async (e) => {
    e.preventDefault();
    try {
      if (!comment) return "";

      let given_comment = await axios.post(
        "http://localhost:9000/comments/addcomment",
        { user_id: AuthReducer.user._id, post_id: id, comment },
        { withCredentials: true, credentials: "include" }
      );
      setComment("");
      console.log(given_comment);

      dispatch(load_comments());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (CommentsReducer.comments) {
      let filter = CommentsReducer.comments.filter((com) =>
        com.post_id == id ? com : ""
      );
      setmessages(filter);
    }
  }, [id, CommentsReducer]);

  return (
    <div className="comment_main">
      <Header color="white" />
      <div className="comments">
        {messages
          ? messages.map((com, index) => <Comment key={index} data={com} />)
          : null}
      </div>
      <form onSubmit={give_comment} className="comment_input">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="write comment"
          name=""
          id=""
        />

        <button type="submit">
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default Comments;
