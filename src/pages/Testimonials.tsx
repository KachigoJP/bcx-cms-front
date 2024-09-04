// React Imports
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import { Form, Card, Modal } from "react-bootstrap";
import { getSettingSchema } from "helpers/schemas";
import ResponseModal from "components/Modals/ResponseModal";

const Setting = () => {
  const { t } = useTranslation();
  const [showResultModal, setShowResultModal] = React.useState(false);

  const validationSchema = getSettingSchema(t);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {}, []);

  const onSubmit = (config: any) => {};

  return (
    <div className="main-content h-100">
      {/* {state.isError && state.errors ? (
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
      ) : null} */}

      <Card style={{ minHeight: "100%" }}>
        <Card.Body>
          <Card.Title>{t("Testimonials")}</Card.Title>
          <Form className="col-xl-8" onSubmit={handleSubmit(onSubmit)}>
            {/* <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t('Affiliate Rate')}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  step="any"
                  {...register('affiliatePercentage', { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.affiliatePercentage?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("USD")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("usd", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.usd?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("EUR")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("eur", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.eur?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("JPY")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("jpy", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.jpy?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("MXN")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("mxn", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.mxn?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("USDT")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("usdt", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.usdt?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("BNB")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  step="any"
                  type="number"
                  {...register("bnb", { valueAsNumber: true })}
                />
                <Form.Text className="text-danger">
                  {errors.bnb?.message}
                </Form.Text>
              </Col>
            </Row> */}

            {/* {state.isLoading || stateConfig.isLoading ? (
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
            )} */}
          </Form>

          <Modal
            show={showResultModal}
            onHide={() => setShowResultModal((i) => !i)}
            centered
          >
            <ResponseModal
              type="success"
              title={t("Update Settings")}
              message={t("Your settings has been updated.")}
              onClose={() => setShowResultModal((i) => !i)}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Setting;
