import React from "react";
import { Form, Row, Col, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FieldErrors, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Source
import {
  ILanguageForm,
  LanguageType,
  ModifyModalProps,
} from "helpers/interfaces";
import { useApi, FieldError } from "helpers/api";
import { API } from "helpers/constants";
import { getLanguageSchema } from "helpers/schemas";
import Languages from "assets/json/languages.json";

const LanguageModal: React.FC<ModifyModalProps> = (props) => {
  const { t, i18n } = useTranslation();

  const { show, onClose } = props;
  const data = props.data as LanguageType;

  const {
    state: stateData,
    sendRequest: sendUpdateRequest,
    reset: resetReqest,
  } = useApi();

  // Form Validations
  const validationSchema = getLanguageSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm<ILanguageForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<ILanguageForm>
    ),
  });

  // Hooks
  React.useEffect(() => {
    reset({
      id: data?.id,
      name: data?.name || "",
      code: data?.code || "",
      is_default: data?.is_default || false,
      direction: data?.direction || "",
    });
  }, [data]);

  React.useEffect(() => {
    const response = stateData.data;

    if (response && response.status === 200) {
      if (onClose) {
        reset({
          id: data?.id,
          name: data?.name || "",
          code: data?.code || "",
          is_default: data?.is_default || false,
          direction: data?.direction || "",
        });
        clearErrors();
        resetReqest();

        onClose(true);
      }
    }
  }, [stateData]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "name" && value.name) {
        Languages.map((item, idx) => {
          if (item.name === value.name) {
            setValue("code", item.code);
          }
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Method
  const onSubmit = (data: ILanguageForm) => {
    if (data?.id) {
      sendUpdateRequest({
        method: "put",
        url: `${API.LANGUAGES}/${data?.id}`,
        data,
      });
    } else {
      sendUpdateRequest({
        method: "post",
        url: `${API.LANGUAGES}`,
        data,
      });
    }
  };

  const onSubmitFail = (errors: FieldErrors<ILanguageForm>) => {
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
          {t("Langauge")}
        </Modal.Title>
        <Modal.Body className="text-center">
          <Row>
            {stateData.isError && stateData.errors ? (
              <Alert variant="danger" className="text-start">
                {stateData.errors.map((field: FieldError, key: number) => {
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
              <Form.Select defaultValue={data?.name} {...register("name")}>
                <option>{t("Please select")}</option>
                {Languages.map((item, idx) => {
                  return (
                    <option key={idx} value={item.name}>
                      {t(item.name)}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Code")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Control
                type="text"
                defaultValue={data?.code}
                {...register("code")}
              />
              <Form.Text className="text-danger">
                {errors.code?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Is Default")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Select
                defaultValue={data?.is_default.toString() || "false"}
                {...register("is_default")}
              >
                <option value="false">{t("False")}</option>
                <option value="true">{t("True")}</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t("Direction")}
            </Form.Label>
            <Col sm={8} className="text-start">
              <Form.Select
                defaultValue={data?.direction.toString() || "ltr"}
                {...register("direction")}
              >
                <option value="ltr">{t("LTR")}</option>
                <option value="rtl">{t("RTL")}</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.direction?.message}
              </Form.Text>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={onCloseModal}>{t("Close")}</Button>
          <Button type="submit">
            {stateData.isLoading ? (
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

export default LanguageModal;
