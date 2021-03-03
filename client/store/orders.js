import axios from 'axios'

//Action types
const SET_NEW_ORDER = 'SET_NEW_ORDER'

//Action creators
export const setNewOrder = newOrder => ({
  type: SET_NEW_ORDER,
  newOrder
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

const initialState = []

//Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_ORDER:
      return [...state, action.newOrder]
    default:
      return state
  }
}
