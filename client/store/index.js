import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './single-product'
import allProductsReducer from './all-products'

// export const reducer = combineReducers({
//   user,
//   singleProductReducer,
//   products: allProductsReducer,
// })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './user'
// export * from './single-product'
// export * from './all-products'

export const reducer = combineReducers({
  user,
  singleProductReducer,
  products: allProductsReducer
})

let middleware = [thunkMiddleware]

if (process.browser) {
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
