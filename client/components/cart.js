import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrder, deleteProduct} from '../store/orders.js'

class Cart extends Component {
  componentDidMount() {
    const user = this.props.user
    if (user.id) {
      this.props.fetchOrder(user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.fetchOrder(this.props.user.id)
    }
  }

  render() {
    let order = this.props.order || {}
    console.log('this.props---> on cart', this.props)
    console.log('order---->', order)
    // console.log('this.props.match.params---> on cart', this.props.match.params)
    const products = this.props.order.products || []

    return (
      <div>
        <h2>Your Cart:</h2>
        {/* this checks if cart has length displays Empty */}
        {!order.products ? (
          <div>Your Cart is Empty!</div>
        ) : (
          <div>
            <h3>Your Items</h3>
            {order.products.map(product => (
              <div key={product.id}>
                <span>
                  <img style={{width: '100px'}} src={product.product_image} />
                  <div>{product.product_name}</div>
                  <div>Price: {product.product_price / 100}</div>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.removeProduct(this.props.user.id, product.id)
                    }
                  >
                    Delete
                  </button>
                  {/* <div>Qty: {product.product_quantity}</div> */}
                </span>
              </div>
            ))}
            <h4>Order Total: {order.order_price / 100}</h4>

            <div>
              <div
                style={{
                  width: '112px',
                  borderBottom: '1px solid black',
                  paddingBottom: '10px'
                }}
              />
              <p>
                <Link to="/checkout">Checkout</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {user: state.user, order: state.order}
}

const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(getOrder(userId)),
    removeProduct: (userId, productId) =>
      dispatch(deleteProduct(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
