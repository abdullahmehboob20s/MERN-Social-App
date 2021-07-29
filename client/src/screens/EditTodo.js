import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useHistory, useParams } from "react-router-dom";
import { update_todo } from "../redux/actions/TodoReducerActions";
import Header from "../components/Header";

function EditTodo() {
  let history = useHistory();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const TodoReducer = useSelector((state) => state.TodoReducer);
  const [data, setdata] = useState("");
  const [oldData, setoldData] = useState("");
  const [previewImg, setpreviewImg] = useState("none");
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();

  let edittodo = async (e) => {
    e.preventDefault();
    try {
      if (!data.todo) return setError("input should not be empty");

      let formData = new FormData();
      formData.append("_id", id);
      formData.append("todo", data.todo);
      formData.append("Todo_Image", data.todoImg);
      formData.append("oldImg", oldData.todoImg);

      setLoding(true);
      let updateData = await axios.patch(
        "http://localhost:9000/todo/edittodo",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      dispatch(update_todo(updateData.data.data));

      history.goBack();
      setdata({
        userId: "",
        todo: "",
      });
      setLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let filter = TodoReducer.todos.find((todo) => {
      return todo._id === id;
    });
    setdata(filter);
    setoldData(filter);
    setpreviewImg(filter.todoImg);
  }, [id]);

  let load_image = (e) => {
    setpreviewImg(URL.createObjectURL(e.target.files[0]));
    setdata({
      ...data,
      todoImg: e.target.files[0],
    });
  };

  let clearImg = () => {
    setdata({
      ...data,
      todoImg: "none",
    });
    setpreviewImg("none");
  };

  return loading !== true ? (
    <>
      <Header color="#494949" />
      <div style={{ padding: "2rem 4rem" }}>
        {error ? (
          <div style={{ marginBottom: "1rem" }} className="error">
            <h2>{error}</h2>
            <h3 onClick={() => setError("")}>x</h3>
          </div>
        ) : null}
        <form onSubmit={edittodo} className="todos_form">
          <div className="createtodo_upload_img">
            <img
              style={{
                display: previewImg !== "none" ? "block" : "none",
              }}
              src={
                previewImg === data.todoImg
                  ? `http://localhost:9000/${data.todoImg}`
                  : previewImg
              }
              alt=""
            />
          </div>
          <input
            onChange={load_image}
            type="file"
            name="todo_image"
            id="todo_image"
            accept="image/*"
            style={{ display: "none" }}
          />
          <div style={{ display: "flex" }}>
            <input
              type="text"
              onChange={(e) => setdata({ ...data, todo: e.target.value })}
              value={data !== "" ? data.todo : null}
              placeholder="enter your todo"
              name="todo"
              id=""
            />

            <div>
              <label className="todo_upload_img" htmlFor="todo_image">
                {previewImg !== "none" ? "Change Image" : "Upload Image"}
              </label>
              {previewImg !== "none" ? (
                <button
                  style={{
                    marginRight: "5px",
                    backgroundColor: "rgb(255, 124, 124)",
                    color: "white",
                  }}
                  type="button"
                  onClick={clearImg}
                >
                  delete image
                </button>
              ) : null}
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </>
  ) : (
    <div className="loading_container">
      <div className="loading"></div>
    </div>
  );
}

export default EditTodo;
