const faker = require('faker')

const users = [
  {
    user_full_name: 'Admin Adminerson',
    user_email: 'admin@admin.com',
    user_password: 'adminsrock',
    user_billing_address: '123 Admin Ave, NY, US',
    user_default_shipping_address: '123 Admin Ave, NY, US',
    user_phone: '123-456-7890',
    user_type: 'admin',
    user_cart: []
  },
  {
    user_full_name: 'Minerva McGonagall',
    user_email: 'minerva@hogwarts.com',
    user_password: 'hogwartsrocks',
    user_billing_address: '14 West Womping Willow, England',
    user_default_shipping_address: '14 West Womping Willow, England',
    user_phone: '555-666-7777',
    user_type: 'customer',
    user_cart: []
  }
]

const userArray = new Array(48).fill()

const fakeUsers = userArray.map(() => ({
  user_full_name: faker.name.findName(),
  user_email: faker.internet.email(),
  user_password: faker.internet.password(),
  user_billing_address: faker.address.streetAddress(),
  user_default_shipping_address: faker.address.secondaryAddress(),
  user_phone: faker.phone.phoneNumber(),
  user_type: 'customer'
}))

const generatedUsers = users.concat(fakeUsers)

module.exports = generatedUsers
