import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

// UI Imports
import { Modal, Spinner, Table, Button, Pagination } from 'react-bootstrap'

// App imports
import { API } from '../../helpers/constants'
import { useApi } from '../../helpers/api'

type ModalProps = {
  onClose: () => void
  userId: string
  currency: string
}

const Component: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation()
  // APIs
  const { state, sendRequest } = useApi(API.MASTER_USER_DEPOSIT_HISTORY)

  // Effect
  React.useEffect(() => {
    sendRequest({
      url: API.MASTER_USER_DEPOSIT_HISTORY.replace(':id', props.userId),
      method: 'get',
      params: {
        page: 1,
        currency: props.currency,
      },
    })
  }, [])

  const onChangePage = (page: number) => () => {
    const params: any = {
      page,
      currency: props.currency,
    }
    sendRequest({
      method: 'get',
      params,
    })
  }

  const tableData = state?.data?.data?.data.data
  const currentPage = tableData?.page || 1
  const totalPage = tableData?.totalPage | 1

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t('Deposit History')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {state.isLoading ? (
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th className="wd15">{t('ID')}</th>
                  <th className="wd15">{t('Transaction Date')}</th>
                  <th className="wd15">{t('Amount')}</th>
                  <th className="wd15">{t('Currency')}</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.length > 0 ? (
                  tableData?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td>
                          {item?.createdAt
                            ? moment(item.createdAt)
                                .utcOffset(8)
                                .format('YYYY/MM/DD HH:MM:SS')
                            : null}
                        </td>
                        <td>{item.amount}</td>
                        <td>{item?.toWallet?.currency?.abbreviation}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>{t('No record')} </td>
                  </tr>
                )}
              </tbody>
            </Table>

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
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" type="submit" onClick={props.onClose}>
          {t('OK')}
        </Button>
      </Modal.Footer>
    </React.Fragment>
  )
}

export default Component
