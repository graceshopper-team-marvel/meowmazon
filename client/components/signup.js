import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const Signup = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login_signup">
      <form onSubmit={handleSubmit} name={name}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label htmlFor="email" />
          <input
            name="email"
            type="text"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" />
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            {displayName}
          </button>
          <p className="forgot-password text-right">
            Already registered? <a href="/login">Login</a>
          </p>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const user_email = evt.target.email.value
      const user_password = evt.target.password.value
      dispatch(auth(user_email, user_password, formName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(Signup)

Signup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
