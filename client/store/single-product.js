import axios from 'axios'

//Action types
const SET_PRODUCT = 'SET_PRODUCT'

//Action creators
export const setSingleProduct = product => ({
  type: SET_PRODUCT,
  product
})

//Thunks
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

//Reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
