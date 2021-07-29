import axios from "axios";

export let register_user = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
    });

    dispatch({
      type: "REGISTER_USER",
      payload: "You Registered Succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export let login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
      payload: "",
    });

    dispatch({
      type: "LOGIN",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export let update_user = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
    });

    dispatch({
      type: "USER_UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export let logout_user = () => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: "",
  });
  dispatch({
    type: "LOGOUT",
  });
};
