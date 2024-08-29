// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";

// UI Imports
import { Form, Button, Row, Col, Card } from "react-bootstrap";

// Apps Imports
import { AuthContext } from "../../contexts/auth";
import { getCountryName } from "../../helpers/functions";
import { ROUTES, GENDER_OPTIONS, ROLE } from "../../helpers/constants";
import { OptionItem } from "../../helpers/interfaces/types";
import Languages from "../../assets/json/languages.json";

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
      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>{t("Profile Detail")}</Card.Title>
          <Form className="col-xl-8">
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Email")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.email}
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
                {t("Gender")}
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
                {t("Region")}
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
                {t("Address")}
              </Form.Label>
              <Col md={6} className="d-flex flex-column justify-content-center">
                {user?.address}
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Building")}
              </Form.Label>
              <Col sm={6} className="d-flex flex-column justify-content-center">
                {user?.building}
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
