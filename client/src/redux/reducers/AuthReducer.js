let iState = {
  isUser: false,
  created: "",
  isLoading: false,
  user: {},
};

let AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_USER":
      return {
        isUser: false,
        isLoading: false,
        created: action.payload,
        user: {},
      };
    case "LOGIN":
      return {
        isUser: true,
        isLoading: false,
        created: "",
        user: action.payload,
      };

    case "LOGOUT":
      return {
        isUser: false,
        created: "",
        isLoading: false,
        user: {},
      };

    case "USER_UPDATE":
      return {
        isUser: true,
        isLoading: false,
        created: "",
        user: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
