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
        <h2
          style={{
            marginRight: '10px',
            paddingLeft: '15px',
            height: '30px',
            // backgroundColor: 'black',
            // color: 'white',
            // fontSize: '15px',
            '-webkit-font-smoothing': 'antialiased'
            // backgroundColor: '#EFEFEF',
          }}
        >
          Shop All Of Your Favorite Cat Items!
        </h2>
        {products.length ? (
          <div className="container">
            {products.map(product => (
              <div className="item" key={product.id}>
                <Link to={`/products/${product.id}`} style={{color: 'black'}}>
                  <div style={{margin: '10px', fontWeight: 'bold'}}>
                    {product.product_name}
                  </div>
                  <img
                    src={product.product_image}
                    style={{marginBottom: '10px'}}
                  />
                </Link>
                <button
                  id="addToCartButton"
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
