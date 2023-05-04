import { USER_ACTIONS } from './UserActions';

// Initial State
const initialState = { };

const UserReducer = (state = initialState, action) => {
  console.log({state, action});
  switch (action.type) {
    case USER_ACTIONS.LOGIN :
      console.log("I'm doing a login action")
      return {
        _id : action.user._id,
        email: action.user.email,
      };
    case USER_ACTIONS.LOGOUT :
      return {}

    default:
      return state;
  }
};

export const getEmail = state => state.users?.email;
export const getId = state => state.users._id;
export const getToken = state => state.users.token;

/* Selectors */

// Export Reducer
export default UserReducer;
