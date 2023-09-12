'use client'
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = userInfo

  const router = useRouter()

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await fetch('/api/users/sign-up', {
        method: 'POST',
        body: JSON.stringify(userInfo),
      })
      const data = await res.json()

      if (data.error) setError(data.error)
      if (!data.error) setError('')
      
      // Redirect to login page
      router.replace('/sign-in')
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div>
        <h1 className='text-2xl font-semibold'>Sign Up</h1>
        <span className='text-sm font-normal'>And discover your next favorite book</span>
      </div>
      {error.length > 0 && <p className='text-red-500 font-sm'>{error}</p>}
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
          autoComplete="off"
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
  )
}

export default SignUpForm