import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/all-products'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

export class AdminProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <Header />
        <h1>Products</h1>
        {products.length ? (
          <div>
            {products.map(product => (
              <div key={product.id}>
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
    getProducts: id => dispatch(fetchProducts(id))
  }
}

export default connect(mapState, mapDispatch)(AdminProducts)
