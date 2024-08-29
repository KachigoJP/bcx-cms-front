import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// UI Imports
import { Row, Button } from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
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
  const { user } = React.useContext(AuthContext);

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
    setshowModal(false);
  };

  return (
    <React.Fragment>
      <nav className="sidebar d-none d-lg-block">
        <div className="sidebar-header">
          {/* <Link
            // to={ROUTES.DASHBOARD}
            to="#"
            className="sidebar-brand"
            // onClick={onClickIcon}
          >
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
            <li
              className={`nav-item ${
                location.pathname === ROUTES.DASHBOARD ? "active" : ""
              }`}
            >
              <Link to={ROUTES.DASHBOARD} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Dashboard")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.USER_LIST ? "active" : ""
              }`}
            >
              <Link to={ROUTES.USER_LIST} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Users")}</span>
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item nav-category">{t("Front Page")}</li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.SETTING} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Services")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.SETTING} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Testimonials")}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.SETTING ? "active" : ""
              }`}
            >
              <Link to={ROUTES.SETTING} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t("Setting")}</span>
              </Link>
            </li>
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
