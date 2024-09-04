import * as yup from "yup";
import Countries from "assets/json/countries.json";

type Option = {
  email?: boolean;
  required?: boolean;
  notRequired?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minAmount?: number;
  maxAmount?: number;
  regex?: RegExp;
  regexPassword?: RegExp;
};

export const getErrorText = (
  translate: (arg0: string, arg1?: any) => yup.Message<{}>,
  field: string,
  option: Option,
  type: string = "string"
) => {
  let result: yup.StringSchema | yup.NumberSchema | yup.DateSchema = yup
    .string()
    .trim();
  if (type === "number") {
    result = yup.number().typeError(
      translate("{{ field }} is mandatory.", {
        field: translate(field),
      })
    );
  } else if (type === "date") {
    result = yup.date();
  }

  // Required
  if (option.required)
    result = result.required(
      translate("{{ field }} is mandatory.", { field: translate(field) })
    );
  // Email
  if (option.email)
    result = (result as yup.StringSchema).email(
      translate("{{ field }} is mandatory.", { field: translate(field) })
    );
  if (option.min) {
    result = result.min(
      option.min,
      translate("{{ field }} can be min {{ value }}. Please try again!", {
        field: translate(field),
        value: option.min,
      })
    );
  }
  if (option.max) {
    result = result.max(
      option.max,
      translate("{{ field }} can be max {{ value }} characters long", {
        field: translate(field),
        value: option.max,
      })
    );
  }
  if (option.minLength) {
    result = result.min(
      option.minLength,
      translate(
        "{{ field }} must be at least {{ value }} characters long. Please try again!",
        { field: translate(field), value: option.minLength }
      )
    );
  }
  if (option.maxLength) {
    result = result.max(
      option.maxLength,
      translate(
        "{{ field }} can be max {{ value }} characters long. Please try again!",
        {
          field: translate(field),
          value: option.maxLength,
        }
      )
    );
  }
  if (typeof option.minAmount !== "undefined") {
    result = result.min(
      option.minAmount,
      translate(
        "The amount of {{ field }} can be min ${{ value }}. Please try again!",
        {
          field: translate(field),
          value: option.minAmount,
        }
      )
    );
  }
  if (option.maxAmount) {
    result = result.max(
      option.maxAmount,
      translate(
        "The amount of {{ field }} can be max ${{ value }}. Please try again!",
        {
          field: translate(field),
          value: option.maxAmount,
        }
      )
    );
  }
  if (option.regex) {
    result = (result as yup.StringSchema).matches(
      option.regex,
      translate("{{ field }} incorrect format. Please try again!", {
        field: translate(field),
      })
    );
  }
  if (option.regexPassword) {
    result = (result as yup.StringSchema).matches(
      option.regexPassword,
      translate(
        "Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=`|(){}[]:;\"'<>,?/"
      )
    );
  }

  // Not Required
  // if (option.notRequired) result = result.notRequired()

  return result;
};

export const getCountryName = (code: string, lang: string = "en") => {
  const country: any = Countries.find((country: any) => {
    return country.alpha2 === code;
  });
  if (country) {
    let showLang = lang === "jp" ? "ja" : lang;
    showLang = lang === "us" ? "en" : showLang;
    return country[showLang];
  }
};

export const generateSlug = (name: string) => {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both sides of the string
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
};
