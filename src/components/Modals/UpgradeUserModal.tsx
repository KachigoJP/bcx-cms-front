import React from 'react'
import { Button, Modal, Form, Spinner, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// App imports
import { affiliateUpgradeUserSchema } from '../../helpers/schemas'
import { useApi, FieldError } from '../../helpers/api'
import { API } from '../../helpers/constants'

export type UpgradeUserForm = {
  level: string
  upperUser: string
  id?: string
  email?: string
}

type ModalProps = {
  onSubmit: (data: UpgradeUserForm) => void
  isLoading?: boolean
  errors?: FieldError[]
  data?: UpgradeUserForm | null
}

const UpgradeUser: React.FC<ModalProps> = (props) => {
  const { t } = useTranslation()

  const [upperUsers, setUpperUsers] = React.useState<any>([])

  const validationSchema = affiliateUpgradeUserSchema(t)
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpgradeUserForm>(formOptions)

  const { state, sendRequest } = useApi(API.MASTER_TEAM_USERS)

  // Effects
  React.useEffect(() => {
    if (!state.data) {
      sendRequest({
        method: 'get',
      })
    }
    return () => {}
  }, [])
  // Effects
  React.useEffect(() => {
    const response = state.data
    if (response && response.status === 200) {
      const userOptions = response.data.data.map((item: any) => {
        return {
          id: item.id,
          label: `(${t(item.level)}) ${item.email}`,
        }
      })
      setUpperUsers(userOptions)
    }
  }, [state])

  const onSubmit = (data: UpgradeUserForm) => {
    props.onSubmit(data)
  }

  const onValuesChange = (event: any, value: any) => {
    setValue('upperUser', value.id)
  }

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{t('Upgrade Affiliate User')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t('User')}
            </Form.Label>
            <Col sm={6}>
              <Form.Label>{props?.data?.email}</Form.Label>
            </Col>
          </Row>
          {/* <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t('Affiliate Level')}
            </Form.Label>
            <Col sm={6}>
              <Form.Select defaultValue="1" {...register('level')}>
                <option value="LEVEL_1">{t('Level 1')}</option>
                <option value="LEVEL_2">{t('Level 2')}</option>
                <option value="LEVEL_3">{t('Level 3')}</option>
                <option value="LEVEL_4">{t('Level 4')}</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.level?.message}
              </Form.Text>
            </Col>
          </Row> */}

          <Row className="mb-3">
            <Form.Label className="col-md-3 col-form-label">
              {t('Upper User')}
            </Form.Label>
            <Col sm={6}>
              <Autocomplete
                options={upperUsers}
                getOptionLabel={(option: any) => option.label}
                onChange={onValuesChange}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    // {...register('upperUser')}
                    variant="outlined"
                  />
                )}
              />
              <Form.Text className="text-danger">
                {errors.upperUser?.message}
              </Form.Text>
            </Col>
          </Row>
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

export default UpgradeUser
