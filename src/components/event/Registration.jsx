import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please input your email !"),
  name: Yup.string()
    .required("Please input your name !")
    .test("Name", "Name should not start with special characters !", (value) =>
      value.name.match(/^[0-9a-zA-Z].*/)
    ),
})

const Registration = () => {
  return (
    <div className="">
      <Formik
        initialValues={{ email: "", name: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={(registration) => {
          console.log(registration)
        }}
      >
        {
          (/*formik*/) => {
            //   const { errors, touched, isValid, dirty } = formik
            return (
              <div className="rounded-md shadow-sm bg-white p-2 w-full">
                <Form>
                  <h3 className="text-lg font-bold">Join Events</h3>
                  <div className="flex-row p-2">
                    <div className="flex mb-1">
                      <label htmlFor="email" className="mr-2">
                        Email
                      </label>
                      <ErrorMessage
                        name="email"
                        className="text-red-400"
                        component="div"
                      />
                    </div>
                    <input
                      name="email"
                      placeholder="Email"
                      className="bg-slate-100 rounded-md p-2 mb-2 w-full"
                    />
                    <div className="flex mb-1">
                      <label htmlFor="name" className="mr-2">
                        Name
                      </label>
                      <ErrorMessage
                        name="name"
                        className="text-red-400"
                        component="div"
                      />
                    </div>
                    <input
                      name="name"
                      placeholder="Your name"
                      className="bg-slate-100 rounded-md p-2 mb-2 w-full"
                    />
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-green-300 rounded-lg my-2 p-2 text-sm font-bold"
                      >
                        Join The Event
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Registration
