import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/all-products'
import {Link} from 'react-router-dom'
import {updateOrder} from '../store/orders.js'

export class AllProducts extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  handleClick(e) {
    let productId = e.target.value
    this.props.addToOrder(productId)
    //call thunk from props pass productId to it
  }

  // product_id
  render() {
    const products = this.props.products || []
    return (
      <div>
        <h1>Products</h1>
        {products.length ? (
          <div className="container">
            {products.map(product => (
              <div className="item" key={product.id}>
                <img src={product.product_image} />
                <Link to={`/products/${product.id}`}>
                  {product.product_name}
                </Link>
                <button
                  type="button"
                  value={product.id}
                  onClick={this.handleClick}
                >
                  Add To Cart
                </button>
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
  products: state.products
})

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addToOrder: id => dispatch(updateOrder(id))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
