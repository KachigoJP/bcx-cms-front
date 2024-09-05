// React Imports
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

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

// Sourece
import { PageTagType } from "helpers/interfaces";
import { FieldError, useApi } from "helpers/api";
import { API } from "helpers/constants";
import ResponseModal from "components/Modals/ResponseModal";
import PageTagModal from "components/Modals/PageTagModal";

const PageCategories = () => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();

  const [currPage] = React.useState(parseInt(searchParams.get("page") || "1"));
  const [search, setSearch] = React.useState<string | null>(
    searchParams.get("search")
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showTagModal, setShowTagModal] = React.useState(false);
  const [showResultModal, setShowResultModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [updateItem, setUpdateItem] = React.useState<PageTagType>();

  // APIS
  const { state: stateSetting, sendRequest: sendGetSetting } = useApi();
  const { state: stateDelete, sendRequest: sendDeleteRequest } = useApi();

  React.useEffect(() => {
    if (!stateSetting.data) {
      doSearch();
    }
  }, []);

  /*#### Methods #### */

  // Search & Pagination
  const doSearch = (page?: number) => {
    const params: any = {
      page: page || currPage,
      search: search ? search : "",
    };

    sendGetSetting({
      method: "get",
      url: API.PAGE_TAGS,
      params,
    });
  };

  const onChangeSearch = (event: any) => {
    setSearch(event.target.value || "");
    setSearchParams({
      ...searchParams,
      search: event.target.value || "",
    });
  };

  const onBlurSearch = (event: any) => {
    doSearch(1);
  };

  const onChangePage = (page: number) => () => {
    doSearch(page);
  };

  // Setting Modal
  const onClickCreate = () => {
    setUpdateItem(undefined);
    setShowTagModal(true);
  };

  const onClickUpdate = (setting: PageTagType) => () => {
    setUpdateItem(setting);
    setShowTagModal(true);
  };

  const closeSettingModal = (isSuccess = false) => {
    setUpdateItem(undefined);
    setShowTagModal(false);

    if (isSuccess) {
      setShowResultModal(true);
    }
  };

  // Result Modal Method
  const closeResultModal = () => {
    setShowResultModal(false);

    doSearch();
  };

  // Delete Modal method
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
      url: `${API.PAGE_TAGS}/${deleteId}`,
    });
    setShowDeleteModal(false);
    setShowResultModal(true);
  };

  const tableData = stateSetting?.data?.data;
  const currentPage = tableData?.page || 1;
  const startIdx = tableData?.pageSize * (currentPage - 1);
  const totalPage = tableData?.totalPage | 1;

  return (
    <div className="main-content h-100">
      {stateSetting.isError && stateSetting.errors ? (
        <Alert variant="danger">
          {stateSetting.errors.map((field: FieldError, key: number) => {
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

      <Card style={{ minHeight: "100%" }}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col className="d-flex align-items-end">
                <Link
                  to="#"
                  onClick={onClickCreate}
                  className="btn btn-primary"
                >
                  {t("Add New")}
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Form.Group className="me-5">
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
          <Table
            className="table table-striped"
            style={{ wordBreak: "break-word" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{t("Name")}</th>
                <th>{t("Slug")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.totalItem > 0 ? (
                tableData.data.map((item: PageTagType, key: number) => {
                  return (
                    <tr key={key}>
                      <td>{startIdx + (key + 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.slug}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <Link to="#" onClick={onClickUpdate(item)}>
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

          {/* Modals */}
          <PageTagModal
            data={updateItem}
            show={showTagModal}
            onClose={closeSettingModal}
          />

          <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
            <Modal.Body className="text-center">
              <MdDelete size="3em" color="#dc3545" />
              <h3>{t("Delete Setting")}</h3>
              {t(
                "Warning! Once you delete the setting there's no getting it back. Make sure you want to delete it"
              )}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button onClick={closeDeleteModal}>{t("Close")}</Button>
              <Button onClick={clickConfirmDelete}>{t("Delete")}</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showResultModal} onHide={closeResultModal} centered>
            <ResponseModal
              type="success"
              title={t("Success")}
              message={t("Your request has been proccessed.")}
              onClose={closeResultModal}
            />
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PageCategories;
