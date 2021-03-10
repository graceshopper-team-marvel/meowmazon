/* eslint-disable no-alert */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import {updateOrder} from '../store/orders'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      value: '1'
    }
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product || {}
    return (
      <div className="singlePageProduct">
        <div>
          <img src={product.product_image} id="singlePageImage" />
          {/* <h2>{product.product_name}</h2> */}
          {/* <img src={product.product_image} id="singlePageImage" /> */}
          {/* <p>${product.product_price / 100}</p>
          <p>{product.product_description}</p> */}
        </div>
        <div className="singleProductDescription">
          <h2>{product.product_name}</h2>
          <p className="singlePageDescriptionFont">
            {product.product_description}
          </p>
          <p className="boldFont">${product.product_price / 100}</p>

          <label htmlFor="chooseQuantity">Qty:</label>
          <div id="singleProductButtons">
            <select
              value={this.state.value}
              onChange={evt => {
                this.setState({value: evt.target.value})
              }}
              name="chooseQuantity"
              id="chooseQuantity"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button
              type="button"
              id="singlePageButton"
              onClick={() => {
                if (!this.props.user.id) {
                  alert(
                    "You're so close! \n\nUnfortunately, our guest cart is still a work in progrss. To add this item to your cart, kindly create an account."
                  )
                } else {
                  this.props.addToOrder({
                    product: product,
                    value: this.state.value
                  })
                }
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.singleProductReducer, user: state.user}
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToOrder: productAndQty => dispatch(updateOrder(productAndQty))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
