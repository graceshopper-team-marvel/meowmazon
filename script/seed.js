/* eslint-disable camelcase */
'use strict'

const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')
const userSeed = require('./user-seed')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const products = [
      {
        product_name: 'Mushroom Cat Fur Hat',
        product_price: 2199,
        product_description: 'Handmade from real cat fur',
        product_image: '/images/hat_mush.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
      {
        product_name: 'Stripe Cat Fur Hat',
        product_price: 2199,
        product_description: 'Handmade from real cat fur',
        product_image: '/images/hat_stripes.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
      {
        product_name: 'Dinosaur Knit Hat',
        product_price: 2199,
        product_description: 'Handknit dinosaur hat',
        product_image: '/images/hat_dino.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
      {
        product_name: 'Alien Cat Fur Hat',
        product_price: 2199,
        product_description: 'Handmade from real cat fur',
        product_image: '/images/hat_alien.jpg',
        product_category: 'cat',
        product_quantity: 26
      },

      {
        product_name: 'Cat Beanie',
        product_price: 2199,
        product_description: 'Handknit beanie for your kitty',
        product_image: '/images/hat_beanie.jpg',
        product_category: 'cat',
        product_quantity: 26
      },

      {
        product_name: 'Bear Hat (Natural)',
        product_price: 2199,
        product_description: 'Brown Hat with Bear Ears',
        product_image: '/images/hat_bear.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
      {
        product_name: 'Bear Hat (Yellow)',
        product_price: 2199,
        product_description: 'Yellow Hat with Bear Ears',
        product_image: '/images/hat_bear_yellow.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
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
        product_image: '/images/backPackYellow.jpg',
        product_category: 'cat',
        product_quantity: 74
      },
      {
        product_name: 'Cat Mittens',
        product_price: 999,
        product_description: 'Stylish Cat Hands',
        product_image: '/images/catMittens2.jpg',
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
          'Give your kitty something to attack with our floppy fish toy',
        product_image: '/images/fishToy.jpg',
        product_category: 'cat',
        product_quantity: 26
      },
      {
        product_name: 'Cactus Scratching Post (Dark Green)',
        product_price: 2699,
        product_description: 'Green Cactus Shaped Scratching Post',
        product_image: '/images/scratch_cactus.png',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Cactus Scratching Post (Light Green)',
        product_price: 2699,
        product_description: 'Green Cactus Shaped Scratching Post',
        product_image: '/images/scratch_cactus2.png',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Sphere Shape Scratching Post',
        product_price: 2699,
        product_description: 'Beautiful Woven Sphere Scratching Post',
        product_image: '/images/scratch_ball.jpg',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Wall Scratching Post',
        product_price: 2699,
        product_description: 'Beautiful Wall Hanging Scratching Post',
        product_image: '/images/scratch_wall.jpg',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Sunflower Scratching Post',
        product_price: 2699,
        product_description:
          'This Scratching Post Shaped Like A Sunflower Brightens Up Any Room',
        product_image: '/images/scratch_sun.jpg',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Triangle Scratching Post',
        product_price: 2699,
        product_description: 'This Scratching Post Doubles as a Hiding Nook',
        product_image: '/images/scratch_tri.jpg',
        product_category: 'cat',
        product_quantity: 30
      },
      {
        product_name: 'Scratching Bench',
        product_price: 2699,
        product_description: 'This Scratching Post Doubles as a Bench',
        product_image: '/images/scratch_bench.png',
        product_category: 'cat',
        product_quantity: 30
      },

      {
        product_name: 'Catnip Pineapple Toy',
        product_price: 2699,
        product_description: 'Cute Pineapple Shaped Toy infused with Catnip',
        product_image: '/images/toy_pineapple.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Catnip Cake Toy',
        product_price: 2699,
        product_description: 'Cute Cake Shaped Toy infused with Catnip',
        product_image: '/images/toy_cake.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Catnip Sushi Toy',
        product_price: 2699,
        product_description: 'Cute Sushi Shaped Toy infused with Catnip',
        product_image: '/images/toy_sushi.png',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Catnip Donut Toy',
        product_price: 2699,
        product_description: 'Cute Donut Shaped Toy infused with Catnip',
        product_image: '/images/toy_donut.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Catnip Carrot Toy',
        product_price: 2699,
        product_description: 'Cute Carrot Shaped Toy infused with Catnip',
        product_image: '/images/toy_carrot.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Catnip Mouse Toy Set',
        product_price: 3599,
        product_description:
          'Set of Three Mouse Shaped Toys infused with Catnip',
        product_image: '/images/toy_mice.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Organic Cat Grass',
        product_price: 1299,
        product_description: 'Grow Your Own Organic Cat Grass',
        product_image: '/images/nov_catgrass.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Wicker Fish Bed',
        product_price: 3299,
        product_description: 'Beautiful Fish Shaped Wicker Cat Bed',
        product_image: '/images/bed_fish.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Wicker Cat Bed',
        product_price: 3299,
        product_description: 'Classic Wicker Cat Bed',
        product_image: '/images/bed_wicker.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Plush Cat Bed (Grey)',
        product_price: 3299,
        product_description: 'Soft Plush Cat Bed in Grey',
        product_image: '/images/bed_plushgrey.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Plush Cat Bed (Pink)',
        product_price: 3299,
        product_description: 'Soft Plush Cat Bed in Pink',
        product_image: '/images/bed_plush.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Cat Ears Bed',
        product_price: 3299,
        product_description: 'Cotton Grey Cat Bed With Cat Ears',
        product_image: '/images/bed_ears.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Bubble Wall Cat Bed',
        product_price: 3299,
        product_description: 'This Cat Bed Doubles as a Perch',
        product_image: '/images/bed_bubble.jpg',
        product_category: 'cat',
        product_quantity: 1399
      },
      {
        product_name: 'Pumpkin Cat Bed',
        product_price: 3299,
        product_description: 'Pumpkin Inspired Cat Bed',
        product_image: '/images/bed_pumpkin.jpg',
        product_category: 'cat',
        product_quantity: 1399
      }
    ]

    // const [
    //   pizzaBed,
    //   lickemBrush,
    //   backpack,
    //   catMittens,
    //   catSweater,
    //   catHat,
    //   floppyFish,
    //   hatMush,
    // ] =

    await Product.bulkCreate(products)

    const [admin, minerva] = await User.bulkCreate(userSeed)

    console.log(green(`seeded ${products.length} products`))
    console.log(green(`seeded ${userSeed.length} users`))
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
