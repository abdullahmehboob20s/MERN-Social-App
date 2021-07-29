let iState = {
  isLoading: false,
  todos: [],
};

let TodoReducer = (state = iState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "LOAD_TODOS":
      return { todos: action.payload, isLoading: false };
    case "ADD_TODO":
      return {
        isLoading: false,
        todos: [...state.todos, action.payload],
      };
    case "UPDATE_TODO":
      return {
        isLoading: false,
        todos: state.todos.map((todo) =>
          todo._id == action.payload._id ? action.payload : todo
        ),
      };
    case "DELETE_TODO":
      return {
        isLoading: false,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
};

export default TodoReducer;
