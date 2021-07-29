import axios from "axios";

export let load_comments = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
      payload: "",
    });
    let comments = await axios.get("http://localhost:9000/comments");

    dispatch({
      type: "LOAD_COMMENTS",
      payload: comments.data.comments,
    });
  } catch (error) {
    console.log(error);
  }
};
