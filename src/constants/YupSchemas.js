
import * as Yup from 'yup';

export const YupSchemas = {
  phoneNumber: (
    Yup.string()
      .required("Required")
      .matches(new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/))
  ),
  shortStringRequired: (
    Yup.string()
      .required("Required")
      .max(100, "Too many characters")
  ),
};