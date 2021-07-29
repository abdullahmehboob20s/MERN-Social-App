import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Protected(props) {
  let { Cmp } = props;
  let AuthReducer = useSelector((state) => state.AuthReducer);
  let history = useHistory();

  useEffect(() => {
    if (!AuthReducer.isUser) {
      history.push("/");
    }
    console.log("running from protected");
  }, [AuthReducer.user]);

  return <Cmp />;
}

export default Protected;
