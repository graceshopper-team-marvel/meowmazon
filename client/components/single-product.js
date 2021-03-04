import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <div>
          <h2>{product.product_name}</h2>
          <img src={product.product_image} />
          <p>{product.product_price}</p>
          <p>{product.product_description}</p>
        </div>
        <div />
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.singleProductReducer}
}

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
