export type AuthUser = {
  id: string;
  email: string;
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
  is2FAEnabled: boolean;
  isInformationUpdated: boolean;
  isKyc: number;
  language: string;
  role: string;
  refererCode: string;
} | null;

export type RegisterState = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  recaptchaResponse?: string;
  termsAndCondition?: boolean;
};

export type OptionItem = {
  label: string;
  value: string;
};
