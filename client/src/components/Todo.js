import React, { useState, useEffect } from "react";
import avatar_image from "../images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { delete_todo } from "../redux/actions/TodoReducerActions";
import { FcComments } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Todo(props) {
  let history = useHistory();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const AllUsers = useSelector((state) => state.AllUsers);
  const CommentsReducer = useSelector((state) => state.CommentsReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);
  const [modal, setmodal] = useState({
    show: false,
    image: "",
  });
  let { todo } = props;
  let [user, setuser] = useState("");
  const [commentsLength, setcommentsLength] = useState();

  useEffect(() => {
    if (AllUsers.users !== "null") {
      let newArray = AllUsers.users.find((user) => todo.userId === user._id);
      setuser(newArray);
    }

    let commentsCount = CommentsReducer.comments.filter(
      (a) => a.post_id == todo._id
    ).length;

    setcommentsLength(commentsCount);
  }, [todo, AuthReducer, AllUsers, CommentsReducer]);

  let deleteting_todo = async (id, img) => {
    try {
      setLoding(true);
      let del = await axios.post(
        "http://localhost:9000/todo/deletetodo",
        { id, img },
        { withCredentials: true, credentials: "include" }
      );

      let deleteComments = await axios.post(
        "http://localhost:9000/comments/deleteComments",
        { post_id: id },
        { withCredentials: true, credentials: "include" }
      );

      console.log(deleteComments.data);

      if (del.data.status === "success") {
        setLoding(false);
        dispatch(delete_todo(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  let showModal = (img) => {
    setmodal({
      show: true,
      image: img,
    });
  };

  return (
    <>
      <div className="todo">
        {loading ? (
          <div className="todo_loading_container">
            <div className="todo_loading"></div>
          </div>
        ) : null}
        <div className={`todo_profile`}>
          <div
            style={{
              cursor: AuthReducer.user._id === user._id ? "default" : "pointer",
            }}
            onClick={() =>
              AuthReducer.user._id === user._id
                ? console.log("null")
                : history.push(`/ShowProfile/${user._id}`)
            }
            className="todo_image_box"
          >
            {user.profilePhoto === "none" ? (
              <img style={{ filter: "invert(.5)" }} src={avatar_image} alt="" />
            ) : (
              <img src={`http://localhost:9000/${user.profilePhoto}`} alt="" />
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="todo_profile_content_data"
          >
            <div>
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <h2>{user.email}</h2>
            </div>
            <div style={{ display: "flex" }}>
              {AuthReducer.user._id === user._id ? (
                <>
                  <button
                    onClick={() => history.push(`/EditTodo/${todo._id}`)}
                    className="todo_button"
                    style={{ fontSize: 24, color: "#7e6bff" }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteting_todo(todo._id, todo.todoImg)}
                    className="todo_button"
                    style={{ color: "#ff7c7c" }}
                  >
                    <MdDelete />
                  </button>
                </>
              ) : null}
              <div className="todo_comments-btn">
                <button
                  onClick={() => history.push(`/Comments/${todo._id}`)}
                  className="todo_button"
                >
                  <FcComments />
                </button>
                {commentsLength == 0 ? null : (
                  <div className="comments_count">{commentsLength}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="todo_content">
          <div
            style={{
              display: todo.todoImg !== "none" ? "block" : "none",
              cursor: "pointer",
            }}
            className="todo_content_imgBox"
            onClick={() => showModal(todo.todoImg)}
          >
            <img
              src={
                todo.todoImg !== "none"
                  ? `http://localhost:9000/${todo.todoImg}`
                  : ""
              }
              alt=""
            />
          </div>
          <h2>{todo.todo}</h2>
        </div>
      </div>
      <div
        style={{ display: modal.show === true ? "block" : "none" }}
        className="modal"
      >
        <img src={`http://localhost:9000/${modal.image}`} alt="" />
        <h2
          onClick={() =>
            setmodal({
              show: false,
              image: "",
            })
          }
        >
          {" "}
          +{" "}
        </h2>
      </div>
    </>
  );
}

export default Todo;
