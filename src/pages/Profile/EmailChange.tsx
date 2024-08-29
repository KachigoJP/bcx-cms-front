// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import { MdOutlineCheckCircle } from "react-icons/md";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Modal,
  Spinner,
} from "react-bootstrap";

// Apps Imports
import { AuthContext } from "../../contexts/auth";
import OtpModal from "../../components/Modals/OtpModal";
import { useApi, FieldError } from "../../helpers/api";
import { API, ROUTES } from "../../helpers/constants";
import { getChangeEmailSchema } from "../../helpers/schemas";
import { IChangeMailForm, IOtpForm } from "../../helpers/interfaces";

const EmailChange: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const { logout, user } = React.useContext(AuthContext);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const [submitData, setSubmitData] = React.useState<IChangeMailForm | null>(
    null
  );

  // Form Validations
  const validationSchema = getChangeEmailSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangeMailForm>({
    resolver: yupResolver<IChangeMailForm>(validationSchema),
  });

  // APIs
  const { state, sendRequest, reset } = useApi(API.CHANGE_EMAIL);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      const data = response.data;
      if ((data.status = 200)) {
        setShowResultModal(true);
      }
    }
  }, [state]);

  // Methods
  const onSubmitOtp = (otpData: IOtpForm) => {
    setShowOtpModal(false);
    processExecute(otpData.otpToken);
  };
  const onOtpChange = () => {
    reset();
  };

  const onSubmit = (data: IChangeMailForm) => {
    setSubmitData(data);
    setShowConfirmModal(true);
  };

  const processExecute = (otp?: number) => {
    const sendData = submitData;
    if (otp && sendData) {
      sendData.otpToken = otp;
    }
    sendRequest({
      method: "post",
      data: sendData,
    });
  };

  const onClickConfirm = () => {
    closeConfirmModal();
    if (!user?.is2FAEnabled) {
      processExecute();
    } else {
      setShowOtpModal(true);
    }
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    logout();
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  return (
    <div className="main-content">
      {/* Body */}
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
          <Card.Title>{t("Change Email")}</Card.Title>
          <Card.Subtitle>
            {t(
              "Please enter your current and new email in the following boxes"
            )}
            <p className="text-danger">
              {t(
                "* Please note that your ID and contact email address will be updated once you have changed your email address"
              )}
            </p>
          </Card.Subtitle>
          <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                {t("Email")}
              </Form.Label>
              <Col sm={3}>
                <Form.Control {...register("email")} />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                {t("Confirm Email")}
              </Form.Label>
              <Col sm={3}>
                <Form.Control {...register("confirmEmail")} />
                <Form.Text className="text-danger">
                  {errors.confirmEmail?.message}
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
              <Button type="submit">{t("Change Email")}</Button>
            )}
          </Form>

          {/* CONFIRM MODAL */}
          <Modal show={showConfirmModal} onHide={closeConfirmModal} centered>
            <Modal.Title></Modal.Title>
            <Modal.Body className="text-center">
              <h3>{t("Change Email")}</h3>
              {t("Are you sure to change email to the new one?")}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeConfirmModal}>{t("Close")}</Button>
              <Button onClick={onClickConfirm}>{t("Confirm")}</Button>
            </Modal.Footer>
          </Modal>

          {/* RESULT MODAL */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <Modal.Body className="text-center">
              <MdOutlineCheckCircle size="5em" color="#00C851" />
              <h3>{t("Email Changed")}</h3>
              {t("Your email has been changed successfully.")}
              {t(
                "A verification email has been sent to your new email address. You need to verify your email to continue"
              )}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeResultModal}>
                {t("Return to Login Page")}
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>

      {/* OTP Token Modal */}
      <Modal show={showOtpModal} onHide={closeOtpModal}>
        <OtpModal onSubmit={onSubmitOtp} onOtpChange={onOtpChange} />
      </Modal>
    </div>
  );
};

export default EmailChange;
