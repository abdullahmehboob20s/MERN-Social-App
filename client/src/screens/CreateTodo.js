import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import { add_todo } from "../redux/actions/TodoReducerActions";

function CreateTodo() {
  let history = useHistory();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);
  const [previewImg, setpreviewImg] = useState("");
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    userId: "",
    todoImg: "none",
    todo: "",
  });

  let addtodo = async (e) => {
    e.preventDefault();
    try {
      if (!data.todo) return setError("todo should not be empty");

      let formData = new FormData();
      formData.append("userId", AuthReducer.user._id);
      formData.append("todo", data.todo);
      formData.append("Todo_Image", data.todoImg);

      setLoding(true);
      let result = await axios.post(
        "http://localhost:9000/todo/addtodo",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      dispatch(add_todo(result.data.data));
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
    setpreviewImg("");
  };

  return loading !== true ? (
    <>
      <Navbar />
      <div style={{ padding: "2rem 4rem" }}>
        {error ? (
          <div style={{ marginBottom: "1rem" }} className="error">
            <h2>{error}</h2>
            <h3 onClick={() => setError("")}>x</h3>
          </div>
        ) : null}
        <form onSubmit={addtodo} className="todos_form">
          <div className="createtodo_upload_img">
            <img
              style={{ display: previewImg !== "" ? "block" : "none" }}
              src={previewImg}
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
              value={data.todo}
              placeholder="enter your todo"
              name="todo"
              id=""
            />
            <div>
              <label className="todo_upload_img" htmlFor="todo_image">
                {previewImg ? "Change Image" : "Upload Image"}
              </label>
              {previewImg !== "" ? (
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
              <button type="submit">post</button>
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

export default CreateTodo;
