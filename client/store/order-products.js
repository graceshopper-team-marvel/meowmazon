import axios from 'axios'

//products in the cart:
const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'

//Action creators
export const gotOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

// Thunk
export const getOrderProducts = orderId => {
  return async dispatch => {
    try {
      //not sure about this...
      const orderProducts = await axios.get(`api/orders/${orderId}/products`)
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer
export default function ordersProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return [...state, action.order_products]
    default:
      return state
  }
}
