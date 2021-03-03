import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/all-products'
import {Link} from 'react-router-dom'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.state.products
    return (
      <div>
        <h1>Products</h1>
        {products.length ? (
          <div className="container">
            {products.map(product => (
              <div className="item" key={product.id}>
                <img src={product.imageUrl} />
                <Link to={`/products/${products.id}`}>{product.name}</Link>
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

export default connect(mapState, mapDispatch)(AllProducts)
