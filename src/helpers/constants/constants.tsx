import Currencies from "assets/json/currencies.json";
import CryptoCurrencies from "assets/json/cryptocurrencies.json";

export const PAYPAL_CLIENT_ID =
  process.env.REACT_APP_PAYPAL_CLIENT_ID ||
  "AXoErDhZilyTAlGA5Tx_8KaldcOlojcp1pgOw4AJr9kRlrEKiE6IrEeuQG4mB2kJzGNP5DPoG8KRAohd";

export const COOKIES = {
  AUTH_USER: "user",
  SIDEBAR_STATE: "sidebar-state",
  LANGUAGE: "language",
};
const now = new Date().getUTCFullYear();
export const DATE_OPTIONS = {
  YEARS: Array(now - (now - 120))
    .fill("")
    .map((v, idx) => now - idx),
  MONTHS: Array.from(Array(12).keys()),
};

export const API_VERSION = process.env.REACT_APP_API_VERSION || "v1";
const BASE_URL =
  process.env.REACT_APP_API_URL || "https://api.banchaxanh.com/api";

export const API_URL = `${BASE_URL}/${API_VERSION}`;

export const LANGUAGES = ["jp", "us"];

export const CAPTCHA_KEY =
  process.env.REACT_APP_CAPTCHA_KEY ||
  "6LdOthYeAAAAAKpPmr-ynr-CCnQAjpB4Ul_S_4Tj";

export const FIELD_LIMIT = {
  MIN_CHARACTER: 0,
  MAX_CHARACTER: 127,
  MIN_EMAIL_LENGTH: 8,
  MAX_ADDRESS_CHARACTER: 200,
  MIN_PASSWORD: 8,
  MAX_PASSWORD: 35,
  INVITE_CODE_LENGTH: 8,
  OTP_CODE: 6,
  RESET_CONFIRM_CODE: 5,
  MAX_PHONE_NUMBER: 50,
  CVV_LENGTH: 3,
  MIN_RATE: 0.01,
  MAX_RATE: 100,
};

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

export const MODAL_TYPE = {
  SUCCESS: "success",
  WARNING: "warning",
  FAIL: "fail",
};

export const REGISTER_ACTION_TYPES = {
  CHECK_EMAIL_FINISH: "CHECK_EMAIL_FINISH",
  INPUT_INFO_FINISH: "INPUT_INFO_FINISH",
  AGREE_FINISH: "AGREE_FINISH",
};

export const API_ACTION_TYPES = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  FETCH_RESET: "FETCH_RESET",
};

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const HOMEPAGE_LINKS = {
  HOME: "https://www.banchanxanh.com",
  ABOUT: "https://www.banchanxanh.com/about",
  TERMS: "https://www.banchanxanh.com/terms",
  PRIVACY: "https://www.banchanxanh.com/privacy",
  FEE: "https://www.banchanxanh.com/fee",
  CONTACT: "https://www.banchanxanh.com",
};

export const ROLE = {
  ADMIN: "admin",
  MANAGER: "manager",
  user: "user",
  MASTER: "master",
  AFFILIATE: "affiliate",
  NORMAL: "normal",
};
