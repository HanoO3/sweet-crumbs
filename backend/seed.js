const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categoriesData = [
  { name: 'Artisanal Bread', slug: 'artisanal-bread', image: '/uploads/sourdough.png' },
  { name: 'Puff Pastries', slug: 'puff-pastries', image: '/uploads/croissant.png' },
  { name: 'Specialty Cakes', slug: 'specialty-cakes', image: '/uploads/chocolate_cake.png' },
  { name: 'Gourmet Cookies', slug: 'gourmet-cookies', image: '/uploads/cookies.png' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear old data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing products and categories.');

    // Seed categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log('Seeded categories.');

    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.name] = c._id;
    });

    // Seed products
    const productsData = [
      {
        name: 'Sourdough Boule',
        description: 'Crusty, tangy, and baked to perfection with a 48-hour slow ferment. Perfect for sandwiches or table bread.',
        price: 350,
        category: catMap['Artisanal Bread'],
        image: '/uploads/sourdough.png',
        stock: 15,
        isFeatured: true,
      },
      {
        name: 'French Baguette',
        description: 'Classic crisp crust with a light, airy crumb structure. Baked fresh every morning.',
        price: 180,
        category: catMap['Artisanal Bread'],
        image: '/uploads/sourdough.png',
        stock: 20,
        isFeatured: false,
      },
      {
        name: 'Butter Croissant',
        description: 'Flaky, golden-brown laminated layers made with premium French butter. Tender on the inside, crisp on the outside.',
        price: 220,
        category: catMap['Puff Pastries'],
        image: '/uploads/croissant.png',
        stock: 25,
        isFeatured: true,
      },
      {
        name: 'Pain au Chocolat',
        description: 'Crisp, buttery flaky pastry filled with two rich Belgian dark chocolate batons.',
        price: 260,
        category: catMap['Puff Pastries'],
        image: '/uploads/croissant.png',
        stock: 15,
        isFeatured: false,
      },
      {
        name: 'Belgian Chocolate Fudge Cake',
        description: 'Decadent, rich chocolate fudge layers glazed with a smooth dark chocolate ganache. Perfect for celebrations.',
        price: 2200,
        category: catMap['Specialty Cakes'],
        image: '/uploads/chocolate_cake.png',
        stock: 5,
        isFeatured: true,
      },
      {
        name: 'Red Velvet Dream',
        description: 'Rich red velvet sponge layers frosted with premium whipped vanilla cream cheese.',
        price: 1800,
        category: catMap['Specialty Cakes'],
        image: '/uploads/chocolate_cake.png',
        stock: 8,
        isFeatured: true,
      },
      {
        name: 'Salted Chocolate Chunk Cookie',
        description: 'Soft-baked, chewy cookie loaded with premium dark chocolate chunks and finished with a pinch of Maldon sea salt flakes.',
        price: 120,
        category: catMap['Gourmet Cookies'],
        image: '/uploads/cookies.png',
        stock: 45,
        isFeatured: true,
      },
      {
        name: 'Almond Macarons (6pcs)',
        description: 'Delicate, meringue-based French sandwich cookies. Box of 6 with assorted flavours (chocolate, raspberry, and pistachio).',
        price: 650,
        category: catMap['Gourmet Cookies'],
        image: '/uploads/cookies.png',
        stock: 12,
        isFeatured: false,
      },
    ];

    await Product.insertMany(productsData);
    console.log('Seeded products.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
