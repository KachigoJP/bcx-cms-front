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
          {/* <Link to={ROUTES.ADMIN_LIST_USER} className="sidebar-brand">
            <img src={LOGO} className="w-75" alt="logo" />
          </Link> */}
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
            <li
              className={`nav-item ${
                location.pathname === ROUTES.USER_LIST ? "active" : ""
              }`}
            >
              <Link to={ROUTES.USER_LIST} className="nav-link">
                <MdSupervisorAccount className="link-icon" />
                <span className="link-title">{t("Users")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.SETTING} className="nav-link">
                <MdAttachMoney className="link-icon" />
                <span className="link-title">{t("Pool Limit")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
