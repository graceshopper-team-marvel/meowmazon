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
      <div>
        <div>
          <h2>{product.product_name}</h2>
          <img src={product.product_image} />
          <p>${product.product_price / 100}</p>
          <p>{product.product_description}</p>
        </div>
        <label htmlFor="chooseQuantity">Qty:</label>
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
          onClick={() => {
            this.props.addToOrder({
              product: product,
              value: this.state.value
            })
          }}
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.singleProductReducer}
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToOrder: id => dispatch(updateOrder(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
