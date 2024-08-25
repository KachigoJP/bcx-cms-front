import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// UI Imports
import { Row, Button } from "react-bootstrap";
import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdRequestPage,
  MdCompareArrows,
  MdDashboard,
  MdContactSupport,
  MdInput,
  MdOutlinePeopleAlt,
  MdHistory,
  MdCampaign,
  MdAccessibilityNew,
  MdFactCheck,
  MdMoney,
  MdOutlineCardGiftcard,
} from "react-icons/md";
import "../../scss/common/components/_dashboard.scss";

// App imports
import { AuthContext } from "../../contexts/auth";
import { PrefContext } from "../../contexts/preferrence";
import { ROLE, ROUTES } from "../../helpers/constants";
import LOGO from "../../assets/img/logo.svg";
import { Modal } from "react-bootstrap";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);
  const { isFoldedSidebar, toggleSidebar } = useContext(PrefContext);
  const { user, setRole } = React.useContext(AuthContext);

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

  const onClickIcon = () => {
    setshowModal(true);
  };

  const onClickTest = (role: string) => () => {
    setRole(role);
    setshowModal(false);
  };

  return (
    <React.Fragment>
      <nav className="sidebar d-none d-lg-block">
        <div className="sidebar-header">
          <Link
            // to={ROUTES.DASHBOARD}
            to="#"
            className="sidebar-brand"
            // onClick={onClickIcon}
          >
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
            <li
              className={`nav-item ${
                location.pathname === ROUTES.DASHBOARD ? "active" : ""
              }`}
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
            >
              <Link to={ROUTES.SUPPORT} className="nav-link">
                <MdContactSupport className="link-icon" />
                <span className="link-title">{t("Support")}</span>
              </Link>
            </li>
            {user?.role === ROLE.MASTER || user?.role === ROLE.AFFILIATE ? (
              <li
                className={`nav-item ${
                  location.pathname === ROUTES.AFFILIATE ? "active" : ""
                }`}
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
                >
                  <Link to={ROUTES.KYC_MANAGER} className="nav-link">
                    <MdAccessibilityNew className="link-icon" />
                    <span className="link-title">
                      {t("KYC Approve/Reject")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATE_USERS ? "active" : ""
                  }`}
                >
                  <Link to={ROUTES.AFFILIATE_USERS} className="nav-link">
                    <MdFactCheck className="link-icon" />
                    <span className="link-title">
                      {t("Upgrade Affiliate User")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATTE_RATE ? "active" : ""
                  }`}
                >
                  <Link to={ROUTES.AFFILIATTE_RATE} className="nav-link">
                    <MdMoney className="link-icon" />
                    <span className="link-title">
                      {t("Affiliate Rate Setting")}
                    </span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.DEPOSIT_REPORT ? "active" : ""
                  }`}
                >
                  <Link to={ROUTES.DEPOSIT_REPORT} className="nav-link">
                    <MdAttachMoney className="link-icon" />
                    <span className="link-title">{t("Deposit Report")}</span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === ROUTES.AFFILIATTE_BONUS
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to={ROUTES.AFFILIATTE_BONUS} className="nav-link">
                    <MdOutlineCardGiftcard className="link-icon" />
                    <span className="link-title">{t("Affiliate Bonus")}</span>
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
      <Modal show={showModal} onHide={() => setshowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row className="m-2">
            <Button className="mb-2" onClick={onClickTest("normal")}>
              {t("Login as User")}
            </Button>
            <Button className="mb-2" onClick={onClickTest("affiliate")}>
              {t("Login as Affiliate")}
            </Button>
            <Button className="mb-2" onClick={onClickTest("master")}>
              {t("Login as Tenant")}
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Sidebar;
