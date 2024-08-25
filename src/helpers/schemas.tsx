// React Imports
import * as Yup from "yup";
import { TFunction } from "i18next";

// Apps Import
import { getErrorText } from "./functions";
import { SUPPORTED_FORMATS, REGEX, FIELD_LIMIT } from "./constants";
import { IProfileForm, IChangePassForm } from "./interfaces";

export const getProfileFormSchema = (t: TFunction) => {
  return Yup.object().shape({
    gender: getErrorText(t, "gender", {
      required: true,
    }),
    postcode: getErrorText(t, "postcode", {
      required: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    region: getErrorText(t, "region", {
      required: true,
    }),
    city: getErrorText(t, "city", {
      required: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    district: getErrorText(t, "district", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    street: getErrorText(t, "street", {
      required: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    apartment: getErrorText(t, "apartment", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    streetNo: getErrorText(t, "streetNo", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    phoneCode: getErrorText(t, "phoneCode", {
      required: true,
    }),
    phoneNumber: getErrorText(t, "phoneNumber", {
      required: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    language: Yup.string().nullable(),
  }) as Yup.ObjectSchema<IProfileForm>;
};

export const getChangeEmailSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
    confirmEmail: Yup.string().oneOf(
      [Yup.ref("email"), undefined],
      t("{{ field1 }} and {{ field2 }} do not match. Please try again.", {
        field1: t("email"),
        field2: t("confirmEmail"),
      })
    ),
  });
};

export const getChangeInvitationSchema = (t: TFunction) => {
  return Yup.object().shape({
    invitationCode: (
      getErrorText(t, "invitationCode", {
        notRequired: true,
        maxLength: FIELD_LIMIT.INVITE_CODE_LENGTH,
      }) as Yup.StringSchema
    ).matches(
      REGEX.INVITATION_CODE,
      t("{{ field }} must be at least {{ value }} characters long", {
        field: t("Invitation Code"),
        value: FIELD_LIMIT.INVITE_CODE_LENGTH,
      })
    ),
  });
};

const getFileValidation = (field: string, t: TFunction) => {
  return Yup.mixed<FileList>()
    .test(
      "fileSize",
      t("You only can upload photo max 5MB. Please re-upload the picture"),
      (file) => {
        if (!file?.length) return true; // attachment is optional
        return file[0].size <= 5000000;
      }
    )
    .test(
      "fileType",
      t(
        "Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed. "
      ),
      (file) => {
        if (!file?.length) return true; // attachment is optional
        return SUPPORTED_FORMATS.includes(file[0].type);
      }
    );
};

export const getKYCSchema = (t: TFunction) => {
  return Yup.object().shape({
    frontCard: getFileValidation("frontCard", t).test(
      "exist",
      t("{{ field }} is mandatory.", { field: t("frontCard") }),
      (file) => {
        return file && file.length > 0;
      }
    ),
    backCard: getFileValidation("backCard", t).test(
      "exist",
      t("{{ field }} is mandatory.", { field: t("backCard") }),
      (file) => {
        return file && file.length > 0;
      }
    ),
    handheld: getFileValidation("handheld", t).test(
      "exist",
      t("{{ field }} is mandatory.", { field: t("handheld") }),
      (file) => {
        return file && file.length > 0;
      }
    ),
    proofOfAddress: Yup.array()
      .notRequired()
      .of(getFileValidation("proofOfAddress", t)),
  });
};

export const getWithdrawCryptoSchema = (t: TFunction) => {
  return Yup.object().shape({
    walletTo: getErrorText(t, "walletTo", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      // regex: REGEX.EMAIL,
    }),
    amount: getErrorText(
      t,
      "amount",
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_TRANSFER_AMOUNT,
        // maxAmount: FIELD_LIMIT.MAX_TRANSFER_AMOUNT,
      },
      "number"
    ),
    currency: getErrorText(t, "currency", {
      required: true,
    }),
    message: getErrorText(t, "message", {
      notRequired: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      // regex: REGEX.MESSAGE,
    }),
  });
};

export const getTransferSchema = (t: TFunction) => {
  return Yup.object().shape({
    walletTo: getErrorText(t, "walletTo", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      // regex: REGEX.EMAIL,
    }),
    amount: getErrorText(
      t,
      "amount",
      {
        required: true,
        min: 1,
        minAmount: FIELD_LIMIT.MIN_TRANSFER_AMOUNT,
        // maxAmount: FIELD_LIMIT.MAX_TRANSFER_AMOUNT,
      },
      "number"
    ),
    currency: getErrorText(t, "currency", {
      required: true,
    }),
    message: getErrorText(t, "message", {
      notRequired: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      // regex: REGEX.MESSAGE,
    }),
  });
};

export const getChangePassSchema = (t: TFunction) => {
  return Yup.object().shape({
    currentPassword: getErrorText(t, "currentPassword", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_PASSWORD,
      minLength: FIELD_LIMIT.MIN_PASSWORD,
      regexPassword: REGEX.PASSWORD,
    }),
    newPassword: getErrorText(t, "newPassword", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_PASSWORD,
      minLength: FIELD_LIMIT.MIN_PASSWORD,
      regexPassword: REGEX.PASSWORD,
    }),
    confirmPassword: (
      getErrorText(t, "confirmPassword", {
        required: true,
      }) as Yup.StringSchema
    ).oneOf(
      [Yup.ref("newPassword"), undefined],
      t("{{ field1 }} and {{ field2 }} do not match. Please try again.", {
        field1: t("newPassword"),
        field2: t("newConfirmPassword"),
      })
    ),
  }) as Yup.ObjectSchema<IChangePassForm>;
};

export const getRegisterEmailSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: (
      getErrorText(t, "email", {
        required: true,
        minLength: FIELD_LIMIT.MIN_EMAIL_LENGTH,
        maxLength: FIELD_LIMIT.MAX_CHARACTER,
      }) as Yup.StringSchema
    ).matches(
      REGEX.EMAIL,
      t(" Eメールの入力形式が間違っています。もう一度試してください。", {
        field: t("email"),
        value: REGEX.EMAIL,
      })
    ),
    affiliateCode: (
      getErrorText(t, "affiliateCode", {
        notRequired: true,
        maxLength: FIELD_LIMIT.INVITE_CODE_LENGTH,
      }) as Yup.StringSchema
    ).matches(
      REGEX.INVITATION_CODE,
      t(
        "{{ field }} must be at least {{ value }} characters long. Please try again!",
        {
          field: t("affiliateCode"),
          value: FIELD_LIMIT.INVITE_CODE_LENGTH,
        }
      )
    ),
  });
};

