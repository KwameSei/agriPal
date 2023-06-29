import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthState } from './actions';

import Login from './screens/auth/login'
import Register from './screens/auth/register'
import './App.css'
import ForgotPassword from './screens/auth/forgotPassword'
import ResetPassword from './screens/auth/resetPassword'
import Home from './screens/home/home'
import UsersList from './screens/users/usersList'
import User from './screens/users/User'
import Navbar from './screens/navigations/TopNavbar'
import Basenav from './screens/navigations/BaseNav'
import Notify from './components/Notifications'
import Loading from './components/Loading'
import Profile from './screens/users/Profile';
import EventPage from './screens/events/EventPage';

import { Navigate } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.token));

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Router>
      <div 
        className="app"
        style={{ 
          backgroundImage: "url(/images/adinkra-symbols.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* <h1> Welcome to Whatsapp Ghana</h1> */}
        <Navbar />
        {/* <Basenav /> */}
        <Notify />
        <Loading />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/users" element={<UsersList />} />
          {/* <Route path="/user" element={<User />} /> */}
          {isAuth ? (
            <>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/home" element={<Home />} />
            </>
          ) : (
            <Route path="/*" element={<Login />} />
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
