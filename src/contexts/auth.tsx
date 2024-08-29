import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

// app imports
import { COOKIES } from "../helpers/constants";
import { AuthUser } from "../helpers/interfaces/types";
import { useApi } from "../helpers/api";
import { API } from "../helpers/constants";

type AuthProps = {
  isAuthenticated: boolean;
  doLogin: Function;
  logout: Function;
  user: AuthUser;
  fetchUser: Function;
};

export const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: false,
  doLogin: () => {},
  logout: () => {},
  user: null,
  fetchUser: () => {},
});

const AuthProvider = (props: any) => {
  const [cookies] = useCookies([COOKIES.AUTH_USER]);

  console.log(
    "COOKIE",
    cookies[COOKIES.AUTH_USER] != null &&
      typeof cookies[COOKIES.AUTH_USER] !== "undefined"
  );

  const [isAuthenticated, setAuthenticated] = React.useState(
    cookies[COOKIES.AUTH_USER] != null &&
      typeof cookies[COOKIES.AUTH_USER] !== "undefined"
  );
  const [authUser, setAuthUser] = React.useState<AuthUser>(null);

  // APIs
  const { state: stateProfile, sendRequest } = useApi(API.PROFILE);

  React.useEffect(() => {
    const response = stateProfile.data;
    if (response && response.status === 200) {
      const user = response.data;
      setAuthUser(user);
    }
    return () => {};
  }, [stateProfile]);

  const doLogin = (data: any) => {
    setAuthenticated(true);
    setAuthUser(data.user);
  };

  const logout = () => {
    setAuthUser(null);
    setAuthenticated(false);
  };

  const fetchUser = () => {
    // Call API get latest user info
    sendRequest({
      method: "get",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        doLogin,
        logout,
        user: authUser,
        fetchUser,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
