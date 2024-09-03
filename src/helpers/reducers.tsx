import { API_ACTION_TYPES, REGISTER_ACTION_TYPES } from "./constants/constants";
import { RegisterState } from "./interfaces/types";

type Action<T> = {
  type: string;
  payload?: T;
};

export type AuthState<T> = {
  isLoading: boolean;
  isError: boolean;
  data?: T | null;
  errors?: T | null;
};

export function fetchReducer<T>(
  state: AuthState<T>,
  action: Action<T>
): AuthState<T> {
  switch (action.type) {
    case API_ACTION_TYPES.FETCH_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: null,
        errors: null,
      };
    case API_ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case API_ACTION_TYPES.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload,
      };
    case API_ACTION_TYPES.FETCH_RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: null,
        errors: null,
      };
    default:
      throw new Error();
  }
}

export function RegisterReducer(
  state: RegisterState,
  action: Action<RegisterState>
): RegisterState {
  const payload = action.payload;
  switch (action.type) {
    case REGISTER_ACTION_TYPES.CHECK_EMAIL_FINISH:
      return {
        ...state,
        email: payload?.email,
      };
    case REGISTER_ACTION_TYPES.INPUT_INFO_FINISH:
      return {
        ...state,
        password: payload?.password,
        confirmPassword: payload?.confirmPassword,
        country: payload?.country,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        dateOfBirth: payload?.dateOfBirth,
      };
    case REGISTER_ACTION_TYPES.AGREE_FINISH:
      return {
        ...state,
        termsAndCondition: payload?.termsAndCondition,
        recaptchaResponse: payload?.recaptchaResponse,
      };
    default:
      throw new Error();
  }
}
