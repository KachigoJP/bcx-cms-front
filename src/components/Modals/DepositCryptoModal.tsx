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
        <Modal.Title>{t('Deposit Crypto')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="m-2">
          <Link
            role="button"
            className="btn btn-primary btn-lg"
            to={ROUTES.DEPOSIT_CRYPTO}
          >
            {t('Deposit by Hot Wallet')}
          </Link>
        </Row>
        <Row className="m-2">
          <Link
            role="button"
            className="btn btn-primary btn-lg"
            to={ROUTES.DEPOSIT_CRYPTO}
          >
            {t('Deposit by Cold Wallet')}
          </Link>
        </Row>
      </Modal.Body>
    </React.Fragment>
  )
}

export default Component
