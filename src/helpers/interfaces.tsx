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

export interface IChangePassForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
