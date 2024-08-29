import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Import
import { Button, Modal, Form, Spinner } from "react-bootstrap";

// App imports
import { getOtpSchema } from "../../helpers/schemas";
import { FieldError } from "../../helpers/api";
import { ObjectSchema } from "yup";
import { IOtpForm } from "../../helpers/interfaces";

type ModalProps = {
  onSubmit: (data: IOtpForm) => void;
  isLoading?: boolean;
  errors?: FieldError[];
  onOtpChange?: () => void;
};

const Component: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation();

  const validationSchema = getOtpSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOtpForm>({
    resolver: yupResolver<IOtpForm>(
      validationSchema as unknown as ObjectSchema<IOtpForm>
    ),
  });

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t("OTP Code")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(props.onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {t("Please enter OTP code from Google Authenticator App")}
            </Form.Label>
            <Form.Control
              type="number"
              className="hide-arrow"
              placeholder={t("Enter OTP  Code")}
              {...register("otpToken", {
                onChange: props.onOtpChange,
              })}
            />

            <Form.Text className="text-danger">
              {errors.otpToken?.message}
            </Form.Text>
            {props.errors?.map((field: FieldError, key: number) => {
              return (
                <React.Fragment key={key}>
                  {field.errors
                    ? Object.values(field.errors).map(
                        (value: string, idx: number) => {
                          return (
                            <p className="text-danger" key={idx}>
                              {value}
                            </p>
                          );
                        }
                      )
                    : null}
                </React.Fragment>
              );
            })}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {props.isLoading ? (
            <Button variant="primary" disabled>
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
            <Button type="submit" variant="primary">
              {t("Submit")}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </React.Fragment>
  );
};

export default Component;
