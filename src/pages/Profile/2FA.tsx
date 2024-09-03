// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import { FaGooglePlay, FaAppStoreIos, FaWindows } from "react-icons/fa";
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  Spinner,
  Modal,
  Table,
} from "react-bootstrap";

// Apps Imports
import { AuthContext } from "contexts/auth";
import { useApi, FieldError } from "helpers/api";
import { get2FASchema } from "helpers/schemas";
import { ROUTES, API } from "helpers/constants";
import { ITwoFAForm } from "helpers/interfaces";

const TwoFA: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const { fetchUser } = React.useContext(AuthContext);
  const [qrcode, setQRcode] = React.useState(null);
  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validation
  const validationSchema = get2FASchema(t);
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ITwoFAForm>({
    resolver: yupResolver<ITwoFAForm>(validationSchema),
  });

  // APIs
  const { state, sendRequest, reset } = useApi(API.ENABLE_2FA);
  const { state: stateQRCode, sendRequest: sendRequestQRCode } = useApi(
    API.QRCODE
  );

  // Effects
  React.useEffect(() => {
    sendRequestQRCode({
      method: "get",
    });

    return () => {};
  }, []);

  React.useEffect(() => {
    const subscription = watch((value: any, { name, type }) => {
      if (state.data || state.errors) {
        reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  React.useEffect(() => {
    const response = stateQRCode.data;
    if (response && response.status === 200) {
      // TODO:  create response type
      const data: any = response.data.data;
      setQRcode(data);
    }
  }, [stateQRCode]);
  React.useEffect(() => {
    const response = state.data;
    if (response) {
      setShowResultModal(true);
    }
    return () => {};
  }, [state]);

  // Methods
  const onSubmit = (data: ITwoFAForm) => {
    sendRequest({
      method: "post",
      data,
    });
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    fetchUser();
  };

  return (
    <div className="main-content">
      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>{t("2FA Code Verification Registration")}</Card.Title>
          <Card.Subtitle>
            {t(
              "To strengthen the security of your important assets, please set up Google Authenticator."
            )}
            <br />
            {t(
              "Please install Google authentication system (Authenticator) on your device beforehand and proceed to next"
            )}
          </Card.Subtitle>
          <Row>
            <Col md={4} className="mt-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{t("For iOS")}</Card.Title>
                  <Button
                    href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                    target="_blank"
                  >
                    <FaAppStoreIos size={30} className="m-1" />
                    {t("App Store")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mt-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{t("For Android")}</Card.Title>
                  <Button
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                    target="_blank"
                  >
                    <FaGooglePlay size={30} className="m-1" />
                    {t("Google Play")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mt-2">
        <Card.Body>
          <Card.Title>{t("1. Please scan the following QR Code.")}</Card.Title>
          <p className="mb-1">
            {t(
              'In the Google authentication system application, tap "+" and scan the QR code with the cell phone camera.'
            )}
          </p>
          <Image src={qrcode || ""} className="mb-1" />
          <p className="text-muted mb-1">
            {t(
              "※ Please have a back-up copy of the QR code or the above Key in case you may need it again due to loss or replacement of your mobile phone."
            )}
          </p>
          <Card.Title>
            {t(
              "2. Please enter the 6-digit code and then click the Registration Button"
            )}
          </Card.Title>
          <p className="mb-1">
            {t(
              "Please enter the 6-digit code displayed in your Google Authenticator APP in the following box."
            )}
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
              <Col sm={3}>
                <Controller
                  name="otpToken"
                  control={control}
                  rules={{ required: true, pattern: /^\d+$/ }}
                  render={(props) => {
                    const { onChange, value, ref } = props.field; // v7. use props if you're using v6

                    return (
                      <Form.Control
                        ref={ref}
                        className="hide-arrow"
                        type="number"
                        placeholder={t("Enter OTP  Code")}
                        onChange={onChange}
                        value={value}
                      />
                    );
                  }}
                />

                <Form.Text className="text-danger">
                  {errors.otpToken?.message}
                  {state?.errors?.map((field: FieldError, key: number) => {
                    return (
                      <React.Fragment key={key}>
                        {field.errors
                          ? Object.values(field.errors).map(
                              (value: string, idx: number) => {
                                return <p key={idx}>{t(value)}</p>;
                              }
                            )
                          : null}
                      </React.Fragment>
                    );
                  })}
                </Form.Text>
              </Col>
            </Form.Group>
            {state.isLoading ? (
              <Button variant="primary" className="me-3 px-5 mt-2" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-1">{t("Loading...")}</span>
              </Button>
            ) : (
              <Button type="submit" className="mt-2">
                {t("Register")}
              </Button>
            )}
          </Form>

          {/* Result Modal */}
          <Modal
            show={showResultModal}
            onHide={closeResultModal}
            centered
            size="lg"
          >
            <Modal.Body className="text-center">
              <h3>{t("Update Successful")}</h3>
              {t("2FA Code verification functions")}
              <Row>
                <Col>
                  <Table responsive striped>
                    <tbody className="text-start">
                      <tr>
                        <td>{t("Login")}</td>
                        <td className="text-wrap">
                          {t(
                            "Every time you login, the authenticator will be actived, you maybe refused access if it is not you"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("Money Transfer/Withdrawal")}</td>
                        <td className="text-wrap">
                          {t(
                            "When you withdraw or transfer money from your account, the authenticator will be actived"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>{t("User Setting")}</td>
                        <td className="text-wrap">
                          {t(
                            "When you access the user setting page, the authenticator will be actived"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeResultModal}>{t("OK")}</Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TwoFA;
