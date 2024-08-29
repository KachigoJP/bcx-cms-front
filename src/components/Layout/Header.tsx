import React from "react";
import { useTranslation } from "react-i18next";

// UI Imports
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

// App Import menuDropdown
import { AuthContext } from "../../contexts/auth";
import LanguageDropdown from "./Dropdown/LanguageDropdown";
import ProfileMenu from "./Dropdown/ProfileMenu";
import LOGO from "../../assets/img/logo.svg";
import { ROLE } from "../../helpers/constants";

const Header = (props: any) => {
  const { user } = React.useContext(AuthContext);
  const { t } = useTranslation();
  const onClickAccount = () => {
    const value = user ? user.email : "";
    navigator.clipboard.writeText(`${value}`);
  };
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-content">
          {/* <div className="logo d-flex d-lg-none">
            <img src={LOGO} className="nav-item" alt="logo" />
          </div> */}

          <ul className="navbar-nav">
            <ProfileMenu />
            <LanguageDropdown />
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
