import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Header from '../sidebar/header'

export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <Header />
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.user_email
  }
}

export default connect(mapState)(AdminHome)

AdminHome.propTypes = {
  email: PropTypes.string
}
