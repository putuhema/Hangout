import { Field, ErrorMessage } from "formik"

export default function ContactCard({
  label,
  name,
  value,
  onBlur,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex-row mb-3">
      <label htmlFor={name} className="text-lg font-medium">
        {label}
      </label>
      <Field
        type={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        className="text-lg bg-slate-100 rounded-md my-1 px-3 py-3 w-full"
      />
      <ErrorMessage
        name={name}
        className="text-sm text-red-400 font-medium"
        component="span"
      />
    </div>
  )
}
