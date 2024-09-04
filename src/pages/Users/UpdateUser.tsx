// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

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

// Apps Imports
import ResponseModal from "components/Modals/ResponseModal";
import { useApi, FieldError } from "helpers/api";
import { API } from "helpers/constants";
import { getUserSchema } from "helpers/schemas";
import { IUserForm } from "helpers/interfaces";
import UserForm from "components/Forms/UserForm";

const UpdateUser: React.FC = () => {
  // Hooks
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getUserSchema(t);

  const hookForm = useForm<IUserForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<IUserForm>
    ),
  });

  // APIs
  const { state: stateUpdate, sendRequest: sendUpdateUser } = useApi(
    `${API.USERS}/${id}`
  );
  const { state: stateGet, sendRequest: sendGetUser } = useApi(
    `${API.USERS}/${id}`
  );

  // Effects
  React.useEffect(() => {
    sendGetUser({
      method: "get",
    });
    return () => {};
  }, []);

  // Effects
  React.useEffect(() => {
    const response = stateGet.data;

    if (response && response.status === 200) {
      const user = response.data;

      hookForm.reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        postcode: user.postcode,
        country: user.country,
      });
    }
  }, [stateGet]);

  React.useEffect(() => {
    const response = stateUpdate.data;

    if (response && response.status === 200) {
      setShowResultModal(true);
    }

    return () => {};
  }, [stateUpdate]);

  const onSubmit = (data: IUserForm) => {
    const submitData = {
      ...data,
      is2FAEnabled: data.is2FAEnabled === "true",
      isVerified: data.isVerified === "true",
      isAccountInit: data.isAccountInit === "true",
    };

    if (data.password === "") {
      delete submitData?.password;
    }

    sendUpdateUser({
      method: "put",
      data: submitData,
    });
  };

  const onSubmitFail = (errors: FieldErrors<IUserForm>) => {
    console.log("errs", errors);
  };

  const goBack = () => {
    navigate(-1);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
  };

  const user = stateGet?.data?.data || {};

  return (
    <div className="main-content">
      {stateUpdate.isError && stateUpdate.errors ? (
        <Alert variant="danger">
          {stateUpdate.errors.map((field: FieldError, key: number) => {
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
          <Card.Title>{t("User Detail")}</Card.Title>
          <Form
            className="col-xl-8"
            onSubmit={hookForm.handleSubmit(onSubmit, onSubmitFail)}
          >
            <UserForm hookForm={hookForm} user={user} />

            <Button
              variant="dark"
              type="button"
              className="me-3 px-5"
              onClick={goBack}
            >
              {t("Back")}
            </Button>

            {stateUpdate.isLoading ? (
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
              title={t("Update Profile")}
              message={t("User profile has been updated.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateUser;
