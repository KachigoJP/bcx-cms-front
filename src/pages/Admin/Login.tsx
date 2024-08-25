import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { FieldError, useApi } from "../../helpers/api";
import { API, ROUTES } from "../../helpers/constants";
import { getLoginSchema } from "../../helpers/schemas";

type AdminLoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logged } = React.useContext(AuthContext);

  // Form Validations
  const validationSchema = getLoginSchema(t);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>(formOptions);

  const { state, sendRequest } = useApi(API.ADMIN_LOGIN);

  const onSubmit = (data: AdminLoginForm) => {
    (
      sendRequest({
        method: "POST",
        data,
      }) as Promise<any>
    )
      .then(({ data, error }) => {
        if (!error) {
          logged({
            token: data.token,
            user: data.user,
          });

          navigate(ROUTES.ADMIN_SETTING, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="h-100 align-items-center justify-content-md-center">
        <Col lg="8" xl="6">
          <Card>
            <Card.Body>
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

              <Card.Title>{t("Login")}</Card.Title>
              <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Email")}</Form.Label>
                  <Form.Control
                    {...register("email", {
                      setValueAs: (value: string) => value.trim(),
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Password")}</Form.Label>
                  <Form.Control type="password" {...register("password")} />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <Button className="mt-3" type="submit">
                  {t("Login")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
