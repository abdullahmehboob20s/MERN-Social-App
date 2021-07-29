import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AllUsers from "./AllUsers";
import TodoReducer from "./TodoReducer";
import CommentsReducer from "./CommentsReducer";

let AllReducers = combineReducers({
  AuthReducer,
  AllUsers,
  TodoReducer,
  CommentsReducer,
});

export default AllReducers;
