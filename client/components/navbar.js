import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <span id="navlinks">
      <span id="leftNav">
        <Link to="/home" style={{color: 'black'}}>
          Home
        </Link>
        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/products" style={{color: 'black'}}>
          All Products
        </Link>
      </span>
      <span id="rightNav">
        {isLoggedIn ? (
          <a href="/" onClick={handleClick}>
            Logout
          </a>
        ) : (
          <Link to="/login" style={{color: 'black'}}>
            Login
          </Link>
        )}

        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/signup" style={{color: 'black'}}>
          Sign Up
        </Link>
        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/cart" style={{color: 'black'}}>
          Your Cart
        </Link>
      </span>
    </span>
    {/* <h1 id="title">Meowmazon</h1> */}
    <img style={{width: '100%'}} src="/images/header.jpg" />
    <hr />
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
