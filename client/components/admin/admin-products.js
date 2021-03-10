/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/all-products'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

const headers = [
  ' ',
  'Name',
  'Price',
  'Description',
  'Category',
  'Quantity',
  ' '
]

export class AdminProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <Header />
        <div id="admin_table_border">
          {products.length ? (
            <table className="admin_table">
              <tbody>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img id="admin_img" src={product.product_image} />
                    </td>
                    <td>{product.product_name}</td>
                    <td>${product.product_price / 100}</td>
                    <td>{product.product_description}</td>
                    <td>{product.product_category}</td>
                    <td>{product.product_quantity}</td>
                    <td>
                      <Link to={`/products/${product.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 />
          )}
        </div>
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
