import axios from 'axios'

//Action types
const SET_PRODUCT = 'SET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//Action creators
export const setSingleProduct = product => ({
  type: SET_PRODUCT,
  product
})

const _updateProduct = product => ({
  type: UPDATE_PRODUCT,
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

export const updateProduct = (product, history) => {
  return async dispatch => {
    try {
      const updated = (await axios.put(`/api/products/${product.id}`, product))
        .data
      dispatch(_updateProduct(updated))
      history.push(`/products`)
    } catch (error) {
      console.log('Error updating product')
    }
  }
}

const initialState = {}

//Reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    default:
      return state
  }
}
