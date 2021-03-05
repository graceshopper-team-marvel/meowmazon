import axios from 'axios'

//Action types
const SET_NEW_ORDER = 'SET_NEW_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

//Action creators
export const setNewOrder = newOrder => ({
  type: SET_NEW_ORDER,
  newOrder
})

export const updatedOrder = addedToOrder => ({
  type: UPDATE_ORDER,
  addedToOrder
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

//Thunks Update
export const updateOrder = id => {
  return async dispatch => {
    try {
      const product = (await axios.get(`api/products/${id}`)).data
      // const {data} = await axios.post(`/api/orders/${id}`)
      const order = await axios.put(`api/orders`, product)
      dispatch(updatedOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_ORDER:
      return [...state, action.newOrder]
    case UPDATE_ORDER:
      return [...state, action.addedToOrder]
    default:
      return state
  }
}
