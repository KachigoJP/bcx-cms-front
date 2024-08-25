// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// UI Imports
import {
  Container,
  Card,
  Row,
  Col,
  Alert,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import { MdOutlineCheckCircle } from "react-icons/md";
import EmailStep from "../../components/Forms/RegisterEmailStep";
import InfoStep from "../../components/Forms/RegisterInfoStep";
import AgreeStep from "../../components/Forms/RegisterAgreeStep ";

// Apps Imports
import { useApi, FieldError } from "../../helpers/api";
import { RegisterReducer } from "../../helpers/reducers";
import { RegisterState } from "../../helpers/types";
import {
  ROUTES,
  API,
  REGISTER_ACTION_TYPES,
  HOMEPAGE_LINKS,
} from "../../helpers/constants";

const Register: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = React.useState("");
  const [showResultModal, setShowResultModal] = React.useState(false);

  // Reducer
  const [state, dispatch] = React.useReducer(RegisterReducer, {});

  // APIs
  const { state: stateRegister, sendRequest } = useApi(API.REGISTER);

  // Effects
  React.useEffect(() => {
    if (step === REGISTER_ACTION_TYPES.AGREE_FINISH) {
      sendRequest({
        method: "post",
        data: state,
      });
      setStep(REGISTER_ACTION_TYPES.INPUT_INFO_FINISH);
      setShowResultModal(true);
    }
  }, [state]);

  React.useEffect(() => {
    if (stateRegister.errors) {
      setShowResultModal(false);
    }
  }, [stateRegister]);

  // Methods
  const onSubmit = (type: string) => (payload: RegisterState) => {
    setStep(type);
    dispatch({
      type,
      payload,
    });
  };
  const goStep = (type: string) => () => {
    setStep(type);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(ROUTES.LOGIN);
  };
  return (
    <Container>
      <Row className="h-100 align-items-center justify-content-md-center">
        <Col md="8" lg="7">
          <Card>
            <Card.Body>
              {stateRegister.isError && stateRegister.errors ? (
                <Alert variant="danger">
                  {stateRegister.errors.map(
                    (field: FieldError, key: number) => {
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
                    }
                  )}
                </Alert>
              ) : null}
              <Card.Title>{t("Register")}</Card.Title>
              {step === "" ? (
                <EmailStep
                  state={state}
                  onSubmit={onSubmit(REGISTER_ACTION_TYPES.CHECK_EMAIL_FINISH)}
                />
              ) : null}
              {step === REGISTER_ACTION_TYPES.CHECK_EMAIL_FINISH ? (
                <InfoStep
                  state={state}
                  backPrevStep={goStep("")}
                  onSubmit={onSubmit(REGISTER_ACTION_TYPES.INPUT_INFO_FINISH)}
                />
              ) : null}
              {step === REGISTER_ACTION_TYPES.INPUT_INFO_FINISH ||
              step === REGISTER_ACTION_TYPES.AGREE_FINISH ? (
                <AgreeStep
                  backPrevStep={goStep(
                    REGISTER_ACTION_TYPES.CHECK_EMAIL_FINISH
                  )}
                  state={state}
                  onSubmit={onSubmit(REGISTER_ACTION_TYPES.AGREE_FINISH)}
                />
              ) : null}
              <Row>
                <Col className="text-end register-link">
                  <Link to={ROUTES.LOGIN} className="text-end">
                    {t("Click here if you have an account")}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col className="text-end register-link">
                  <a
                    href={HOMEPAGE_LINKS.HOME}
                    target="_blank"
                    className="text-end"
                  >
                    {t("Rays Wallet home page")}
                  </a>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Result Modal */}
      <Modal
        show={showResultModal}
        onHide={closeResultModal}
        centered
        backdrop="static"
      >
        <Modal.Body className="text-center">
          {!stateRegister.isLoading && stateRegister.data ? (
            <>
              <MdOutlineCheckCircle size="5em" color="#00C851" />
              <h3>{t("Create Fast Account")}</h3>
              <p className="text-start">
                {t("An activation email will be sent to your email")}
                <a
                  href={`mailto:${
                    JSON.parse(stateRegister.data.config.data).email
                  }`}
                >
                  {" "}
                  {JSON.parse(stateRegister.data.config.data).email}
                </a>
                .
              </p>
              <p className="text-start">
                {t(
                  "Please click the URL in the email within 10 days to activate your account."
                )}
              </p>
              <p className="text-start text-danger">
                {t(
                  "※If your URL is invalid, please contact our customer support team."
                )}
              </p>
              <p className="text-start text-danger">
                {t(
                  "※If you do not receive the email, please check your spam folder first."
                )}
              </p>
            </>
          ) : (
            <>
              <Spinner animation="border" role="status" aria-hidden="true" />
              <div>{t("Processing... Please wait a few minutes!")}</div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {!stateRegister.isLoading && stateRegister.data ? (
            <>
              <Button onClick={closeResultModal}>{t("OK")}</Button>
            </>
          ) : null}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
