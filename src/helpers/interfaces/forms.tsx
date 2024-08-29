export interface IProfileForm {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: string;
  postcode: string;
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  streetNo: string;
  apartment: string;
  phone: string;
  phoneCode: string;
  language: string;
  otpToken: number;
}

export interface IUserForm {
  email: string;
  password: string;
  accountLevel: string;
  applicantType: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  postcode: string;
  country: string;
  region: string;
  city: string;
  district: string;
  address: string;
  streetNo: string;
  apartment: string;
  phone: string;
  phoneCode: string;
  language: string;
  isVerified: string;
  isKyc: string;
  isInformationUpdated: string;
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
export type IOtpForm = {
  otpToken: number;
};
