import axios from 'axios'

//Action types
const SET_USERS = 'SET_USERS'

//Action creators
export const setUsers = users => ({
  type: SET_USERS,
  users
})

//Thunks
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users`)
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//Reducer
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
