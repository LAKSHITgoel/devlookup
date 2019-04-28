import setAuthToken from "./setAuthToken";
import store from "../store";
import jwt_decode from "jwt-decode";
import { clearCurrentProfile } from "../actions/profileActions";
import { setCurrentUser, logoutUser } from "../actions/authActions";


export const ifLogedin = () => {
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Clear current Profile
      store.dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href = "/login";
    }
  }
};
