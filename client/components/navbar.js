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
        <Link to="/allproduct">All Products</Link>
      </span>
      <span id="rightNav">
        {/* I added these here but below at line 27 they added them depending on whether logged in */}
        <Link to="/login">Login</Link>

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
    <h1 id="title">Meowmazon</h1>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