export const getRegisterInputSchema = (t: TFunction) => {
  return Yup.object().shape({
    password: getErrorText(t, "password", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_PASSWORD,
      minLength: FIELD_LIMIT.MIN_PASSWORD,
      regexPassword: REGEX.PASSWORD,
    }),
    confirmPassword: (
      getErrorText(t, "confirmPassword", {
        required: true,
      }) as Yup.StringSchema
    ).oneOf(
      [Yup.ref("password"), undefined],
      t("{{ field1 }} and {{ field2 }} do not match. Please try again.", {
        field1: t("password"),
        field2: t("confirmPassword"),
      })
    ),
    firstName: getErrorText(t, "firstName", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    lastName: getErrorText(t, "lastName", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    dateOfBirth: getErrorText(t, "dateOfBirth", {
      required: true,
    }),
    country: getErrorText(t, "country", {
      required: true,
    }),
  });
};

export const getRegisterAgreeSchema = (t: TFunction) => {
  return Yup.object().shape({
    termsAndCondition: Yup.bool().oneOf(
      [true],
      t("Please agree to Terms and Conditions.")
    ),
    recaptchaResponse: getErrorText(t, "recaptchaResponse", {
      required: true,
    }),
  });
};

export const getDepositSchema = (t: TFunction) => {
  return Yup.object().shape({
    amount: getErrorText(
      t,
      "amount",
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_TRANSFER_AMOUNT,
        // maxAmount: FIELD_LIMIT.MAX_TRANSFER_AMOUNT,
      },
      "number"
    ),
    currency: getErrorText(t, "currency", {
      required: true,
    }),
    fundingSource: getErrorText(t, "fundingSource", {
      required: true,
    }),
  });
};

