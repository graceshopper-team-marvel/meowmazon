/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser, fetchSingleUser} from '../store/admin-user'

export class UserProfile extends Component {
  constructor(props) {
    super(props)
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

  componentDidMount() {
    this.setState({
      user_email: this.props.user.user_email,
      user_full_name: this.props.user.user_full_name,
      user_shipping_address: this.props.user.user_shipping_address,
      user_billing_address: this.props.user.user_billing_address,
      user_phone: this.props.user.user_phone,
      user_type: this.props.user.user_type
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    // e.preventDefault()
    // this.props.updateUser({
    //   ...this.props.user,
    //   ...this.state
    // })
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
          value={user_full_name || ''}
        />
        <label htmlFor="userEmail">Email:</label>
        <input
          type="text"
          name="user_email"
          onChange={handleChange}
          value={user_email || ''}
        />
        <label htmlFor="userShippingAddress">Shipping Address:</label>
        <input
          type="text"
          name="user_shipping_address"
          onChange={handleChange}
          value={user_shipping_address || ''}
        />
        <label htmlFor="userBillingAddress">Billing Address:</label>
        <input
          type="text"
          name="user_billing_address"
          onChange={handleChange}
          value={user_billing_address || ''}
        />
        <label htmlFor="userPhone">Phone Number:</label>
        <input
          type="text"
          name="user_phone"
          onChange={handleChange}
          value={user_phone || ''}
        />
        <label htmlFor="userType">Type:</label>
        <input
          type="text"
          name="user_type"
          onChange={handleChange}
          value={user_type || ''}
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
    fetchSingleUser: id => dispatch(fetchSingleUser(id)),
    updateUser: user => dispatch(updateUser(user, history))
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
