// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate, createSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// Apps Imports
import { getForgotPassSchema } from "../../helpers/schemas";
import { useApi, FieldError } from "../../helpers/api";
import { API, ROUTES, CAPTCHA_KEY } from "../../helpers/constants";
import ResponseModal from "../../components/Modals/ResponseModal";
import { IForgotForm } from "../../helpers/interfaces";

const ForgotPassword: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const [verifyToken, setverifyToken] = React.useState<string | null>(null);
  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getForgotPassSchema(t);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForgotForm>({
    resolver: yupResolver<IForgotForm>(validationSchema),
  });

  // APIs
  const { state, sendRequest } = useApi(API.FORGOT_PASS);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      setShowResultModal(true);
      const data = response.data;
      // if ((data.statusCode = 200)) {
      //   navigate({
      //     pathname: ROUTES.RESET_PASSWORD,
      //     search: `?${createSearchParams({
      //       emailToken: data.data.emailToken,
      //     })}`,
      //   })
      // }
    }
  }, [state]);

  // Methods
  const onCaptchaChange = (token: string | null) => {
    setverifyToken(token);
  };
  const onSubmit = (data: IForgotForm) => {
    if (verifyToken === null || verifyToken === "") {
      setError("recaptchaResponse", {
        type: "required",
        message: t("Please perform man-machine certification. "),
      });
      return;
    }
    sendRequest({
      method: "post",
      data: { ...data, recaptchaResponse: verifyToken },
    });
  };

  const closeResultModal = () => {
    setShowResultModal(false);
  };

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
              ) : null}

              <Card.Title>{t("Forgot Password")}</Card.Title>
              <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Email")}</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      setValueAs: (value: string) => value.trim(),
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <ReCAPTCHA sitekey={CAPTCHA_KEY} onChange={onCaptchaChange} />
                  <Form.Text className="text-danger">
                    {errors.recaptchaResponse?.message}
                  </Form.Text>
                </Form.Group>
                <Button className="mt-3" type="submit">
                  {t("Send password reset link")}
                </Button>
              </Form>
              <Row>
                <Col xs="6">
                  <Link to={ROUTES.LOGIN}>{t("Return to Login Page")}</Link>
                </Col>
              </Row>
            </Card.Body>
            {/* Result Modal */}
            <Modal show={showResultModal} onHide={closeResultModal} centered>
              <ResponseModal
                type="success"
                title={t("Send password reset link")}
                message={t("Password reset link sent to your email")}
                onClose={closeResultModal}
              />
            </Modal>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
