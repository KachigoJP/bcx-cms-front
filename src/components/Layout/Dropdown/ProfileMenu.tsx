import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// UI Imports
import { MdAccountCircle } from "react-icons/md";

// App imports
import { AuthContext } from "../../../contexts/auth";
import { ROUTES } from "../../../helpers/constants";
import { useApi } from "../../../helpers/api";
import { API, ROLE } from "../../../helpers/constants";

const ProfileMenu = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout, user } = React.useContext(AuthContext);
  const { state, sendRequest } = useApi(API.LOGOUT);

  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      logout();
      navigate(ROUTES.LOGIN);
    }
  }, [state]);

  const signOut = () => {
    sendRequest({
      method: "post",
      data: {},
    });
  };

  return (
    <React.Fragment>
      <Dropdown className="nav-item d-none d-lg-flex" align="start">
        <Dropdown.Toggle role="button" as={"li"} className="nav-link">
          <MdAccountCircle fontSize={36} />
          {t("Profile")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {user?.role !== ROLE.ADMIN ? (
            <Dropdown.Item as={Link} to={ROUTES.PROFILE}>
              {t("Account Settings")}
            </Dropdown.Item>
          ) : null}
          {user?.role !== ROLE.ADMIN ? (
            <Dropdown.Item as={Link} to={ROUTES.PASSWORD_CHANGE}>
              {t("Change Password")}
            </Dropdown.Item>
          ) : null}
          {user?.role !== ROLE.ADMIN ? (
            <Dropdown.Item as={Link} to={ROUTES.VERIFICATION_2FA}>
              {t("2FA Code Verification")}
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item as={Link} to="#" onClick={signOut}>
            {t("Logout")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileMenu;
