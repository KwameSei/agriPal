import FetchData from "./utils/FetchData";

// Storing all the user functions responsible for the server here
const url = import.meta.env.VITE_APP_SERVER_URL + '/api/auth';
console.log("This is my ", url);

// export const register = async (user, dispatch) => {
//   console.log("Register function called");
//   console.log("URL:", url);
//   console.log("User:", user);
  
//   dispatch({ type: "START_LOADING" })
//   const data = await FetchData({ url:url+'/register', body: user}, dispatch );
//   console.log("Data:", data);
  
//   if (data) {
//     dispatch({ type: "UPDATE_USER", payload: {data} });
//     dispatch({ type: "CLOSE_LOGIN" });
//     dispatch({type: "UPDATE_NOTIFICATIONS", payload: {open: true, severity: "success", message: "Registered Successfully"}})
//   }
//   dispatch({ type: "STOP_LOADING" })
// };

export const login = async (user, dispatch) => {
  console.log("Login function called");
  console.log("URL:", url);
  console.log("User:", user);
  
  dispatch({ type: "START_LOADING" })
  const data = await FetchData({ url:url+'/login', body: user}, dispatch );
  console.log("Data:", data);
  
  if (data) {
    dispatch({ type: "UPDATE_USER", payload: {data} });
    dispatch({ type: "CLOSE_LOGIN" });
  }
  dispatch({ type: "STOP_LOADING" })
};