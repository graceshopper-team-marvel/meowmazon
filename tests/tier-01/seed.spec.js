'use strict'
/* global describe it */

const seed = require('../../script/seed')
const {User, Product} = require('../server/db/models')

describe('seed script', () => {
  xit('completes successfully', seed)
})

describe('Seed file', () => {
  beforeEach(seed)

  xit('populates the database with at least two users', async () => {
    const seededUsers = await User.findAll()
    expect(seededUsers).to.have.lengthOf.at.least(2)
  })
  xit('it populates the database with at least 5 products', async () => {
    const seededProducts = await Product.findAll()
    expect(seededProducts).to.have.lengthOf.at.least(5)
  })
})
