'use client'

import { ChangeEventHandler, FormEventHandler, useState } from "react"

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = userInfo
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target

    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault()
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }).then(res => res.json()).catch(error => console.error(error))
    console.log(res)
    setLoading(false)
  }

  return (
    <div className='w-1/3'>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label className="text_field_label" htmlFor="name">Name</label>
          <input
            className="text_field"
            type="text" 
            name="name" 
            value={name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text_field_label" htmlFor="email">Email</label>
          <input
            className="text_field"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text_field_label" htmlFor="password">Password</label>
          <input
            className="text_field"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button
          className="form_submit_button"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp