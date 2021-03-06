/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'

const {MemoryRouter, StaticRouter} = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  products: []
}

import mockAxios from '../mock-axios'
import {setProducts, fetchProducts} from '../../client/store/all-products'

import store, {reducer} from '../../client/store'

import {createStore} from 'redux'

const app = require('../../server/index')
const agent = require('supertest')(app)

const {db, Product} = require('../../server/db')

import AllProducts, {
  AllProducts as UnconnectedAllProducts
} from '../../client/components/all-products'

describe('Tier One: Products', () => {
  const products = [
    {
      id: 1,
      product_name: 'Pizza Bed',
      product_price: 20,
      product_description: 'idk',
      product_image: '/images/test1.png',
      product_category: 'cat',
      product_quantity: 3
    },
    {
      id: 2,
      product_name: 'Cat Mittens',
      product_price: 20,
      product_description: 'idk',
      product_image: '/images/test2.png',
      product_category: 'cat',
      product_quantity: 3
    }
  ]
  beforeEach(() => {
    mockAxios.onGet('/api/products').replyOnce(200, products)
  })
  describe('<AllProducts /> component', () => {
    const getProductsSpy = sinon.spy()
    afterEach(() => {
      getProductsSpy.resetHistory()
    })

    xit('renders the products passed in as props', () => {
      const wrapper = mount(
        <StaticRouter>
          <UnconnectedAllProducts
            products={products}
            getProducts={getProductsSpy}
          />
        </StaticRouter>
      )
      expect(wrapper.text()).to.include('Pizza Bed')
      expect(wrapper.text()).to.include('Cat Mittens')

      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/test1.png',
        '/images/test2.png'
      ])
    })

    xit('renders DIFFERENT products passed in as props', () => {
      const differentProducts = [
        {
          id: 4,
          product_name: 'Cat Hat',
          product_price: 20,
          product_description: 'idk',
          product_image: '/images/test3.png',
          product_category: 'cat',
          product_quantity: 3
        },
        {
          id: 5,
          product_name: 'Cat Sweater',
          product_price: 20,
          product_description: 'idk',
          product_image: '/images/test4.png',
          product_category: 'cat',
          product_quantity: 3
        }
      ]
      const wrapper = mount(
        <StaticRouter>
          <UnconnectedAllProducts
            products={differentProducts}
            getProducts={getProductsSpy}
          />
        </StaticRouter>
      )
      expect(wrapper.text()).to.not.include('Pizza Bed')
      expect(wrapper.text()).to.not.include('Cat Mittens')
      expect(wrapper.text()).to.include('Cat Hat')
      expect(wrapper.text()).to.include('Cat Sweater')

      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/test3.png',
        '/images/test4.png'
      ])
    })

    xit('renders "No Products" if passed an empty array of products', () => {
      const emptyArrayOfProducts = []
      const wrapper = mount(
        <StaticRouter>
          <UnconnectedAllProducts
            products={emptyArrayOfProducts}
            getProducts={getProductsSpy}
          />
        </StaticRouter>
      )

      expect(wrapper.text()).to.include('No Products')
    })

    xit('calls this.props.getProducts after mount', async () => {
      mount(
        <StaticRouter>
          <UnconnectedAllProducts
            products={products}
            getProducts={getProductsSpy}
          />
        </StaticRouter>
      )
      await waitForExpect(() => {
        expect(getProductsSpy).to.have.been.called
      })
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set/fetch products', () => {
      xit('setProducts action creator returns a valid action', () => {
        expect(setProducts(products)).to.deep.equal({
          type: 'SET_PRODUCTS',
          products
        })
      })

      xit('fetchProducts thunk creator returns a thunk that GETs /api/products', async () => {
        await fakeStore.dispatch(fetchProducts())
        const [getRequest] = mockAxios.history.get
        expect(getRequest).to.not.equal(undefined)
        expect(getRequest.url).to.equal('/api/products')
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_PRODUCTS')
        expect(actions[0].products).to.deep.equal(products)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(reducer)
      })

      xit('returns the initial state by default', () => {
        expect(testStore.getState().products).to.be.an('array')
      })

      xit('reduces on SET_PRODUCTS action', () => {
        const action = {type: 'SET_PRODUCTS', products}

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.products).to.be.deep.equal(products)
        expect(newState.products).to.not.be.equal(prevState.products)
      })
    })
  })

  describe('Connect: react-redux', () => {
    xit('initializes products from the server when the application loads the /products route', async () => {
      const reduxStateBeforeMount = store.getState()
      expect(reduxStateBeforeMount.products).to.deep.equal([])
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/products']}>
            <AllProducts />
          </MemoryRouter>
        </Provider>
      )
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState()
        expect(reduxStateAfterMount.products).to.deep.equal(products)
      })
    })

    xit('<AllProducts /> renders products from the Redux store', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/products']}>
            <AllProducts />
          </MemoryRouter>
        </Provider>
      )
      await waitForExpect(() => {
        wrapper.update()

        const {products: reduxProducts} = store.getState()
        reduxProducts.forEach(reduxProduct => {
          expect(wrapper.text()).to.include(reduxProduct.product_name)
        })
      })
    })
  })
})
