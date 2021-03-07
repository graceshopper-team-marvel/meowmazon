// import axios from 'axios'

// // COPIED AND PASTED ALL OF THESE FROM ORDERS>>>>
// // i think we are not returning what we thought

// //action type
// const GET_CART = 'GET_CART'

// //action creator
// export const gotCart = (cart) => ({
//   type: GET_CART,
//   cart,
// })

// //Thunk Get Cart/ aka Order
// export const getCart = (userId) => {
//   return async (dispatch) => {
//     try {
//       //axios call
//       // const userId = req.user.dataValues.id
//       // this actually just gets the order
//       // const products =
//       const cart = (await axios.get(`api/orders/user/${userId}`)).data
//       dispatch(gotCart(cart))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// // single Order Reducer
// export default function singleOrderReducer(state = [], action) {
//   switch (action.type) {
//     case GET_CART:
//       return action.cart
//     default:
//       return state
//   }
// }
