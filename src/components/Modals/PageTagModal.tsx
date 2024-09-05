import React from "react";
import { Form, Row, Col, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FieldErrors, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Source
import { IPageTagForm, PageTagModalProps } from "helpers/interfaces";
import { useApi, FieldError } from "helpers/api";
import { API } from "helpers/constants";
import { getPageTagSchema } from "helpers/schemas";
import * as Helpers from "helpers/functions";

const PageTagModal: React.FC<PageTagModalProps> = (props) => {
  const { t, i18n } = useTranslation();

  const { data, show, onClose } = props;

  const { state: stateTag, sendRequest, reset: resetReqest } = useApi();

  // Form Validations
  const validationSchema = getPageTagSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm<IPageTagForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<IPageTagForm>
    ),
  });

  // Hooks
  React.useEffect(() => {
    reset({
      id: data?.id,
      name: data?.name || "",
      slug: data?.slug || "",
    });
  }, [data]);

  React.useEffect(() => {
    const response = stateTag.data;

    if (response && response.status === 200) {
      if (onClose) {
        reset({
          id: data?.id,
          name: data?.name || "",
          slug: data?.slug || "",
        });
        clearErrors();
        resetReqest();

        onClose(true);
      }
    }
  }, [stateTag]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "name" && value.name) {
        setValue("slug", Helpers.generateSlug(value.name));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Method
  const onSubmit = (data: IPageTagForm) => {
    if (data?.id) {
      sendRequest({
        method: "put",
        url: `${API.PAGE_TAGS}/${data?.id}`,
        data,
      });
    } else {
      sendRequest({
        method: "post",
        url: `${API.PAGE_TAGS}`,
        data,
      });
    }
  };

  const onSubmitFail = (errors: FieldErrors<IPageTagForm>) => {
    console.log("errs", errors);
  };

  const onCloseModal = () => {
    if (onClose) {
      onClose();
      clearErrors();
      resetReqest();
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit(onSubmit, onSubmitFail)}>
        <Modal.Title style={{ margin: "20px 10px", fontWeight: "600" }}>
          {t("Page Tag")}
        </Modal.Title>
        <Modal.Body className="text-center">
          <Row>
            {stateTag.isError && stateTag.errors ? (
              <Alert variant="danger" className="text-start">
                {stateTag.errors.map((field: FieldError, key: number) => {
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
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Name")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                type="text"
                defaultValue={data?.name}
                {...register("name")}
              />
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Slug")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                type="text"
                defaultValue={data?.slug}
                {...register("slug")}
              />
              <Form.Text className="text-danger">
                {errors.slug?.message}
              </Form.Text>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={onCloseModal}>{t("Close")}</Button>
          <Button type="submit">
            {stateTag.isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-1">{t("Loading...")}</span>
              </>
            ) : (
              t("Confirm")
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PageTagModal;
