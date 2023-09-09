import { FormatToIDR, IsObjectEmpty } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
// import { useParams } from "react-router-dom"
// import { useQuery, useMutation } from "@tanstack/react-query"

import { useState } from "react"
import { Formik, Form } from "formik"
import checkoutSchema from "@/schema/checkout"
import ContactCard from "./ContactCard"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth, useUser } from "@clerk/clerk-react"
// import services from "@/services"
// import { v4 as uuidv4 } from "uuid"

export default function Checkout({ ticket }) {
  const [page, setPage] = useState(1)
  const { user, isSignedIn } = useUser()

  // const { eventId } = useParams()
  // const { userId } = useAuth()

  // const userEventId = (isFetched && event.userId) || ""
  // const { data: event, isFetched } = useQuery(["event", eventId], async () => {
  //   const res = await services.get(`/events/${eventId}`)
  //   return res.data
  // })

  // const eventMutation = useMutation({
  //   mutationFn: async (register) => {
  //     return services.put(`/events/${eventId}`, register)
  //   },
  // })

  const handleSubmit = (values) => {
    //   const isAlreadyAttend =
    //     event.attendees.filter((attendee) => attendee.userId === userId).length >
    //     0
    //   const referalCode = uuidv4()
    //   if (userId !== userEventId && !isAlreadyAttend) {
    //     if (values.refferal.length > 0) {
    //       referalMutation.mutate({
    //         eventId: event.id,
    //         code: values.referal,
    //         userId,
    //       })
    //     }
    //     eventMutation.mutate({
    //       ...event,
    //       attendees: [
    //         ...event.attendees,
    //         {
    //           ...values,
    //           eventId: event.id,
    //           eventMakerId: event.userId,
    //           userId: userId,
    //           myReferalCode: referalCode,
    //           totalTicket: ticket,
    //         },
    //       ],
    //     })
    //   } else {
    //     console.log("cant register to own event")
    //   }
    console.log(values)
  }

  // const referalMutation = useMutation({
  //   mutationFn: async (data) => {
  //     return services.post("/events/referal", data)
  //   },
  // })

  // const price = isFetched && event.type === "paid" && Number(event.price)
  // const discount =
  //   isFetched && !IsObjectEmpty(event.promos)
  //     ? price - price * (Number(event.promos.percentage) / 100)
  //     : 0

  const price = 100000
  const discount = 20000

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
      <h3 className="text-2xl mt-6 bm-2 font-bold">
        {page === 1 ? "Contact information" : "Order Summary"}
      </h3>
      {page === 1 && isSignedIn && (
        <p className="my-2">
          logged in as <u>{user.emailAddresses[0].emailAddress}</u>
        </p>
      )}
      <Formik
        initialValues={{
          referal: "",
          fname: isSignedIn ? user.firstName : "",
          lname: isSignedIn ? user.lastName : "",
          email: isSignedIn ? user.emailAddresses[0].emailAddress : "",
          phoneNumber: "",
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
                  <div className="flex-row text-lg mb-2">
                    <span className="flex gap-2">
                      <p>Name :</p>
                      <p>{`${values.fname} ${values.lname}`}</p>
                    </span>
                    <span className="flex gap-2">
                      <p>Email :</p>
                      <p>{values.email}</p>
                    </span>
                    <span className="flex gap-2">
                      <p>Phone Number :</p>
                      <p>{values.phoneNumber}</p>
                    </span>
                  </div>
                  <div className="flex-row text-lg">
                    <span className="flex justify-between">
                      <div>{ticket} x Registration Ticket</div>
                      <div>{FormatToIDR(price)}</div>
                    </span>
                    {discount > 0 && (
                      <span className="flex justify-between">
                        <div>Promos</div>
                        <div>- {FormatToIDR(discount)}</div>
                      </span>
                    )}
                    <span className="flex justify-between font-bold border-t-2 border-black mt-2">
                      <div>Total</div>
                      <div>{FormatToIDR((price - discount) * ticket)}</div>
                    </span>
                  </div>
                  <span className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-black text-white shadow-md rounded-lg my-4 px-16 py-3 font-bold"
                    >
                      Checkout
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
