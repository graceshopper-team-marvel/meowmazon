import axios from 'axios'

//THIS REDUCER RETURNS ONE USERS' CART  aka pending order
// Will need a reducer to return ALL orders for a user (past/completed)

//Action types
const SET_NEW_ORDER = 'SET_NEW_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_ORDER = 'GET_ORDER'
//deletes single product from order
const DELETE_PRODUCT = 'DELETE_PRODUCT'

// this thunk should return the updated order with updated total
// and destroy the product in the product table...

//Action creators

//set new order is for creating a new order
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

//returns order without the product
export const deletedProduct = order => ({
  type: DELETE_PRODUCT,
  order
})

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
      const order = (await axios.get(`api/orders/user/${userId}`)).data
      dispatch(gotOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

// Thunk delete product

export const deleteProduct = (userId, productId) => {
  return async dispatch => {
    try {
      let order = (await axios.delete(`api/orders/user/${userId}/${productId}`))
        .data

      dispatch(deletedProduct(order))
    } catch (error) {
      console.log(error)
    }
  }
}

// these were originally returning a spread array [...state, action.newOrder]
// refactored to return the single object because order will never been an array of items

//Reducer

export default function ordersReducer(state = {}, action) {
  switch (action.type) {
    case SET_NEW_ORDER:
      return action.newOrder
    case UPDATE_ORDER:
      return action.addedToOrder
    case GET_ORDER:
      return action.order
    case DELETE_PRODUCT:
      return action.order
    default:
      return state
  }
}
