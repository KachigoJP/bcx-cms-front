export interface IProfileForm {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  postcode: string;
  region: string;
  city: string;
  address: string;
  building: string;
  phoneCode: string;
  phoneNumber: string;
}

export interface IUserForm {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  postcode: string;
  region: string;
  city: string;
  address: string;
  building: string;
  phoneCode: string;
  phoneNumber: string;
  isVerified: string;
  isAccountInit: string;
  is2FAEnabled: string;
}
export interface ILoginForm {
  email: string;
  password: string;
  // recaptchaResponse: string;
}

export interface IForgotForm {
  email: string;
  recaptchaResponse: string;
}

export interface IResetForm {
  confirmationCode: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  emailToken: string;
}

export interface IChangePassForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ITwoFAForm {
  otpToken: string;
}

export interface IChangeMailForm {
  email: string;
  confirmEmail: string;
  otpToken?: number;
}

export interface IOtpForm {
  otpToken: number;
}

export interface ISettingForm {
  id?: string;
  key: string;
  label?: string;
  value: string;
  type: string;
  description?: string;
}
