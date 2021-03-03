'use strict'

// Make sure to create meowmazon-test in your database so these run!

const {expect} = require('chai')
const seed = require('../../script/seed')

const {User, Product} = require('../../server/db/models')

describe('Seed file', () => {
  beforeEach(seed)

  it('populates the database with at least two users', async () => {
    const seededUsers = await User.findAll()
    expect(seededUsers).to.have.lengthOf.at.least(2)
  })

  it('it populates the database with at least 5 products', async () => {
    const seededProducts = await Product.findAll()
    expect(seededProducts).to.have.lengthOf.at.least(5)
  })
})
