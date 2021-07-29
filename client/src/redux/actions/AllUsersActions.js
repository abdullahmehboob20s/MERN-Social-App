import axios from "axios";

export let get_all_users = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
      payload: "",
    });
    let result = await axios.get("http://localhost:9000/auth");

    dispatch({
      type: "GET_ALL_USERS",
      payload: result.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
