import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { load_todos } from "../redux/actions/TodoReducerActions";
import Todo from "../components/Todo";
import Navbar from "../components/Navbar";

function TodosScreen() {
  const TodoReducer = useSelector((state) => state.TodoReducer);
  return (
    <div>
      <Navbar />
      <div className="todosScreen">
        {TodoReducer.todos !== "null"
          ? TodoReducer.todos.map((todo, index) => (
              <Todo key={index} todo={todo} />
            ))
          : null}
      </div>
    </div>
  );
}

export default TodosScreen;
