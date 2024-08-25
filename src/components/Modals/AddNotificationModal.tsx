import React from 'react'
import { Button, Modal, Form, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// App imports
import { getNotificationSchema } from '../../helpers/schemas'
import { FieldError } from '../../helpers/api'

export type NotificationForm = {
  title: string;
  detail: string;
  id?: string;
}

type ModalProps = {
  onSubmit: (data: NotificationForm) => void
  isLoading?: boolean
  errors?: FieldError[]
  onChange?: () => void,
  data?: NotificationForm | null,
}

const AddNotification: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation()

  const validationSchema = getNotificationSchema(t)
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationForm>(formOptions)

  return (
    <React.Fragment>

      <Modal.Header closeButton>
        <Modal.Title>{props?.data ? t('Edit Notification') : t('New Notification')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(props.onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('Enter title')}
              {...register('title', {
                onChange: props.onChange,
                value: props?.data?.title || '',
              })} />
            <Form.Text className="text-danger">
              {errors.title?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t('Detail')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t('Enter detail')}
              {...register('detail', {
                onChange: props.onChange,
                value: props?.data?.detail || '',
              })}
            />
            <Form.Text className="text-danger">
              {errors.detail?.message}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {props.isLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-1">{t('Loading...')}</span>
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              {t('Submit')}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </React.Fragment>
  )
}

export default AddNotification
