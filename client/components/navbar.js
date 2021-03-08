import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <span id="navlinks">
      <span id="leftNav">
        <Link to="/home">Home</Link>
        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/products">All Products</Link>
      </span>
      <span id="rightNav">
        {isLoggedIn ? (
          <a href="/" onClick={handleClick}>
            Logout
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/signup">Sign Up</Link>
        <span>
          {'     '}|{'      '}
        </span>
        <Link to="/cart">Your Cart</Link>
      </span>
    </span>
    {/* <h1 id="title">Meowmazon</h1> */}
    <img
      style={{width: '1300px', marginTop: '10px'}}
      src="/images/logoHeader2.jpg"
    />
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
