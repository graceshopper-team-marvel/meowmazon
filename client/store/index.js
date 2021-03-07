import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './single-product'
import ordersReducer from './orders'
import allProductsReducer from './all-products'

export const reducer = combineReducers({
  user,
  singleProductReducer,
  products: allProductsReducer,
  // added cart value here to make it clear what we are grabbing
  order: ordersReducer
  // all orders Reducer
  // cartOrder reducer
})

let middleware = [thunkMiddleware]

if (typeof window !== 'undefined') {
  middleware = [...middleware, createLogger({collapsed: true})]
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
export * from './user'
export * from './single-product'
export * from './all-products'
