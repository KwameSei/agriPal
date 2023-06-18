import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import jwtDecode from "jwt-decode";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  token: null,  
  name: '',
  profile: {open: false, file: null, imagePreviewUrl: null, image: null, name: '', email: '', password: '', confirmPassword: '', phone: '', address: '', city: '', district: '', country: '', role: '', permissions: '', connections: '', isVerified: '', isSubscribed: '', isBlocked: '', isDeleted: '', isSuspended: '', isApproved: '', isPending: '', isPremium: '', postalCode: '', aboutMe: '', skills: '', education: '', experience: '', portfolio: '', socialMedia: '', website: '', github: '', linkedin: '', twitter: '', facebook: '', instagram: '', youtube: '', pinterest: '', behance: '', dribbble: '', codepen: '', stackoverflow: '', reddit: '', discord: '', slack: '', whatsapp: '', telegram: '', skype: '', zoom: '', googleMeet: ''},
  notify: { isOpen: false, message: '', type: '', severity: 'info'},
  // notifications: [],
  images: [],
  error: false,
};

export const Context = createContext(initialState); // Create a context object

export const useValue = () => {
  return useContext(Context); // Create a custom hook
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
  
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            dispatch({ type: 'CLOSE_LOGIN' });
          } else {
            // Token is valid, set the current user in state
            dispatch({ type: 'UPDATE_USER', payload: { user: decodedToken } });
          }
        } catch (error) {
          // Invalid token, handle the error
          console.log('Error decoding token:', error);
          dispatch({ type: 'CLOSE_LOGIN' });
        }
      } else {
        // No token found, check if currentUser is stored in localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          dispatch({ type: 'UPDATE_USER', payload: { user: JSON.parse(storedUser) } });
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
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
