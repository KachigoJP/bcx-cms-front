import Currencies from "../assets/json/currencies.json";
import CryptoCurrencies from "../assets/json/cryptocurrencies.json";

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

export const ROUTES = {
  LOGIN: "/login",
  ADMIN_LOGIN: "/admin/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  REGISTER: "/register",
  PAGE_404: "/404",
  PAGE_500: "/500",
  MAINTENANCE: "/maintenance",
  VERIFY_EMAIL: "/verify-email",
  VERIFY_CHANGE_EMAIL: "/change-email",

  HOME: "/",
  DASHBOARD: "/dashboard",

  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  EMAIL_CHANGE: "/email-change",
  PASSWORD_CHANGE: "/password-change",
  VERIFICATION_2FA: "/verification-2fa",
  SETTING: "/setting",
  USER_LIST: "/users",
  USER_CREATE: "/users/create",
  USER_UPDATE: "/users/:id",
};

export const API = {
  LOGIN: `${API_URL}/auth/login`,
  LOGIN_VERIFY_2FA: `${API_URL}/auth/verify-2fa`,
  FORGOT_PASS: `${API_URL}/auth/forgot-password`,
  FORGOT_PASS_VERIFY: `${API_URL}/auth/verify-url`,
  RESET_PASS: `${API_URL}/auth/reset-password`,
  REGISTER: `${API_URL}/auth/signup`,
  CHECK_EMAIL: `${API_URL}/auth/check-email`,
  VERIFY_EMAIL: `${API_URL}/auth/verify`,

  LOGOUT: `${API_URL}/auth/logout`,
  QRCODE: `${API_URL}/auth/qr-code-image`,
  ENABLE_2FA: `${API_URL}/auth/enabled-2fa`,

  PROFILE: `${API_URL}/profile`,
  USER_GET_INFORMATION: `${API_URL}/user/get-information`,
  PROFILE_UPDATE: `${API_URL}/profile`,
  CHANGE_PASS: `${API_URL}/user/change-password`,
  CHANGE_EMAIL: `${API_URL}/user/request-change-email`,
  CHANGE_INVITATION_CODE: `${API_URL}/user/change-invitation`,
  VERIFY_CHANGE_EMAIL: `${API_URL}/user/change-email`,

  NOTIFICATION: `${API_URL}/notification`,

  BALANCE: `${API_URL}/user/wallet-balance`,

  ADMIN_LIST_USER: `${API_URL}/admin/users`,
  ADMIN_DELETE_USER: `${API_URL}/admin/users`,
  ADMIN_GET_USER: `${API_URL}/admin/users`,
  ADMIN_UPDATE_USER: `${API_URL}/admin/users`,
  ADMIN_CREATE_USER: `${API_URL}/admin/users/create`,
};

export const APPLICANT_TYPE = {
  INDIVIDUAL: "Individual",
  CORPORATE: "Corporate",
};

export const CURRENCIES = {
  CRYPTO: CryptoCurrencies,
  FIAT: Currencies,
};

export const FIELD_LIMIT = {
  MIN_CHARACTER: 0,
  MAX_CHARACTER: 127,
  MIN_EMAIL_LENGTH: 8,
  MAX_ADDRESS_CHARACTER: 200,
  MIN_PASSWORD: 8,
  MAX_PASSWORD: 35,
  MIN_TRANSFER_AMOUNT: 0,
  MAX_TRANSFER_AMOUNT: 3000,
  INVITE_CODE_LENGTH: 8,
  OTP_CODE: 6,
  RESET_CONFIRM_CODE: 5,
  MAX_PHONE_NUMBER: 50,
  CVV_LENGTH: 3,
  MIN_RATE: 0.01,
  MAX_RATE: 100,
};

export const REGEX = {
  //EMAIL:
  // /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"\u0080-\uFFFF]+(\.[^<>()\[\]\\.,;:\s@"\u0080-\uFFFF]+)*)|(".+"))@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|(){}\[\]:;”’<>,.?\/])[A-Za-z\d~!@#$%^&*_\-+=`|(){}\[\]:;”’<>,.?\/]{8,}$/,
  WALLET_ADDRESS: /^[a-zA-Z0-9]+$/,
  MESSAGE: /^$|^[a-zA-Z_ ]+$/,
  INVITATION_CODE: /(^$|^[0-9]{8,8})/,
  CVV: /(^$|^[0-9]{3,3})/,
  OTP_CODE: /(^$|^[0-9]{6,6})/,
  RESET_CONFIRM_CODE: /(^$|^[0-9]{5,5})/,
  FLOAT_NUMBER: /(^$|^[0-9]+.?[0-9]*$)/,
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
