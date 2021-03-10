/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser, updateUser} from '../../store/admin-user'
import {Link} from 'react-router-dom'

export class EditUser extends Component {
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

  async componentDidMount() {
    if (!this.props.adminUser) {
      const userId = this.props.match.params.userId
      await this.props.getSingleUser(userId)
    }
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
      <form id="updateUser" className="BasicInputAdmin" onSubmit={handleSubmit}>
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
        <div className="CheckoutButtonAdmin">
          <button className="CheckoutButtonAdmin" type="submit">
            Submit
          </button>
        </div>
        <span className="CheckoutButtonAdmin">
          <Link id="cancel" to="/users">
            Cancel
          </Link>
        </span>
      </form>
    )
  }
}

const mapState = state => ({
  user: state.adminUser.user
})

const mapDispatch = (dispatch, {history}) => ({
  getSingleUser: id => dispatch(fetchSingleUser(id)),
  updateUser: user => dispatch(updateUser(user, history))
})

export default connect(mapState, mapDispatch)(EditUser)
