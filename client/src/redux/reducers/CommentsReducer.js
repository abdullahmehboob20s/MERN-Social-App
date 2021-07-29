let iState = {
  isLoading: false,
  comments: [],
};

let CommentsReducer = (state = iState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        isLoading: true,
        ...state,
      };
    case "LOAD_COMMENTS":
      return {
        isLoading: false,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default CommentsReducer;
