import axios from 'axios'

//THIS REDUCER RETURNS ONE USERS' CART  aka pending order
// Will need a reducer to return ALL orders for a user (past/completed)

//Action types
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const GET_ORDER = 'GET_ORDER'
//deletes single product from order
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//Action creators

//set new order -> creates a new order
export const completedOrder = order => ({
  type: COMPLETE_ORDER,
  order
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
export const submitOrder = order => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${order.id}`, order)
      dispatch(completedOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Thunks Update Order
export const updateOrder = product => {
  return async dispatch => {
    try {
      // const updatedProduct = (await axios.get(`api/products/${product.id}`))
      //   .data
      console.log('PRODUCT BEING PASSED INTO THUNK', product)
      const order = (await axios.put(`api/orders`, product)).data
      console.log('PRODUCT COMING BACK FROM AXIOS: ', order)
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
    case COMPLETE_ORDER:
      return action.order
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
