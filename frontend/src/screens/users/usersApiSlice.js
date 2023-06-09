import { createSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../stateManagement/api/apiSlice';

const usersAdapter = createEntityAdapter({}); // createEntityAdapter() returns an object with functions for CRUD operations on the state object

const initialState = usersAdapter.getInitialState({});  // getInitialState() returns an object with the initial state for the reducer

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.error;
      },
      keepUnusedDataFor: 5, // keep unused data for 5 seconds
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: 'Users', id: 'LIST' },
            ...result.id.map(id => ({ type: 'Users', id })),
          ]
        } else {
          return [{ type: 'Users', id: 'LIST' }]
        }
      }
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// Returning the query result object from the selector
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Create memoized selectors for the cached data
const selectUsersEntities = createSelector(
  selectUsersResult, // the query result object
  usersResult => usersResult.data // the data property of the query result object
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersEntities(state));