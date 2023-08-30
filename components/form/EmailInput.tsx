import { RefObject } from "react"

const EmailInput = ({ emailRef } : { emailRef: RefObject<HTMLInputElement>}) => {
  return (
    <div>
      <label className='text_field_label' htmlFor="email" >Email</label>
      <input
        ref={emailRef}
        className="text_field"
        type="email"
        name="email"
      />
    </div>
  )
}

export default EmailInput