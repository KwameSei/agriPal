const reducer = (state, action) => {
  switch (action.type) {
    // case "LOGIN_START":
    //   return {
    //     currentUser: null,
    //     isFetching: true,
    //     error: false,
    //   };
    // case "LOGIN_SUCCESS":
    //   return {
    //     currentUser: action.payload,
    //     isFetching: false,
    //     error: false,
    //   };
    // case "LOGIN_FAILURE":
    //   return {
    //     currentUser: null,
    //     isFetching: false,
    //     error: true,
    //   };
    // case "LOGOUT":
    //   return {
    //     currentUser: null,
    //     isFetching: false,
    //     error: false,
    //   };
    case "UPDATE_USER": // Update the currentUser
      return {
        ...state, // Spread operator
        currentUser: action.payload,  // Update the currentUser
      };
    case "OPEN_LOGIN":  // Open the login modal
      return {
        ...state, // Spread operator
        openLogin: true,  // Update the currentUser
      };
    case "CLOSE_LOGIN": // Close the login modal
      return {
        ...state,
        openLogin: false,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_NOTIFICATIONS": // Update the notifications
      return {
        ...state,
        notify: action.payload,
      }
    default:
      return state;
  } 
};

export default reducer;