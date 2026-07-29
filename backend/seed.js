const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const categoriesData = [
  { name: 'Glazed Donuts', slug: 'glazed-donuts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=150&auto=format&fit=crop' },
  { name: 'Fluffy Cupcakes', slug: 'fluffy-cupcakes', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=150&auto=format&fit=crop' },
  { name: 'Ice Cream Sundaes', slug: 'ice-cream-sundaes', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=150&auto=format&fit=crop' },
  { name: 'Artisanal Bread', slug: 'artisanal-bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=150&auto=format&fit=crop' },
  { name: 'Puff Pastries', slug: 'puff-pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=150&auto=format&fit=crop' },
  { name: 'Specialty Cakes', slug: 'specialty-cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=150&auto=format&fit=crop' },
  { name: 'Gourmet Cookies', slug: 'gourmet-cookies', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=150&auto=format&fit=crop' },
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
      // Glazed Donuts
      {
        name: 'Pink Glazed Donut',
        description: 'Soft, fluffy ring donut dipped in a sweet strawberry glaze and topped with rainbow sprinkles.',
        price: 150,
        category: catMap['Glazed Donuts'],
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop',
        stock: 30,
        isFeatured: true,
      },
      {
        name: 'Chocolate Sprinkle Donut',
        description: 'Freshly baked ring donut glazed with rich Belgian milk chocolate and colorful sprinkles.',
        price: 160,
        category: catMap['Glazed Donuts'],
        image: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=600&auto=format&fit=crop',
        stock: 25,
        isFeatured: false,
      },
      // Fluffy Cupcakes
      {
        name: 'Vanilla Confetti Cupcake',
        description: 'Moist vanilla sponge cake topped with a generous swirl of strawberry and vanilla whipped buttercream and rainbow confetti.',
        price: 190,
        category: catMap['Fluffy Cupcakes'],
        image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600&auto=format&fit=crop',
        stock: 20,
        isFeatured: true,
      },
      {
        name: 'Double Chocolate Cupcake',
        description: 'Rich cocoa sponge cupcake frosted with whipped dark chocolate buttercream and chocolate curls.',
        price: 210,
        category: catMap['Fluffy Cupcakes'],
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop',
        stock: 15,
        isFeatured: false,
      },
      // Ice Cream Sundaes
      {
        name: 'Classic Strawberry Sundae',
        description: 'Vanilla bean and strawberry ice cream scoops layered with fresh strawberry compote, whipped cream, and a cherry on top.',
        price: 380,
        category: catMap['Ice Cream Sundaes'],
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop',
        stock: 12,
        isFeatured: true,
      },
      {
        name: 'Chocolate Fudge Sundae',
        description: 'Triple chocolate ice cream scoops with warm fudge drizzle, brownie chunks, chocolate chips, and crushed roasted nuts.',
        price: 420,
        category: catMap['Ice Cream Sundaes'],
        image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop',
        stock: 10,
        isFeatured: false,
      },
      // Bread
      {
        name: 'Sourdough Boule',
        description: 'Crusty, tangy, and baked to perfection with a 48-hour slow ferment. Perfect for sandwiches or table bread.',
        price: 350,
        category: catMap['Artisanal Bread'],
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop',
        stock: 15,
        isFeatured: false,
      },
      {
        name: 'French Baguette',
        description: 'Classic crisp crust with a light, airy crumb structure. Baked fresh every morning.',
        price: 180,
        category: catMap['Artisanal Bread'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
        stock: 20,
        isFeatured: false,
      },
      // Puff Pastries
      {
        name: 'Butter Croissant',
        description: 'Flaky, golden-brown laminated layers made with premium French butter. Tender on the inside, crisp on the outside.',
        price: 220,
        category: catMap['Puff Pastries'],
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
        stock: 25,
        isFeatured: true,
      },
      {
        name: 'Pain au Chocolat',
        description: 'Crisp, buttery flaky pastry filled with two rich Belgian dark chocolate batons.',
        price: 260,
        category: catMap['Puff Pastries'],
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop',
        stock: 15,
        isFeatured: false,
      },
      // Specialty Cakes
      {
        name: 'Belgian Chocolate Fudge Cake',
        description: 'Decadent, rich chocolate fudge layers glazed with a smooth dark chocolate ganache. Perfect for celebrations.',
        price: 2200,
        category: catMap['Specialty Cakes'],
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
        stock: 5,
        isFeatured: true,
      },
      {
        name: 'Red Velvet Dream',
        description: 'Rich red velvet sponge layers frosted with premium whipped vanilla cream cheese.',
        price: 1800,
        category: catMap['Specialty Cakes'],
        image: 'https://images.unsplash.com/photo-1586985289688-ca9cf499150a?q=80&w=600&auto=format&fit=crop',
        stock: 8,
        isFeatured: false,
      },
      // Gourmet Cookies
      {
        name: 'Salted Chocolate Chunk Cookie',
        description: 'Soft-baked, chewy cookie loaded with premium dark chocolate chunks and finished with a pinch of Maldon sea salt flakes.',
        price: 120,
        category: catMap['Gourmet Cookies'],
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop',
        stock: 45,
        isFeatured: true,
      },
      {
        name: 'Almond Macarons (6pcs)',
        description: 'Delicate, meringue-based French sandwich cookies. Box of 6 with assorted flavours (chocolate, raspberry, and pistachio).',
        price: 650,
        category: catMap['Gourmet Cookies'],
        image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop',
        stock: 12,
        isFeatured: false,
      },
    ];

    await Product.insertMany(productsData);
    console.log('Seeded products.');

    // Seed admin user
    await User.deleteMany({ email: 'hana@test.com' });
    await User.create({
      name: 'Hana Admin',
      email: 'hana@test.com',
      password: '123456',
      role: 'admin',
    });
    console.log('Seeded admin user hana@test.com (password: 123456).');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
