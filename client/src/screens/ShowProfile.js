import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import avatar_image from "../images/avatar.png";
import { useHistory, useParams } from "react-router-dom";
import Todos from "../components/Todos";

function ShowProfile() {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const AllUsers = useSelector((state) => state.AllUsers.users);
  let history = useHistory();
  let { id } = useParams();
  let [data, setData] = useState([]);

  useEffect(() => {
    if (AllUsers !== "null") {
      let newArray = AllUsers.find((profile) => profile._id === id);
      setData(newArray);
    } else {
      history.push("/TodosScreen");
    }
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="profile">
          <div className="image_box">
            {data.profilePhoto === "none" ? (
              <img style={{ filter: "invert(.5)" }} src={avatar_image} alt="" />
            ) : (
              <img src={`http://localhost:9000/${data.profilePhoto}`} alt="" />
            )}
          </div>
          <div className="profile_content">
            <div className="profile_content_data">
              <h1>
                {data.firstName} {data.lastName}
              </h1>
              <h2>{data.email}</h2>
              <h2>age : {data.age}</h2>
            </div>
          </div>
        </div>
      </div>
      <Todos id={id} />
    </div>
  );
}

export default ShowProfile;
