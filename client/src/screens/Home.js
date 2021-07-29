import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import avatar_image from "../images/avatar.png";
import { useHistory } from "react-router-dom";
import Todos from "../components/Todos";
import axios from "axios";
import { logout_user } from "../redux/actions/AuthReducerActions";

function Home() {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  let history = useHistory();
  const dispatch = useDispatch();

  let logoutUser = async () => {
    try {
      let logout = await axios.get("http://localhost:9000/auth/logout", {
        withCredentials: true,
        credentials: "include",
      });
      dispatch(logout_user());
      console.log(logout);
      history.push("/");
    } catch (error) {
      console.log(error.response.data.data);
      console.log(error);
    }
  };
  let logoutfromadevices = async () => {
    try {
      let logout = await axios.get(
        "http://localhost:9000/auth/logutfromalldevices",
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      dispatch(logout_user());
      console.log(logout);
      history.push("/");
    } catch (error) {
      console.log(error.response.data.data);
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="profile">
          <div className="image_box">
            {AuthReducer.user.profilePhoto === "none" ? (
              <img style={{ filter: "invert(.5)" }} src={avatar_image} alt="" />
            ) : (
              <img
                src={`http://localhost:9000/${AuthReducer.user.profilePhoto}`}
                alt=""
              />
            )}
          </div>
          <div className="profile_content">
            <div className="profile_content_data">
              <h1>
                {AuthReducer.user.firstName} {AuthReducer.user.lastName}
              </h1>
              <h2>{AuthReducer.user.email}</h2>
              <h2>age : {AuthReducer.user.age}</h2>
            </div>
            <div className="profile_content_btns">
              <div style={{ marginBottom: ".3rem" }}>
                <button
                  onClick={() => history.push("/CreateTodo")}
                  style={{ marginRight: ".5rem" }}
                >
                  Create Post
                </button>
                <button
                  onClick={() =>
                    history.push(`/EditProfile/${AuthReducer.user._id}`)
                  }
                >
                  edit profile
                </button>
              </div>
              <div>
                <button
                  style={{ marginRight: ".5rem" }}
                  onClick={logoutfromadevices}
                >
                  logout from all devices
                </button>
                <button onClick={logoutUser}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Todos id="null" />
    </div>
  );
}

export default Home;
