/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, updateProduct} from '../../store/single-product'
import {Link} from 'react-router-dom'

export class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product_name: '',
      product_price: '',
      product_description: '',
      product_category: '',
      product_quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    if (!this.props.singleProductReducer) {
      const productId = this.props.match.params.productId
      await this.props.getSingleProduct(productId)
    }
    this.setState({
      product_name: this.props.product.product_name,
      product_price: this.props.product.product_price,
      product_description: this.props.product.product_description,
      product_category: this.props.product.product_category,
      product_quantity: this.props.product.product_quantity
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateProduct({
      ...this.props.product,
      ...this.state
    })
  }

  render() {
    const {
      product_name,
      product_price,
      product_description,
      product_category,
      product_quantity
    } = this.state
    const {handleSubmit, handleChange} = this
    return (
      <form
        id="updateProduct"
        className="BasicInputAdmin"
        onSubmit={handleSubmit}
      >
        <label htmlFor="productName">Name:</label>
        <input
          type="text"
          name="product_name"
          onChange={handleChange}
          value={product_name || ''}
        />
        <label htmlFor="productPrice">Price:</label>
        <input
          type="text"
          name="product_price"
          onChange={handleChange}
          value={product_price || ''}
        />
        <label htmlFor="productDescription">Product Description:</label>
        <input
          type="text"
          name="product_description"
          onChange={handleChange}
          value={product_description || ''}
        />
        <label htmlFor="productCategory">Product Category:</label>
        <input
          type="text"
          name="product_category"
          onChange={handleChange}
          value={product_category || ''}
        />
        <label htmlFor="productQuantity">Product Quantity:</label>
        <input
          type="text"
          name="product_quantity"
          onChange={handleChange}
          value={product_quantity || ''}
        />
        <div className="CheckoutButtonAdmin">
          <button className="CheckoutButtonAdmin" type="submit">
            Submit
          </button>
        </div>
        <span className="CheckoutButtonAdmin">
          <Link id="cancel" to="/products">
            Cancel
          </Link>
        </span>
      </form>
    )
  }
}

const mapState = state => ({
  product: state.singleProductReducer
})

const mapDispatch = (dispatch, {history}) => ({
  getSingleProduct: id => dispatch(fetchSingleProduct(id)),
  updateProduct: product => dispatch(updateProduct(product, history))
})

export default connect(mapState, mapDispatch)(EditProduct)
