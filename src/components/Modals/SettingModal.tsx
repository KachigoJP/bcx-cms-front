import React from "react";
import { Form, Row, Col, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FieldErrors, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Source
import { ISettingForm, SettingFormProps } from "helpers/interfaces";
import { useApi, FieldError } from "helpers/api";
import { API } from "helpers/constants";
import { getSettingSchema } from "helpers/schemas";

const SettingForm: React.FC<SettingFormProps> = (props) => {
  const { t, i18n } = useTranslation();

  const { data, show, onClose } = props;

  const {
    state: stateSetting,
    sendRequest: sendUpdateRequest,
    reset: resetReqest,
  } = useApi();

  // Form Validations
  const validationSchema = getSettingSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<ISettingForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<ISettingForm>
    ),
  });

  // Hooks
  React.useEffect(() => {
    reset({
      id: data?.id,
      key: data?.key || "",
      type: data?.type || "",
      label: data?.label || "",
      value: data?.value || "",
      description: data?.description || "",
    });
  }, [data]);

  React.useEffect(() => {
    const response = stateSetting.data;

    if (response && response.status === 200) {
      if (onClose) {
        reset({
          id: data?.id,
          key: data?.key || "",
          type: data?.type || "",
          label: data?.label || "",
          value: data?.value || "",
          description: data?.description || "",
        });
        clearErrors();
        resetReqest();

        onClose(true);
      }
    }
  }, [stateSetting]);

  // Method
  const onSubmit = (data: ISettingForm) => {
    console.log("DATA", data);
    if (data?.id) {
      sendUpdateRequest({
        method: "put",
        url: `${API.SETTINGS}/${data?.id}`,
        data,
      });
    } else {
      sendUpdateRequest({
        method: "post",
        url: `${API.SETTINGS}`,
        data,
      });
    }
  };

  const onSubmitFail = (errors: FieldErrors<ISettingForm>) => {
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
          {t("Update Setting")}
        </Modal.Title>
        <Modal.Body className="text-center">
          <Row>
            {stateSetting.isError && stateSetting.errors ? (
              <Alert variant="danger" className="text-start">
                {stateSetting.errors.map((field: FieldError, key: number) => {
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
              {t("Type")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Select defaultValue={data?.type} {...register("type")}>
                <option>{t("Please select")}</option>
                <option value="text">{t("Text")}</option>
                <option value="textarea">{t("Text Area")}</option>
                <option value="photo">{t("Photo")}</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.type?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Key")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                type="text"
                defaultValue={data?.key}
                {...register("key")}
              />
              <Form.Text className="text-danger">
                {errors.key?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Label")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                type="text"
                defaultValue={data?.label}
                {...register("label")}
              />
              <Form.Text className="text-danger">
                {errors.label?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Value")}
            </Form.Label>
            <Col sm={8} className="text-start">
              {(() => {
                if (data && data?.type === "textarea") {
                  return (
                    <Form.Control
                      as="textarea"
                      rows={5}
                      defaultValue={data?.value}
                      {...register("value")}
                    />
                  );
                } else {
                  return (
                    <Form.Control
                      type="text"
                      defaultValue={data?.value}
                      {...register("value")}
                    />
                  );
                }
              })()}
              <Form.Text className="text-danger">
                {errors.value?.message}
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
            {stateSetting.isLoading ? (
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
              t("Update")
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SettingForm;
