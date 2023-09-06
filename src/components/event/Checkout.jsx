// Free = reserve a spot, Pay = Check out for ${value}

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ArrowLeft } from "lucide-react"

const CheckoutSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Name is too short")
    .matches(
      /^[a-zA-Z].*/,
      "Name couldn't contain special characters and numbers"
    ),
  email: Yup.string().email("Email must be a valid email").required("Required"),
})

export default function Checkout({ ticket, show, setShow }) {
  const handleSubmit = (values) => {
    console.log(values)
  }

  const handleExit = () => {
    setShow(!show)
  }

  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gray-800 opacity-40"></div>
        <div className="bg-white rounded-lg shadow-md w-2/3 relative">
          <button className="absolute p-3" onClick={handleExit}>
            <ArrowLeft />
          </button>
          <div className="flex-row py-2 shadow-md text-center">
            <h2 className="text-xl mb-4">Checkout</h2>
            <p className="text-base">Total ticket registered : {ticket}</p>
          </div>
          <Formik
            initialValues={{ name: "", email: "" }}
            validationSchema={CheckoutSchema}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <div className="px-6">
                  <Form>
                    <h3 className="text-2xl mb-3 font-bold">
                      Contact information
                    </h3>
                    <button
                      type="submit"
                      className="bg-black text-white shadow-md rounded-lg my-4 px-16 py-3 font-bold"
                    >
                      Register
                    </button>
                  </Form>
                </div>
              )
            }}
          </Formik>
        </div>
      </div>
    )
  )
}
