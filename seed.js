// seed placeholder
const {green, red} = require('chalk')
const {db} = require('./server/db')
// require in models
const Product = require('./server/db/models/product')
// const User= require("./server/db/user")

const seed = async () => {
  try {
    await db.sync({force: true})

    //categories: toys, clothes, accessories, grooming, beds
    // pizza bed [x]
    // grooming tool -> cat tongue [x]
    // bubble backpack  [x]
    // floppy fish toy [x]
    // cat mittens  [x]
    // cat sweater  [x]
    // cat hat [x]
    // cat raincoat
    // cat booties

    const products = [
      {
        product_name: 'Pizza Bed',
        product_price: 19.99,
        product_description:
          "This pizza bed is designed to hold in your cat's body heat just like a pizza fresh out of the oven!",
        product_image: '/images/pizzaBed.png',
        product_category: 'beds',
        product_quantity: 100,
      },
      {
        product_name: "Lick'em Brush",
        product_price: 12.99,
        product_description:
          'Lick your cat back and groom them at the same time!',
        product_image: '/images/catLicker.jpeg',
        product_category: 'grooming',
        product_quantity: 55,
      },
      {
        product_name: 'Bubble Backpack',
        product_price: 25.0,
        product_description:
          'Give your cat a view while you carry them around!',
        product_image: '/images/backPack.jpg',
        product_category: 'accessories',
        product_quantity: 74,
      },
      {
        product_name: 'Cat Mittens',
        product_price: 9.99,
        product_description: 'Mittens, but cats!',
        product_image: '/images/catMittens.jpg',
        product_category: 'clothing',
        product_quantity: 0,
      },
      {
        product_name: 'Cat Sweater',
        product_price: 34.99,
        product_description: 'Cozy Cat Sweater',
        product_image: '/images/catSweater.jpg',
        product_category: 'clothing',
        product_quantity: 34,
      },
      {
        product_name: 'Cat Hat',
        product_price: 25.99,
        product_description:
          'Look as cute as your kitty in this fuzzy hat with cat ears!',
        product_image: '/images/catHat.jpg',
        product_category: 'clothing',
        product_quantity: 14,
      },
      {
        product_name: 'Floppy Fish Toy',
        product_price: 14.99,
        product_description:
          'Give your kitty something to attack with our floppy fish toy!',
        product_image: '/fishToy.jpg',
        product_category: 'toys',
        product_quantity: 26,
      },
    ]
    const [
      pizzaBed,
      lickemBrush,
      backpack,
      catMittens,
      catSweater,
      catHat,
      floppyFish,
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
        user_cart: [],
      },
      {
        user_full_name: 'Minerva McGonagall',
        user_email: 'miverva@hogwarts.com',
        user_password: 'hogwartsrocks',
        user_billing_address: '14 West Womping Willow, England',
        user_default_shipping_address: '14 West Womping Willow, England',
        user_phone: '555-666-7777',
        user_type: 'customer',
        user_cart: [],
      },
    ]
    const [admin, minerva] = await User.bulkCreate(users)
  } catch (err) {
    console.log(red(err))
  }
}

// const users = [
//   {user_email: "", user_password: "", user_full_name: "", user_billing_address: "", user_default_shipping_address="", user_phone: "",}
// ]

module.exports = seed

seed()
  .then(() => {
    console.log(green('Seeding success!'))
    db.close()
  })
  .catch((err) => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
