import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const { 
    data: users,  // data is the response from the server
    isFetching,  // isFetching is true when the request is in progress
    isLoading,  // isLoading is true when the request is in progress or the data is not available yet
    isSuccess,
    isError,
    error
  } = useGetUsersQuery();
  
  let content;  // content is the JSX to be rendered

  if (isLoading) {
    content = (
      <div>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="loading" />
      </div>
    );
  }

  if (isError) {
    content = (
      <div>
        <p>There was an error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (isSuccess && users && users.usersList) {
    const { usersList } = users;
    content = (
      <div>
        <h1>Users List</h1>
        {usersList.map((user) => (
          <div key={user._id}>
            <User userId={user._id} />
            <p>{user.firstName} {user.lastName}</p>
          </div>
        ))}
      </div>
    );
  } else {
    content = null;
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default UsersList;
