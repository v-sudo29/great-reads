import { ChangeEventHandler } from 'react'

const EmailInput = ({ email, handleChange } : { email: string, handleChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <div>
      <label className='text_field_label' htmlFor="email" >Email</label>
      <input
        className="text_field"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
      />
    </div>
  )
}

export default EmailInput