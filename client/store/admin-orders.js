import axios from 'axios'

//Action types
const SET_ORDERS = 'SET_ORDERS'

//Action creators
export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

//Thunks
export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders`)
      dispatch(setOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//Reducer
export default function allOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
