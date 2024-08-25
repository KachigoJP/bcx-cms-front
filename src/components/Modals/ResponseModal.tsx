import React from 'react'
import { useTranslation } from 'react-i18next'
// Import UI
import {
  MdOutlineCancel,
  MdOutlineWarningAmber,
  MdOutlineCheckCircle,
} from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap'
type Props = {
  onClose: Function
  message: string
  type?: string // TODO: setup type
  title?: string
}
const ResponseModal: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation()
  const close = () => {
    props.onClose()
  }

  const renderIcon = () => {
    if (props.type === 'fail') {
      return <MdOutlineCancel size="5em" color="#dc3545" />
    } else if (props.type === 'warning') {
      return <MdOutlineWarningAmber size="5em" color="#ffbb33" />
    } else if (props.type === 'success') {
      return <MdOutlineCheckCircle size="5em" color="#00C851" />
    }
  }

  return (
    <React.Fragment>
      <Modal.Body className="text-center">
        {props.type ? renderIcon() : null}
        <h3>{props.title}</h3>
        {props.message}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={close}>{t('Close')}</Button>
      </Modal.Footer>
    </React.Fragment>
  )
}

export default ResponseModal
