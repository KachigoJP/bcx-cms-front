// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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

const CreateNotification: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showResultModal, setShowResultModal] = React.useState(false);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // set form start date and end date on first load
  React.useEffect(() => {
    setValue("startDate", startDate.toLocaleString());
    setValue("endDate", endDate.toLocaleString());
  }, []);

  // Form Validations
  const validationSchema = getNotificationSchema(t);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NotificationForm>(formOptions);

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

  // APIs
  const { state, sendRequest } = useApi(`${API.ADMIN_CREATE_NOTIFICATION}`);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      setShowResultModal(true);
    }
  }, [state]);

  // Methods
  const onSubmit = (data: NotificationForm) => {
    data.startDate = getValues("startDate");
    data.endDate = getValues("endDate");
    sendRequest({
      method: "post",
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
            {t("Create")}
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
          <Card.Title>{t("Create Notification")}</Card.Title>
          <Form className="col-xl-8" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Title")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" {...register("title")} />
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
                <Form.Control as="textarea" rows={3} {...register("detail")} />
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
                  value={startDate}
                  onChange={onChangeStartDate}
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
                <DateTimePicker value={endDate} onChange={onChangeEndDate} />
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
              title={t("Create Notification")}
              message={t("Notification has been created.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateNotification;
