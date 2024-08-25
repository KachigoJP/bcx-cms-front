// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

// UI Imports
import {
  Row,
  Col,
  Table,
  Card,
  Pagination,
  Form,
  Modal,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { MdOutlineCheckCircle } from "react-icons/md";

// Apps Imports
import { FieldError, useApi } from "../../helpers/api";
import { ROUTES, API } from "../../helpers/constants";

const UpgradeMaster: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(searchParams.get("page") || 1);
  const [search, setSearch] = React.useState<string | null>(
    searchParams.get("search")
  );

  const [showConfirmModal, setshowConfirmModal] = React.useState(false);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null as any);

  // APIs
  const { state, sendRequest } = useApi(API.ADMIN_LIST_NON_MASTER);
  const { state: stateUpgrade, sendRequest: sendUpgradeRequest } = useApi(
    API.ADMIN_UPGRADE_MASTER
  );

  // Effects
  React.useEffect(() => {
    if (!state.data) {
      sendRequest({
        method: "get",
        params: {
          page,
          search,
        },
      });
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    if (stateUpgrade.errors) {
      setShowResultModal(false);
    }
    return () => {};
  }, [stateUpgrade]);

  // Methods
  const onChangeSearch = (event: any) => {
    setSearch(event.target.value || null);
  };
  const onBlurSearch = (event: any) => {
    setPage(1);
    const params: any = {
      page: 1,
      search,
    };

    sendRequest({
      method: "get",
      params,
    });
    setSearchParams(params);
  };

  const onChangePage = (page: number) => () => {
    const params: any = {
      page,
      search,
    };

    sendRequest({
      method: "get",
      params,
    });
    setSearchParams(params);
  };
  const onClickUpgrade = (item: any) => () => {
    setSelected(item);
    setshowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setSelected(null);
    setshowConfirmModal(false);
  };
  const onClickConfirm = () => {
    sendUpgradeRequest({
      url: API.ADMIN_UPGRADE_MASTER.replace(":id", selected.id),
      method: "post",
    });
    setshowConfirmModal(false);
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    if (stateUpgrade.data) {
      const params: any = {
        page,
        search,
      };
      sendRequest({
        method: "get",
        params,
      });
    }
  };

  const tableData = state?.data?.data?.data;
  const currentPage = tableData?.page || 1;
  const startIdx = tableData?.pageSize * (currentPage - 1);
  const totalPage = tableData?.totalPage | 1;
  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t("Home")}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t("Upgrade Master User")}
          </li>
        </ol>
      </nav>
      {stateUpgrade.isError && stateUpgrade.errors ? (
        <Alert variant="danger">
          {stateUpgrade.errors.map((field: FieldError, key: number) => {
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
          <Card.Title>
            <Row>
              <Col>
                <Form.Group as={Row} className="me-5">
                  <Form.Label column>{t("Search")}</Form.Label>
                  <Form.Control
                    type="text"
                    value={search || ""}
                    onBlur={onBlurSearch}
                    onChange={onChangeSearch}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Title>
          <div className="table-responsive">
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("Email")}</th>
                  <th>{t("First Name")}</th>
                  <th>{t("Last Name")}</th>
                  <th>{t("Account Number")}</th>
                  <th>{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {tableData && tableData.totalItem > 0 ? (
                  tableData.data.map((item: any, key: number) => {
                    return (
                      <tr key={key}>
                        <td>{startIdx + (key + 1)}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.accountNumber}</td>
                        <td>
                          <Button onClick={onClickUpgrade(item)}>
                            {t("Upgrade")}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      {t("No record")}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {tableData && tableData.totalItem > 0 ? (
              <Pagination className="m-2">
                <Pagination.First onClick={onChangePage(1)} />
                {Array.from(
                  Array(totalPage === 1 ? totalPage : totalPage - 1).keys()
                ).map((idx) => {
                  const page = idx + 1;
                  return (
                    <Pagination.Item
                      key={idx}
                      onClick={onChangePage(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Last
                  onClick={onChangePage(tableData?.totalPage | 1)}
                />
              </Pagination>
            ) : null}
          </div>
        </Card.Body>

        {/* CONFIRM MODAL */}
        <Modal show={showConfirmModal} onHide={closeConfirmModal} centered>
          <Modal.Title></Modal.Title>
          <Modal.Body className="text-center">
            <h3>{t("Upgrade Master User")}</h3>
            {t("Do you want upgrade this user to Master User?")}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button onClick={closeConfirmModal}>{t("Close")}</Button>
            <Button onClick={onClickConfirm}>{t("Confirm")}</Button>
          </Modal.Footer>
        </Modal>

        {/* Result Modal */}
        <Modal
          show={showResultModal}
          onHide={closeResultModal}
          centered
          backdrop="static"
        >
          <Modal.Body className="text-center">
            {!stateUpgrade.isLoading && stateUpgrade.data ? (
              <>
                <MdOutlineCheckCircle size="5em" color="#00C851" />
                <h3>{t("User Upgraded")}</h3>
                {t("User {{ email }} has been successfully upgraded", {
                  email: selected.email || "empty",
                })}
              </>
            ) : (
              <>
                <Spinner animation="border" role="status" aria-hidden="true" />
                <div>
                  {t("Transaction in progress. Please wait a few minutes!")}
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            {!stateUpgrade.isLoading && stateUpgrade.data ? (
              <>
                <Button onClick={closeResultModal}>{t("Close")}</Button>
              </>
            ) : null}
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default UpgradeMaster;
