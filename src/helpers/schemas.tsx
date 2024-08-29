// React Imports
import * as Yup from "yup";
import { TFunction } from "i18next";

// Apps Import
import { getErrorText } from "./functions";
import { SUPPORTED_FORMATS, REGEX, FIELD_LIMIT } from "./constants";
import {
  IProfileForm,
  IChangePassForm,
  IForgotForm,
  ILoginForm,
  ITwoFAForm,
  IUserForm,
  IChangeMailForm,
  IResetForm,
} from "./interfaces";

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
  }) as Yup.ObjectSchema<IChangeMailForm>;
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
  }) as Yup.ObjectSchema<ITwoFAForm>;
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
  }) as Yup.ObjectSchema<ILoginForm>;
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
  }) as Yup.ObjectSchema<IResetForm>;
};

export const getForgotPassSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: getErrorText(t, "email", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
      regex: REGEX.EMAIL,
    }),
  }) as Yup.ObjectSchema<IForgotForm>;
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
  });
};
