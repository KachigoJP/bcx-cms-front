import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Source
import { UserFormProps } from "helpers/interfaces";
import { HOMEPAGE_LINKS } from "helpers/constants";
import PhoneCodes from "assets/json/phone_codes.json";
import Countries from "assets/json/countries.json";
import BirthdatePicker from "components/Components/BirthdatePicker";

const UserForm: React.FC<UserFormProps> = (props) => {
  const { t, i18n } = useTranslation();

  const { hookForm, user } = props;

  const { errors } = hookForm.formState;

  const onBirthdateChange = (value: Date) => {
    hookForm.setValue("dateOfBirth", value);
  };

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Email")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            disabled={user ? true : false}
            defaultValue={user?.email}
            {...hookForm.register("email")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Password")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control type="password" {...hookForm.register("password")} />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("First Name")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            defaultValue={user?.firstName}
            {...hookForm.register("firstName")}
          />
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
          <Form.Control
            type="text"
            defaultValue={user?.lastName}
            {...hookForm.register("lastName")}
          />
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
            defaultValue={(user?.dateOfBirth
              ? new Date(user.dateOfBirth)
              : new Date(1970, 1, 1)
            ).toISOString()}
            onChange={onBirthdateChange}
          />
          <Form.Text className="text-danger">
            {errors.dateOfBirth?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Gender")}
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            defaultValue={user?.gender}
            {...hookForm.register("gender")}
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
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Country")}
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            defaultValue={user?.country}
            {...hookForm.register("country")}
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
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Post Code")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            className="hide-arrow"
            type="number"
            defaultValue={user?.postcode}
            {...hookForm.register("postcode")}
          />
          <Form.Text className="text-danger">
            {errors.postcode?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Region")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            defaultValue={user?.region}
            {...hookForm.register("region")}
          />
          <Form.Text className="text-danger">
            {errors.region?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">{t("City")}</Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            defaultValue={user?.city}
            {...hookForm.register("city")}
          />
          <Form.Text className="text-danger">{errors.city?.message}</Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Address")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            defaultValue={user?.address}
            {...hookForm.register("address")}
          />
          <Form.Text className="text-danger">
            {errors.address?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("Building")}
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            defaultValue={user?.building}
            {...hookForm.register("building")}
          />
          <Form.Text className="text-danger">
            {errors.building?.message}
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
              <Form.Select
                value={user?.phoneCode}
                {...hookForm.register("phoneCode")}
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
                {...hookForm.register("phoneNumber")}
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
          {t("Verified?")}
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            value={user?.isVerified ? "true" : "false"}
            {...hookForm.register("isVerified")}
          >
            <option value="false">{t("No")}</option>
            <option value="true">{t("Yes")}</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.isVerified?.message}
          </Form.Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label className="col-md-3 col-form-label">
          {t("2FA Active?")}
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            value={user?.is2FAEnabled}
            {...hookForm.register("is2FAEnabled")}
          >
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
          {t("Account Init?")}
        </Form.Label>
        <Col sm={6}>
          <Form.Select
            value={user?.isAccountInit}
            {...hookForm.register("isAccountInit")}
          >
            <option value="false">{t("No")}</option>
            <option value="true">{t("Yes")}</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.isAccountInit?.message}
          </Form.Text>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserForm;
