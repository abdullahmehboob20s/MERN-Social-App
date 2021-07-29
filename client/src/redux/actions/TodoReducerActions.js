import axios from "axios";

export let load_todos = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOADING",
      payload: "",
    });
    let loading_todos = await axios.get("http://localhost:9000/todo/");

    dispatch({
      type: "LOAD_TODOS",
      payload: loading_todos.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export let delete_todo = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: "",
  });
  dispatch({
    type: "DELETE_TODO",
    payload: id,
  });
};

export let add_todo = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: "",
  });
  dispatch({
    type: "ADD_TODO",
    payload: data,
  });
};

export let update_todo = (data) => async (dispatch) => {
  dispatch({
    type: "LOADING",
    payload: true,
  });

  dispatch({
    type: "UPDATE_TODO",
    payload: data,
  });
};
