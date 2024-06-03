console.log("inside authActions")
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ({user, roles, token}) => ({
    type: LOGIN_SUCCESS,
    payload: {user, roles, token}
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT
});
