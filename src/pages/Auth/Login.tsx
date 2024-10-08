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
import OtpModal from "components/Modals/OtpModal";
import { AuthContext } from "contexts/auth";
import { getLoginSchema } from "helpers/schemas";
import { API, CAPTCHA_KEY, ROLE, ROUTES } from "helpers/constants";
import { useApi, FieldError, isInitState } from "helpers/api";
import { IForgotForm, ILoginForm, IOtpForm } from "helpers/interfaces";
import { ObjectSchema } from "yup";

const Login: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const authContext = React.useContext(AuthContext);
  const [verifyToken, setverifyToken] = React.useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const recaptchaRef = React.useRef<any>();
  const navigate = useNavigate();
  const { state: stateLocation } = useLocation();

  // Form Validations
  const validationSchema = getLoginSchema(t);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver<ILoginForm>(
      validationSchema as ObjectSchema<ILoginForm>
    ),
  });

  // APIs
  const { state: stateLogin, sendRequest, reset } = useApi(API.LOGIN);
  const {
    state: stateVerify2FA,
    sendRequest: sendRequest2FA,
    reset: reset2FA,
  } = useApi(API.LOGIN_VERIFY_2FA);

  // Effects
  React.useEffect(() => {
    const response = stateLogin.data;

    if (response && response.status === 200) {
      const responseData = response.data;
      const user = responseData.data;

      if (user.is2FAEnabled) {
        // Show Otp Modal
        setShowOtpModal(true);
      } else {
        authContext.doLogin({
          user,
        });

        navigate(ROUTES.DASHBOARD);
      }
    }
  }, [stateLogin]);

  // React.useEffect(() => {
  //   const response = stateVerify2FA.data;
  //   if (response && response.status === 200) {
  //     const data = response.data.data;
  //     authContext.doLogin({
  //       token: data.token,
  //       user: data.user,
  //     });

  //     navigate(ROUTES.DASHBOARD, { replace: true });
  //   }
  // }, [stateVerify2FA]);

  React.useEffect(() => {
    const subscription = watch(() => {
      if (!isInitState(stateLogin)) {
        reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Methods
  const onCaptchaChange = (token: string | null) => {
    setverifyToken(token);
  };

  const onSubmit = (data: ILoginForm) => {
    // if (verifyToken === null || verifyToken === "") {
    //   setError("recaptchaResponse", {
    //     type: "required",
    //     message: t("Please perform man-machine certification. "),
    //   });
    //   return;
    // }

    sendRequest({
      method: "post",
      data: null,
      withCredentials: true,
      headers: {
        Authorization: "Basic " + window.btoa(data.email + ":" + data.password),
      },
    });
  };

  const onSubmitOtp = (otpData: IOtpForm) => {
    const response = stateLogin.data;

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
              {stateLogin.isError && stateLogin.errors ? (
                <Alert variant="danger">
                  {stateLogin.errors.map((field: FieldError, key: number) => {
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
                {/* <Form.Group className="mb-3">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={onCaptchaChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.recaptchaResponse?.message}
                  </Form.Text>
                </Form.Group> */}
                <Button className="mt-3" type="submit">
                  {t("Login")}
                </Button>
              </Form>
              {/* <Row>
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
              </Row> */}
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
