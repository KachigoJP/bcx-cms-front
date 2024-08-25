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
        <Modal.Title>{t('Deposit Cash')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <Row className="m-2">
          <Link
            role="button"
            className="btn btn-primary"
            to={ROUTES.DEPOSIT_CARD}
          >
            {t('Deposit from Credit Card')}
          </Link>
        </Row> */}
        <Row className="m-2">
          <Link
            role="button"
            className="btn btn-primary"
            to={ROUTES.DEPOSIT_PAYPAL}
          >
            {t('Deposit from Paypal')}
          </Link>
        </Row>
      </Modal.Body>
    </React.Fragment>
  )
}

export default Component
