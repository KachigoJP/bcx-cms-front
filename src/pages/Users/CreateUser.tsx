// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";

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
import ResponseModal from "../../components/Modals/ResponseModal";

// Apps Imports
import PhoneCodes from "../../assets/json/phone_codes.json";
import { useApi, FieldError } from "../../helpers/api";
import { ROUTES, API } from "../../helpers/constants";
import { getErrorText } from "../../helpers/functions";
import { REGEX, FIELD_LIMIT } from "../../helpers/constants";
import { getAdminUserSchema } from "../../helpers/schemas";
import Countries from "../../assets/json/countries.json";
import BirthdatePicker from "../../components/Components/BirthdatePicker";
import { IUserForm } from "../../helpers/interfaces";

const CreateUser: React.FC = () => {
  // Hooks
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [showResultModal, setShowResultModal] = React.useState(false);

  // Form Validations
  const validationSchema = getAdminUserSchema(t).shape({
    password: (
      getErrorText(t, "password", {
        required: true,
        maxLength: FIELD_LIMIT.MAX_PASSWORD,
        minLength: FIELD_LIMIT.MIN_PASSWORD,
        regexPassword: REGEX.PASSWORD,
      }) as Yup.StringSchema
    ).matches(REGEX.PASSWORD, {
      message: t(
        "Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=`|(){}[]:;\"'<>,?/"
      ),
      excludeEmptyString: true,
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUserForm>({
    resolver: yupResolver<IUserForm>(
      validationSchema as unknown as Yup.ObjectSchema<IUserForm>
    ),
  });

  // APIs
  const { state, sendRequest } = useApi(`${API.ADMIN_CREATE_USER}`);

  // Effects
  React.useEffect(() => {
    const response = state.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
    }
  }, [state]);

  // Methods
  const onSubmit = (data: IUserForm) => {
    const submitData = {
      ...data,
      isKyc: parseInt(data.isKyc),
      is2FAEnabled: data.is2FAEnabled === "true",
      isVerified: data.isVerified === "true",
      isInformationUpdated: data.isInformationUpdated === "true",
    };
    sendRequest({
      method: "post",
      data: submitData,
    });
  };

  const goBack = () => {
    navigate(-1);
  };
  const closeResultModal = () => {
    setShowResultModal(false);
    navigate(ROUTES.USER_LIST);
  };

  const onBirthdateChange = (value: Date) => {
    setValue("dateOfBirth", value.toDateString());
  };

  return (
    <div className="main-content">
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
          <Card.Title>{t("Create new user")}</Card.Title>
          <Form className="col-xl-8" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Email")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue=""
                  {...register("email")}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Password")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="password"
                  defaultValue=""
                  {...register("password")}
                />
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Account Level")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select defaultValue="" {...register("accountLevel")}>
                  <option value="">{t("Please select")}</option>
                  <option value="Fast">{t("Fast")}</option>
                  <option value="Premier">{t("Premier")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.accountLevel?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Applicant Type")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select defaultValue="" {...register("applicantType")}>
                  <option value="">{t("Please select")}</option>
                  <option value="Individual">{t("Individual")}</option>
                  <option value="Corporate">{t("Corporate")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.applicantType?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("First Name")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" {...register("firstName")} />
                <Form.Text className="text-danger">
                  {errors.firstName?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Last Name")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" {...register("lastName")} />
                <Form.Text className="text-danger">
                  {errors.lastName?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Form.Label className="col-md-3 col-form-label">
                {t("Date of Birth")}
                <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={8}>
                <BirthdatePicker
                  defaultValue={moment()
                    .utc()
                    .year(1970)
                    .startOf("year")
                    .toISOString()}
                  onChange={onBirthdateChange}
                />
                <Form.Text className="text-danger">
                  {errors.dateOfBirth?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Sex")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select defaultValue="" {...register("gender")}>
                  <option value="">{t("Please select")}</option>
                  <option value="male">{t("Male")}</option>
                  <option value="female">{t("Female")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.gender?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Country")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select defaultValue="" {...register("country")}>
                  {Countries.map((country) => {
                    return (
                      <option key={country.id} value={country.alpha2}>
                        {i18n.language === "jp" ? country.ja : country.en}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Region/State/Province")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue=""
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
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  defaultValue=""
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
                <Form.Control type="text" {...register("district")} />
                <Form.Text className="text-danger">
                  {errors.district?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" {...register("address")} />
                <Form.Text className="text-danger">
                  {errors.address?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Street No.")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" {...register("streetNo")} />
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
                <Form.Control type="text" {...register("apartment")} />
                <Form.Text className="text-danger">
                  {errors.apartment?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Post Code")}
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  className="hide-arrow"
                  type="number"
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
              </Form.Label>
              <Col sm={6}>
                <Row>
                  <Col sm={4}>
                    <Form.Select {...register("phoneCode")}>
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
                <Form.Select {...register("language")}>
                  <option value="">{t("Please select")}</option>
                  <option value="en">{t("English")}</option>
                  <option value="jp">{t("Japanese")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.language?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Verified?")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select {...register("isVerified")}>
                  <option value="">{t("Please select")}</option>
                  <option value="true">{t("Yes")}</option>
                  <option value="false">{t("No")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.isVerified?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("KYC Uploaded?")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select {...register("isKyc")}>
                  <option value="">{t("Please select")}</option>
                  <option value="0">{t("Not uploaded")}</option>
                  <option value="1">{t("Uploaded")}</option>
                  <option value="2">{t("Approved")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.isKyc?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("2FA Active?")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select {...register("is2FAEnabled")}>
                  <option value="">{t("Please select")}</option>
                  <option value="false">{t("No")}</option>
                  <option value="true">{t("Yes")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.is2FAEnabled?.message}
                </Form.Text>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Label className="col-md-3 col-form-label">
                {t("Profile Updated?")}
              </Form.Label>
              <Col sm={6}>
                <Form.Select {...register("isInformationUpdated")}>
                  <option value="">{t("Please select")}</option>
                  <option value="true">{t("Yes")}</option>
                  <option value="false">{t("No")}</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.isInformationUpdated?.message}
                </Form.Text>
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

          {/* Result Modal */}
          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <ResponseModal
              type="success"
              title={t("Create new user")}
              message={t("User has been created.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUser;
