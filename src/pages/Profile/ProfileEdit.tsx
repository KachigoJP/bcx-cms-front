// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Imports
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import OtpModal from "../../components/Modals/OtpModal";
import ResponseModal from "../../components/Modals/ResponseModal";

// Apps Imports
import { AuthContext } from "../../contexts/auth";
import { useApi, FieldError } from "../../helpers/api";
import { ROUTES, API } from "../../helpers/constants";
import Countries from "../../assets/json/countries.json";
import PhoneCodes from "../../assets/json/phone_codes.json";
import { getProfileFormSchema } from "../../helpers/schemas";
import { IOtpForm, IProfileForm } from "../../helpers/interfaces";

const Profile: React.FC = () => {
  // Hooks
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, fetchUser } = React.useContext(AuthContext);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const [submitData, setSubmitData] = React.useState<IProfileForm | null>(null);

  // Form Validations
  const validationSchema = getProfileFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<IProfileForm>(validationSchema),
  });

  // APIs
  const { state, sendRequest, reset } = useApi(API.UPDATE_INFORMATION);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
      fetchUser();
    }
    return () => {};
  }, [state]);

  // Methods
  const onSubmitOtp = (otpData: IOtpForm) => {
    setShowOtpModal(false);
    if (submitData) processExecute(submitData, otpData.otpToken);
  };
  const onOtpChange = () => {
    reset();
  };
  const onSubmit: SubmitHandler<IProfileForm> = (data: IProfileForm) => {
    if (!user?.is2FAEnabled) {
      processExecute(data);
    } else {
      setSubmitData(data);
      setShowOtpModal(true);
    }
  };

  const processExecute = (sendData: IOtpForm, otp?: number) => {
    if (otp && sendData) {
      sendData.otpToken = otp;
    }
    sendRequest({
      method: "patch",
      data: sendData,
    });
  };

  const goBack = () => {
    navigate(-1);
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    goBack();
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  return (
    <div className="main-content">
      {/* Breadcrumb */}
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

      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>{t("Update Your Profile")}</Card.Title>
          <Form className="col-xl-8" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Sex")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Select
                  defaultValue={user?.gender}
                  {...register("gender")}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.gender?.message}
                </Form.Text>
              </Col>
            </Row>
            {/* <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Country")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Select
                  defaultValue={user?.country}
                  {...register("country")}
                >
                  {Countries.map((country) => {
                    return (
                      <option key={country.id} value={country.alpha2}>
                        {i18n.language === "jp" ? country.ja : country.en}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row> */}
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Region/State/Province")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.region}
                  {...register("region")}
                />
                <Form.Text className="text-danger">
                  {errors.region?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("City")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.city}
                  {...register("city")}
                />
                <Form.Text className="text-danger">
                  {errors.city?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("District/Suburb")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.district}
                  {...register("district")}
                />
                <Form.Text className="text-danger">
                  {errors.district?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.street}
                  {...register("street")}
                />
                <Form.Text className="text-danger">
                  {errors.street?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street No.")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.streetNo}
                  {...register("streetNo")}
                />
                <Form.Text className="text-danger">
                  {errors.streetNo?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Apartment No.")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue={user?.apartment}
                  {...register("apartment")}
                />
                <Form.Text className="text-danger">
                  {errors.apartment?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Post Code")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  className="hide-arrow"
                  type="number"
                  defaultValue={user?.postcode}
                  {...register("postcode")}
                />
                <Form.Text className="text-danger">
                  {errors.postcode?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Phone Number")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={6}>
                <Row>
                  <Col sm={4}>
                    <Form.Select
                      defaultValue={user?.phoneCode}
                      {...register("phoneCode")}
                    >
                      {PhoneCodes.map((item: any) => {
                        return (
                          <option key={item.code} value={item.dial_code}>
                            {`(+${item.dial_code}) ${item.name}`}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Text className="text-danger">
                      {errors.phoneCode?.message}
                    </Form.Text>
                  </Col>
                  <Col>
                    <Form.Control
                      className="hide-arrow"
                      type="number"
                      defaultValue={user?.phoneNumber}
                      {...register("phoneNumber")}
                    />
                    <Form.Text className="text-danger">
                      {errors.phoneNumber?.message}
                    </Form.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Language")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select
                  defaultValue={user?.language}
                  {...register("language")}
                >
                  <option value="en">{t("English")}</option>
                  <option value="jp">{t("Japanese")}</option>
                </Form.Select>
              </Col>
            </Row>

            <Button
              variant="dark"
              type="button"
              className="me-3 px-5"
              onClick={goBack}
            >
              {t("Back")}
            </Button>

            {state.isLoading ? (
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
            )}
          </Form>

          {/* OTP Token Modal */}
          <Modal show={showOtpModal} onHide={closeOtpModal}>
            <OtpModal onSubmit={onSubmitOtp} onOtpChange={onOtpChange} />
          </Modal>

          {/* Result Modal */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <ResponseModal
              type="success"
              title={t("Update Profile")}
              message={t("Your profile has been updated.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
