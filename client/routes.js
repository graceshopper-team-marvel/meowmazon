import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  SingleProduct,
  Checkout,
  AllProducts,
  AdminHome
} from './components'

import {me} from './store'
import Cart from '../client/components/cart'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    console.log(this.props)
    if (isAdmin && isLoggedIn) {
      return (
        <Switch>
          <Route exact path="/home" component={AdminHome} />
          <Route path="/products" component={AllProducts} />
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route path="/products" component={AllProducts} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cart" component={Cart} />
          {isLoggedIn && <Route exact path="/home" component={UserHome} />}
          <Route component={Login} />
        </Switch>
      )
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.user_type === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
