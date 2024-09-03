// React Imports
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";

// UI Imports
import { Row, Col, Card, Accordion } from "react-bootstrap";

// Apps Imports
import { useApi, isInitState } from "helpers/api";
import { API, ROUTES } from "helpers/constants";

const Notice: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const [data, setData] = React.useState<any>([]);

  // APIs
  const { state, sendRequest } = useApi(API.NOTIFICATION);

  // Effects
  React.useEffect(() => {
    if (!state.data) sendRequest();
    return () => {};
  }, []);

  // Methods

  React.useEffect(() => {
    const response = state?.data;
    if (state?.data?.data?.data)
      setData(
        Object.values(response.data.data).map((item: any) => {
          return {
            title: item.title,
            datetime: moment(item.startDate).format("YYYY/MM/DD HH:MM:SS"),
            content: item.detail,
          };
        })
      );
    return () => {};
  }, [state]);

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Notice")}
          </li>
        </ol>
        <Card>
          <Card.Body>
            <ul>
              <li>
                <span>{t("Notice")}</span>
              </li>
              <li></li>
            </ul>
          </Card.Body>
        </Card>
      </nav>

      {/* Body */}

      <Row>
        <Col md={12} className="stretch-card">
          <Card>
            <Card.Body>
              <Card.Title>{t("Notice")}</Card.Title>
              <Accordion className="m-3">
                {data.map((item: any, idx: number) => {
                  return (
                    <Accordion.Item key={idx} eventKey={idx.toString()}>
                      <Accordion.Header>
                        <Col className="notice-datetime" xs={2}>
                          {item.datetime}
                        </Col>
                        <Col xs={10}>{item.title}</Col>
                      </Accordion.Header>
                      <Accordion.Body className="multiline">
                        {item.content}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Notice;
