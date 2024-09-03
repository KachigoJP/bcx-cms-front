// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

// Resource
import ResponseModal from "components/Modals/ResponseModal";
import { useApi, FieldError } from "helpers/api";
import { ROUTES, API, FIELD_LIMIT, REGEX } from "helpers/constants";
import { getUserSchema } from "helpers/schemas";
import { IUserForm } from "helpers/interfaces";
import UserForm from "components/Forms/UserForm";
import { getErrorText } from "helpers/functions";

const CreateUser: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getUserSchema(t).shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
    password: (
      getErrorText(t, "password", {
        required: true,
      }) as Yup.StringSchema
    )
      .matches(REGEX.PASSWORD, {
        message: t(
          "Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=`|(){}[]:;\"'<>,?/"
        ),
        excludeEmptyString: true,
      })
      .default(null),
  });

  const hookForm = useForm<IUserForm>({
    resolver: yupResolver<IUserForm>(
      validationSchema as unknown as Yup.ObjectSchema<IUserForm>
    ),
  });

  // APIs
  const { state, sendRequest } = useApi(API.USERS);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
    }
  }, [state]);

  // Methods
  const onSubmit = (data: IUserForm) => {
    const submitData = {
      ...data,
      is2FAEnabled: data.is2FAEnabled === "true",
      isVerified: data.isVerified === "true",
      isAccountInit: data.isAccountInit === "true",
    };

    sendRequest({
      method: "post",
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
    navigate(ROUTES.USER_LIST);
  };

  return (
    <div className="main-content">
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
          <Card.Title>{t("Create new user")}</Card.Title>
          <Form
            className="col-xl-8"
            onSubmit={hookForm.handleSubmit(onSubmit, onSubmitFail)}
          >
            <UserForm hookForm={hookForm} />

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
                {t("Confirm")}
              </Button>
            )}
          </Form>

          {/* Result Modal */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <ResponseModal
              type="success"
              title={t("Create new user")}
              message={t("User has been created.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUser;
