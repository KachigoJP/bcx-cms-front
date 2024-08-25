import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import { Form, Button, Alert } from "react-bootstrap";

// Apps Imports
import { useApi, FieldError } from "../../helpers/api";
import { RegisterState } from "../../helpers/types";
import { getRegisterEmailSchema } from "../../helpers/schemas";
import { APPLICANT_TYPE, API } from "../../helpers/constants";

type FormType = {
  email: string;
  applicantType: string;
  affiliateCode: string;
};

type Props = {
  state: RegisterState;
  onSubmit?: Function;
};

const RegisterEmailStep: React.FC<Props> = (props) => {
  // Hooks
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [showError, setShowError] = React.useState(false);

  // Forms
  const validationSchema = getRegisterEmailSchema(t);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    watch,
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>(formOptions);

  // APIs
  const { state, sendRequest, reset } = useApi(API.CHECK_EMAIL);

  // Hooks
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 201) {
      const isEmailValid = response.data.data;
      if (isEmailValid && props.onSubmit) {
        const data = {
          email: getValues("email"),
          applicantType: getValues("applicantType"),
          affiliateCode: parseInt(getValues("affiliateCode")),
        };
        props.onSubmit(data);
      } else {
        setShowError(true);
      }
    }
  }, [state]);

  React.useEffect(() => {
    const subscription = watch((value: any, { name, type }) => {
      if (name === "affiliateCode" && value.affiliateCode.length === 8) {
        setSearchParams({
          invitation: value.affiliateCode,
        });
      }
      if (state.data && state.errors) {
        reset();
      }
      setShowError(false);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Methods
  const onSubmit = (data: FormType) => {
    sendRequest({
      method: "post",
      data: {
        email: data.email,
      },
    });
  };

  return (
    <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
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

      {showError ? (
        <Alert variant="danger">
          {t("The email address already exits! Please try with another one.		")}
        </Alert>
      ) : null}
      <Form.Group className="mb-3">
        <Form.Label>{t("Applicant Type")}</Form.Label>
        <Form.Select {...register("applicantType", { required: true })}>
          <option value={APPLICANT_TYPE.INDIVIDUAL}>
            {t(APPLICANT_TYPE.INDIVIDUAL)}
          </option>
          <option value={APPLICANT_TYPE.CORPORATE}>
            {t(APPLICANT_TYPE.CORPORATE)}
          </option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          {t("Email")}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control defaultValue={props.state.email} {...register("email")} />
        <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("Invitation Code")}</Form.Label>
        <Controller
          name="affiliateCode"
          defaultValue={searchParams.get("invitation") || undefined}
          control={control}
          rules={{ required: true, pattern: /^\d+$/ }}
          render={(props) => {
            const { onChange, value, ref } = props.field; // v7. use props if you're using v6
            return (
              <Form.Control
                ref={ref}
                className="hide-arrow"
                type="number"
                onChange={onChange}
                value={value}
              />
            );
          }}
        />
        <Form.Text className="text-danger">
          {errors.affiliateCode?.message}
        </Form.Text>
      </Form.Group>
      <Button className="mt-3" type="submit">
        {t("Register")}
      </Button>
    </Form>
  );
};

export default RegisterEmailStep;
