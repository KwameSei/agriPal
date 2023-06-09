import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    // const handleEdit = () => navigate(`/users/edit/${userId}`);
    const userRolesString = user.roles.toString().replace(',', ', ');
    const status = user.active ? 'Active' : 'Inactive';
    return (
      <div>
        <h1>{user.firstName} {user.lastName}</h1>
        {/* <p>Username: {user.username}</p> */}
        <p>Email: {user.email}</p>
        <p>Roles: {userRolesString}</p>
        <p>Status: {status}</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>User not found!</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }
};

export default User;