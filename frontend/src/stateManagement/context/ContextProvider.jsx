import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import jwtDecode from "jwt-decode";

const initialState = {
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
  openLogin: false,
  loading: false,
  notify: { isOpen: false, message: '', type: '', severity: 'info'},
  isFetching: false,
  error: false,
};

export const Context = createContext( initialState );  // Create a context object

export const useValue = () => {
  return useContext( Context );  // Create a custom hook
}

const ContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( reducer, initialState );  // Create a reducer
  useEffect(() => {
    const checkToken = async () => {
      if (state.currentUser) {
        const decodedToken = jwtDecode(state.currentUser.token);
        if (decodedToken.exp * 1000 < Date.now()) {
          dispatch({ type: "UPDATE_USER", payload: null });
        }
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    // Save currentUser to localStorage whenever it changes
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  );
};

export default ContextProvider;