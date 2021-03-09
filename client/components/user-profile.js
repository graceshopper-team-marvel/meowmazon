/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store/admin-user'
import {me} from '../store/user'

export class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      user_email: '',
      user_full_name: '',
      user_shipping_address: '',
      user_billing_address: '',
      user_phone: '',
      user_type: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidUpdate() {
    console.log('PROPS', this.props)
    let user = this.props.user
    if (!this.props.user) {
      user = await this.props.getUserProfile()
    }
    console.log('state', this.state)
    this.setState({
      user_email: user.user_email,
      user_full_name: user.user_full_name,
      user_shipping_address: user.user_shipping_address,
      user_billing_address: user.user_billing_address,
      user_phone: user.user_phone,
      user_type: user.user_type
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateUser({
      ...this.props.user,
      ...this.state
    })
  }

  render() {
    const {
      user_email,
      user_full_name,
      user_shipping_address,
      user_billing_address,
      user_phone,
      user_type
    } = this.state
    const {handleSubmit, handleChange} = this
    return (
      <form id="updateUser" onSubmit={handleSubmit}>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          name="user_full_name"
          onChange={handleChange}
          value={user_full_name}
        />
        <label htmlFor="userEmail">Email:</label>
        <input
          type="text"
          name="user_email"
          onChange={handleChange}
          value={user_email}
        />
        <label htmlFor="userShippingAddress">Shipping Address:</label>
        <input
          type="text"
          name="user_shipping_address"
          onChange={handleChange}
          value={user_shipping_address}
        />
        <label htmlFor="userBillingAddress">Billing Address:</label>
        <input
          type="text"
          name="user_billing_address"
          onChange={handleChange}
          value={user_billing_address}
        />
        <label htmlFor="userPhone">Phone Number:</label>
        <input
          type="text"
          name="user_phone"
          onChange={handleChange}
          value={user_phone}
        />
        <label htmlFor="userType">Type:</label>
        <input
          type="text"
          name="user_type"
          onChange={handleChange}
          value={user_type}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = (dispatch, {history}) => {
  return {
    getUserProfile: () => dispatch(me()),
    updateUser: user => dispatch(updateUser(user, history))
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
