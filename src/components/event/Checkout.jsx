// Free = reserve a spot, Pay = Check out for ${value}

import { Formik, Form } from "formik"
import checkoutSchema from "@/schema/checkout"
import { ArrowLeft } from "lucide-react"
import ContactCard from "./ContactCard"

export default function Checkout({ ticket, ticketPrice, show, setShow }) {
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
        <div className="bg-white rounded-lg shadow-md w-2/5 relative">
          <button
            className="rounded-[50%] hover:bg-gray-100 absolute m-1 p-2"
            onClick={handleExit}
          >
            <ArrowLeft />
          </button>
          <div className="flex-row py-2 shadow-md text-center">
            <h2 className="text-xl mb-4">Checkout</h2>
            <p className="text-base">Total ticket registered : {ticket}</p>
          </div>
          <Formik
            initialValues={{ name: "", email: "", phoneNumber: "" }}
            validationSchema={checkoutSchema}
            onSubmit={handleSubmit}
            className="w-2/3"
          >
            {({ values, handleBlur, handleChange }) => {
              return (
                <div className="px-14">
                  <Form>
                    <h3 className="text-center text-2xl my-6 font-bold border-b-2 border-gray-200">
                      Contact information
                    </h3>
                    <div className="flex-row">
                      <ContactCard
                        label="Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Your Name"
                      />
                      <ContactCard
                        label="Email"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      <ContactCard
                        label="Phone Number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </div>
                    <h3 className="text-center text-2xl my-6 font-bold border-b-2 border-gray-200">
                      Order Summary
                    </h3>
                    <div className="flex-row text-lg">
                      <span className="flex justify-between">
                        <div>{ticket} x Registration Ticket</div>
                        <div>Rp.{ticketPrice}</div>
                      </span>
                      <span className="flex justify-between font-bold">
                        <div>Total</div>
                        <div>Rp.{ticket * ticketPrice}</div>
                      </span>
                    </div>
                    <span className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-black text-white shadow-md rounded-lg my-4 px-16 py-3 font-bold"
                      >
                        Register
                      </button>
                    </span>
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
