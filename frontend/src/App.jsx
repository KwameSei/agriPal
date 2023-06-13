import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './screens/auth/login'
import Register from './screens/auth/register'
import './App.css'
import ForgotPassword from './screens/auth/forgotPassword'
import ResetPassword from './screens/auth/resetPassword'
import Home from './screens/home/home'
import UsersList from './screens/users/usersList'
import User from './screens/users/User'
import Navbar from './screens/navigations/TopNavbar'
import Notify from './components/Notifications'
import Loading from './components/Loading'

const App = () => {
  return (
    <div className="App">
      {/* <h1> Welcome to Whatsapp Ghana</h1> */}
      <Router>
        <Navbar />
        <Notify />
        <Loading />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/user" element={<User />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
