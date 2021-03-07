import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/all-products'
import {Link} from 'react-router-dom'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
