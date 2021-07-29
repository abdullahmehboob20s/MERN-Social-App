import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthReducer from "../redux/reducers/AuthReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { update_user } from "../redux/actions/AuthReducerActions";
import avatar_image from "../images/avatar.png";
import { get_all_users } from "../redux/actions/AllUsersActions";

function EditProfile() {
  const [oldImage, setoldImage] = useState("none");
  const [previewImage, setpreviewImage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const history = useHistory();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: null,
    profilePhoto: "none",
  });

  let inputValues = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let { firstName, lastName, age, profilePhoto } = AuthReducer.user;

    setData({
      firstName,
      lastName,
      age,
      profilePhoto,
    });
    setoldImage(profilePhoto);
  }, []);

  let loadFile = (e) => {
    setoldImage(AuthReducer.user.profilePhoto);
    setpreviewImage(URL.createObjectURL(e.target.files[0]));
    setData({
      ...data,
      profilePhoto: e.target.files[0],
    });
  };

  let update_user_profile = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      let formData = new FormData();
      formData.append("_id", id);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("age", data.age);
      formData.append("image", data.profilePhoto);
      formData.append("oldImage", oldImage);
      formData.append("pr", data);

      let update = await axios.patch(
        "http://localhost:9000/auth/updateprofile",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      dispatch(update_user(update.data.data));

      setData({
        firstName: "",
        lastName: "",
        age: null,
        profilePhoto: "none",
      });

      dispatch(get_all_users());
      history.push("/Home");
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(AuthReducer);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loading_area">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="login register">
          <h1 style={{ backgroundColor: "rgb(72, 176, 255) " }}>
            Update Your Profile
          </h1>

          <div className="edit_image">
            <div className="imageBox">
              {data.profilePhoto === "none" ? (
                <img
                  style={{ filter: "invert(.5)" }}
                  src={avatar_image}
                  alt=""
                />
              ) : (
                <img
                  src={
                    previewImage
                      ? previewImage
                      : `http://localhost:9000/${data.profilePhoto}`
                  }
                  alt=""
                />
              )}
            </div>
            <input
              onChange={loadFile}
              type="file"
              accept="image/*"
              name="image"
              id="image"
              style={{ display: "none" }}
            />
            <div className="edit_profile_btns">
              {data.profilePhoto !== "none" ? (
                <button
                  style={{
                    marginBottom: ".2rem",
                    backgroundColor: " rgb(255, 103, 103)",
                  }}
                  className="edit_profile_btn"
                  onClick={() => {
                    setData({ ...data, profilePhoto: "none" });
                    setpreviewImage("");
                  }}
                >
                  delete image
                </button>
              ) : null}
              <label
                style={{
                  backgroundColor:
                    data.profilePhoto !== "none" ? "#ffa347" : "#5858FF",
                }}
                className="edit_profile_btn"
                htmlFor="image"
              >
                {data.profilePhoto === "none" ? "upload image" : "change image"}
              </label>
            </div>
          </div>
          <form onSubmit={update_user_profile}>
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

            <button
              type="submit"
              style={{ backgroundColor: "rgb(72, 176, 255) " }}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProfile;
