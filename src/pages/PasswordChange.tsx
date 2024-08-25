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
import OtpModal, { OtpForm } from "../components/Modals/OtpModal";

// Apps Imports
import { AuthContext } from "../contexts/auth";
import { getChangePassSchema } from "../helpers/schemas";
import { useApi, FieldError } from "../helpers/api";
import { API, ROUTES } from "../helpers/constants";
import { IChangePassForm } from "../helpers/interfaces";

const PasswordChange: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const { user, logout } = React.useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const [submitData, setSubmitData] = React.useState<IChangePassForm | null>(
    null
  );

  // Form Validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassForm>({
    resolver: yupResolver<IChangePassForm>(getChangePassSchema(t)),
  });

  // APIs
  const { state, sendRequest, reset } = useApi(API.CHANGE_PASS);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response) {
      const data = response.data;
      if ((data.status = 200)) {
        setShowResultModal(true);
      }
    }
  }, [state]);

  // Methods
  const onOtpChange = () => {
    reset();
  };

  const onSubmit = (data: IChangePassForm) => {
    // delete  Confirm password  because  BE  doesn't need it
    delete data?.confirmPassword;
    setSubmitData(data);
    setShowConfirmModal(true);
  };

  const onSubmitOtp = (otpData: OtpForm) => {
    setShowOtpModal(false);
    sendRequest({
      method: "put",
      data: { ...submitData, otpToken: otpData.otpToken },
    });
  };

  const onClickConfirm = () => {
    if (user?.is2FAEnabled) {
      setShowOtpModal(true);
    } else {
      sendRequest({
        method: "put",
        data: submitData,
      });
    }
    closeConfirmModal();
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    logout();
  };
  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Change Password")}
          </li>
        </ol>
        <Card>
          <Card.Body>
            <ul>
              <li>
                <span>{t("Change Password")}</span>
              </li>
              <li></li>
            </ul>
          </Card.Body>
        </Card>
      </nav>

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
          <Card.Title>{t("Change Password")}</Card.Title>
          <Card.Subtitle>
            {t(
              "Please enter your current and new password in the following boxes"
            )}
          </Card.Subtitle>
          {/* FORM */}
          <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3} xxl={2}>
                {t("Current Password")}
              </Form.Label>
              <Col md={5} xl={4} xxl={3}>
                <Form.Control
                  type="password"
                  {...register("currentPassword")}
                />
                <Form.Text className="text-danger">
                  {errors.currentPassword?.message}
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3} xxl={2}>
                {t("New Password")}
              </Form.Label>
              <Col md={5} xl={4} xxl={3}>
                <Form.Control type="password" {...register("newPassword")} />
                <Form.Text className="text-danger">
                  {errors.newPassword?.message}
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column md={3} xxl={2}>
                {t("Confirm New Password")}
              </Form.Label>
              <Col md={5} xl={4} xxl={3}>
                <Form.Control
                  type="password"
                  {...register("confirmPassword")}
                />
                <Form.Text className="text-danger">
                  {errors.confirmPassword?.message}
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
              <Button type="submit">{t("Change Password")}</Button>
            )}
          </Form>

          {/* CONFIRM MODAL */}
          <Modal show={showConfirmModal} onHide={closeConfirmModal} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="text-center">
              <h3>{t("Change Password")}</h3>
              {t("Are you sure to change password to the new one?")}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeConfirmModal}>{t("Close")}</Button>
              <Button onClick={onClickConfirm}>{t("Confirm")}</Button>
            </Modal.Footer>
          </Modal>

          {/* OTP Token Modal */}
          <Modal show={showOtpModal} onHide={closeOtpModal}>
            <OtpModal
              onSubmit={onSubmitOtp}
              isLoading={state.isLoading}
              onOtpChange={onOtpChange}
            />
          </Modal>

          {/* RESULT MODAL */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <Modal.Body className="text-center">
              <MdOutlineCheckCircle size="5em" color="#00C851" />
              <h3>{t("Password Changed")}</h3>
              {t("Your password has been changed successfully.")}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeResultModal}>
                {t("Return to Login Page")}
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PasswordChange;
