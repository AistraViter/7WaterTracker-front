import * as Yup from "yup";

export const updateDailyNorma = Yup.object({
  gender: Yup.string()
    .oneOf(["woman", "man"], 'Gender should be "Woman" or ""')
    .required("Please, specify your gender"),
  weight: Yup.string()
    .matches(
      /^(?!.*\.\..*)(?!\.)([0-9]{1,4}|\.[0-9]{1,4}|[0-9]{0,3}\.[0-9]{1,4})$/,
      "Please, specify your correct weight"
    )
    .min(1, "Please, specify your weight")
    .max(4, "Please, specify your correct weight")
    .notOneOf(["0"], "Weight cannot be 0")
    .required("Please, specify your weight"),
  activeTime: Yup.string()
    .matches(
      /^(?!.*\.\..*)(?!\.)([0-9]{1,4}|\.[0-9]{1,4}|[0-9]{0,3}\.[0-9]{1,4})$/,
      "Please, specify your correct active time"
    )
    .min(1, "Please, specify your active time")
    .max(4, "Please, specify your active time correct in hours")
    .required("Please, specify your active time in hours"),
});
