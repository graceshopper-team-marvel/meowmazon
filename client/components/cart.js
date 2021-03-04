import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart.js'

class Cart extends Component {
  componentDidMount() {
    //   this.props.fetchCart(this.props.match.params.productId)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h2>Your Cart:</h2>
        {/* this checks if cart has length displays Empty */}
        {cart ? (
          <div>Your Cart is Empty!</div>
        ) : (
          <div>
            <h3>Your Items</h3>
            {/* Map through items and display image, qty, */}
            <div>Items Display here</div>
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
  return {cart: state.cart}
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
