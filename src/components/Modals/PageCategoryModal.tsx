import React from "react";
import { Form, Row, Col, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FieldErrors, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Source
import {
  IPageCategoryForm,
  ModifyModalProps,
  PageCategoryType,
} from "helpers/interfaces";
import { useApi, FieldError } from "helpers/api";
import { API } from "helpers/constants";
import { getPageCategorySchema } from "helpers/schemas";
import * as Helpers from "helpers/functions";

const PageCategoryModal: React.FC<ModifyModalProps> = (props) => {
  const { t, i18n } = useTranslation();

  const { show, onClose } = props;
  const data = props.data as PageCategoryType;

  const {
    state: stateCategory,
    sendRequest: sendUpdateRequest,
    reset: resetReqest,
  } = useApi();

  // Form Validations
  const validationSchema = getPageCategorySchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm<IPageCategoryForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<IPageCategoryForm>
    ),
  });

  // Hooks
  React.useEffect(() => {
    reset({
      id: data?.id,
      name: data?.name || "",
      slug: data?.slug || "",
      description: data?.description || "",
    });
  }, [data]);

  React.useEffect(() => {
    const response = stateCategory.data;

    if (response && response.status === 200) {
      if (onClose) {
        reset({
          id: data?.id,
          name: data?.name || "",
          slug: data?.slug || "",
          description: data?.description || "",
        });
        clearErrors();
        resetReqest();

        onClose(true);
      }
    }
  }, [stateCategory]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "name" && value.name) {
        setValue("slug", Helpers.generateSlug(value.name));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Method
  const onSubmit = (data: IPageCategoryForm) => {
    if (data?.id) {
      sendUpdateRequest({
        method: "put",
        url: `${API.PAGE_CATEGORIES}/${data?.id}`,
        data,
      });
    } else {
      sendUpdateRequest({
        method: "post",
        url: `${API.PAGE_CATEGORIES}`,
        data,
      });
    }
  };

  const onSubmitFail = (errors: FieldErrors<IPageCategoryForm>) => {
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
          {t("Page Category")}
        </Modal.Title>
        <Modal.Body className="text-center">
          <Row>
            {stateCategory.isError && stateCategory.errors ? (
              <Alert variant="danger" className="text-start">
                {stateCategory.errors.map((field: FieldError, key: number) => {
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
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Description")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={data?.description}
                {...register("description")}
              />
              <Form.Text className="text-danger">
                {errors.description?.message}
              </Form.Text>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={onCloseModal}>{t("Close")}</Button>
          <Button type="submit">
            {stateCategory.isLoading ? (
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

export default PageCategoryModal;
