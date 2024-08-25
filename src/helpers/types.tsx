export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountLevel: string;
  accountNumber: number;
  affiliateCode: number;
  applicantType: string;
  dateOfBirth: string;
  gender: string;
  walletAddress: string;
  country: string;
  postcode: string;
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

// Exchange types
export type ExchangeForm = {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string;
};

export type ConfirmState = {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  fee: number;
  fromBeforeAmount: number;
  fromAfterAmount: number;
  toBeforeAmount: number;
  toAfterAmount: number;
};
export type Balance = {
  name: string;
  balance: number;
};
export type Estimate = {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  fee: number;
};
export type ConfirmData = {
  estimate: Estimate;
  balances: Balance[];
};

// Transfer types
export type TransferForm = {
  walletTo: string;
  amount: number;
  message: string;
  currency: string;
};
export type TransferData = {
  currency: string;
  amount: number;
  fee: number;
  destinationAddress: string;
};
export type TransferVefify = {
  verify: boolean;
  message: string;
  data: TransferData;
};
export type TransferVefifyState = {
  message: string;
  currency: string;
  beforeTransfer: number;
  afterTransfer: number;
  amount: number;
  fee: number;
  destinationAddress: string;
};
export type VerifyData = {
  verify: TransferVefify;
  balances: Balance[];
};

export type WithdrawCryptoVerifyData = {
  currency: string;
  amount: number;
  fee: number;
  destinationAddress: string;
  message: string;
};

export type WithdrawCryptoVerify = {
  data: WithdrawCryptoVerifyData;
  verify: boolean;
  message: string;
};

type INDIVIDUAL = "Individual";
type CORPORATE = "CorporateCorporate";

export type RegisterState = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  applicantType?: INDIVIDUAL | CORPORATE;
  affiliateCode?: number;
  recaptchaResponse?: string;
  termsAndCondition?: boolean;
};

export type DepositForm = {
  amount: number;
  currency: string;
  fundingSource: string;
  otpToken?: string;
};

export type DepositEstimate = {
  amount: number;
  currency: string;
  fundingSource: string;
  fee: number;
};

export type WithdrawPaypalForm = {
  email: string;
  amount: number;
  currency: string;
  otpToken?: string;
};

export type WithdrawFiatEstimate = {
  email: string;
  amount: number;
  currency: string;
  fee: number;
};

export type OptionItem = {
  label: string;
  value: string;
};
