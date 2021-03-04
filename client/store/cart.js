import axios from 'axios'

//Action type
const GOT_CART = 'GOT_CART'

// const UPDATE_CART = "UPDATE_CART"

//Action creator
export const gotCart = cart => {
  return {
    type: GOT_CART,
    cart
  }
}

//Thunk creator
//if user is logged in...?
// not sure about how login information will be accessed so this is a stand in function
export const fetchCart = userId => {
  //Thunk
  return async dispatch => {
    try {
      // this is a guess for a logged in user we might want the cart to
      // if the cart was stored at user/userId/cart...
      // but i don't think this is how we'll access that
      const user = (await axios.get(`/api/user/${userId}`)).data
      const cart = user.user_cart

      dispatch(gotCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

//Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}
