// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
import OtpModal, { OtpForm } from "../../components/Modals/OtpModal";
import { AuthContext } from "../../contexts/auth";
import { getLoginSchema } from "../../helpers/schemas";
import { API, CAPTCHA_KEY, ROLE, ROUTES } from "../../helpers/constants";
import { useApi, FieldError, isInitState } from "../../helpers/api";

type LoginForm = {
  email: string;
  password: string;
  recaptchaResponse: string;
};

const Login: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const { logged } = React.useContext(AuthContext);
  const [verifyToken, setverifyToken] = React.useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const recaptchaRef = React.useRef<any>();
  const navigate = useNavigate();
  const { state: stateLocation } = useLocation();

  // Form Validations
  const validationSchema = getLoginSchema(t);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<LoginForm>(formOptions);

  // APIs
  const { state, sendRequest, reset } = useApi(API.LOGIN);
  const {
    state: stateVerify2FA,
    sendRequest: sendRequest2FA,
    reset: reset2FA,
  } = useApi(API.LOGIN_VERIFY_2FA);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      const data = response.data.data;
      if (data.is2FAEnabled) {
        // Show Otp Modal
        setShowOtpModal(true);
      } else {
        logged({
          token: data.token,
          user: data.user,
        });
        try {
          const redirectTo: string =
            data.user.role == ROLE.ADMIN
              ? ROUTES.ADMIN_SETTING
              : ROUTES.DASHBOARD;
          navigate(redirectTo);
        } catch (e) {
          navigate(ROUTES.DASHBOARD);
        }
      }
    }
  }, [state]);

  React.useEffect(() => {
    const response = stateVerify2FA.data;
    if (response && response.status === 200) {
      const data = response.data.data;
      logged({
        token: data.token,
        user: data.user,
      });
      try {
        const redirectTo: string =
          data.user.role == ROLE.ADMIN
            ? ROUTES.ADMIN_SETTING
            : ROUTES.DASHBOARD;
        navigate(redirectTo, { replace: true });
      } catch (e) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    }
  }, [stateVerify2FA]);

  // Reset api status when input value is changed
  React.useEffect(() => {
    const subscription = watch(() => {
      if (!isInitState(state)) {
        reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Methods
  const onCaptchaChange = (token: string | null) => {
    setverifyToken(token);
  };

  const onSubmit = async (data: LoginForm) => {
    if (verifyToken === null || verifyToken === "") {
      setError("recaptchaResponse", {
        type: "required",
        message: t("Please perform man-machine certification. "),
      });
      return;
    }
    const loginInfo = await sendRequest({
      method: "post",
      data: {
        ...data,
        recaptchaResponse: verifyToken,
      },
    });
    loginInfo.error && recaptchaRef.current.reset();
  };

  const onSubmitOtp = (otpData: OtpForm) => {
    const response = state.data;
    if (response && response.status === 201) {
      const data = response.data.data;
      if (data.is2FAEnabled) {
        // Show Otp Modal
        sendRequest2FA({
          method: "post",
          url: API.LOGIN_VERIFY_2FA + `/${data.id}`,
          data: {
            ...otpData,
          },
        });
        setShowOtpModal(false);
      }
    }
  };
  const onOtpChange = () => {
    reset2FA();
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
              {stateVerify2FA.isError && stateVerify2FA.errors ? (
                <Alert variant="danger">
                  {stateVerify2FA.errors.map(
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

              <Card.Title>{t("Login")}</Card.Title>
              <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Email")}</Form.Label>
                  <Form.Control
                    {...register("email", {
                      setValueAs: (value: string) => value.trim(),
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Password")}</Form.Label>
                  <Form.Control type="password" {...register("password")} />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={onCaptchaChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.recaptchaResponse?.message}
                  </Form.Text>
                </Form.Group>
                <Button className="mt-3" type="submit">
                  {t("Login")}
                </Button>
              </Form>
              <Row>
                <Col xs="6">
                  <Link to={ROUTES.FORGOT_PASSWORD}>
                    {t("Forgot your password?")}
                  </Link>
                </Col>
                <Col xs="6" className="text-end">
                  <Link to={ROUTES.REGISTER} className="text-danger">
                    {t("Sign-up")}
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <OtpModal
          onSubmit={onSubmitOtp}
          isLoading={stateVerify2FA.isLoading}
          onOtpChange={onOtpChange}
        />
      </Modal>
    </Container>
  );
};

export default Login;
