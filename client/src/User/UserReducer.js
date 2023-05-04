import { JWT_TOKEN, USER_ACTIONS } from './UserActions';

// Initial State
const initialState = {};

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const UserReducer = (state = initialState, action) => {
  console.log({ state, action });
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      console.log("I'm doing a login action")
      return {
        _id: action.user._id,
        email: action.user.email,
      };
    case USER_ACTIONS.LOGOUT:
      return {}

    case USER_ACTIONS.LOAD_USER:
      const token = localStorage.getItem(JWT_TOKEN);
      if (!token) return {}
      else {
        console.log(parseJwt(token))
        const decoded = parseJwt(token);
        return decoded.user;
      }
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
