import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI Imports
import { Form, Button } from 'react-bootstrap'

// Apps Imports
import { getCountryName } from '../../helpers/functions'
import { RegisterState } from '../../helpers/types'
import { getRegisterAgreeSchema } from '../../helpers/schemas'
import { CAPTCHA_KEY } from '../../helpers/constants'

type RegisterForm = {
  termsAndCondition: string
  recaptchaResponse: string
}

type Props = {
  state: RegisterState
  backPrevStep?: () => void
  onSubmit?: Function
}

const RegisterInfoStep: React.FC<Props> = (props) => {
  // Hooks
  const { t, i18n } = useTranslation()
  const recaptchaRef = React.useRef<any>()

  // Forms
  const validationSchema = getRegisterAgreeSchema(t)
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>(formOptions)

  // Methods
  const onSubmit = (data: RegisterForm) => {
    if (props.onSubmit) {
      const submitData = {
        termsAndCondition: data.termsAndCondition,
        recaptchaResponse: data.recaptchaResponse,
      }
      props.onSubmit(submitData)
      recaptchaRef.current.reset()
    }
  }

  return (
    <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
      <p>{t('Please double check the information you provided')}</p>
      <Form.Group className="mb-3">
        <Form.Label>{t('Email')}</Form.Label>
        <Form.Control disabled value={props.state.email || ''} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('First Name')}</Form.Label>
        <Form.Control disabled value={props.state.firstName || ''} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('Last Name')}</Form.Label>
        <Form.Control disabled value={props.state.lastName || ''} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('Date of Birth')}</Form.Label>
        <Form.Control
          disabled
          value={
            props.state.dateOfBirth
              ? moment(props.state.dateOfBirth).format('YYYY/MM/DD')
              : ''
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('Country')}</Form.Label>
        <Form.Control
          disabled
          value={
            props.state?.country
              ? getCountryName(props.state?.country, i18n.language)
              : null
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <p>
          <input
            type="checkbox"
            {...register('termsAndCondition')}
            className="me-2"
          />
          {t('I agree all statements in ')}
          <a href="#">{t('Terms of services')}</a>
        </p>
        <Form.Text className="text-danger">
          {errors.termsAndCondition?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Controller
          control={control}
          name="recaptchaResponse"
          rules={{ required: true }}
          render={({ field }) => (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={CAPTCHA_KEY}
              onChange={(token: string | null) => {
                field.onChange(token)
              }}
            />
          )}
        />

        <Form.Text className="text-danger">
          {errors.recaptchaResponse?.message}
        </Form.Text>
      </Form.Group>
      <Button className="mt-3 me-3 btn-dark" onClick={props.backPrevStep}>
        {t('Back')}
      </Button>
      <Button className="mt-3" type="submit">
        {t('Register')}
      </Button>
    </Form>
  )
}

export default RegisterInfoStep
