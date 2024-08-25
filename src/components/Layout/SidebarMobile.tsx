import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

// UI Imports
import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdAccountBalance,
  MdCompareArrows,
  MdDashboard,
  MdContactSupport,
  MdInput,
  MdCampaign,
  MdLogout,
  MdHistory,
  MdAccountCircle,
  MdContacts,
  MdSecurity,
  MdOutlineUpload,
  MdRequestPage,
  MdOutlinePeopleAlt,
  MdAccountBox,
} from "react-icons/md";

// App imports
import { PrefContext } from "../../contexts/preferrence";
import { AuthContext } from "../../contexts/auth";
import { ROLE, ROUTES } from "../../helpers/constants";
import { useApi } from "../../helpers/api";
import { API } from "../../helpers/constants";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = React.useContext(AuthContext);
  const { isOpenMobileNav, toggleSidebarMobile } = useContext(PrefContext);

  // Apis
  const { state, sendRequest } = useApi(API.LOGOUT);

  // Hooks
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      logout();
      navigate(ROUTES.LOGIN);
    }
  }, [state]);

  // Methods
  const onClickMenu = () => {
    toggleSidebarMobile();
  };

  const signOut = () => {
    sendRequest({
      method: "post",
      data: {},
    });
  };

  const onClickItem = () => {
    toggleSidebarMobile();
  };

  return (
    <React.Fragment>
      <nav className="sidebar-mobile d-block d-lg-none">
        <div className="sidebar-header">
          <div
            className={`sidebar-toggler ${
              isOpenMobileNav ? "active" : "not-active"
            }`}
            onClick={onClickMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            <li className="nav-item nav-category">{t("Home")}</li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.DASHBOARD ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.DASHBOARD} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Menu")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.DEPOSIT ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.DEPOSIT} className="nav-link">
                <MdAttachMoney className="link-icon" />
                <span className="link-title">{t("Deposit")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.EXCHANGE ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.EXCHANGE} className="nav-link">
                <MdCompareArrows className="link-icon" />
                <span className="link-title">{t("Exchange")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.TRANSFER ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.TRANSFER} className="nav-link">
                <MdInput className="link-icon" fontSize="2em" />
                <span className="link-title">{t("Transfer")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.WITHDRAW ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.WITHDRAW} className="nav-link">
                <MdRequestPage className="link-icon" />
                <span className="link-title">{t("Withdraw")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.BALANCE ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.BALANCE} className="nav-link">
                <MdAccountBalanceWallet className="link-icon" />
                <span className="link-title">{t("Balance")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.TRANSACTION_HISTORY ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.TRANSACTION_HISTORY} className="nav-link">
                <MdHistory className="link-icon" />
                <span className="link-title">{t("Transaction History")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.NOTICE ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.NOTICE} className="nav-link">
                <MdCampaign className="link-icon" />
                <span className="link-title">{t("Notice")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.SUPPORT ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.SUPPORT} className="nav-link">
                <MdContactSupport className="link-icon" />
                <span className="link-title">{t("Support")}</span>
              </Link>
            </li>
            {/* PROFILE */}
            <li className="nav-item nav-category">{t("Profile")}</li>
            <li className={`nav-item`}>
              <span className="link-title">
                {t("Account Number")}: {user?.accountNumber}
              </span>
            </li>
            <li className={`nav-item`}>
              <span className="link-title">
                {t("Account Level")}: {user?.accountLevel}
              </span>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.UPGRADE ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.UPGRADE} className="nav-link">
                <MdOutlineUpload className="link-icon" />
                <span className="link-title">{t("Upgrade Account")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.PROFILE ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.PROFILE} className="nav-link">
                <MdAccountCircle className="link-icon" />
                <span className="link-title">{t("Account Settings")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.KYC ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.KYC} className="nav-link">
                <MdContacts className="link-icon" />
                <span className="link-title">{t("KYC Verification")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.VERIFICATION_2FA ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.VERIFICATION_2FA} className="nav-link">
                <MdSecurity className="link-icon" />
                <span className="link-title">{t("2FA Code Verification")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.BANK ? "active" : ""
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.BANK} className="nav-link">
                <MdAccountBalance className="link-icon" />
                <span className="link-title">{t("Bank Information")}</span>
              </Link>
            </li>
            <li className={`nav-item`} onClick={onClickItem}>
              <Link to="#" className="nav-link" onClick={signOut}>
                <MdLogout className="link-icon" />
                <span className="link-title">{t("Logout")}</span>
              </Link>
            </li>

            {user?.role === ROLE.MASTER || user?.role === ROLE.AFFILIATE ? (
              <li
                className={`nav-item ${
                  location.pathname === ROUTES.AFFILIATE ? "active" : ""
                }`}
                onClick={onClickItem}
              >
                <Link to={ROUTES.AFFILIATE} className="nav-link">
                  <MdOutlinePeopleAlt className="link-icon" />
                  <span className="link-title">{t("Affiliate (AF)")}</span>
                </Link>
              </li>
            ) : null}
            {user?.role === ROLE.MASTER ? (
              <>
                <li className="nav-item nav-category">{t("Master Menu")}</li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.KYC_MANAGER ? "active" : ""
                  }`}
                  onClick={onClickItem}
                >
                  <Link to={ROUTES.KYC_MANAGER} className="nav-link">
                    <MdAccountBox className="link-icon" />
                    <span className="link-title">
                      {t("KYC Approve/Reject")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATE_USERS ? "active" : ""
                  }`}
                  onClick={onClickItem}
                >
                  <Link to={ROUTES.AFFILIATE_USERS} className="nav-link">
                    <MdAccountBox className="link-icon" />
                    <span className="link-title">
                      {t("Upgrade Affiliate User")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATTE_RATE ? "active" : ""
                  }`}
                  onClick={onClickItem}
                >
                  <Link to={ROUTES.AFFILIATTE_RATE} className="nav-link">
                    <MdAccountBox className="link-icon" />
                    <span className="link-title">
                      {t("Affiliate Rate Setting")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.DEPOSIT_REPORT ? "active" : ""
                  }`}
                  onClick={onClickItem}
                >
                  <Link to={ROUTES.DEPOSIT_REPORT} className="nav-link">
                    <MdAccountBox className="link-icon" />
                    <span className="link-title">{t("Deposit Report")}</span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATTE_BONUS
                      ? "active"
                      : ""
                  }`}
                  onClick={onClickItem}
                >
                  <Link to={ROUTES.AFFILIATTE_BONUS} className="nav-link">
                    <MdAccountBox className="link-icon" />
                    <span className="link-title">{t("Affiliate Bonus")}</span>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
