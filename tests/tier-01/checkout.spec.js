/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import {setNewOrder} from '../../client/store/orders'
import store from '../../client/store'

const app = require('../../server')
const agent = require('supertest')(app)

describe('Checkout View', () => {
  const newOrder = {
    order_price: 12.99,
    order_shipping_address: '5432 Sendit Here, New York NY',
    order_billing_address: '1234 Testing Address, New York NY',
    order_email: 'customer@email.com'
  }

  describe('Redux', () => {
    describe('set/fetch order', () => {
      xit('setNewOrder action creator returns a valid action', () => {
        expect(setNewOrder(newOrder)).to.deep.equal({
          type: 'SET_NEW_ORDER',
          newOrder
        })
      })
    })

    describe('reducer', () => {
      xit('reduces on SET_NEW_ORDER action', () => {
        const action = {type: 'SET_NEW_ORDER', newOrder}

        const prevState = store.getState()
        store.dispatch(action)
        const newState = store.getState()

        expect(newState.ordersReducer[0]).to.be.deep.equal(newOrder)
        expect(newState.ordersReducer[0]).to.not.be.equal(prevState.newOrder)
      })
    })
  })

  describe('Express API', () => {
    xit('POST /api/orders responds with new order', async () => {
      const response = await agent.post('/api/orders', newOrder).expect(200)
      expect(response.body).to.deep.equal({
        order_price: 12.99,
        order_shipping_address: '5432 Sendit Here, New York NY',
        order_billing_address: '1234 Testing Address, New York NY',
        order_email: 'customer@email.com'
      })
    })

    xit('GET /api/orders responds with orders information', async () => {
      const response = await agent.get('/api/orders').expect(200)
      expect(response.body).to.eql(newOrder)
    })
  })
})
