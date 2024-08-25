import React from "react";
import { Navigate } from "react-router-dom";

// App imports
import { ROUTES } from "../helpers/constants";

const authRoutes = [
  {
    path: ROUTES.DASHBOARD,
    component: React.lazy(() => import("../pages/Dashboard")),
  },
  {
    path: ROUTES.EXCHANGE,
    component: React.lazy(() => import("../pages/Exchange")),
  },
  {
    path: ROUTES.EXCHANGE_CONFIRM,
    component: React.lazy(() => import("../pages/ExchangeConfirm")),
  },
  {
    path: ROUTES.CARD,
    component: React.lazy(() => import("../pages/Card")),
  },
  {
    path: ROUTES.BALANCE,
    component: React.lazy(() => import("../pages/Balance")),
  },
  {
    path: ROUTES.TRANSACTION_HISTORY,
    component: React.lazy(() => import("../pages/TransactionHistory")),
  },
  {
    path: ROUTES.AFFILIATE,
    component: React.lazy(() => import("../pages/Affiliate")),
  },
  {
    path: ROUTES.NOTICE,
    component: React.lazy(() => import("../pages/Notice")),
  },
  {
    path: ROUTES.SUPPORT,
    component: React.lazy(() => import("../pages/Support")),
  },
  {
    path: ROUTES.CARD,
    component: React.lazy(() => import("../pages/Card")),
  },
  {
    path: ROUTES.KYC,
    component: React.lazy(() => import("../pages/Kyc")),
  },
  // Account
  {
    path: ROUTES.PROFILE,
    component: React.lazy(() => import("../pages/Profile")),
  },
  {
    path: ROUTES.PROFILE_EDIT,
    component: React.lazy(() => import("../pages/ProfileEdit")),
  },
  {
    path: ROUTES.UPGRADE,
    component: React.lazy(() => import("../pages/Upgrade")),
  },
  {
    path: ROUTES.PASSWORD_CHANGE,
    component: React.lazy(() => import("../pages/PasswordChange")),
  },
  {
    path: ROUTES.EMAIL_CHANGE,
    component: React.lazy(() => import("../pages/EmailChange")),
  },
  {
    path: ROUTES.VERIFICATION_2FA,
    component: React.lazy(() => import("../pages/2FA")),
  },
  {
    path: ROUTES.BANK,
    component: React.lazy(() => import("../pages/Bank")),
  },
  {
    path: ROUTES.VERIFY_CHANGE_EMAIL,
    component: React.lazy(() => import("../pages/Auth/VerifyChangeEmail")),
  },
  {
    path: ROUTES.ADMIN_SETTING,
    component: React.lazy(() => import("../pages/Admin/Setting")),
  },
  {
    path: ROUTES.HOME,
    exact: true,
    component: () => <Navigate to={ROUTES.DASHBOARD} />,
  },

  // ADMIN
  {
    path: ROUTES.ADMIN_LIST_USER,
    component: React.lazy(() => import("../pages/Admin/ListUser")),
  },
  {
    path: ROUTES.ADMIN_UPDATE_USER,
    component: React.lazy(() => import("../pages/Admin/UpdateUser")),
  },
  {
    path: ROUTES.ADMIN_CREATE_USER,
    component: React.lazy(() => import("../pages/Admin/CreateUser")),
  },
  {
    path: ROUTES.ADMIN_NOTIFICATION,
    component: React.lazy(() => import("../pages/Admin/Notification")),
  },
  {
    path: ROUTES.ADMIN_CREATE_NOTIFICATION,
    component: React.lazy(() => import("../pages/Admin/CreateNotification")),
  },
  {
    path: ROUTES.ADMIN_UPDATE_NOTIFICATION,
    component: React.lazy(() => import("../pages/Admin/UpdateNotification")),
  },
  {
    path: ROUTES.ADMIN_UPGRADE_MASTER,
    component: React.lazy(() => import("../pages/Admin/UpgradeMaster")),
  },
  {
    path: ROUTES.ADMIN_LIST_MASTER,
    component: React.lazy(() => import("../pages/Admin/ListMaster")),
  },
  {
    path: ROUTES.ADMIN_FEE_SETTING,
    component: React.lazy(() => import("../pages/Admin/FeeSetting")),
  },
  {
    path: ROUTES.ADMIN_DEPOSIT_REPORT,
    component: React.lazy(() => import("../pages/Admin/MasterDepositReport")),
  },
];

const nonAuthRoutes = [
  {
    path: ROUTES.LOGIN,
    component: React.lazy(() => import("../pages/Auth/Login")),
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    component: React.lazy(() => import("../pages/Admin/Login")),
  },
  {
    path: ROUTES.REGISTER,
    component: React.lazy(() => import("../pages/Auth/Register")),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: React.lazy(() => import("../pages/Auth/ForgotPassword")),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: React.lazy(() => import("../pages/Auth/ResetPassword")),
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    component: React.lazy(() => import("../pages/Auth/VerifyEmail")),
  },
  {
    path: ROUTES.MAINTENANCE,
    component: React.lazy(() => import("../pages/Utility/Maintenance")),
  },
  {
    path: ROUTES.PAGE_404,
    component: React.lazy(() => import("../pages/Utility/404")),
  },
  {
    path: ROUTES.PAGE_500,
    component: React.lazy(() => import("../pages/Utility/500")),
  },
  {
    path: ROUTES.VERIFY_CHANGE_EMAIL,
    component: React.lazy(() => import("../pages/Auth/VerifyChangeEmail")),
  },
];

export { authRoutes, nonAuthRoutes };
