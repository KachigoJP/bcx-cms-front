import Currencies from "../assets/json/currencies.json";
import CryptoCurrencies from "../assets/json/cryptocurrencies.json";

export const PAYPAL_CLIENT_ID =
  process.env.REACT_APP_PAYPAL_CLIENT_ID ||
  "AXoErDhZilyTAlGA5Tx_8KaldcOlojcp1pgOw4AJr9kRlrEKiE6IrEeuQG4mB2kJzGNP5DPoG8KRAohd";

export const COOKIES = {
  AUTH_TOKEN: "auth-token",
  AUTH_USER: "auth-user",
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

export const API_VERSION = process.env.API_VERSION || "v1";
const BASE_URL =
  process.env.REACT_APP_API_URL || "https://api.rays-wallet.com/api";
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
  VERIFY_CHANGE_EMAIL: "/user/change-email",

  HOME: "/",
  DASHBOARD: "/dashboard",
  DEPOSIT: "/deposit",
  DEPOSIT_CRYPTO: "/deposit/crypto",
  DEPOSIT_PAYPAL: "/deposit/paypal",
  DEPOSIT_PAYPAL_CONFIRM: "/deposit/paypal/confirm",
  DEPOSIT_CARD: "/deposit/card",
  DEPOSIT_CARD_CONFIRM: "/deposit/card/confirm",
  EXCHANGE: "/exchange",
  EXCHANGE_CONFIRM: "/exchange-confirm",
  TRANSFER: "/transfer",
  TRANSFER_CONFIRM: "/transfer-confirm",
  WITHDRAW: "/withdraw",
  WITHDRAW_PAYPAL: "/withdraw/paypal",
  WITHDRAW_PAYPAL_CONFIRM: "/withdraw/paypal/confirm",
  WITHDRAW_CRYPTO: "/withdraw/crypto",
  WITHDRAW_COLD: "/withdraw/cold",
  CARD: "/card",
  BALANCE: "/balance",
  NOTICE: "/notice",
  SUPPORT: "/support",
  AFFILIATE: "/affiliate",
  AFFILIATE_USERS: "/affiliate-users",
  TRANSACTION_HISTORY: "/transaction-history",
  KYC: "/kyc",
  WITHDRAW_CRYPTO_CONFIRM: "/withdraw/crypto/confirm",

  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  UPGRADE: "/upgrade",
  EMAIL_CHANGE: "/email-change",
  PASSWORD_CHANGE: "/password-change",
  REFERRER_CHANGE: "/referrer-change",
  VERIFICATION_2FA: "/verification-2fa",
  BANK: "/bank",
  KYC_MANAGER: "/kyc/manager",
  AFFILIATTE_RATE: "/affiliate/rate",
  AFFILIATTE_BONUS: "/affiliate/bonus",
  DEPOSIT_REPORT: "/master/deposit/report",
  ADMIN_DEPOSIT_REPORT: "/admin/deposit/report",
  ADMIN_SETTING: "/admin/setting",
  ADMIN_FEE_SETTING: "/admin/fee",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_LIST_USER: "/admin/users",
  ADMIN_LIST_MASTER: "/admin/master",
  ADMIN_CREATE_USER: "/admin/users/create",
  ADMIN_UPDATE_USER: "/admin/users/:id",
  ADMIN_NOTIFICATION: "/admin/notification",
  ADMIN_CREATE_NOTIFICATION: "/admin/notification/create",
  ADMIN_UPDATE_NOTIFICATION: "/admin/notification/:id",
  ADMIN_UPGRADE_MASTER: "/admin/upgrade-master",
};

