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
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Update the localStorage
      return {
        ...state, // Spread operator
        currentUser: action.payload,  // Update the currentUser
      };
    case "UPDATE_PROFILE": // Update the currentUser
      // localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Update the localStorage
      return {
        ...state,
        // profile: action.payload,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    case "OPEN_LOGIN":  // Open the login modal
      return {
        ...state, // Spread operator
        openLogin: true,  // Update the currentUser
      };
    case "UPDATE_NAME":
      return {
        ...state.currentUser,
        name: action.payload,
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
      };
    case "UPDATE_IMAGES":
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image.public_id !== action.payload)
      };
    default:
      return state;
  } 
};

export default reducer;