import React from 'react'
import { Modal, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// App imports
import { ROUTES } from '../../helpers/constants'

const Component: React.FC = () => {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t('Withdraw Cash')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <Row className="m-2">
          <Button>{t('Withdraw to Credit card')}</Button>
        </Row> */}
        <Row className="m-2">
          <Link
            role="button"
            className="btn btn-primary"
            to={ROUTES.WITHDRAW_PAYPAL}
          >
            {t('Withdraw to Paypal')}
          </Link>
        </Row>
      </Modal.Body>
    </React.Fragment>
  )
}

export default Component
