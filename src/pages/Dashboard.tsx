// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment";

// UI Imports
import { Row, Col, Card, Table, Accordion } from "react-bootstrap";

// Apps Imports
import { useApi } from "../helpers/api";
import { API, ROUTES } from "../helpers/constants";

const Dashboard: React.FC = () => {
  // Hooks
  const { t } = useTranslation();

  // APIs

  // Effects
  React.useEffect(() => {
    return () => {};
  }, []);

  // Methods

  // Values

  return (
    <div className="main-content">
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">{t("Welcome to Dashboard")}</h4>
        </div>
      </div>
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>{t("User")}</Col>
                </Row>
              </Card.Title>
              <Accordion className="m-3">
                {/* {annoucements?.length > 0
                  ? annoucements.slice(0, 5).map((item: any, idx: number) => {
                      return (
                        <Accordion.Item key={idx} eventKey={idx.toString()}>
                          <Accordion.Header>
                            <Col className="notice-datetime" xs={2}>
                              {item.startDate
                                ? moment(item.startDate)
                                    .utcOffset(8)
                                    .format('YYYY/MM/DD HH:MM:SS')
                                : null}
                            </Col>
                            <Col xs={10}>{item.title}</Col>
                          </Accordion.Header>
                          <Accordion.Body className="multiline">
                            {item.detail}
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    })
                  : null} */}
              </Accordion>
              {/* <div className="text-center mt-5">
                <Link
                  to={ROUTES.NOTICE}
                  className="btn btn-outline-primary border border-primary"
                >
                  {t('See more')}
                </Link>
              </div> */}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>{t("Donate")}</Col>
                </Row>
              </Card.Title>
              <Table responsive striped hover size="sm">
                <colgroup>
                  <col style={{ width: "25%" }}></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                </colgroup>
                <thead>
                  <tr>
                    <th>{t("Date")}</th>
                    <th>{t("Amount")}</th>
                    <th>{t("Currency")}</th>
                    <th>{t("Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {transactions?.data.length > 0 ? (
                    transactions?.data
                      .slice(0, 10)
                      .map((item: any, idx: number) => {
                        return (
                          <tr key={idx}>
                            <td>
                              {item?.createdAt
                                ? moment(item.createdAt)
                                    .utcOffset(8)
                                    .format('YYYY/MM/DD HH:MM:SS')
                                : null}
                            </td>
                            <td>{item.accountNumber}</td>
                            <td>{t(item.actionType)}</td>
                            <td>{item.amount}</td>
                            <td>{item.currency}</td>
                            <td>{t(item.status)}</td>
                          </tr>
                        )
                      })
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={6}>
                        {t('No record')}
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </Table>
              {/* <div className="text-center mt-5">
                <Link
                  to={ROUTES.TRANSACTION_HISTORY}
                  className="btn btn-outline-primary border border-primary"
                >
                  {t('See more')}
                </Link>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mt-3 mt-lg-0">
          <Card>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>{t("Trip")}</Col>
                </Row>
              </Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>{t("Currency Type")}</th>
                    <th>{t("Amount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {balances?.length > 0 ? (
                    balances.map((ktem: any, idx: number) => {
                      return (
                        <tr key={idx}>
                          <td>{ktem.name}</td>
                          <td>{ktem.balance}</td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={2}>{t('No record')}</td>
                    </tr>
                  )} */}
                </tbody>
              </Table>
              <div className="text-center mt-5">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="btn btn-outline-primary border border-primary"
                >
                  {t("See more")}
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
