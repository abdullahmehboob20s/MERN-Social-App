import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/actions/AuthReducerActions";

function Login() {
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  let AuthReducer = useSelector((state) => state.AuthReducer);
  let history = useHistory();
  let [error, setError] = useState("");

  let inputValues = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  let login_registered_user = async (e) => {
    e.preventDefault();
    try {
      if (data.email === "" || data.password === "")
        return setError("Not All Fields Have Been Entered");

      let login_user = await axios.post(
        "http://localhost:9000/auth/login",
        data,
        { withCredentials: true, credentials: "include" }
      );

      dispatch(login(login_user.data.data));
      setData({
        email: "",
        password: "",
      });
      history.push("/Home");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.data);
      }
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <h1>login</h1>
        {error ? (
          <div className="error">
            <h2>{error}</h2>
            <h3 onClick={() => setError("")}>x</h3>
          </div>
        ) : null}
        <form onSubmit={login_registered_user}>
          <input
            type="text"
            onChange={inputValues}
            value={data.email}
            placeholder="Enter Your Email"
            name="email"
            autoComplete="new-email"
            id="#0"
          />
          <input
            type="password"
            onChange={inputValues}
            value={data.password}
            placeholder="Enter Password"
            name="password"
            autoComplete="new-password"
            id="#1"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
