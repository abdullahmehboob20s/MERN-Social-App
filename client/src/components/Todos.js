import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo";
import axios from "axios";

function Todos(props) {
  let [todos, setTodos] = useState([]);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const TodoReducer = useSelector((state) => state.TodoReducer.todos);
  const dispatch = useDispatch();

  let currentUser = props.id === "null" ? AuthReducer.user._id : props.id;

  useEffect(() => {
    if (TodoReducer !== "null") {
      let newArray = TodoReducer.filter((todo) => todo.userId === currentUser);
      setTodos(newArray);
    }
  }, [TodoReducer, AuthReducer.user]);

  return (
    <div className="todos">
      {todos
        ? todos.map((todo, index) => <Todo key={index} todo={todo} />)
        : null}
    </div>
  );
}

export default Todos;
