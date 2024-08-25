// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import ResponseModal from "../../components/Modals/ResponseModal";

// Apps Imports
import { useApi, FieldError } from "../../helpers/api";
import { getNotificationSchema } from "../../helpers/schemas";
import { ROUTES, API } from "../../helpers/constants";

type NotificationForm = {
  title: string;
  detail: string;
  startDate: string;
  endDate: string;
};

const UpdateNotification: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showResultModal, setShowResultModal] = React.useState(false);

  //DateTime Picker
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // Form Validations
  const validationSchema = getNotificationSchema(t);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NotificationForm>(formOptions);

  // APIs
  const { state, sendRequest } = useApi(
    `${API.ADMIN_UPDATE_NOTIFICATION}/${id}`
  );
  const { state: stateNotification, sendRequest: sendRequestNotification } =
    useApi(`${API.ADMIN_NOTIFICATION}/${id}`);

  //get notification data
  React.useEffect(() => {
    sendRequestNotification({
      method: "get",
    });
    return () => {};
  }, []);

  // Effects
  React.useEffect(() => {
    const response = stateNotification.data;
    if (response && response.status === 200) {
      const notification = response.data.data;
      reset({
        title: notification.title,
        detail: notification.detail,
        startDate: notification.startDate,
        endDate: notification.endDate,
      });
      setStartDate(new Date(notification.startDate));
      setEndDate(new Date(notification.endDate));
    }
  }, [stateNotification]);

  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
    }
  }, [state]);

  // Methods
  const onSubmit = (data: NotificationForm) => {
    sendRequest({
      method: "put",
      data: data,
    });
  };

  const goBack = () => {
    navigate(-1);
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(ROUTES.ADMIN_NOTIFICATION);
  };

  const onChangeStartDate = (value: Date) => {
    if (value !== null) {
      setValue("startDate", value.toLocaleString());
      setStartDate(value);
    }
  };

  const onChangeEndDate = (value: Date) => {
    if (value !== null) {
      setValue("endDate", value.toLocaleString());
      setEndDate(value);
    }
  };

  const notification = stateNotification?.data?.data?.data || {};

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.ADMIN_DASHBOARD}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={ROUTES.ADMIN_NOTIFICATION}>{t("Notification")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Edit")}
          </li>
        </ol>
      </nav>
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

      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>{t("Update Notification")}</Card.Title>
          <Form className="col-xl-8" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Title")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={notification?.title}
                  {...register("title")}
                />
                <Form.Text className="text-danger">
                  {errors.title?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Detail")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={notification?.detail}
                  {...register("detail")}
                />
                <Form.Text className="text-danger">
                  {errors.detail?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Start Date")}
              </Form.Label>
              <Col sm={6}>
                <DateTimePicker
                  onChange={onChangeStartDate}
                  value={startDate}
                />
                <Form.Text className="text-danger">
                  {errors.startDate?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("End Date")}
              </Form.Label>
              <Col sm={6}>
                <DateTimePicker onChange={onChangeEndDate} value={endDate} />
                <Form.Text className="text-danger">
                  {errors.endDate?.message}
                </Form.Text>
              </Col>
            </Row>
            <Button
              variant="dark"
              type="button"
              className="me-3 px-5"
              onClick={goBack}
            >
              {t("Back")}
            </Button>

            {state.isLoading ? (
              <Button variant="primary" className="me-3 px-5" disabled>
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
              <Button variant="primary" type="submit" className="me-3 px-5">
                {t("Save")}
              </Button>
            )}
          </Form>

          {/* Result Modal */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <ResponseModal
              type="success"
              title={t("Update Notification")}
              message={t("Notification has been updated.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateNotification;
