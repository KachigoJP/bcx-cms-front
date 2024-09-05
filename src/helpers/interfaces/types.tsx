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
  isAccountInit: boolean;
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

export type SettingType = {
  id: string;
  key: string;
  label: string;
  value: string;
  type: string;
  description: string;
};

export type PageCategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type PageTagType = {
  id: string;
  name: string;
  slug: string;
};
