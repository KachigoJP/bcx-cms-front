import React from "react";
import { Navigate } from "react-router-dom";

// App imports
import { ROUTES } from "helpers/constants";

const authRoutes = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: () => <Navigate to={ROUTES.DASHBOARD} />,
  },
  {
    path: ROUTES.DASHBOARD,
    component: React.lazy(() => import("pages/Dashboard")),
  },
  // Account
  {
    path: ROUTES.PROFILE,
    component: React.lazy(() => import("pages/Profile/Profile")),
  },
  {
    path: ROUTES.PROFILE_EDIT,
    component: React.lazy(() => import("pages/Profile/ProfileEdit")),
  },
  {
    path: ROUTES.PASSWORD_CHANGE,
    component: React.lazy(() => import("pages/Profile/PasswordChange")),
  },
  {
    path: ROUTES.VERIFICATION_2FA,
    component: React.lazy(() => import("pages/Profile/2FA")),
  },
  {
    path: ROUTES.VERIFY_CHANGE_EMAIL,
    component: React.lazy(() => import("pages/Auth/VerifyChangeEmail")),
  },
  {
    path: ROUTES.SETTING,
    component: React.lazy(() => import("pages/Setting")),
  },
  // PAGES
  {
    path: ROUTES.PAGE_CATEGORY,
    component: React.lazy(() => import("pages/Pages/Categories")),
  },

  // USERS
  {
    path: ROUTES.USER_LIST,
    component: React.lazy(() => import("pages/Users/ListUser")),
  },
  {
    path: ROUTES.USER_UPDATE,
    component: React.lazy(() => import("pages/Users/UpdateUser")),
  },
  {
    path: ROUTES.USER_CREATE,
    component: React.lazy(() => import("pages/Users/CreateUser")),
  },
  {
    path: ROUTES.TESTIMONIAL,
    component: React.lazy(() => import("pages/Testimonials")),
  },
];

const nonAuthRoutes = [
  {
    path: ROUTES.LOGIN,
    component: React.lazy(() => import("pages/Auth/Login")),
  },
  {
    path: ROUTES.REGISTER,
    component: React.lazy(() => import("pages/Auth/Register")),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: React.lazy(() => import("pages/Auth/ForgotPassword")),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: React.lazy(() => import("pages/Auth/ResetPassword")),
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    component: React.lazy(() => import("pages/Auth/VerifyEmail")),
  },
  {
    path: ROUTES.MAINTENANCE,
    component: React.lazy(() => import("pages/Utility/Maintenance")),
  },
  {
    path: ROUTES.PAGE_404,
    component: React.lazy(() => import("pages/Utility/404")),
  },
  {
    path: ROUTES.PAGE_500,
    component: React.lazy(() => import("pages/Utility/500")),
  },
  {
    path: ROUTES.VERIFY_CHANGE_EMAIL,
    component: React.lazy(() => import("pages/Auth/VerifyChangeEmail")),
  },
];

export { authRoutes, nonAuthRoutes };
