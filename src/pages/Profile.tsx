// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";

// UI Imports
import { Form, Button, Row, Col, Card } from "react-bootstrap";

// Apps Imports
import { AuthContext } from "../contexts/auth";
import { getCountryName } from "../helpers/functions";
import { ROUTES, GENDER_OPTIONS, ROLE } from "../helpers/constants";
import { OptionItem } from "../helpers/types";
import Languages from "../assets/json/languages.json";

const Profile: React.FC = () => {
  // Hooks
  const { t, i18n } = useTranslation();
  const { user, fetchUser } = React.useContext(AuthContext);

  // Effects
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Profile Detail")}
          </li>
        </ol>
        <Card>
          <Card.Body>
            <ul>
              <li>
                <span>{t("Profile")}</span>
              </li>
              <li></li>
            </ul>
          </Card.Body>
        </Card>
      </nav>

      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>{t("Profile Detail")}</Card.Title>
          <Form className="col-xl-8">
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Email Address")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.email}
              </Col>
              <Col sm={3}>
                <Link to={ROUTES.EMAIL_CHANGE}>
                  <Button
                    variant="outline-primary"
                    type="button"
                    className="px-3"
                  >
                    {t("Change Email")}
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Password")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                *********
              </Col>
              <Col md={3}>
                <Link to={ROUTES.PASSWORD_CHANGE}>
                  <Button
                    variant="outline-primary"
                    type="button"
                    className="px-3"
                  >
                    {t("Change Password")}
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Account Number")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.accountNumber}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Account Level")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.accountLevel ? t(user?.accountLevel) : null}
              </Col>
            </Row>
            {user?.role === ROLE.NORMAL ? (
              <Row className="mb-3">
                <Form.Label className="col-md-3 col-form-label">
                  {t("Invitation Code")}
                </Form.Label>
                <Col
                  sm={6}
                  className="d-flex flex-column justify-content-center"
                >
                  {user?.refererCode ? (
                    user?.refererCode
                  ) : (
                    <Link to={ROUTES.REFERRER_CHANGE}>
                      <Button
                        variant="outline-primary"
                        type="button"
                        className="px-3"
                      >
                        {t("Register")}
                      </Button>
                    </Link>
                  )}
                </Col>
              </Row>
            ) : null}
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Applicant Type")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.applicantType ? t(user?.applicantType) : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("First Name")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.firstName}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Last Name")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.lastName}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Date of Birth")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.dateOfBirth
                  ? moment(user.dateOfBirth).format("YYYY/MM/DD")
                  : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Sex")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.gender
                  ? t(
                      (
                        GENDER_OPTIONS.find((item: OptionItem) => {
                          return item.value === user?.gender;
                        }) as OptionItem
                      )?.label
                    )
                  : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Country")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.country
                  ? getCountryName(user?.country, i18n.language)
                  : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Post Code")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.postcode}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Region/State/Province")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.region}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("City")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                {user?.city}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("District/Suburb")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                {user?.district}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                {user?.street}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street No.")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                {user?.streetNo}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Apartment No.")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.apartment}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Phone Number")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {`(+${user?.phoneCode}) ${user?.phoneNumber}`}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Language")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.language == "en" ? t("English") : t("Japanese")}
              </Col>
            </Row>
            <Link
              role="button"
              to={ROUTES.PROFILE_EDIT}
              className="btn btn-primary me-3 px-5"
            >
              {t("Change")}
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
