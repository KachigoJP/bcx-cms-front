import React from 'react'
import { useTranslation } from 'react-i18next'

// UI Imports
import { Toast } from 'react-bootstrap'

// App Import menuDropdown
import { PrefContext } from '../../contexts/preferrence'

const ToastSystem = (props: any) => {
  // Hooks
  const { toastArr } = React.useContext(PrefContext)
  const [show, setShow] = React.useState(false)
  const { t } = useTranslation()

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    </Toast>
  )
}

export default ToastSystem
