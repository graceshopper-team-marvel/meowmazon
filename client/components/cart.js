import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrder, deleteProduct, updateOrder} from '../store/orders.js'

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
    let products = order.products || []
    // if (this.props.order) {
    //   let products = this.props.order.products
    // } else products = []

    return (
      <div>
        <h2>Your Cart:</h2>
        {/* this checks if cart has length displays Empty */}
        {!order.products ? (
          <div>Your Cart is Empty!</div>
        ) : (
          <div>
            {/* <h3>Your Items</h3> */}
            {order.products.map(product => {
              // console.log('product--->', product)
              return (
                <div key={product.id}>
                  <div className="cartPageContainer">
                    <img id="cartImage" src={product.product_image} />

                    <div className="cartDescription">
                      <div className="boldFont">{product.product_name}</div>
                      <div>${product.product_price / 100}</div>
                      <div className="cartButtons">
                        <button
                          id="addToCartButton"
                          type="button"
                          onClick={() =>
                            this.props.removeProduct(
                              this.props.user.id,
                              product.id
                            )
                          }
                        >
                          Remove
                        </button>
                        <label htmlFor="chooseQuantity">Qty:</label>
                        <select
                          value={product.product_order.product_quantity}
                          onChange={evt => {
                            console.log('event', evt)
                            this.props.addToOrder({
                              product,
                              value: evt.target.value
                            })
                          }}
                          name="chooseQuantity"
                          id="chooseQuantity"
                        >
                          <option
                            value={product.product_order.product_quantity}
                          >
                            {product.product_order.product_quantity}
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </div>

                    {/* <button
                    type="button"
                    onClick={() => this.props.addToOrder(product.id)}
                  >
                    Add+
                  </button> */}
                  </div>
                </div>
              )
            })}

            <h4>Order Total: ${order.order_price / 100}</h4>

            <div>
              <div
                style={{
                  width: '112px',
                  borderBottom: '1px solid black',
                  paddingBottom: '10px'
                }}
              />
              <p className="checkOutFont">
                <Link
                  to="/checkout"
                  style={{color: 'black', fontWeight: 'bold'}}
                >
                  Checkout
                </Link>
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
      dispatch(deleteProduct(userId, productId)),
    addToOrder: (product, value) => dispatch(updateOrder(product, value))
  }
}

export default connect(mapState, mapDispatch)(Cart)
