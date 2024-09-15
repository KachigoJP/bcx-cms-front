// React Imports
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// UI Imports
import { Button, Row, Col, Card, Modal, Table } from "react-bootstrap";

// Apps Imports
import ResponseModal from "components/Modals/ResponseModal";
import { useApi } from "helpers/api";
import { API } from "helpers/constants";
import { MetadataTableProps, PageMetadataType } from "helpers/interfaces";
import { MdDelete, MdEdit } from "react-icons/md";
import PageMetadataModal from "components/Modals/PageMetadataModal";

const MetadatasTable: React.FC<MetadataTableProps> = (props) => {
  const { pageId, data, onReload } = props;
  // Hooks
  const { t } = useTranslation();

  const [showResultModal, setShowResultModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showModifyModal, setShowModifyModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [modifyItem, setModifyItem] = React.useState<PageMetadataType>();

  // APIs
  const { sendRequest: sendDeleteMetadata } = useApi();

  // Effects
  const onClickCreateMetadata = () => {
    setModifyItem(undefined);
    setShowModifyModal(true);
  };

  const onClickUpdateMetadata = (item: PageMetadataType) => () => {
    setModifyItem(item);
    setShowModifyModal(true);
  };

  const onClickDeleteMetadata = (id: string) => () => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    if (onReload) onReload();
  };

  const closeModifyModal = () => {
    setModifyItem(undefined);
    setShowModifyModal(false);
    if (onReload) onReload();
  };

  const closeDeleteModal = () => {
    setDeleteId("");
    setShowDeleteModal(false);
  };

  const clickConfirmDelete = () => {
    sendDeleteMetadata({
      method: "delete",
      url: `${API.PAGES_METADATA.replace(":page", pageId)}/${deleteId}`,
    });
    setShowDeleteModal(false);
    if (onReload) onReload();
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{t("Metadata")}</Card.Title>
        <Row className="mb-3">
          <Col className="d-flex align-items-end">
            <Link
              to="#"
              onClick={onClickCreateMetadata}
              className="btn btn-primary"
            >
              {t("Add New")}
            </Link>
          </Col>
        </Row>
        <Table
          className="table table-striped"
          style={{ wordBreak: "break-word" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>{t("Key")}</th>
              <th>{t("Label")}</th>
              <th>{t("Value")}</th>
              <th>{t("Type")}</th>
              <th>{t("Description")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.key}</td>
                    <td>{item.type}</td>
                    <td>{item.label}</td>
                    <td>{item.description}</td>
                    <td style={{ textOverflow: "ellipsis" }}>{item.value}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link to="#" onClick={onClickUpdateMetadata(item)}>
                        <MdEdit size={24} className="me-3 text-primary" />
                      </Link>
                      <Link to="#" onClick={onClickDeleteMetadata(item.id)}>
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

        <PageMetadataModal
          data={modifyItem}
          show={showModifyModal}
          rootId={pageId}
          onClose={closeModifyModal}
        />

        {/* Result Modal */}
        <Modal show={showResultModal} onHide={closeResultModal} centered>
          <ResponseModal
            type="success"
            title={t("Metadata Processed")}
            message={t("Metadata has been processed.")}
            onClose={closeResultModal}
          />
        </Modal>

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
      </Card.Body>
    </Card>
  );
};

export default MetadatasTable;