export const getWithdrawFiatSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
    amount: getErrorText(
      t,
      "amount",
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_TRANSFER_AMOUNT,
        // maxAmount: FIELD_LIMIT.MAX_TRANSFER_AMOUNT,
      },
      "number"
    ),
    currency: getErrorText(t, "currency", {
      required: true,
    }),
  });
};

export const getExchangeSchema = (t: TFunction) => {
  return Yup.object().shape({
    fromAmount: getErrorText(
      t,
      "fromAmount",
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_TRANSFER_AMOUNT,
      },
      "number"
    ),
    fromCurrency: getErrorText(t, "toCurrency", {
      required: true,
    }),
    toCurrency: getErrorText(t, "toCurrency", {
      required: true,
    }),
  });
};

export const getOtpSchema = (t: TFunction) => {
  return Yup.object().shape({
    otpToken: (
      getErrorText(t, "otpToken", {
        required: true,
        maxLength: FIELD_LIMIT.OTP_CODE,
      }) as Yup.StringSchema
    ).matches(
      REGEX.OTP_CODE,
      t(
        "{{ field }} must be at least {{ value }} characters long. Please try again!",
        {
          field: t("otpToken"),
          value: FIELD_LIMIT.OTP_CODE,
        }
      )
    ),
  });
};

export const get2FASchema = (t: TFunction) => {
  return Yup.object().shape({
    otpToken: (
      getErrorText(t, "otpToken", {
        required: true,
        maxLength: FIELD_LIMIT.OTP_CODE,
      }) as Yup.StringSchema
    ).matches(
      REGEX.OTP_CODE,
      t(
        "{{ field }} must be at least {{ value }} characters long. Please try again!",
        {
          field: t("otpToken"),
          value: FIELD_LIMIT.OTP_CODE,
        }
      )
    ),
  });
};

export const getLoginSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: (
      getErrorText(t, "email", {
        required: true,
        maxLength: FIELD_LIMIT.MAX_CHARACTER,
      }) as Yup.StringSchema
    ).matches(
      REGEX.EMAIL,
      t("Eメール 間違ったフォーマット。 もう一度やり直してください。", {
        field: t("email"),
        value: REGEX.EMAIL,
      })
    ),
    password: getErrorText(t, "password", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_PASSWORD,
      //minLength: FIELD_LIMIT.MIN_PASSWORD,
    }),
  });
};

export const getResetPassSchema = (t: TFunction) => {
  return Yup.object().shape({
    password: getErrorText(t, "password", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_PASSWORD,
      minLength: FIELD_LIMIT.MIN_PASSWORD,
      regexPassword: REGEX.PASSWORD,
    }),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), undefined],
      t("The password confirmation does not match")
    ),
    dateOfBirth: getErrorText(
      t,
      "dateOfBirth",
      {
        required: true,
      },
      "date"
    ),
    confirmationCode: (
      getErrorText(t, "confirmationCode", {
        required: true,
        maxLength: FIELD_LIMIT.RESET_CONFIRM_CODE,
      }) as Yup.StringSchema
    ).matches(
      REGEX.RESET_CONFIRM_CODE,
      t(
        "{{ field }} must be at least {{ value }} characters long. Please try again!",
        {
          field: t("confirmationCode"),
          value: FIELD_LIMIT.RESET_CONFIRM_CODE,
        }
      )
    ),
  });
};

