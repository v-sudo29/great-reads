const SignInButton = ({ loading } : { loading: boolean }) => {
  return (
    <button
      className="form_submit_button"
      type="submit"
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      Sign In
    </button>
  )
}

export default SignInButton