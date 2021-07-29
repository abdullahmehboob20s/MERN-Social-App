import React from "react";
import { useSelector, useDispatch } from "react-redux";
import avatar_image from "../images/avatar.png";
import { IoCaretBackOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function Header(props) {
  const AuthReducer = useSelector((state) => state.AuthReducer.user);
  const history = useHistory();
  console.log(AuthReducer.user);
  return (
    <div className="header" style={{ backgroundColor: props.color }}>
      <div className="header_back_btn" onClick={() => history.goBack()}>
        <IoCaretBackOutline />
      </div>
      <div className="header_image_box">
        {AuthReducer ? (
          AuthReducer.profilePhoto == "none" ? (
            <img style={{ filter: "invert(.5)" }} src={avatar_image} alt="" />
          ) : (
            <img
              src={`http://localhost:9000/${AuthReducer.profilePhoto}`}
              alt=""
            />
          )
        ) : null}
      </div>
      <div>
        <h3 className="header_text_1">
          {AuthReducer.firstName} {AuthReducer.lastName}
        </h3>
        <h4 className="header_text_2">{AuthReducer.email}</h4>
      </div>
    </div>
  );
}

export default Header;
