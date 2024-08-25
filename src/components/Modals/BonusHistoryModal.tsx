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
}

const Component: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation()
  // APIs
  const { state, sendRequest } = useApi(API.MASTER_AFFILIATE_USER_HISTORY)

  // Effect
  React.useEffect(() => {
    sendRequest({
      url: API.MASTER_AFFILIATE_USER_HISTORY.replace(':id', props.userId),
      method: 'get',
      params: {
        page: 1,
      },
    })
  }, [])

  const onChangePage = (page: number) => () => {
    const params: any = {
      page,
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
        <Modal.Title>{t('Bonus History')}</Modal.Title>
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
                  <th className="wd15">{t('Date')}</th>
                  <th className="wd15">{t('Bonus')}</th>
                  <th className="wd15">{t('Currency')}</th>
                </tr>
              </thead>
              <tbody>
                {tableData?.length > 0 ? (
                  tableData?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item?.transaction_date
                            ? moment(item.transaction_date)
                                .utcOffset(8)
                                .format('YYYY/MM/DD HH:MM:SS')
                            : null}
                        </td>
                        <td>{item?.bonus}</td>
                        <td>{item?.currency}</td>
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
