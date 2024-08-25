import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HOMEPAGE_LINKS } from '../../helpers/constants'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <footer className="footer align-items-center px-4 py-3 border-top small">
        <Row className="justify-content-md-center">
          <Col className="text-center">
            <a href={HOMEPAGE_LINKS.ABOUT} className="footer-link" target="_blank">
              {t('About Us')}
            </a>
            <a href={HOMEPAGE_LINKS.TERMS} className="footer-link" target="_blank">
              {t('Term & Condition')}
            </a>
            <a href={HOMEPAGE_LINKS.PRIVACY} className="footer-link" target="_blank">
              {t('Privacy Policy')}
            </a>
            <a href={HOMEPAGE_LINKS.FEE} className="footer-link" target="_blank">
              {t('Fee list')}
            </a>
            <a href={HOMEPAGE_LINKS.CONTACT} className="footer-link" target="_blank">
              {t('Contact Us')}
            </a>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center">
            <p className="text-muted mb-1 mb-md-0">
              Copyright © Rays Wallet All Rights Reserved.
            </p>
          </Col>
        </Row>
      </footer>
    </React.Fragment >
  )
}

export default Footer
