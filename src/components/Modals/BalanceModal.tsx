import React from 'react'
import { useTranslation } from 'react-i18next'

// UI Imports
import { Modal, Spinner, Table } from 'react-bootstrap'

// App imports
import { API } from '../../helpers/constants'
import { useApi } from '../../helpers/api'

const Component: React.FC = () => {
  const { t } = useTranslation()
  const [currencies, setCurrencies] = React.useState([])

  // APIs
  const { state, sendRequest } = useApi(API.BALANCE)

  // Effect
  React.useEffect(() => {
    sendRequest({
      method: 'get',
      data: {},
    })
  }, [])

  React.useEffect(() => {
    const response = state.data
    if (response && response.status === 200) {
      const data: any = response.data
      if (data.data) setCurrencies(Object.values(data.data))
    }
  }, [state])

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t('Balance')}</Modal.Title>
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
          <Table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('Currency')}</th>
                <th>{t('Amount')}</th>
              </tr>
            </thead>
            <tbody>
              {currencies.length > 0
                ? currencies.map((currency: any, idx: number) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{currency.name}</td>
                        <td>{currency.balance}</td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </React.Fragment>
  )
}

export default Component
