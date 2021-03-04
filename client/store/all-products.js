import axios from 'axios'

//Action types
const SET_PRODUCTS = 'SET_PRODUCTS'

//Action creators
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//Thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products`)
      dispatch(setProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//Reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
