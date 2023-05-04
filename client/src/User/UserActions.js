import callApi from '../util/apiCaller';

export const JWT_TOKEN = 'jwtToken';

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOAD_USER = 'LOAD_USER'

// Export Constants
export const USER_ACTIONS = { LOGIN, LOGOUT, LOAD_USER };

// Export Actions
export function setUser(data) {
  return {
    type: LOGIN,
    user: data.user,
  };
}

export function removeUser(){
  return {
    type: LOGOUT
  }
}

export function loadUser(){
  return{
    type: LOAD_USER
  }
}

const saveToken = token => localStorage.setItem(JWT_TOKEN, token);

export function userLogin(user) {
  return (dispatch) => {
    return callApi('login', 'post', user)
    .then(res => {
      if(res.token){
        saveToken(res.token);
        return dispatch(setUser(res))
      }else{
        console.log(res);
      }
    })
    .catch(err =>{
      console.log("err:",err);
    });
  }
}

export function userSignup(user) {
  return (dispatch) => {
    return callApi('signup', 'post', user)
    .then(res => {
      return res;
    });
  };
}

const clearToken = () => localStorage.removeItem(JWT_TOKEN);

export function userLogout(){
  return (dispatch) => {
    clearToken();
    return dispatch(removeUser())
  }
}