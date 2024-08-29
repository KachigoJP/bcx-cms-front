import { AuthUser } from "./types";

export interface AuthProps {
  isAuthenticated: boolean;
  doLogin: Function;
  logout: Function;
  user: AuthUser;
  fetchUser: Function;
  setRole: Function;
}
