import axios from 'axios'

// ACTION TYPES

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const UPDATE_USER = 'UPDATE_USER'

// ACTION CREATORS

const setSingleUser = user => ({
  type: SET_SINGLE_USER,
  user
})

const _updateUser = user => ({
  type: UPDATE_USER,
  user
})

// THUNK CREATORS

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const {data: singleUser} = await axios.get(`/api/users/${id}`)
      dispatch(setSingleUser(singleUser))
    } catch (error) {
      console.log('Error fetching user from server')
    }
  }
}

export const updateUser = (user, history) => {
  return async dispatch => {
    try {
      const updated = (await axios.put(`/api/users/${user.id}`, user)).data
      dispatch(_updateUser(updated))
      history.push(`/users/${user.id}`)
    } catch (error) {
      console.log('Error updating user')
    }
  }
}

// INITIAL STATE

const initialState = {}

//REDUCER

export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user
    default:
      return state
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
  }
}
