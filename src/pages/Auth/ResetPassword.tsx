// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import BirthdatePicker from "components/Components/BirthdatePicker";
import moment from "moment";

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
import ResponseModal from "components/Modals/ResponseModal";
import DatePicker from "components/Components/DatePicker";

// Apps Imports
import { getResetPassSchema } from "helpers/schemas";
import { useApi, FieldError } from "helpers/api";
import { API, ROUTES } from "helpers/constants";
import { IResetForm } from "helpers/interfaces";

const ResetPassword: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getResetPassSchema(t);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetForm>({
    resolver: yupResolver<IResetForm>(validationSchema),
  });

  // APIs
  const { state: stateVerify, sendRequest: sendRequestVerify } = useApi(
    API.FORGOT_PASS_VERIFY
  );
  const { state, sendRequest } = useApi(API.RESET_PASS);

  // Effects
  React.useEffect(() => {
    sendRequestVerify({
      method: "get",
      params: {
        emailToken,
      },
    });
  }, []);

  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      setShowResultModal(true);
      const data = response.data;
      if ((data.status = 200)) {
      }
    }
  }, [state]);

  // Params
  const emailToken: any = searchParams.get("emailToken");

  // Methods
  const onSubmit = (data: IResetForm) => {
    sendRequest({
      method: "post",
      data: {
        ...data,
        dateOfBirth: moment(data.dateOfBirth).toDate(),
      },
      params: {
        emailToken,
      },
    });
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(ROUTES.LOGIN);
  };

  const onBirthdateChange = (value: Date) => {
    setValue("dateOfBirth", value.toDateString());
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

              <Card.Title>{t("Reset Password")}</Card.Title>
              {stateVerify.errors ? (
                <Alert variant="danger">
                  {stateVerify.errors.map((field: FieldError, key: number) => {
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
                <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Confirmation Code")}</Form.Label>
                    <Form.Control
                      type="confirmationCode"
                      {...register("confirmationCode")}
                    />
                    <Form.Text className="text-danger">
                      {errors.confirmationCode?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Date of Birth")}</Form.Label>
                    <Row>
                      <BirthdatePicker
                        defaultValue={new Date(1970, 0, 1).toISOString()}
                        onChange={onBirthdateChange}
                      />
                    </Row>
                    <Form.Text className="text-danger">
                      {errors.dateOfBirth?.message}
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
                    <Form.Label>{t("Confirm Password")}</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("confirmPassword")}
                    />
                    <Form.Text className="text-danger">
                      {errors.confirmPassword?.message}
                    </Form.Text>
                  </Form.Group>
                  <Button className="mt-3" type="submit">
                    {t("Next")}
                  </Button>
                </Form>
              )}
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
                title={t("Reset Password")}
                message={t("Password reset successful")}
                onClose={closeResultModal}
              />
            </Modal>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
