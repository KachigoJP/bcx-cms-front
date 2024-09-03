import { UseFormReturn } from "react-hook-form";
import { AuthUser, SettingType } from "./types";
import { IUserForm } from "./forms";

export interface AuthProps {
  isAuthenticated: boolean;
  doLogin: Function;
  logout: Function;
  user: AuthUser;
  fetchUser: Function;
  setRole: Function;
}

export interface UserFormProps {
  user?: IUserForm;
  hookForm: UseFormReturn<IUserForm>;
}

export interface SettingFormProps {
  show: boolean;
  data?: SettingType;
  onClose?: (isSuccess?: boolean) => void;
  // hookForm: UseFormReturn<IUserForm>;
}
