import { UseFormReturn } from "react-hook-form";
import {
  AuthUser,
  LanguageType,
  PageCategoryType,
  PageMetadataType,
  PageTagType,
  SettingType,
} from "./types";
import { IUserForm, IPageForm } from "./forms";

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

export interface PageFormProps {
  data?: IPageForm;
  hookForm: UseFormReturn<IPageForm>;
}

export interface ModifyModalProps {
  show: boolean;
  data?:
    | PageCategoryType
    | PageTagType
    | SettingType
    | LanguageType
    | PageMetadataType;
  onClose?: (isSuccess?: boolean) => void;
}

export interface MetadataModalProps extends ModifyModalProps {
  rootId: string;
}

export interface MetadataTableProps {
  pageId: string;
  data?: PageMetadataType[];
  onReload?: Function;
}
