import axios from 'axios'

//Action types
const SET_NEW_ORDER = 'SET_NEW_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
//pending order aka the cart
const GET_ORDER = 'GET_ORDER'

//products in the cart:
const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'

//Action creators
export const gotOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

export const setNewOrder = newOrder => ({
  type: SET_NEW_ORDER,
  newOrder
})

export const updatedOrder = addedToOrder => ({
  type: UPDATE_ORDER,
  addedToOrder
})

export const gotOrder = order => ({
  type: GET_ORDER,
  order
})

// SUBMITS FULL ORDER TO order table
// Update these names to submit Order
// To distinguish from adding productor to cart
// That will be named Update Order

//Thunks
export const addNewOrder = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', order)
      dispatch(setNewOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Thunks Update Order
export const updateOrder = id => {
  return async dispatch => {
    try {
      const product = (await axios.get(`api/products/${id}`)).data
      // const {data} = await axios.post(`/api/orders/${id}`)
      const order = (await axios.put(`api/orders`, product)).data
      dispatch(updatedOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

//Thunk Get Order
export const getOrder = userId => {
  return async dispatch => {
    try {
      //axios call
      // const userId = req.user.dataValues.id
      // this actually just gets the order
      // const products =
      const order = (await axios.get(`api/orders/user/${userId}`)).data

      dispatch(gotOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

// // Thunk
// export const getOrderProducts = (orderId) => {
//   return async (dispatch) => {
//     try {
//       //not sure about this...
//       const orderProducts = await axios.get(`api/orders/${orderId}`)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

const initialState = []

// these were originally returning [...state, action.newOrder]
// but order was being mapped as a single object inside an array onto state
// this.props.cart = [ {} ]

// we want this:
// this.props.cart= {}

// refactored to return object because order will never been an array
// also changed default state to an object

//Reducer

export default function ordersReducer(state = {}, action) {
  switch (action.type) {
    case SET_NEW_ORDER:
      return action.newOrder
    case UPDATE_ORDER:
      return action.addedToOrder
    case GET_ORDER:
      return action.order
    case GET_ORDER_PRODUCTS:
      return action.order_products
    default:
      return state
  }
}
