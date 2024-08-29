// React Imports
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { useCookies } from "react-cookie";

// Apps Imports
import { AuthContext } from "../contexts/auth";
import { COOKIES, API_ACTION_TYPES } from "../helpers/constants";
import { AuthState, fetchReducer } from "../helpers/reducers";

export type Error = {
  [key: string]: string;
};
export type FieldError = {
  name: string;
  errors?: Error;
};

export function isInitState<T>(state: AuthState<T>) {
  return (
    !state.isLoading &&
    !state.isError &&
    state.data == null &&
    state.errors == null
  );
}

export function useApi<T>(initialUrl: string): any {
  const [url] = React.useState<string>(initialUrl);
  const { logout } = React.useContext(AuthContext);

  const [state, dispatch] = React.useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
    errors: null,
  });

  const sendRequest = async (request: AxiosRequestConfig) => {
    dispatch({ type: API_ACTION_TYPES.FETCH_START });

    try {
      const result: AxiosResponse = await axios({
        url,
        ...request,
      });

      dispatch({ type: API_ACTION_TYPES.FETCH_SUCCESS, payload: result });

      return { data: result.data, error: null };
    } catch (error: any) {
      const data = error.response?.data;

      const message = data?.message;
      if (message === "Unauthorized") {
        logout();
      }

      let errors = null;
      if (data) {
        errors =
          data.errors && Array.isArray(data.errors)
            ? data.errors.map((err: any) => {
                return {
                  name: err.property,
                  errors: err.constraints,
                };
              })
            : [
                {
                  name: "Errors",
                  errors: {
                    [data.code]: data.message,
                  },
                },
              ];
      }

      dispatch({ type: API_ACTION_TYPES.FETCH_FAILURE, payload: errors });
      return { data: null, error: errors };
    }
  };

  const reset = () => {
    dispatch({ type: API_ACTION_TYPES.FETCH_RESET });
  };

  return { state, url, sendRequest, reset };
}
