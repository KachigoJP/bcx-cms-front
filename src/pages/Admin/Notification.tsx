/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line jsx-a11y/anchor-is-valid
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import moment from 'moment'

// UI Imports
import {
  Row,
  Col,
  Table,
  Card,
  Pagination,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Button,
  Modal,
} from 'react-bootstrap'
import { MdDelete, MdEdit, MdOutlineCheckCircle } from 'react-icons/md'

// Apps Imports
import { useApi } from '../../helpers/api'
import { ROUTES, API } from '../../helpers/constants'

import AddNotificationModal, {
  NotificationForm,
} from '../../components/Modals/AddNotificationModal'
import ConfirmModal from '../../components/Modals/ConfirmModal'

const Notification: React.FC = () => {
  const { t } = useTranslation()
  let [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = React.useState(searchParams.get('page') || 1)
  const [isShowAdd, setShowAdd] = React.useState(false)
  const [showResultModal, setShowResultModal] = React.useState(false)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [isShowDelete, setShowDelete] = React.useState(false)

  // APIs
  const { state, sendRequest } = useApi(API.ADMIN_NOTIFICATION)
  const { state: stateCreate, sendRequest: sendCreateRequest } = useApi(
    API.ADMIN_NOTIFICATION
  )
  const { state: stateUpdate, sendRequest: sendUpdateRequest } = useApi(
    API.ADMIN_NOTIFICATION
  )
  const { state: stateDelete, sendRequest: sendDeleteRequest } = useApi(
    API.ADMIN_NOTIFICATION
  )

  // Effects
  React.useEffect(() => {
    sendRequest({
      method: 'get',
      params: {
        page,
      },
    })
    return () => {}
  }, [])

  const onChangePage = (page: number) => () => {
    const params: any = {
      page,
    }
    sendRequest({
      method: 'get',
      params,
    })
    setSearchParams(params)
  }

  const getDetail = (detail: string) => {
    if (detail.length < 50) return detail
    return `${detail.substring(0, 50)}...`
  }

  const onClickDelete = (id: string) => () => {
    setSelected(id)
    setShowDelete(true)
  }

  const deleteNotification = () => {
    if (selected) {
      sendDeleteRequest({
        method: 'delete',
        url: `${API.ADMIN_NOTIFICATION}/${selected}`,
      })
      setShowDelete(false)
      setShowResultModal(true)
      setSelected(null)
    }
  }

  const closeResultModal = () => {
    setShowResultModal(false)
    sendRequest({
      method: 'get',
      params: {
        page,
      },
    })
  }

  const tableData = state?.data?.data?.data
  const currentPage = tableData?.page || 1
  const startIdx = tableData?.pageSize * (currentPage - 1)
  const totalPage = tableData?.totalPage | 1

  return (
    <div className="main-content">
      {/* Breadcrumb */}
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME}>{t('Home')}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t('Notifications Manager')}
          </li>
        </ol>
      </nav>

      {/* Body */}
      <Card>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>{t('Notifications Manager')}</Col>
            </Row>
            <Row>
              <Col xs={12} className="text-end">
                <Link
                  to={ROUTES.ADMIN_CREATE_NOTIFICATION}
                  className="btn btn-primary"
                >
                  {t('Add')}
                </Link>
              </Col>
            </Row>
          </Card.Title>
          <div className="table-responsive">
            <Table className="table">
              <thead>
                <tr>
                  <th className="wd10">#</th>
                  <th className="wd30">{t('Title')}</th>
                  <th className="wd30">{t('Detail')}</th>
                  <th className="wd15">{t('Start Date')}</th>
                  <th className="wd15">{t('End Date')}</th>
                  <th className="wd15">{t('Action')}</th>
                </tr>
              </thead>
              <tbody>
                {tableData && tableData.totalItem > 0 ? (
                  tableData.data.map((item: any, key: number) => {
                    return (
                      <tr key={key}>
                        <td>{startIdx + (key + 1)}</td>
                        <td>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => {
                              return (
                                <Tooltip id="button-tooltip" {...props}>
                                  {item.title}
                                </Tooltip>
                              )
                            }}
                          >
                            <span>{getDetail(item.title)}</span>
                          </OverlayTrigger>
                        </td>
                        <td>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => {
                              return (
                                <Tooltip id="button-tooltip" {...props}>
                                  {item.detail}
                                </Tooltip>
                              )
                            }}
                          >
                            <span>{getDetail(item.detail)}</span>
                          </OverlayTrigger>
                        </td>
                        <td>
                          {moment(item.startDate).format('YYYY/MM/DD HH:MM:SS')}
                        </td>
                        <td>
                          {moment(item.endDate).format('YYYY/MM/DD HH:MM:SS')}
                        </td>
                        <td className="col m-2">
                          <Link
                            to={ROUTES.ADMIN_UPDATE_NOTIFICATION.replace(
                              ':id',
                              item.id
                            )}
                          >
                            <MdEdit size={24} className="me-3" />
                          </Link>
                          <Link to="#" onClick={onClickDelete(item.id)}>
                            <MdDelete size={24} className="text-danger" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      {t('No notification record')}
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
                  const page = idx + 1
                  return (
                    <Pagination.Item
                      key={idx}
                      onClick={onChangePage(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </Pagination.Item>
                  )
                })}
                <Pagination.Last
                  onClick={onChangePage(tableData?.totalPage | 1)}
                />
              </Pagination>
            ) : null}
          </div>
        </Card.Body>
      </Card>
      {/* Result Modal */}
      <Modal show={showResultModal} onHide={closeResultModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          {!(
            stateCreate.isLoading ||
            stateUpdate.isLoading ||
            stateDelete.isLoading
          ) &&
          (stateCreate.data || stateUpdate.data || stateDelete.data) ? (
            <>
              <MdOutlineCheckCircle size="2em" color="#00C851" />
              <h3>{t('Notification')}</h3>
              {t('Success')}
            </>
          ) : (
            (stateDelete.isError ||
              stateCreate.isError ||
              stateUpdate.isError) && (
              <>
                {/* <Spinner animation="border" role="status" aria-hidden="true" /> */}
                <div>{t('Oops, Something Went Wrong')}</div>
              </>
            )
          )}
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={isShowDelete}
        onHide={() => {
          setShowDelete(false)
          setSelected(null)
        }}
      >
        <ConfirmModal
          onOk={deleteNotification}
          title={t('Do you want to delete item ?')}
        />
      </Modal>
    </div>
  )
}

export default Notification
