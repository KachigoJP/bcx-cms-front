import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// UI Imports
import {
  MdOutlineSupervisedUserCircle,
  MdSupervisorAccount,
  MdCircleNotifications,
  MdAttachMoney,
  MdManageAccounts,
  MdAccountBox,
  MdSettingsSuggest,
} from "react-icons/md";

// App imports
import { PrefContext } from "../../contexts/preferrence";
import { ROUTES } from "../../helpers/constants";
import LOGO from "../../assets/img/logo.svg";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isFoldedSidebar, toggleSidebar } = useContext(PrefContext);
  const location = useLocation();

  const onClickMenu = () => {
    toggleSidebar();
  };
  const onMouseEnter = () => {
    document.body.classList.add("overflow-hidden");
    if (isFoldedSidebar) {
      document.body.classList.add("open-sidebar-folded");
    }
  };

  const onMouseLeave = () => {
    document.body.classList.remove("overflow-hidden");
    if (isFoldedSidebar) {
      document.body.classList.remove("open-sidebar-folded");
    }
  };

  return (
    <React.Fragment>
      <nav className="sidebar d-none d-lg-block">
        <div className="sidebar-header">
          <Link to={ROUTES.ADMIN_LIST_USER} className="sidebar-brand">
            <img src={LOGO} className="w-75" alt="logo" />
          </Link>
          <div
            className={`sidebar-toggler ${
              isFoldedSidebar ? "active" : "not-active"
            }`}
            onClick={onClickMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className="sidebar-body"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ul className="nav">
            <li className="nav-item nav-category">{t("Home")}</li>
            {/* <li
              className={`nav-item ${
                location.pathname === ROUTES.DASHBOARD ? 'active' : ''
              }`}
            >
              <Link to={ROUTES.DASHBOARD} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t('Menu')}</span>
              </Link>
            </li> */}
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_NOTIFICATION ? "active" : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_NOTIFICATION} className="nav-link">
                <MdCircleNotifications className="link-icon" />
                <span className="link-title">{t("Notifications Manager")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_LIST_USER ? "active" : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_LIST_USER} className="nav-link">
                <MdSupervisorAccount className="link-icon" />
                <span className="link-title">{t("Users")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_LIST_MASTER ? "active" : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_LIST_MASTER} className="nav-link">
                <MdAccountBox className="link-icon" />
                <span className="link-title">{t("List Master")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_UPGRADE_MASTER
                  ? "active"
                  : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_UPGRADE_MASTER} className="nav-link">
                <MdOutlineSupervisedUserCircle className="link-icon" />
                <span className="link-title">{t("Upgrade Master User")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_FEE_SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_FEE_SETTING} className="nav-link">
                <MdSettingsSuggest className="link-icon" />
                <span className="link-title">{t("Fee Setting")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.ADMIN_SETTING} className="nav-link">
                <MdAttachMoney className="link-icon" />
                <span className="link-title">{t("Pool Limit")}</span>
              </Link>
            </li>
            {/* <li
              className={`nav-item ${
                location.pathname === ROUTES.DEPOSIT_REPORT ? 'active' : ''
              }`}
            >
              <Link to={ROUTES.ADMIN_DEPOSIT_REPORT} className="nav-link">
                <MdAttachMoney className="link-icon" />
                <span className="link-title">
                  {t('Rays Wallet Deposit Report')}
                </span>
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
