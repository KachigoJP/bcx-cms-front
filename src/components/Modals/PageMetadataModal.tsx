import React from "react";
import { Form, Row, Col, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FieldErrors, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Source
import {
  ISettingForm,
  MetadataModalProps,
  PageMetadataType,
} from "helpers/interfaces";
import { useApi, FieldError } from "helpers/api";
import { API, FIELDTYPE_OPTIONS } from "helpers/constants";
import { getSettingSchema } from "helpers/schemas";
import { TextEditor } from "components/Components/TextEditor";

const PageMetadataModal: React.FC<MetadataModalProps> = (props) => {
  const modalData = props.data as PageMetadataType;

  const { show, onClose, rootId } = props;

  const { t, i18n } = useTranslation();
  const editorRef = React.useRef(null);
  const [type, setType] = React.useState(modalData?.type || "");

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
    setValue,
    watch,
  } = useForm<ISettingForm>({
    resolver: yupResolver(
      validationSchema as unknown as ObjectSchema<ISettingForm>
    ),
  });

  // Hooks
  React.useEffect(() => {
    reset({
      id: modalData?.id,
      key: modalData?.key || "",
      type: modalData?.type || "",
      label: modalData?.label || "",
      value: modalData?.value || "",
      description: modalData?.description || "",
    });
  }, [modalData]);

  React.useEffect(() => {
    const response = stateSetting.data;

    if (response && response.status === 200) {
      if (onClose) {
        reset({
          id: modalData?.id,
          key: modalData?.key || "",
          type: modalData?.type || "",
          label: modalData?.label || "",
          value: modalData?.value || "",
          description: modalData?.description || "",
        });
        clearErrors();
        resetReqest();

        onClose(true);
      }
    }
  }, [stateSetting]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "type" && value.type) {
        setType(value.type);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Method
  const onEditorChange = (newValue: string) => {
    setValue("value", newValue);
  };

  const onSubmit = (data: ISettingForm) => {
    if (modalData?.id) {
      sendUpdateRequest({
        method: "put",
        url: `${API.PAGES_METADATA.replace(":page", rootId)}/${modalData.id}`,
        data,
      });
    } else {
      sendUpdateRequest({
        method: "post",
        url: API.PAGES_METADATA.replace(":page", rootId),
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
              <Form.Select defaultValue={modalData?.type} {...register("type")}>
                <option>{t("Please select")}</option>
                {FIELDTYPE_OPTIONS.map((item, idx) => {
                  return (
                    <option key={idx} value={item.value}>
                      {t(item.label)}
                    </option>
                  );
                })}
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
                defaultValue={modalData?.key}
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
                defaultValue={modalData?.label}
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
                if (type && type === "richtext") {
                  return (
                    <TextEditor
                      onInit={(_evt: any, editor: any) =>
                        (editorRef.current = editor)
                      }
                      onEditorChange={onEditorChange}
                      initialValue={modalData?.value}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "anchor",
                          "autolink",
                          "help",
                          "image",
                          "link",
                          "lists",
                          "searchreplace",
                          "table",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "image | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  );
                } else {
                  return (
                    <Form.Control
                      type="text"
                      defaultValue={modalData?.value}
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
                defaultValue={modalData?.description}
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

export default PageMetadataModal;
