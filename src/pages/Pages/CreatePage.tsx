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
import { useApi, FieldError } from "helpers/api";
import { ROUTES, API, FIELD_LIMIT, REGEX } from "helpers/constants";
import { getPageSchema } from "helpers/schemas";
import { IPageForm } from "helpers/interfaces";
import { getErrorText } from "helpers/functions";
import ResponseModal from "components/Modals/ResponseModal";
import PageForm from "components/Forms/PageForm";

const CreatePage: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getPageSchema(t);

  const hookForm = useForm<IPageForm>({
    resolver: yupResolver<IPageForm>(
      validationSchema as unknown as Yup.ObjectSchema<IPageForm>
    ),
  });

  // APIs
  const { state, sendRequest } = useApi(API.PAGES);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
    }
  }, [state]);

  // Methods
  const onSubmit = (data: IPageForm) => {
    const submitData = data;

    sendRequest({
      method: "post",
      data: submitData,
    });
  };

  const onSubmitFail = (errors: FieldErrors<IPageForm>) => {
    console.log("errs", errors);
  };

  const goBack = () => {
    navigate(-1);
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(ROUTES.PAGES);
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
          <Card.Title>{t("Create new Page")}</Card.Title>
          <Form
            className="col"
            onSubmit={hookForm.handleSubmit(onSubmit, onSubmitFail)}
          >
            <PageForm hookForm={hookForm} />

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
              title={t("Create new Page")}
              message={t("Page has been created.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreatePage;
