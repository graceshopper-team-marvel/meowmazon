/* eslint-disable camelcase */
'use strict'

const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const products = [
      {
        product_name: 'Pizza Bed',
        product_price: 1999,
        product_description:
          "This pizza bed is designed to hold in your cat's body heat just like a pizza fresh out of the oven.",
        product_image: '/images/pizzaBed.png',
        product_category: 'cat',
        product_quantity: 100
      },
      {
        product_name: "Lick'em Brush",
        product_price: 1299,
        product_description:
          'Lick your cat back and groom them at the same time!',
        product_image: '/images/catLicker.jpeg',
        product_category: 'cat',
        product_quantity: 55
      },
      {
        product_name: 'Bubble Backpack',
        product_price: 2599,
        product_description:
          'Give your cat a view while you carry them around!',
        product_image: '/images/backPack.jpg',
        product_category: 'cat',
        product_quantity: 74
      },
      {
        product_name: 'Cat Mittens',
        product_price: 999,
        product_description: 'Stylish Cat Hands',
        product_image: '/images/catMittens.jpg',
        product_category: 'cat',
        product_quantity: 0
      },
      {
        product_name: 'Cat Sweater',
        product_price: 3499,
        product_description: 'Cozy Cat Sweater',
        product_image: '/images/catSweater.jpg',
        product_category: 'cat',
        product_quantity: 34
      },
      {
        product_name: 'Cat Hat',
        product_price: 2599,
        product_description:
          'Look as cute as your kitty in this fuzzy hat with cat ears',
        product_image: '/images/catHat.jpg',
        product_category: 'cat',
        product_quantity: 14
      },
      {
        product_name: 'Floppy Fish Toy',
        product_price: 1499,
        product_description:
          'Give your kitty something to attack with our floppy fish toy!',
        product_image: '/images/fishToy.jpg',
        product_category: 'cat',
        product_quantity: 26
      }
    ]

    const [
      pizzaBed,
      lickemBrush,
      backpack,
      catMittens,
      catSweater,
      catHat,
      floppyFish
    ] = await Product.bulkCreate(products)

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
        user_email: 'miverva@hogwarts.com',
        user_password: 'hogwartsrocks',
        user_billing_address: '14 West Womping Willow, England',
        user_default_shipping_address: '14 West Womping Willow, England',
        user_phone: '555-666-7777',
        user_type: 'customer',
        user_cart: []
      }
    ]

    const [admin, minerva] = await User.bulkCreate(users)

    console.log(green(`seeded ${products.length} products`))
    console.log(green(`seeded ${users.length} users`))
    console.log(green(`seeded successfully`))
  } catch (err) {
    console.log(red(err))
  }
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
