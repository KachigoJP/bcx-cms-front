import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// UI Imports
import { Form, Button, Row } from 'react-bootstrap'

// Apps Imports
import { RegisterState } from '../../helpers/types'
import { getRegisterInputSchema } from '../../helpers/schemas'
import Countries from '../../assets/json/countries.json'
// import DatePicker from '../Components/DatePicker'
import BirthdatePicker from '../Components/BirthdatePicker'

type RegisterForm = {
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
}

type Props = {
  state: RegisterState
  onSubmit?: Function
  backPrevStep?: () => void
}

const RegisterInfoStep: React.FC<Props> = (props) => {
  // Hooks
  const { t, i18n } = useTranslation()

  // Forms
  const validationSchema = getRegisterInputSchema(t)
  const formOptions = { resolver: yupResolver(validationSchema) }
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>(formOptions)

  // Methods
  const onSubmit = (data: RegisterForm) => {
    if (props.onSubmit) {
      const submitData = {
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
      }
      props.onSubmit(submitData)
    }
  }

  const onBirthdateChange = (value: Date) => {
    setValue('dateOfBirth', value.toDateString())
  }

  return (
    <Form className="mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>
          {t('Password')}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="password" {...register('password')} />
        <Form.Text className="text-danger">
          {errors.password?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          {t('Confirm Password')}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="password" {...register('confirmPassword')} />
        <Form.Text className="text-danger">
          {errors.confirmPassword?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          {t('First Name')}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          defaultValue={props.state.firstName}
          {...register('firstName')}
        />
        <Form.Text className="text-danger">
          {errors.firstName?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          {t('Last Name')}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          defaultValue={props.state.lastName}
          {...register('lastName')}
        />
        <Form.Text className="text-danger">
          {errors.lastName?.message}
        </Form.Text>
      </Form.Group>
      <Row>
        <Form.Label>
          {t('Date of Birth')}
          <span className="text-danger">*</span>
        </Form.Label>
        <BirthdatePicker
          defaultValue={(props.state.dateOfBirth
            ? moment.utc(props.state.dateOfBirth).toDate()
            : moment().utc().year(1970).startOf('year').toDate()
          ).toISOString()}
          onChange={onBirthdateChange}
        />
        <Form.Text className="text-danger">
          {errors.dateOfBirth?.message}
        </Form.Text>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>
          {t('Country')}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control as="select" {...register('country')}>
          {Countries.map((country) => {
            return (
              <option key={country.id} value={country.alpha2}>
                {i18n.language === 'jp' ? country.ja : country.en}
              </option>
            )
          })}
        </Form.Control>
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
