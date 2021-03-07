import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/admin-orders'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

export class AdminOrders extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <Header />
        <h1>Orders</h1>
        {orders.length ? (
          <div>
            {orders.map(order => (
              <div key={order.id}>
                <Link to={`/orders/${order.id}`}>Order Number: {order.id}</Link>
                <div>{order.user.id}</div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="loading">Loading...</h3>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
