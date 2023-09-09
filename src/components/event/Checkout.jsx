import { Formik, Form } from "formik"
import checkoutSchema from "@/schema/checkout"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"
import ContactCard from "./ContactCard"
import { useState } from "react"

export default function Checkout({ ticket, ticketPrice }) {
  const [page, setPage] = useState(1)

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          <div className="text-center">
            <h2 className="text-xl">{page === 1 ? "Register" : "Checkout"}</h2>
            <p className="text-base">Total ticket registered : {ticket}</p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <h3 className="text-2xl my-6 font-bold">
        {page === 1 ? "Contact information" : "Order Summary"}
      </h3>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          phoneNumber: "",
          uuid: "",
        }}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
        className="w-2/3"
      >
        {({ values, handleBlur, handleChange }) => {
          return (
            <Form>
              {page === 1 ? (
                <div className="flex-row">
                  <ContactCard
                    label="Referral Code"
                    name="uuid"
                    value={values.uuid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="ex: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                  />
                  <span className="flex gap-6">
                    <ContactCard
                      label="First Name"
                      name="fname"
                      value={values.fname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                    <ContactCard
                      label="Last Name"
                      name="lname"
                      value={values.lname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </span>
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
                  <span className="flex justify-center">
                    <button
                      onClick={() => {
                        setPage(page + 1)
                      }}
                      className="bg-black text-white shadow-md rounded-lg my-4 px-16 py-3 font-bold"
                    >
                      Register
                    </button>
                  </span>
                </div>
              ) : (
                <div>
                  <button onClick={() => setPage(page - 1)}>
                    <ArrowLeft className="absolute left-4 top-4 rounded-sm opacity-70 w-4 h-4" />
                  </button>
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
                </div>
              )}
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
