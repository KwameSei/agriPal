import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  events: [],
  loginOpen: false,
  modalOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setConnections: (state, action) => {
      if (state.user) {
        state.user.connections = action.payload.connections;
      } else {
        console.log("No user to set connections to");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    openLogin: (state) => {
      state.loginOpen = true;
    },
    closeLogin: (state) => {
      state.loginOpen = false;
    },
    setPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    },
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload.event._id) {
          return action.payload.event;
        }
        return event;
      });
    },
    // Define the updateProfile action
    updateProfile: (state, action) => {
      // Update the profile properties in the user object
      if (state.user) {
        state.user.photoURL = action.payload.photoURL;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      } else {
        console.log("No user to update profile");
      }
    },
    // Define the updateUser action
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setConnections,
  setPosts,
  setPost,
  setEvents,
  setEvent,
  openLogin,
  closeLogin,
  updateProfile,
  updateUser,
  openModal,
  closeModal,
} = authSlice.actions;

export default authSlice.reducer;
