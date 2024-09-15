// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

// UI Imports
import { Form, Button, Card, Alert, Spinner, Modal } from "react-bootstrap";

// Apps Imports
import ResponseModal from "components/Modals/ResponseModal";
import { useApi, FieldError } from "helpers/api";
import { API, ROUTES } from "helpers/constants";
import { getPageSchema } from "helpers/schemas";
import { IPageForm } from "helpers/interfaces";
import PageForm from "components/Forms/PageForm";
import MetadatasTable from "./MetadatasTable";

const UpdatePage: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getPageSchema(t);

  const hookForm = useForm<IPageForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<IPageForm>
    ),
  });

  // APIs
  const { state: stateUpdate, sendRequest: sendUpdate } = useApi(
    `${API.PAGES}/${id}`
  );
  const { state: stateGet, sendRequest: sendGet } = useApi(
    `${API.PAGES}/${id}`
  );

  // Effects
  React.useEffect(() => {
    sendGet({
      method: "get",
    });
    return () => {};
  }, []);

  // Effects
  React.useEffect(() => {
    const response = stateGet.data;

    if (response && response.status === 200) {
      const data = response.data;

      hookForm.reset({
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
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

  const onSubmit = (data: IPageForm) => {
    const submitData = {
      ...data,
    };

    sendUpdate({
      method: "put",
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

  const onReloadMetadata = () => {
    sendGet({
      method: "get",
    });
  };

  const data = stateGet?.data?.data?.data || {};

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
          <Card.Title>{t("Page Detail")}</Card.Title>
          <Form
            className="col"
            onSubmit={hookForm.handleSubmit(onSubmit, onSubmitFail)}
          >
            <PageForm hookForm={hookForm} data={data} />

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
        </Card.Body>
      </Card>

      <MetadatasTable
        pageId={data?.id}
        data={data?.metadata || []}
        onReload={onReloadMetadata}
      />

      {/* Result Modal */}
      <Modal show={showResultModal} onHide={closeResultModal} centered>
        <ResponseModal
          type="success"
          title={t("Page Update")}
          message={t("Page has been updated.")}
          onClose={closeResultModal}
        />
      </Modal>
    </div>
  );
};

export default UpdatePage;
