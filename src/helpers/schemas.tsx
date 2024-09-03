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
    firstName: getErrorText(t, "firstName", {
      notRequired: true,
    }),
    lastName: getErrorText(t, "lastName", {
      notRequired: true,
    }),
    dateOfBirth: getErrorText(
      t,
      "dateOfBirth",
      {
        notRequired: true,
      },
      "date"
    ),
    gender: getErrorText(t, "gender", {
      notRequired: true,
    }),
    country: getErrorText(t, "country", {
      notRequired: true,
    }),
    postcode: getErrorText(t, "postcode", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    region: getErrorText(t, "region", {
      notRequired: true,
    }),
    city: getErrorText(t, "city", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    address: getErrorText(t, "address", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    building: getErrorText(t, "building", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    phoneCode: getErrorText(t, "phoneCode", {
      required: true,
    }),
    phoneNumber: getErrorText(t, "phoneNumber", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    language: Yup.string().nullable(),
  }) as Yup.ObjectSchema<IProfileForm>;
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

export const getSettingSchema = (t: TFunction) => {
  return Yup.object().shape({
    key: getErrorText(t, "key", {
      required: true,
      minLength: 1,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    type: getErrorText(t, "type", {
      required: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    label: getErrorText(t, "label", {
      notRequired: true,
      maxLength: FIELD_LIMIT.MAX_CHARACTER,
    }),
    value: getErrorText(t, "value", {
      required: true,
      minLength: 1,
    }),
    description: getErrorText(t, "value", {
      notRequired: true,
    }),
  });
};

export const getUserSchema = (t: TFunction) => {
  return Yup.object().shape({
    password: (
      getErrorText(t, "password", {
        notRequired: true,
      }) as Yup.StringSchema
    )
      .matches(REGEX.PASSWORD, {
        message: t(
          "Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=`|(){}[]:;\"'<>,?/"
        ),
        excludeEmptyString: true,
      })
      .default(null),
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
    dateOfBirth: getErrorText(
      t,
      "dateOfBirth",
      {
        notRequired: true,
      },
      "date"
    ),
    gender: getErrorText(t, "gender", {
      required: true,
    }),
    country: getErrorText(t, "country", {
      notRequired: true,
    }),
    postcode: getErrorText(t, "postcode", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    region: getErrorText(t, "region", {
      notRequired: true,
    }),
    city: getErrorText(t, "city", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    address: getErrorText(t, "address", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    building: getErrorText(t, "building", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_ADDRESS_CHARACTER,
    }),
    phoneCode: getErrorText(t, "phoneCode", {
      required: true,
    }),
    phoneNumber: getErrorText(t, "phoneNumber", {
      notRequired: true,
      max: FIELD_LIMIT.MAX_PHONE_NUMBER,
    }),
    isVerified: getErrorText(t, "isVerified", {
      required: true,
    }),
    is2FAEnabled: getErrorText(t, "is2FAEnabled", {
      required: true,
    }),
    isAccountInit: getErrorText(t, "isAccountInit", {
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