export const API = {
  LOGIN: `${API_URL}/auth/signin`,
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

  USER: `${API_URL}/user`,
  USER_GET_INFORMATION: `${API_URL}/user/get-information`,
  UPDATE_INFORMATION: `${API_URL}/user/update-information`,
  CHANGE_PASS: `${API_URL}/user/change-password`,
  CHANGE_EMAIL: `${API_URL}/user/request-change-email`,
  CHANGE_INVITATION_CODE: `${API_URL}/user/change-invitation`,
  VERIFY_CHANGE_EMAIL: `${API_URL}/user/change-email`,
  SYSTEM_CONFIG_FEE: `${API_URL}/config/fee`,

  TRANSFER: `${API_URL}/remittance`,
  TRANSFER_VERIFY: `${API_URL}/remittance/verify`,
  EXCHANGE: `${API_URL}/exchange/execute`,
  EXCHANGE_RATE: `${API_URL}/exchange/get-rate`,
  ESTIMATE: `${API_URL}/exchange/get-estimation`,

  DEPOSIT_ESTIMATE: `${API_URL}/deposit/fiat/get-estimation`,
  DEPOSIT_FIAT: `${API_URL}/deposit/fiat/create-payment`,
  CANCEL_DEPOSIT_FIAT: `${API_URL}/deposit/fiat/cancel-payment`,

  PRESIGNED_URL: `${API_URL}/kyc/presigned-url`,
  KYC_UPLOAD: `${API_URL}/kyc/upload`,
  KYC_MANAGER: `${API_URL}/kyc/users`,
  KYC_UPLOADED_FILE: `${API_URL}/kyc/users/:id`,
  KYC_MANAGER_APPROVE: `${API_URL}/kyc/users/:id/success`,
  KYC_MANAGER_REJECT: `${API_URL}/kyc/users/:id/unsuccess`,

  NOTIFICATION: `${API_URL}/notification`,
  TRANSACTION_HISTORY: `${API_URL}/transactions`,
  // AFFILIATE: `${API_URL}/affiliate`,
  AFFILIATE_INFO: `${API_URL}/affiliate/info`,
  AFFILIATE_CHILD: `${API_URL}/affiliate/child`,

  MASTER_AFFILIATE_USERS: `${API_URL}/master/affiliate/users`,
  MASTER_TEAM_USERS: `${API_URL}/master/affiliate/teams/users`,
  MASTER_NORMAL_USERS: `${API_URL}/master/affiliate/normal-users`,
  AFFILIATE_UPGRADE_USER: `${API_URL}/master/affiliate/users/:id/upgrade`,
  AFFILIATE_UPPER_USERS: `${API_URL}/master/affiliate/upper-users`,
  MASTER_AFFILIATE_RATE: `${API_URL}/master/affiliate/rate`,
  MASTER_AFFILIATE_BONUS: `${API_URL}/master/affiliate/bonus`,
  MASTER_AFFILIATE_USER_HISTORY: `${API_URL}/master/affiliate/:id/bonus`,
  MASTER_TEAM_DEPOSIT_HISTORY: `${API_URL}/master/users/deposit`,
  MASTER_USER_DEPOSIT_HISTORY: `${API_URL}/master/users/:id/deposit`,

  WITHDRAW_CRYPTO: `${API_URL}/withdraw/crypto`,
  WITHDRAW_CRYPTO_VERIFY: `${API_URL}/withdraw/crypto/VERIFY`,

  WITHDRAW_FIAT: `${API_URL}/withdraw/fiat`,
  WITHDRAW_FIAT_VERIFY: `${API_URL}/withdraw/fiat/verify`,

  BALANCE: `${API_URL}/user/wallet-balance`,

  ADMIN_LIST_AFFILIATES: `${API_URL}/admin/affiliates`,
  ADMIN_AFFILIATE_COMMISSION: `${API_URL}/admin/affiliates/:id/commission`,
  ADMIN_LIST_USER: `${API_URL}/admin/users`,
  ADMIN_DELETE_USER: `${API_URL}/admin/users`,
  ADMIN_GET_USER: `${API_URL}/admin/users`,
  ADMIN_UPDATE_USER: `${API_URL}/admin/users`,
  ADMIN_CREATE_USER: `${API_URL}/admin/users/create`,
  ADMIN_NOTIFICATION: `${API_URL}/admin/notification`,
  ADMIN_LOGIN: `${API_URL}/admin/signin`,
  ADMIN_CONFIG: `${API_URL}/admin/config`,
  ADMIN_CONFIG_FEE: `${API_URL}/admin/config/fee`,
  ADMIN_LIST_KYC: `${API_URL}/admin/users/:id/kyc`,
  ADMIN_CREATE_NOTIFICATION: `${API_URL}/admin/notification`,
  ADMIN_UPDATE_NOTIFICATION: `${API_URL}/admin/notification`,
  ADMIN_LIST_NON_MASTER: `${API_URL}/admin/masters/non-master`,
  ADMIN_UPGRADE_MASTER: `${API_URL}/admin/users/:id/upgrade`,
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

export const DEPOSIT_FIAT_TYPE = {
  PAYPAL: "paypal",
  CREDIT_CARD: "card",
};

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const KYC_STATUS = {
  NOT_UPLOAD: 0,
  UPLOADED: 1,
  APPROVED: 2,
  REJECTED: 3,
};

export const HOMEPAGE_LINKS = {
  HOME: "https://www.rays-wallet.com",
  ABOUT: "https://www.rays-wallet.com/about",
  TERMS: "https://www.rays-wallet.com/terms",
  PRIVACY: "https://www.rays-wallet.com/privacy",
  FEE: "https://www.rays-wallet.com/fee",
  CONTACT: "https://www.rays-wallet.com",
};

export const ROLE = {
  ADMIN: "admin",
  MANAGER: "manager",
  user: "user",
  MASTER: "master",
  AFFILIATE: "affiliate",
  NORMAL: "normal",
};

export const AFFILIATE_LEVEL = {
  LEVEL_0: "LEVEL_0",
  LEVEL_1: "LEVEL_1",
  LEVEL_2: "LEVEL_2",
  LEVEL_3: "LEVEL_3",
  LEVEL_4: "LEVEL_4",
  LEVEL_NORMAL: "LEVEL_NORMAL",
};
