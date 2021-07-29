let iState = {
  isLoading: false,
  users: "null",
};
let AllUsers = (state = iState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        isLoading: false,
        users: action.payload,
      };

    case "LOADING":
      return {
        isLoading: true,
        ...state,
      };
    case "GET_ALL_TODOS":
      return state;
    default:
      return state;
  }
};

export default AllUsers;
