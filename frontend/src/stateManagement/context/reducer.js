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
    case "UPDATE_USER":
      return {
        ...state, // Spread operator
        currentUser: action.payload,  // Update the currentUser
      };
    default:
      return state;
  } 
};

export default reducer;