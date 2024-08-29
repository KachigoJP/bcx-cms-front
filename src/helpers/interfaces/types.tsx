export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  postcode: string;
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  streetNo: string;
  apartment: string;
  phoneNumber: string;
  phoneCode: string;
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
