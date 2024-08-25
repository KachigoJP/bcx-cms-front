import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Card, Table, Pagination } from 'react-bootstrap'
import { MdRemoveRedEye } from 'react-icons/md'

type Props = {
  data: any
  level: string
  showUserModal: (show: boolean, id: string) => () => void
  changePage: (page: number, level: string) => () => void
}

const Component = (props: Props) => {
  const { t } = useTranslation()

  const tableData = props?.data
  const currentPage = tableData?.page || 1
  const startIdx = tableData?.pageSize * (currentPage - 1)
  const totalPage = tableData?.totalPage | 1

  return (
    <Card className="mst-2">
      <Card.Body>
        <Card.Title>{`${t(tableData?.level)}`}</Card.Title>
        <div className="table-responsive">
          <Table className="table">
            <thead>
              <tr>
                <th className="wd10">#</th>
                <th className="wd30">{t('Email')}</th>
                <th className="wd30">{t('First Name')}</th>
                <th className="wd15">{t('Last Name')}</th>
                <th className="wd15">{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData?.totalItem > 0 ? (
                tableData?.data.map((item: any, key: number) => {
                  return (
                    <tr key={key}>
                      <td>{startIdx + (key + 1)}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>
                        <Link
                          to="#"
                          onClick={() => props.showUserModal(true, item.id)}
                        >
                          <MdRemoveRedEye size={24} className="me-3" />
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    {t('No record')}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {tableData?.data && tableData.data.totalItem > 0 ? (
            <Pagination className="m-2">
              <Pagination.First onClick={props.changePage(1, props.level)} />
              {Array.from(
                Array(totalPage === 1 ? totalPage : totalPage - 1).keys()
              ).map((idx) => {
                const page = idx + 1
                return (
                  <Pagination.Item
                    key={idx}
                    onClick={props.changePage(page, props.level)}
                    active={page === currentPage}
                  >
                    {page}
                  </Pagination.Item>
                )
              })}
              <Pagination.Last
                onClick={props.changePage(
                  tableData?.totalPage | 1,
                  props.level
                )}
              />
            </Pagination>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Component
