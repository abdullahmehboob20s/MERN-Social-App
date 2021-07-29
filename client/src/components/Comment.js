import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import avatar_image from "../images/avatar.png";

function Comment(props) {
  let { data } = props;
  const [userData, setuserData] = useState();
  const dispatch = useDispatch();
  const AllUsers = useSelector((state) => state.AllUsers);

  useEffect(() => {
    let filterUser = AllUsers.users.find((user) => user._id == data.user_id);
    setuserData(filterUser);
  }, [data.comment]);

  return (
    <div className="comment">
      <div className="comment_profileImage">
        {userData ? (
          userData.profilePhoto == "none" ? (
            <img style={{ filter: "invert(.5)" }} src={avatar_image} alt="" />
          ) : (
            <img
              src={`http://localhost:9000/${userData.profilePhoto}`}
              alt=""
            />
          )
        ) : null}
      </div>
      <div className="comment_box">
        <h3 className="comment_profile">
          {userData ? `${userData.firstName} ${userData.lastName}` : ""}
        </h3>{" "}
        <p>{data.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
