import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
// App imports
import Currencies from '../../assets/json/currencies.json'

const Component: React.FC = () => {
  const { t } = useTranslation()

  const currencies: any = Currencies
  return (
    <React.Fragment>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{t('New Bank Information')}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="justify-content-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('Bank Name')}</Form.Label>
            <Form.Control type="email" placeholder={t('Enter bank name')} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('Currency')}</Form.Label>
            <Form.Control as="select">
              {Object.keys(currencies).map((key: string) => {
                return (
                  <option value={key}>
                    {`${key} - ${currencies[key].name}`}
                  </option>
                )
              })}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" type="submit">
            {t('Add')}
          </Button>
        </Modal.Footer>
      </Form>
    </React.Fragment>
  )
}

export default Component
