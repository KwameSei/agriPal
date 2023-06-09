import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  isFetching: false,
  error: false,
};

export const Context = createContext( initialState );  // Create a context object

export const useValue = () => {
  return useContext( Context );  // Create a custom hook
}

const ContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer( reducer, initialState );  // Create a reducer
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  );
};

export default ContextProvider;