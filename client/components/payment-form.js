/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder, getOrder} from '../store/orders'

function BasicInput(props) {
  return (
    <div className="BasicInput">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

function ExpiryDate() {
  return (
    <div className="ExpiryDate">
      <div>
        <label>Expires on</label>
        <div className="Expiry">
          <select>
            <option value="">January</option>
            <option value="">February</option>
            <option value="">March</option>
            <option value="">April</option>
            <option value="">May</option>
            <option value="">June</option>
            <option value="">July</option>
            <option value="">August</option>
            <option value="">September</option>
            <option value="">October</option>
            <option value="">November</option>
            <option value="">December</option>
          </select>
          <select name="" id="">
            <option value="">2016</option>
            <option value="">2017</option>
            <option value="">2018</option>
            <option value="">2019</option>
            <option value="">2020</option>
            <option value="">2021</option>
          </select>
        </div>
      </div>
      <div className="CVCField">
        <label>CVC</label>
        <input placeholder="000" type="number" />
      </div>
    </div>
  )
}

class PaymentForm extends Component {
  constructor() {
    super()
    this.state = {
      shippingAddress: '',
      billingAddress: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    if (user.id) {
      this.props.fetchOrder(user.id)
    }
    if (user.user_billing_address) {
      this.setState({
        shippingAddress: user.user_shipping_address,
        billingAddress: user.user_billing_address
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitOrder({
      id: this.props.order.id,
      order_shipping_address: this.state.shippingAddress,
      order_billing_address: this.state.billingAddress
    })
    this.setState({
      shippingAddress: '',
      billingAddress: ''
    })
  }
  render() {
    return (
      <div className="PaymentForm">
        <form onSubmit={this.handleSubmit}>
          <div className="Title" id="override">
            Shipping information
          </div>
          <BasicInput
            name="name"
            label="Full Name"
            type="text"
            placeholder="John Smith"
          />
          <BasicInput
            name="shippingAddress"
            label="Shipping Address"
            type="text"
            onChange={this.handleChange}
            value={this.state.shippingAddress}
            placeholder="Address"
          />
          <div className="Title" id="override">
            Payment information
          </div>
          <BasicInput
            name="name"
            label="Name on credit card"
            type="text"
            placeholder="John Smith"
          />
          <BasicInput
            name="card"
            label="Credit card number"
            type="number"
            placeholder="0000 0000 0000 0000"
          />
          <ExpiryDate />
          <div className="CheckoutButton">
            <button type="submit">Place Secure Order</button>
            <span>
              <i className="fa fa-fw fa-lock" /> Your credit card information is
              encrypted
            </span>
          </div>
        </form>
      </div>
    )
  }
}

export {BasicInput, ExpiryDate}

const mapState = state => {
  return {user: state.user, order: state.order}
}

const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(getOrder(userId)),
    submitOrder: order => dispatch(submitOrder(order))
  }
}

export default connect(mapState, mapDispatch)(PaymentForm)
