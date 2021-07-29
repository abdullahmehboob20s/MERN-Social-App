import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register_user } from "../redux/actions/AuthReducerActions";
import axios from "axios";
import { login } from "../redux/actions/AuthReducerActions";

function Register() {
  let [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: null,
    profilePhoto: "none",
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

  let register_new_user = async (e) => {
    try {
      e.preventDefault();

      if (
        data.email === "" ||
        data.password === "" ||
        data.confirmPassword === ""
      )
        return setError("Not All Fields Have Been Entered");

      if (data.password !== data.confirmPassword)
        return setError("passwords are not matching");

      let register = await axios.post(
        "http://localhost:9000/auth/register",
        data
      );
      console.log(register);

      dispatch(register_user());
      setData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      history.push("/");
    } catch (error) {
      setError(error.response.data.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login register">
        <h1 style={{ backgroundColor: "rgb(72, 176, 255) " }}>Register</h1>
        {error ? (
          <div className="error">
            <h2>{error}</h2>
            <h3 onClick={() => setError("")}>x</h3>
          </div>
        ) : null}
        <form onSubmit={register_new_user}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            autoComplete="new-firstName"
            value={data.firstName}
            onChange={inputValues}
            id="#0"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            autoComplete="new-lastName"
            value={data.lastName}
            onChange={inputValues}
            id="#0"
          />
          <input
            type="number"
            placeholder="Enter Your age"
            name="age"
            autoComplete="new-age"
            value={data.age}
            onChange={inputValues}
            id="#0"
          />
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            autoComplete="new-email"
            value={data.email}
            onChange={inputValues}
            id="#0"
          />
          <input
            type="password"
            placeholder="Create Your Password"
            name="password"
            autoComplete="new-password"
            value={data.password}
            onChange={inputValues}
            id="#1"
          />
          <input
            type="password"
            placeholder="Re-Enter Your Password"
            name="confirmPassword"
            autoComplete="new-Confirm_password"
            value={data.confirmPassword}
            onChange={inputValues}
            id="#2"
          />
          <button
            type="submit"
            style={{ backgroundColor: "rgb(72, 176, 255) " }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
