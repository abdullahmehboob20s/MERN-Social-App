import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/AuthReducerActions";
import { useHistory } from "react-router-dom";
import { get_all_users, get_all_todos } from "../redux/actions/AllUsersActions";
import { load_todos } from "../redux/actions/TodoReducerActions";
import axios from "axios";

function UnProtected(props) {
  let { Cmp } = props;
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const AllUsers = useSelector((state) => state.AllUsers);
  const TodoReducer = useSelector((state) => state.TodoReducer);
  const dispatch = useDispatch();
  let history = useHistory();

  let get_user = async () => {
    try {
      let res = await axios.get("http://localhost:9000/auth/currentuser", {
        withCredentials: true,
        credentials: "include",
      });
      if (res.data.status === "success") {
        dispatch(login(res.data.data));
        history.push("/Home");
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log("running from Unprotected");
    if (!AuthReducer.isUser) {
      get_user();
      return history.push("/");
    } else {
      return history.push("/Home");
    }
  }, [AuthReducer.users]);

  return <Cmp />;
}

export default UnProtected;
