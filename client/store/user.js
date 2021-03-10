/* eslint-disable camelcase */
import axios from 'axios'
import history from '../history'

//Action types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ORDERS = 'GET_ORDERS'

//Initial state
const defaultUser = {}

//Action creators
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getOrders = orders => ({type: GET_ORDERS, orders})

//Thunks
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    console.log('IN THUNK', res.data)
  } catch (err) {
    console.log(err)
  }
}

export const auth = (user_email, user_password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {user_email, user_password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrders = id => async dispatch => {
  try {
    console.log('THUNK CALLED')
    const {data} = await axios.get(`/api/users/orders/${id}`)
    console.log('RESPONSE IN THUNK', data)
    dispatch(getOrders(data))
  } catch (error) {
    console.error(error)
  }
}

//Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state
  }
}
