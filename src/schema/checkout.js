import * as Yup from "yup"

const checkoutSchema = Yup.object().shape({
  referal: Yup.string().optional(),
  fname: Yup.string()
    .required("Required")
    .min(3, "Name is too short")
    .matches(
      /^[a-zA-Z].*/,
      "Name couldn't contain special characters and numbers"
    ),
  lname: Yup.string()
    .required("Required")
    .min(3, "Name is too short")
    .matches(
      /^[a-zA-Z].*/,
      "Name couldn't contain special characters and numbers"
    ),
  email: Yup.string().email("Email must be a valid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/[0-9].*/, "That doesn't seem to be a phone number")
    .min(10, "phone number must be over 10 digits")
    .max(13, "phone number musn't be over 13 digits")
    .required("Required"),
})

export default checkoutSchema
