import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchCart} from '../store/cart.js'

class Cart extends Component {
  componentDidMount() {
    //   this.props.fetchCart(this.props.match.params.productId)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        {cart.length ? (
          <div>Your Cart is Empty!</div>
        ) : (
          <div>Your Cart Isn't Empty! Items Will Display Here Soon!</div>
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
