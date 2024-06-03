import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  roles: '',
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("inside login success auth reducer", action.payload, state)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        roles: action.payload.roles,
        token: action.payload.token,
      };
    case LOGOUT:
      console.log("inside logout auth reducer", action.payload, state)
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        roles: '',
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;