export const getForgotPassSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
  });
};

export const getNotificationSchema = (t: TFunction) => {
  return Yup.object().shape({
    title: Yup.string().required(
      t("{{ field }} is mandatory.", { field: t("Title") })
    ),
    detail: Yup.string().required(
      t("{{ field }} is mandatory.", { field: t("Detail") })
    ),
    startDate: Yup.date().required(
      t("{{ field }} is mandatory.", { field: t("Start Date") })
    ),
    endDate: Yup.date()
      .required(t("{{ field }} is mandatory.", { field: t("End Date") }))
      .when(
        "startDate",
        (startDate, Yup) =>
          startDate &&
          Yup.min(startDate, t("End Date cannot be before Start Date"))
      ),
  });
};

export const getAdminSettingSchema = (t: TFunction) => {
  return Yup.object().shape({
    usd: getErrorText(
      t,
      "USD",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
    eur: getErrorText(
      t,
      "EUR",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
    jpy: getErrorText(
      t,
      "JPY",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
    mxn: getErrorText(
      t,
      "MXN",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
    usdt: getErrorText(
      t,
      "USDT",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
    bnb: getErrorText(
      t,
      "USDT",
      {
        required: true,
        minAmount: 0,
      },
      "number"
    ),
  });
};

export const getAdminCommissionSchema = (t: TFunction) => {
  return Yup.object().shape({
    commission: getErrorText(
      t,
      "Commission",
      {
        required: true,
        min: FIELD_LIMIT.MIN_RATE,
        max: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
  });
};

export const getAdminUserSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
    password: (
      getErrorText(t, "password", {
        notRequired: true,
        maxLength: FIELD_LIMIT.MAX_PASSWORD,
        // minLength: FIELD_LIMIT.MIN_PASSWORD,
        // regexPassword: REGEX.PASSWORD,
      }) as Yup.StringSchema
    )
      .matches(REGEX.PASSWORD, {
        message: t(
          "Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=`|(){}[]:;\"'<>,?/"
        ),
        excludeEmptyString: true,
      })
      .default(null),
    accountLevel: getErrorText(t, "accountLevel", {
      required: true,
    }),
    applicantType: getErrorText(t, "applicantType", {
      required: true,
    }),
    firstName: getErrorText(t, "firstName", {
      required: true,
      minLength: 1,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    lastName: getErrorText(t, "lastName", {
      required: true,
      minLength: 1,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    isVerified: getErrorText(t, "isVerified", {
      required: true,
    }),
    is2FAEnabled: getErrorText(t, "is2FAEnabled", {
      required: true,
    }),
    isInformationUpdated: getErrorText(t, "isInformationUpdated", {
      required: true,
    }),
    isKyc: getErrorText(t, "isKyc", {
      required: true,
    }),
  });
};

export const getAffiliateRateSchema = (t: TFunction) => {
  return Yup.object().shape({
    level_0: getErrorText(
      t,
      t("Level {{ level }} Rate", { level: 0 }),
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_RATE,
        maxAmount: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
    level_1: getErrorText(
      t,
      t("Level {{ level }} Rate", { level: 1 }),
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_RATE,
        maxAmount: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
    level_2: getErrorText(
      t,
      t("Level {{ level }} Rate", { level: 2 }),
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_RATE,
        maxAmount: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
    level_3: getErrorText(
      t,
      t("Level {{ level }} Rate", { level: 3 }),
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_RATE,
        maxAmount: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
    level_4: getErrorText(
      t,
      t("Level {{ level }} Rate", { level: 4 }),
      {
        required: true,
        minAmount: FIELD_LIMIT.MIN_RATE,
        maxAmount: FIELD_LIMIT.MAX_RATE,
      },
      "number"
    ),
  });
};

export const affiliateUpgradeUserSchema = (t: TFunction) => {
  return Yup.object().shape({
    // level: getErrorText(t, 'level', {
    //   required: true,
    // }),
    upperUser: getErrorText(t, "reference_id", {
      required: true,
    }),
  });
};

export const depositAndWithdrawalLimitSchema = (t: TFunction) => {
  return Yup.object().shape({
    minBankingDeposit: getErrorText(
      t,
      "minBankingDeposit",
      {
        required: true,
        //regex: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxBankingDeposit: getErrorText(
      t,
      "maxBankingDeposit",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    minBankingWithdrawal: getErrorText(
      t,
      "minBankingWithdrawal",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxBankingWithdrawal: getErrorText(
      t,
      "Maximum Banking – Withdrawal",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    minCryptocurrencyDeposit: getErrorText(
      t,
      "Minimum Cryptocurrency  – Deposit",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxCryptocurrencyDeposit: getErrorText(
      t,
      "Maximum Cryptocurrency  – Deposit",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    minCryptocurrencyWithdrawal: getErrorText(
      t,
      "Minimum Cryptocurrency  – Withdrawal",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxCryptocurrencyWithdrawal: getErrorText(
      t,
      "Maximum Cryptocurrency  – Withdrawal",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    minCreditCardDeposit: getErrorText(
      t,
      "Minimum Credit Card – Deposit",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxCreditCardDeposit: getErrorText(
      t,
      "Maximum Credit Card – Deposit",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    minExchange: getErrorText(
      t,
      "Minimum Exchange",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
    maxExchange: getErrorText(
      t,
      "Maximum Exchange",
      {
        required: true,
        //regexPassword: REGEX.FLOAT_NUMBER,
      },
      "number"
    ),
  });
};

export const settingFeeSchema = (t: TFunction) => {
  return Yup.object().shape({
    accountOpenFastFee: getErrorText(
      t,
      "Account Opening",
      {
        required: true,
      },
      "number"
    ),
    accountOpenPersonalFee: getErrorText(
      t,
      "Account Opening",
      {
        required: true,
      },
      "number"
    ),
    accountOpenBussinessFee: getErrorText(
      t,
      "Account Opening",
      {
        required: true,
      },
      "number"
    ),
    accountMaintenanceFastFee: getErrorText(
      t,
      "Account Maintenance Fee",
      {
        required: true,
      },
      "number"
    ),
    accountMaintenancePersonalFee: getErrorText(
      t,
      "Account Maintenance Fee",
      {
        required: true,
      },
      "number"
    ),
    accountMaintenanceBussinessFee: getErrorText(
      t,
      "Account Maintenance Fee",
      {
        required: true,
      },
      "number"
    ),
    internalTransfersFastFee: getErrorText(
      t,
      "Internal Transfers",
      {
        required: true,
      },
      "number"
    ),
    internalTransfersPersonalFee: getErrorText(
      t,
      "Internal Transfers",
      {
        required: true,
      },
      "number"
    ),
    internalTransfersBussinessFee: getErrorText(
      t,
      "Internal Transfers",
      {
        required: true,
      },
      "number"
    ),
    exchangeFastFee: getErrorText(
      t,
      "Exchange",
      {
        required: true,
      },
      "number"
    ),
    exchangePersonalFee: getErrorText(
      t,
      "Exchange",
      {
        required: true,
      },
      "number"
    ),
    exchangeBussinessFee: getErrorText(
      t,
      "Exchange",
      {
        required: true,
      },
      "number"
    ),
    depositInternationalFastFee: getErrorText(
      t,
      "Deposit – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    depositInternationalPersonalFee: getErrorText(
      t,
      "Deposit – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    depositInternationalBussinessFee: getErrorText(
      t,
      "Deposit – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    depositCryptocurrencyFastFee: getErrorText(
      t,
      "Deposit-Cryptocurrency",
      {
        required: true,
      },
      "number"
    ),
    depositCryptocurrencyPersonalFee: getErrorText(
      t,
      "Deposit-Cryptocurrency",
      {
        required: true,
      },
      "number"
    ),
    depositCryptocurrencyBussinessFee: getErrorText(
      t,
      "Deposit-Cryptocurrency",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferJPFastFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPFastFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferJPPersonalFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPPersonalFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPPersonalFeeUSD: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPPersonalFeeJYP: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferJPBussinessFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPBussinessFeeUSD: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferJPBussinessFeeJYP: getErrorText(
      t,
      "Withdrawal – Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalSpeedBankTransferJPFastFee: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalSpeedBankTransferJPPersonalFee: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalSpeedBankTransferJPPersonalFeeUSD: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalSpeedBankTransferJPPersonalFeeJYP: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalSpeedBankTransferJPBussinessFee: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalSpeedBankTransferJPBussinessFeeUSD: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalSpeedBankTransferJPBussinessFeeJYP: getErrorText(
      t,
      "Withdrawal – Speed Bank Transfer (Japan)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferInternationalFastFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferInternationalPersonalFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferInternationalPersonalFeeUSD: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferInternationalPersonalFeeEUR: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBankTransferInternationalBussinessFee: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferInternationalBussinessFeeUSD: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBankTransferInternationalBussinessFeeEUR: getErrorText(
      t,
      "Withdrawal – Bank Transfer (International)",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBTCFastFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBTCFastFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBTCPersonalFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBTCPersonalFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    withdrawalBTCBussinessFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalBTCBussinessFee: getErrorText(
      t,
      "Withdrawal – BTC",
      {
        required: true,
      },
      "number"
    ),
    withdrawalETHFastFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalETHFastFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    withdrawalETHPersonalFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalETHPersonalFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    withdrawalETHBussinessFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalETHBussinessFee: getErrorText(
      t,
      "Withdrawal – ETH",
      {
        required: true,
      },
      "number"
    ),
    withdrawalXRPFastFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalXRPFastFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    withdrawalXRPPersonalFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalXRPPersonalFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    withdrawalXRPBussinessFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalXRPBussinessFee: getErrorText(
      t,
      "Withdrawal – XRP",
      {
        required: true,
      },
      "number"
    ),
    withdrawalUSDTPerUSDCFastFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalUSDTPerUSDCFastFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    withdrawalUSDTPerUSDCPersonalFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalUSDTPerUSDCPersonalFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    withdrawalUSDTPerUSDCBussinessFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    minWithdrawalUSDTPerUSDCBussinessFee: getErrorText(
      t,
      "Withdrawal – USDT / USDC",
      {
        required: true,
      },
      "number"
    ),
    accountManagementFastFee: getErrorText(
      t,
      "Inactive account management fee (12 months)",
      {
        required: true,
      },
      "number"
    ),
    accountManagementPersonalFee: getErrorText(
      t,
      "Inactive account management fee (12 months)",
      {
        required: true,
      },
      "number"
    ),
    accountManagementBussinessFee: getErrorText(
      t,
      "Inactive account management fee (12 months)",
      {
        required: true,
      },
      "number"
    ),
  });
};

export const witdrawFeeSchema = (t: TFunction) => {
  return Yup.object().shape({
    // withdrawFeeRateFiat: getErrorText(t, 'Withdraw Fee Rate', {
    //   notRequired: true,
    // }),
  });
};

export const exchangeFeeSchema = (t: TFunction) => {
  return Yup.object().shape({
    // withdrawFeeRateFiat: getErrorText(t, 'Withdraw Fee Rate', {
    //   notRequired: true,
    // }),
  });
};

export const depositFeeSchema = (t: TFunction) => {
  return Yup.object().shape({
    // withdrawFeeRateFiat: getErrorText(t, 'Withdraw Fee Rate', {
    //   notRequired: true,
    // }),
  });
};
