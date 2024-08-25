// React Imports
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

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
  Table,
  Pagination,
} from "react-bootstrap";
import { FieldError, useApi } from "../../helpers/api";
import { ROUTES, API } from "../../helpers/constants";
import { getAffiliateRateSchema } from "../../helpers/schemas";
import ResponseModal from "../../components/Modals/ResponseModal";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";

const AffiliateBonus = () => {
  const { t } = useTranslation();
  const [showResultModal, setShowResultModal] = React.useState(false);

  const validationSchema = getAffiliateRateSchema(t);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  // API
  const { state, sendRequest } = useApi(API.MASTER_AFFILIATE_RATE);
  const { state: stateRate, sendRequest: sendRequestRate } = useApi(
    API.MASTER_AFFILIATE_RATE
  );
  const config = React.useMemo(() => state?.data?.data?.data || {}, [state]);

  React.useEffect(() => {
    // sendRequest({
    //   method: 'GET',
    // })
  }, []);

  React.useEffect(() => {
    for (const [key, val] of Object.entries(config)) {
      setValue(key, val);
    }
  }, [config, setValue]);

  React.useEffect(() => {
    const response = stateRate.data;
    if (response && response.status === 200) {
      setShowResultModal(true);
    }
  }, [stateRate]);

  const onSubmit = (config: any) => {
    sendRequestRate({
      method: "PATCH",
      data: config,
    });
  };

  return (
    <div className="main-content h-100">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Rays Wallet Deposit Report")}
          </li>
        </ol>
        <Card>
          <Card.Body>
            <ul>
              <li>
                <span>{t("Rays Wallet Deposit Report")}</span>
              </li>
              <li></li>
            </ul>
          </Card.Body>
        </Card>
      </nav>
      {stateRate.isError && stateRate.errors ? (
        <Alert variant="danger">
          {stateRate.errors.map((field: FieldError, key: number) => {
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
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{t("Monthly Deposit")}</Card.Title>
              <Card.Text>$3000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{t("Yearly Deposit")}</Card.Title>
              <Card.Text>$35000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="currency-select-card">
            <Card.Body>
              <Card.Title>{t("Currency")}</Card.Title>
              <Form.Select className="currency-select">
                <option value="usd">USD</option>
                <option value="jpy">JPY</option>
                <option value="euro">EURO</option>
                <option value="mxn">MXN</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-2">
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>{t("Subordinate master' deposit amount")}</Col>
            </Row>
          </Card.Title>

          <div className="table-responsive">
            <Table className="table">
              <thead>
                <tr>
                  <th className="wd15">{t("User")}</th>
                  <th className="wd15">{t("Name")}</th>
                  <th className="wd15">{t("Monthly Deposit")}</th>
                  <th className="wd15">{t("Yearly Deposit")}</th>
                  <th className="wd15">{t("Action")}</th>
                  <th className="wd15">{t("Currency")}</th>
                </tr>
              </thead>
              <tbody>
                <tr key={1}>
                  <td>rober.laymin@gmail.com</td>
                  <td>Robert</td>
                  <td>$4000</td>
                  <td>$40000</td>
                  <td>
                    <Link to={"#"}>
                      <MdRemoveRedEye size={24} className="me-3" />
                    </Link>
                  </td>
                  <td>
                    <Form.Select className="currency-select">
                      <option value="usd">USD</option>
                      <option value="jpy">JPY</option>
                      <option value="euro">EURO</option>
                      <option value="mxn">MXN</option>
                    </Form.Select>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Pagination className="m-2">
              <Pagination.First />

              <Pagination.Item key={1} active={true}>
                {1}
              </Pagination.Item>
              <Pagination.Last />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AffiliateBonus;
