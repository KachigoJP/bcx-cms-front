import React from 'react'
import { Modal, Row, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

type ModalProps = {
  onOk: () => void,
  title?: string,
}

const ConfirmModal: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t('Confirm')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="m-2">
          {props.title}
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" type="submit" onClick={props.onOk}>
          {t('OK')}
        </Button>
      </Modal.Footer>
    </React.Fragment>
  )
}

export default ConfirmModal
