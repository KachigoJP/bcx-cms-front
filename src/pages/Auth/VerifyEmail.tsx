// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// UI Imports
import { Container, Card, Row, Col, Alert } from "react-bootstrap";

// Apps Imports
import { useApi, FieldError } from "../../helpers/api";
import { API, ROUTES } from "../../helpers/constants";

const ResetPassword: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // APIs
  const { state, sendRequest } = useApi(API.VERIFY_EMAIL);

  // Constants
  const accountId = searchParams.get("id");
  // Effects
  React.useEffect(() => {
    sendRequest({
      method: "post",
      url: `${API.VERIFY_EMAIL}/${accountId}`,
      data: { id: { accountId } },
    });
  }, []);
  return (
    <Container>
      <Row className="h-100 align-items-center justify-content-md-center">
        <Col lg="8" xl="6">
          <Card>
            <Card.Body>
              {state.isError && state.errors ? (
                <Alert variant="danger">
                  {state.errors.map((field: FieldError, key: number) => {
                    return (
                      <React.Fragment key={key}>
                        <p>{`${t(field.name.toUpperCase())}`}</p>
                        {field.errors
                          ? Object.values(field.errors).map(
                              (value: string, idx: number) => {
                                return <li key={idx}>{value}</li>;
                              }
                            )
                          : null}
                      </React.Fragment>
                    );
                  })}
                </Alert>
              ) : (
                <>
                  <Card.Title>{t("Thank you for joing with us")}</Card.Title>
                  <Card.Text>
                    <p>{t("Your Account has been opened successfully")}</p>
                    <p className="text-start">
                      {t(
                        "Please log in to your account with registered email address and password"
                      )}
                    </p>
                    <p className="text-start text-danger">
                      {t(
                        "You can enjoy your account service with a total moneyout limit of USD 1000.00"
                      )}
                    </p>
                    <p className="text-start text-danger">
                      {t(
                        "KYC or other supported documents will be required if you want to upgrade your account for higher limit or more functions"
                      )}
                    </p>
                  </Card.Text>
                </>
              )}

              <Row className="mt-2">
                <Col>
                  <Link to={ROUTES.LOGIN} className="btn btn-primary">
                    {t("Return to Login Page")}
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
