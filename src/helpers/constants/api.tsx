import { API_URL } from "./constants";

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

  USERS: `${API_URL}/users`,
  SETTINGS: `${API_URL}/settings`,
  LANGUAGES: `${API_URL}/languages`,
  PAGES: `${API_URL}/pages`,
  PAGES_METADATA: `${API_URL}/pages/:page/metadatas`,
  PAGES_OPTIONS: `${API_URL}/pages/options`,
  PAGE_CATEGORIES: `${API_URL}/pages/categories`,
  PAGE_TAGS: `${API_URL}/pages/tags`,
};
