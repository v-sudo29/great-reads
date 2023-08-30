import { ChangeEventHandler } from 'react'

const PasswordInput = ({ password, handleChange }: { password: string, handleChange: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <div>
      <label className='text_field_label' htmlFor="password">Password</label>
      <input
        className="text_field"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        autoComplete="on"
      />
    </div>
  )
}

export default PasswordInput