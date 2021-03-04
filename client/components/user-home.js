/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserHome = props => {
  const {user_email} = props

  return (
    <div>
      <h3>Welcome, {user_email}</h3>
    </div>
  )
}

const mapState = state => {
  return {
    user_email: state.user.user_email
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  user_email: PropTypes.string
}
