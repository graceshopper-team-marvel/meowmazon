/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import {setSingleProduct} from '../../client/store/single-product'
import store from '../../client/store'

const app = require('../../server')
const agent = require('supertest')(app)

describe('Single Product View', () => {
  const product = {
    id: 1,
    product_name: "Lick'em Brush",
    product_price: 12.99,
    product_description: 'Lick your cat back and groom them at the same time!',
    product_image: '/images/catLicker.jpeg',
    product_category: 'grooming',
    product_quantity: 55
  }

  describe('Redux', () => {
    describe('set/fetch single product', () => {
      it('setSingleProduct action creator returns a valid action', () => {
        expect(setSingleProduct(product)).to.deep.equal({
          type: 'SET_PRODUCT',
          product
        })
      })
    })

    describe('reducer', () => {
      it('reduces on SET_PRODUCT action', () => {
        const action = {type: 'SET_PRODUCT', product}

        const prevState = store.getState()
        store.dispatch(action)
        const newState = store.getState()

        expect(newState.singleProductReducer).to.be.deep.equal(product)
        expect(newState.singleProductReducer).to.not.be.equal(prevState.product)
      })
    })
  })

  describe('Express API', () => {
    it('GET /api/products/2 responds with product', async () => {
      const response = await agent.get('/api/products/2').expect(200)
      expect(response.body.product_name).to.deep.equal("Lick'em Brush")
      expect(response.body.product_price).to.deep.equal('12.99')
      expect(response.body.product_description).to.deep.equal(
        'Lick your cat back and groom them at the same time!'
      )
      expect(response.body.product_category).to.deep.equal('cat')
    })
  })
})
