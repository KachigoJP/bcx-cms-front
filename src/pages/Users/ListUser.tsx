// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams, generatePath } from "react-router-dom";

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
} from "react-bootstrap";
import { MdDelete, MdEdit, MdOutlineCheckCircle } from "react-icons/md";

// Apps Imports
import { useApi } from "../../helpers/api";
import { ROUTES, API } from "../../helpers/constants";

const ListUser: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(searchParams.get("page") || 1);
  const [search, setSearch] = React.useState<string | null>(
    searchParams.get("search")
  );

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");

  // APIs
  const { state, sendRequest } = useApi(API.ADMIN_LIST_USER);
  const { state: stateDelete, sendRequest: sendDeleteRequest } = useApi(
    API.ADMIN_DELETE_USER
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
    if (stateDelete.errors) {
      setShowResultModal(false);
    }
    return () => {};
  }, [stateDelete]);

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
  const onClickDelete = (id: string) => () => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId("");
    setShowDeleteModal(false);
  };
  const clickConfirmDelete = () => {
    sendDeleteRequest({
      method: "delete",
      url: `${API.ADMIN_DELETE_USER}/${deleteId}`,
    });
    setShowDeleteModal(false);
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    if (stateDelete.data) {
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
      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col lg={5}>
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
              <Col md={2} className="d-flex align-items-end">
                <Link to={ROUTES.USER_CREATE} className="btn btn-primary">
                  {t("Create User")}
                </Link>
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
                  <th>{t("Account Level")}</th>
                  <th>{t("Applicant Type")}</th>
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
                        <td>{t(item.accountLevel)}</td>
                        <td>{t(item.applicantType)}</td>
                        <td>
                          <Link
                            to={generatePath(ROUTES.USER_UPDATE, {
                              id: item.id,
                            })}
                          >
                            <MdEdit size={24} className="me-3 text-primary" />
                          </Link>
                          <Link to="#" onClick={onClickDelete(item.id)}>
                            <MdDelete size={24} className="text-danger" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
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

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
          <Modal.Body className="text-center">
            <MdDelete size="3em" color="#dc3545" />
            <h3>{t("Delete user")}</h3>
            {t(
              "Warning! Once you delete the account there's no getting it back. Make sure you want to delete it"
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button onClick={closeDeleteModal}>{t("Close")}</Button>
            <Button onClick={clickConfirmDelete}>{t("Delete")}</Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Result Modal */}
        <Modal
          show={showResultModal}
          onHide={closeResultModal}
          centered
          backdrop="static"
        >
          <Modal.Body className="text-center">
            {!stateDelete.isLoading && stateDelete.data ? (
              <>
                <MdOutlineCheckCircle size="5em" color="#00C851" />
                <h3>{t("User Deleted")}</h3>
                {t("User {{ email }} is successful deleted", {
                  email: stateDelete?.data?.data?.data?.email || "empty",
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
            {!stateDelete.isLoading && stateDelete.data ? (
              <>
                <Button onClick={closeResultModal}>{t("Confirm")}</Button>
              </>
            ) : null}
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default ListUser;
