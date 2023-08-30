import { RefObject } from "react"

const PasswordInput = ({ passwordRef }: { passwordRef: RefObject<HTMLInputElement>}) => {
  return (
    <div>
      <label className='text_field_label' htmlFor="password">Password</label>
      <input
        ref={passwordRef}
        className="text_field"
        type="password"
        name="password"
        autoComplete="on"
      />
    </div>
  )
}

export default PasswordInput