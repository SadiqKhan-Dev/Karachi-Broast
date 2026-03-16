import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean existing data
  await prisma.productCustomization.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.restaurantSetting.deleteMany()

  // ============================================
  // CATEGORIES
  // ============================================
  const [broast, burgers, pizza, sides, deals, beverages] = await Promise.all([
    prisma.category.create({
      data: { name: 'Broast & Chicken', slug: 'broast-chicken', description: 'Crispy fried chicken and broast specialties', icon: '🍗', sortOrder: 1, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600' },
    }),
    prisma.category.create({
      data: { name: 'Burgers', slug: 'burgers', description: 'Juicy burgers and sandwiches', icon: '🍔', sortOrder: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600' },
    }),
    prisma.category.create({
      data: { name: 'Pizza', slug: 'pizza', description: 'Delicious pizzas with fresh toppings', icon: '🍕', sortOrder: 3, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600' },
    }),
    prisma.category.create({
      data: { name: 'Sides & Snacks', slug: 'sides-snacks', description: 'Fries, wings, rings and more', icon: '🍟', sortOrder: 4, image: 'https://images.unsplash.com/photo-1630384060421-a4323ce5663e?w=600' },
    }),
    prisma.category.create({
      data: { name: 'Deals & Combos', slug: 'deals-combos', description: 'Best value meal deals', icon: '🎁', sortOrder: 5, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600' },
    }),
    prisma.category.create({
      data: { name: 'Beverages', slug: 'beverages', description: 'Cold drinks, shakes and lassi', icon: '🥤', sortOrder: 6, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600' },
    }),
  ])

  // ============================================
  // BROAST & CHICKEN (11 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Karachi Special Broast',
      slug: 'karachi-special-broast',
      description: 'Our legendary signature broast — hand-marinated for 24 hours in our secret spice blend, then double-fried to crispy golden perfection. The taste that started it all.',
      categoryId: broast.id,
      price: 899, comparePrice: 1099,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600',
      images: ['https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600', 'https://images.unsplash.com/photo-1619250907509-38882954d7a0?w=600'],
      calories: 650, prepTime: 15, isFeatured: true, isPopular: true, tags: ['spicy', 'bestseller', 'signature'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: 'Regular (4 pcs)', price: 0, isDefault: true }, { name: 'Large (6 pcs)', price: 300 }, { name: 'Family (10 pcs)', price: 700 }] } },
          { name: 'Spice Level', type: 'SINGLE', required: false, options: { create: [{ name: 'Mild', price: 0, isDefault: true }, { name: 'Medium', price: 0 }, { name: 'Hot', price: 0 }, { name: 'Extra Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Peri Peri Chicken',
      slug: 'peri-peri-chicken',
      description: 'African-inspired peri peri marinated chicken, grilled to juicy perfection and served with our house peri peri sauce. A fiery, smoky taste explosion.',
      categoryId: broast.id,
      price: 849, comparePrice: 999,
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600',
      calories: 580, prepTime: 18, isFeatured: true, isPopular: true, tags: ['spicy', 'grilled', 'popular'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: true, options: { create: [{ name: 'Mild Peri Peri', price: 0, isDefault: true }, { name: 'Hot Peri Peri', price: 0 }, { name: 'Extra Hot Peri Peri', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Crispy Hot Wings',
      slug: 'crispy-hot-wings',
      description: 'Six pieces of juicy chicken wings coated in our crispy batter, tossed in a choice of sauce. Perfect starter or snack.',
      categoryId: broast.id,
      price: 649,
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600',
      calories: 480, prepTime: 12, isPopular: true, tags: ['wings', 'spicy', 'snack'],
      customizations: {
        create: [
          { name: 'Sauce', type: 'SINGLE', required: true, options: { create: [{ name: 'Buffalo Hot', price: 0, isDefault: true }, { name: 'Honey BBQ', price: 0 }, { name: 'Garlic Parmesan', price: 0 }, { name: 'Peri Peri', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Chicken Strips',
      slug: 'chicken-strips',
      description: 'Tender chicken breast strips coated in seasoned panko breadcrumbs, fried golden. Served with your choice of dipping sauce.',
      categoryId: broast.id,
      price: 599,
      image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600',
      calories: 420, prepTime: 10, isPopular: true, tags: ['strips', 'kids', 'mild'],
      customizations: {
        create: [
          { name: 'Pieces', type: 'SINGLE', required: true, options: { create: [{ name: '3 Pieces', price: 0, isDefault: true }, { name: '5 Pieces', price: 200 }, { name: '8 Pieces', price: 400 }] } },
          { name: 'Dipping Sauce', type: 'SINGLE', required: false, options: { create: [{ name: 'Ketchup', price: 0, isDefault: true }, { name: 'Honey Mustard', price: 0 }, { name: 'Ranch', price: 0 }, { name: 'BBQ', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Half Broast',
      slug: 'half-broast',
      description: 'Half a whole chicken, marinated overnight and broasted to crispy golden perfection. A hearty meal for one.',
      categoryId: broast.id,
      price: 749,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=600',
      calories: 820, prepTime: 20, tags: ['hearty', 'filling'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: false, options: { create: [{ name: 'Mild', price: 0, isDefault: true }, { name: 'Medium', price: 0 }, { name: 'Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Chicken Tikka Broast',
      slug: 'chicken-tikka-broast',
      description: 'A desi fusion masterpiece — chicken tikka marinade with our signature broast batter. The best of both worlds.',
      categoryId: broast.id,
      price: 949, comparePrice: 1149,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600',
      calories: 710, prepTime: 20, isFeatured: true, tags: ['desi', 'fusion', 'spicy'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '4 Pieces', price: 0, isDefault: true }, { name: '6 Pieces', price: 350 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Crispy Drumsticks',
      slug: 'crispy-drumsticks',
      description: 'Four juicy chicken drumsticks in our original crispy coating. A classic that never gets old.',
      categoryId: broast.id,
      price: 549,
      image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600',
      calories: 520, prepTime: 15, tags: ['drumstick', 'classic'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Whole Broast Chicken',
      slug: 'whole-broast-chicken',
      description: 'A full whole chicken marinated in our secret spice blend for 24 hours and broasted to crispy perfection. Serves 2–3 people. The ultimate sharing meal.',
      categoryId: broast.id,
      price: 1299, comparePrice: 1499,
      image: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=600',
      calories: 1640, prepTime: 25, isFeatured: true, tags: ['whole', 'sharing', 'family'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: false, options: { create: [{ name: 'Mild', price: 0, isDefault: true }, { name: 'Medium', price: 0 }, { name: 'Hot', price: 0 }, { name: 'Extra Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Grilled Chicken Platter',
      slug: 'grilled-chicken-platter',
      description: 'Juicy charcoal-grilled chicken served with garlic naan, raita, mint chutney and a side salad. Healthy, flavourful and satisfying.',
      categoryId: broast.id,
      price: 1099, comparePrice: 1249,
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
      calories: 760, prepTime: 22, isPopular: true, tags: ['grilled', 'healthy', 'platter'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: false, options: { create: [{ name: 'Mild', price: 0, isDefault: true }, { name: 'Medium', price: 0 }, { name: 'Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Chicken Popcorn',
      slug: 'chicken-popcorn',
      description: 'Bite-sized crispy chicken popcorn pieces — perfectly seasoned and fried. Great as a snack, starter or kids meal. Comes with ketchup.',
      categoryId: broast.id,
      price: 449,
      image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600',
      calories: 360, prepTime: 8, isPopular: true, tags: ['popcorn', 'kids', 'snack', 'bite-sized'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: 'Regular Box', price: 0, isDefault: true }, { name: 'Large Box', price: 150 }, { name: 'XL Bucket', price: 280 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Nashta Broast Box',
      slug: 'nashta-broast-box',
      description: 'Our special breakfast broast — 2 crispy pieces with paratha, anda (egg), chutney and chai. A uniquely desi morning treat available from 12 PM.',
      categoryId: broast.id,
      price: 649, comparePrice: 799,
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600',
      calories: 890, prepTime: 15, tags: ['desi', 'breakfast', 'nashta'],
    },
  })

  // ============================================
  // BURGERS (10 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Zinger Burger',
      slug: 'zinger-burger',
      description: 'Our classic — a crispy fried chicken fillet with fresh lettuce, tomato, and signature zinger sauce in a toasted bun. A Karachi Broast icon.',
      categoryId: burgers.id,
      price: 549,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
      calories: 520, prepTime: 10, isFeatured: true, isPopular: true, tags: ['bestseller', 'chicken'],
      customizations: {
        create: [
          { name: 'Meal Option', type: 'SINGLE', required: false, options: { create: [{ name: 'Burger Only', price: 0, isDefault: true }, { name: 'With Fries', price: 150 }, { name: 'With Fries & Drink', price: 250 }] } },
          { name: 'Add-ons', type: 'MULTIPLE', required: false, options: { create: [{ name: 'Extra Cheese', price: 60 }, { name: 'Extra Sauce', price: 30 }, { name: 'Jalapeños', price: 40 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Double Smash Burger',
      slug: 'double-smash-burger',
      description: 'Two smashed beef patties, American cheese, caramelized onions, pickles and our special smash sauce on a brioche bun. Pure comfort in every bite.',
      categoryId: burgers.id,
      price: 749, comparePrice: 899,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600',
      calories: 780, prepTime: 12, isFeatured: true, isPopular: true, tags: ['beef', 'double', 'smash'],
      customizations: {
        create: [
          { name: 'Meal Option', type: 'SINGLE', required: false, options: { create: [{ name: 'Burger Only', price: 0, isDefault: true }, { name: 'With Fries & Drink', price: 250 }] } },
          { name: 'Add-ons', type: 'MULTIPLE', required: false, options: { create: [{ name: 'Extra Patty', price: 180 }, { name: 'Extra Cheese', price: 60 }, { name: 'Bacon Strips', price: 100 }, { name: 'Fried Egg', price: 70 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Spicy Jalapeño Burger',
      slug: 'spicy-jalapeno-burger',
      description: 'A heat-seekers dream — crispy chicken, sliced jalapeños, pepper jack cheese, chipotle sauce. Not for the faint-hearted.',
      categoryId: burgers.id,
      price: 649,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600',
      calories: 620, prepTime: 10, isPopular: true, tags: ['spicy', 'jalapeno', 'hot'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: true, options: { create: [{ name: 'Medium Hot', price: 0, isDefault: true }, { name: 'Extra Hot', price: 0 }, { name: 'Insane Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'BBQ Chicken Burger',
      slug: 'bbq-chicken-burger',
      description: 'Smoky BBQ glazed crispy chicken, crispy onion strings, cheddar cheese and tangy coleslaw. A southern BBQ experience.',
      categoryId: burgers.id,
      price: 699,
      image: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600',
      calories: 660, prepTime: 12, tags: ['bbq', 'smoky', 'chicken'],
      customizations: {
        create: [
          { name: 'Meal Option', type: 'SINGLE', required: false, options: { create: [{ name: 'Burger Only', price: 0, isDefault: true }, { name: 'With Fries & Drink', price: 250 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Classic Beef Burger',
      slug: 'classic-beef-burger',
      description: 'A timeless classic — 100% pure beef patty, fresh lettuce, tomato, onion, pickles and our house sauce on a sesame bun.',
      categoryId: burgers.id,
      price: 499,
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600',
      calories: 540, prepTime: 10, tags: ['beef', 'classic', 'simple'],
      customizations: {
        create: [
          { name: 'Cheese', type: 'SINGLE', required: false, options: { create: [{ name: 'No Cheese', price: 0, isDefault: true }, { name: 'Add Cheddar', price: 60 }, { name: 'Add American Cheese', price: 60 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Crispy Chicken Sandwich',
      slug: 'crispy-chicken-sandwich',
      description: 'Extra crispy fried chicken, thick-cut pickles, and butter on a toasted brioche bun. Inspired by the famous Southern sandwich.',
      categoryId: burgers.id,
      price: 599, comparePrice: 699,
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600',
      calories: 590, prepTime: 10, isFeatured: true, tags: ['sandwich', 'crispy', 'chicken'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Mushroom Swiss Burger',
      slug: 'mushroom-swiss-burger',
      description: 'Juicy beef patty topped with sautéed mushrooms, Swiss cheese and garlic aioli. A gourmet experience at fast food prices.',
      categoryId: burgers.id,
      price: 749,
      image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=600',
      calories: 720, prepTime: 14, tags: ['mushroom', 'gourmet', 'beef'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Tower Burger',
      slug: 'tower-burger',
      description: 'A towering beast — double crispy chicken, double cheese, bacon, egg, lettuce, tomato, onion rings and our special tower sauce. For the truly hungry.',
      categoryId: burgers.id,
      price: 999, comparePrice: 1199,
      image: 'https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?w=600',
      calories: 1100, prepTime: 15, isFeatured: true, isPopular: true, tags: ['tower', 'loaded', 'big'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Desi Chapli Burger',
      slug: 'desi-chapli-burger',
      description: 'A fusion masterpiece — Peshawari-style chapli kebab patty with onions, tomatoes, green chillies and raita sauce in a paratha bun. Authentically desi.',
      categoryId: burgers.id,
      price: 649, comparePrice: 749,
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600',
      calories: 680, prepTime: 14, isPopular: true, tags: ['desi', 'chapli', 'fusion', 'spicy'],
      customizations: {
        create: [
          { name: 'Spice Level', type: 'SINGLE', required: false, options: { create: [{ name: 'Medium', price: 0, isDefault: true }, { name: 'Hot', price: 0 }, { name: 'Extra Hot', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Veggie Burger',
      slug: 'veggie-burger',
      description: 'A hearty veggie patty made from chickpeas, spinach and spices, with fresh greens, tomato, cheese and garlic mayo. Deliciously meat-free.',
      categoryId: burgers.id,
      price: 499,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600',
      calories: 440, prepTime: 10, tags: ['vegetarian', 'healthy', 'veggie'],
    },
  })

  // ============================================
  // PIZZA (8 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Lahori Tikka Pizza',
      slug: 'lahori-tikka-pizza',
      description: 'Our signature desi pizza — tandoori tikka chicken, red onions, green chillies, capsicum on a spiced tomato base with mozzarella. A Lahori feast.',
      categoryId: pizza.id,
      price: 1099, comparePrice: 1299,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
      calories: 890, prepTime: 20, isFeatured: true, isPopular: true, tags: ['desi', 'tikka', 'spicy', 'bestseller'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }, { name: '15" XL', price: 600 }] } },
          { name: 'Crust', type: 'SINGLE', required: false, options: { create: [{ name: 'Thin Crust', price: 0, isDefault: true }, { name: 'Thick Crust', price: 50 }, { name: 'Stuffed Crust', price: 150 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'BBQ Chicken Pizza',
      slug: 'bbq-chicken-pizza',
      description: 'Smoky BBQ sauce base, grilled chicken, red onions, and mozzarella. A crowd pleaser every time.',
      categoryId: pizza.id,
      price: 999,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
      calories: 820, prepTime: 18, isPopular: true, tags: ['bbq', 'chicken', 'popular'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }, { name: '15" XL', price: 600 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Pepperoni Feast',
      slug: 'pepperoni-feast',
      description: 'Double the pepperoni, double the fun. Loaded with premium pepperoni slices, mozzarella and Italian herbs on a classic tomato base.',
      categoryId: pizza.id,
      price: 1149,
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600',
      calories: 960, prepTime: 20, isFeatured: true, tags: ['pepperoni', 'italian', 'classic'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }, { name: '15" XL', price: 600 }] } },
          { name: 'Extra Toppings', type: 'MULTIPLE', required: false, options: { create: [{ name: 'Extra Cheese', price: 100 }, { name: 'Mushrooms', price: 80 }, { name: 'Bell Peppers', price: 60 }, { name: 'Olives', price: 60 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Margherita Classic',
      slug: 'margherita-classic',
      description: 'Back to basics — fresh San Marzano tomato sauce, buffalo mozzarella and fresh basil. Perfection in simplicity.',
      categoryId: pizza.id,
      price: 849,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
      calories: 680, prepTime: 15, tags: ['vegetarian', 'classic', 'simple'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Veggie Supreme',
      slug: 'veggie-supreme',
      description: 'A rainbow of fresh vegetables — bell peppers, onions, mushrooms, black olives, corn and jalapeños on herbed tomato base. Deliciously vegetarian.',
      categoryId: pizza.id,
      price: 899,
      image: 'https://images.unsplash.com/photo-1511689660979-10d2b1eccb93?w=600',
      calories: 620, prepTime: 18, tags: ['vegetarian', 'healthy'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Karachi Broast Special Pizza',
      slug: 'karachi-broast-special-pizza',
      description: 'Our ultimate pizza — crispy broast chicken pieces, caramelized onions, jalapeños, roasted capsicum, special sauce and extra mozzarella. A Karachi Broast exclusive.',
      categoryId: pizza.id,
      price: 1299, comparePrice: 1499,
      image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=600',
      calories: 1050, prepTime: 22, isFeatured: true, isPopular: true, tags: ['signature', 'special', 'loaded'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 350 }, { name: '15" XL', price: 700 }] } },
          { name: 'Crust', type: 'SINGLE', required: false, options: { create: [{ name: 'Thin Crust', price: 0, isDefault: true }, { name: 'Stuffed Crust', price: 150 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Butter Chicken Pizza',
      slug: 'butter-chicken-pizza',
      description: 'Creamy makhani (butter chicken) sauce base, tender chicken pieces, red onion and mozzarella. A desi-Italian fusion that tastes like home.',
      categoryId: pizza.id,
      price: 1149, comparePrice: 1299,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      calories: 920, prepTime: 20, isPopular: true, tags: ['desi', 'butter-chicken', 'fusion'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }, { name: '15" XL', price: 600 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Four Cheese Pizza',
      slug: 'four-cheese-pizza',
      description: 'A cheese lover\'s dream — mozzarella, cheddar, parmesan, and cream cheese on a garlic butter base. Rich, gooey and utterly irresistible.',
      categoryId: pizza.id,
      price: 1199, comparePrice: 1349,
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600',
      calories: 1020, prepTime: 18, isFeatured: true, tags: ['cheese', 'vegetarian', 'indulgent'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: '9" Regular', price: 0, isDefault: true }, { name: '12" Large', price: 300 }, { name: '15" XL', price: 600 }] } },
        ],
      },
    },
  })

  // ============================================
  // SIDES & SNACKS (9 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Crispy Fries',
      slug: 'crispy-fries',
      description: 'Golden crispy french fries seasoned with our special blend. The perfect companion to any meal.',
      categoryId: sides.id,
      price: 199,
      image: 'https://images.unsplash.com/photo-1630384060421-a4323ce5663e?w=600',
      calories: 320, prepTime: 5, isPopular: true, tags: ['vegetarian', 'side', 'popular'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: true, options: { create: [{ name: 'Regular', price: 0, isDefault: true }, { name: 'Large', price: 80 }, { name: 'XL Bucket', price: 150 }] } },
          { name: 'Seasoning', type: 'SINGLE', required: false, options: { create: [{ name: 'Classic Salt', price: 0, isDefault: true }, { name: 'Cheese Powder', price: 40 }, { name: 'Peri Peri', price: 30 }, { name: 'BBQ Smoky', price: 30 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Loaded Cheese Fries',
      slug: 'loaded-cheese-fries',
      description: 'Crispy fries smothered in molten cheddar cheese sauce, jalapeños, sour cream, and crispy bacon bits. An indulgent treat.',
      categoryId: sides.id,
      price: 349, comparePrice: 399,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
      calories: 580, prepTime: 8, isPopular: true, tags: ['loaded', 'cheese', 'indulgent'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Onion Rings',
      slug: 'onion-rings',
      description: 'Thick-cut onion rings in a light, crispy beer batter, fried golden. Served with ranch dipping sauce.',
      categoryId: sides.id,
      price: 249,
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600',
      calories: 290, prepTime: 7, tags: ['vegetarian', 'crispy'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Coleslaw',
      slug: 'coleslaw',
      description: 'Creamy, tangy coleslaw made with fresh cabbage, carrots and our house dressing. The perfect cool side.',
      categoryId: sides.id,
      price: 149,
      image: 'https://images.unsplash.com/photo-1607116667981-ff148a9c5cb3?w=600',
      calories: 180, prepTime: 2, tags: ['vegetarian', 'fresh', 'cold'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Garlic Bread',
      slug: 'garlic-bread',
      description: 'Toasted Italian bread brushed with herbed garlic butter and sprinkled with fresh parsley. Four pieces per serving.',
      categoryId: sides.id,
      price: 179,
      image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600',
      calories: 260, prepTime: 5, tags: ['vegetarian', 'bread', 'starter'],
      customizations: {
        create: [
          { name: 'Option', type: 'SINGLE', required: false, options: { create: [{ name: 'Plain Garlic', price: 0, isDefault: true }, { name: 'With Cheese', price: 60 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Mozzarella Sticks',
      slug: 'mozzarella-sticks',
      description: 'Five golden-fried mozzarella sticks with a crispy coating and stretchy molten cheese inside. Served with marinara sauce.',
      categoryId: sides.id,
      price: 299,
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600',
      calories: 380, prepTime: 8, isPopular: true, tags: ['cheese', 'starter', 'snack'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Chicken Nuggets',
      slug: 'chicken-nuggets',
      description: 'Juicy, golden-fried chicken nuggets in a crispy coating. A classic loved by all ages. Served with ketchup.',
      categoryId: sides.id,
      price: 349,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600',
      calories: 400, prepTime: 7, isPopular: true, tags: ['kids', 'nuggets', 'snack'],
      customizations: {
        create: [
          { name: 'Pieces', type: 'SINGLE', required: true, options: { create: [{ name: '6 Pieces', price: 0, isDefault: true }, { name: '10 Pieces', price: 150 }, { name: '20 Pieces', price: 350 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Spicy Wedges',
      slug: 'spicy-wedges',
      description: 'Thick-cut potato wedges with skin on, seasoned with our spicy blend and oven-roasted until crispy. Heartier than fries.',
      categoryId: sides.id,
      price: 249, comparePrice: 299,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600',
      calories: 360, prepTime: 10, tags: ['spicy', 'potato', 'hearty'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Corn on the Cob',
      slug: 'corn-on-the-cob',
      description: 'Grilled sweet corn on the cob brushed with butter, lemon and our special masala. A Pakistani street food classic.',
      categoryId: sides.id,
      price: 149,
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600',
      calories: 140, prepTime: 5, tags: ['vegetarian', 'desi', 'healthy', 'corn'],
    },
  })

  // ============================================
  // DEALS & COMBOS (12 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Family Feast Deal',
      slug: 'family-feast-deal',
      description: 'Feed the whole family! 8 pcs Karachi Special Broast + 4 Zinger Burgers + 2 Large Fries + 1.5L Drink + 4 Coleslaw cups. Serves 4–5 people.',
      categoryId: deals.id,
      price: 2999, comparePrice: 4499,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
      calories: 3800, prepTime: 25, isFeatured: true, isPopular: true, tags: ['family', 'deal', 'value', 'bestseller'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Student Meal Deal',
      slug: 'student-meal-deal',
      description: 'Budget-friendly and filling — Zinger Burger + Regular Fries + 500ml Drink. Maximum taste, student budget.',
      categoryId: deals.id,
      price: 749, comparePrice: 999,
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600',
      calories: 980, prepTime: 12, isPopular: true, tags: ['student', 'budget', 'deal'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Couple Deal',
      slug: 'couple-deal',
      description: 'Date night sorted — 2 Signature Broast + 2 Burgers + 2 Fries + 2 Drinks. Share the love, share the food.',
      categoryId: deals.id,
      price: 1799, comparePrice: 2499,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      calories: 2400, prepTime: 20, isFeatured: true, tags: ['couple', 'date', 'deal'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Party Pack',
      slug: 'party-pack',
      description: 'Party time! 16 pcs Broast + 8 Burgers + 4 Large Fries + 2x1.5L Drinks + 6 Coleslaw cups. Serves 8–10 people.',
      categoryId: deals.id,
      price: 5499, comparePrice: 7999,
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600',
      calories: 7600, prepTime: 35, tags: ['party', 'bulk', 'deal', 'event'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Solo Broast Box',
      slug: 'solo-broast-box',
      description: 'Perfect solo meal — 2 pcs Karachi Special Broast + Regular Fries + 500ml Drink. Everything you need, nothing you don\'t.',
      categoryId: deals.id,
      price: 899, comparePrice: 1199,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600',
      calories: 1100, prepTime: 15, isFeatured: true, isPopular: true, tags: ['solo', 'meal', 'deal', 'value'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Burger + Wings Combo',
      slug: 'burger-wings-combo',
      description: 'Can\'t decide? Have both! Double Smash Burger + 6 Crispy Hot Wings + Large Fries + Drink. The ultimate indulgent meal.',
      categoryId: deals.id,
      price: 1399, comparePrice: 1849,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
      calories: 1580, prepTime: 18, isPopular: true, tags: ['combo', 'burger', 'wings'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Pizza + Broast Deal',
      slug: 'pizza-broast-deal',
      description: '12" Lahori Tikka Pizza + 4 pcs Karachi Special Broast + Garlic Bread + 1.5L Drink. The two-in-one deal for indecisive food lovers.',
      categoryId: deals.id,
      price: 2499, comparePrice: 3299,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
      calories: 2900, prepTime: 25, isFeatured: true, isPopular: true, tags: ['pizza', 'broast', 'combo', 'sharing'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Kids Happy Meal',
      slug: 'kids-happy-meal',
      description: 'Made for little ones — Chicken Popcorn Box + Small Fries + Juice Box. Fun, fresh and kid-approved.',
      categoryId: deals.id,
      price: 499, comparePrice: 649,
      image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600',
      calories: 620, prepTime: 8, isPopular: true, tags: ['kids', 'happy-meal', 'small'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Office Lunch Box (5 people)',
      slug: 'office-lunch-box',
      description: 'Office lunch sorted! 5 Zinger Burgers + 5 Regular Fries + 5x500ml Drinks. Order for your whole team.',
      categoryId: deals.id,
      price: 3499, comparePrice: 4749,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      calories: 4900, prepTime: 25, tags: ['office', 'bulk', 'lunch', 'group'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Midnight Snack Box',
      slug: 'midnight-snack-box',
      description: 'Late night cravings sorted — Loaded Cheese Fries + Mozzarella Sticks + Chicken Nuggets (10 pcs) + Dipping Sauces. Order anytime till 2 AM.',
      categoryId: deals.id,
      price: 849, comparePrice: 1099,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
      calories: 1280, prepTime: 12, isPopular: true, tags: ['snack', 'midnight', 'late-night', 'sharing'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Broast + Pizza Duo',
      slug: 'broast-pizza-duo',
      description: 'Dine with a friend! 4 pcs Broast + 9" Pizza of your choice + 2 Drinks. Great for sharing between two.',
      categoryId: deals.id,
      price: 1999, comparePrice: 2699,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
      calories: 2200, prepTime: 22, isFeatured: true, tags: ['duo', 'sharing', 'pizza', 'broast'],
      customizations: {
        create: [
          { name: 'Pizza Choice', type: 'SINGLE', required: true, options: { create: [{ name: 'Lahori Tikka', price: 0, isDefault: true }, { name: 'BBQ Chicken', price: 0 }, { name: 'Margherita', price: 0 }, { name: 'Veggie Supreme', price: 0 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Weekend Special Box',
      slug: 'weekend-special-box',
      description: 'Make your weekend epic — Whole Broast + 12" Karachi Special Pizza + 4 Burgers + Large Fries + 2x1.5L Drinks. Limited availability on weekends.',
      categoryId: deals.id,
      price: 4499, comparePrice: 6299,
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600',
      calories: 5800, prepTime: 35, isFeatured: true, isPopular: true, tags: ['weekend', 'special', 'premium', 'mega'],
    },
  })

  // ============================================
  // BEVERAGES (8 products)
  // ============================================
  await prisma.product.create({
    data: {
      name: 'Cold Drinks',
      slug: 'cold-drinks',
      description: 'Chilled Pepsi, 7Up, Mountain Dew or Mirinda. The perfect wash-down for your meal.',
      categoryId: beverages.id,
      price: 99,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=600',
      calories: 140, prepTime: 1, isPopular: true, tags: ['cold', 'fizzy', 'soda'],
      customizations: {
        create: [
          { name: 'Flavor', type: 'SINGLE', required: true, options: { create: [{ name: 'Pepsi', price: 0, isDefault: true }, { name: '7Up', price: 0 }, { name: 'Mountain Dew', price: 0 }, { name: 'Mirinda', price: 0 }] } },
          { name: 'Size', type: 'SINGLE', required: false, options: { create: [{ name: '500ml Bottle', price: 0, isDefault: true }, { name: '1L Bottle', price: 80 }, { name: '1.5L Bottle', price: 130 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Mango Lassi',
      slug: 'mango-lassi',
      description: 'Thick, creamy lassi made with fresh Pakistani mangoes and full-fat yogurt. A desi classic that complements our spicy dishes perfectly.',
      categoryId: beverages.id,
      price: 249,
      image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600',
      calories: 310, prepTime: 3, isPopular: true, tags: ['desi', 'sweet', 'cold', 'mango'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Chocolate Shake',
      slug: 'chocolate-shake',
      description: 'Rich, indulgent chocolate milkshake made with real ice cream and premium cocoa. Topped with whipped cream.',
      categoryId: beverages.id,
      price: 299, comparePrice: 349,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600',
      calories: 480, prepTime: 4, isPopular: true, tags: ['shake', 'chocolate', 'sweet'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: false, options: { create: [{ name: 'Regular 350ml', price: 0, isDefault: true }, { name: 'Large 500ml', price: 80 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Strawberry Shake',
      slug: 'strawberry-shake',
      description: 'Creamy strawberry milkshake bursting with real strawberry flavour. Topped with fresh whipped cream and a strawberry garnish.',
      categoryId: beverages.id,
      price: 299,
      image: 'https://images.unsplash.com/photo-1586917049351-7bf09fc3f59d?w=600',
      calories: 450, prepTime: 4, tags: ['shake', 'strawberry', 'sweet'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: false, options: { create: [{ name: 'Regular 350ml', price: 0, isDefault: true }, { name: 'Large 500ml', price: 80 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Fresh Lemonade',
      slug: 'fresh-lemonade',
      description: 'Freshly squeezed lemon juice with mint, sugar syrup and a pinch of black salt. Refreshing and energizing.',
      categoryId: beverages.id,
      price: 199,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600',
      calories: 120, prepTime: 3, tags: ['fresh', 'lemon', 'healthy'],
      customizations: {
        create: [
          { name: 'Style', type: 'SINGLE', required: false, options: { create: [{ name: 'Classic', price: 0, isDefault: true }, { name: 'Mint Lemonade', price: 0 }, { name: 'Virgin Mojito', price: 30 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Oreo Milkshake',
      slug: 'oreo-milkshake',
      description: 'Thick, creamy milkshake blended with real Oreo cookies and vanilla ice cream. Topped with crushed Oreos and whipped cream.',
      categoryId: beverages.id,
      price: 349, comparePrice: 399,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600',
      calories: 560, prepTime: 4, isFeatured: true, isPopular: true, tags: ['shake', 'oreo', 'sweet', 'indulgent'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: false, options: { create: [{ name: 'Regular 350ml', price: 0, isDefault: true }, { name: 'Large 500ml', price: 80 }] } },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Rooh Afza Sharbat',
      slug: 'rooh-afza-sharbat',
      description: 'The iconic Pakistani drink — chilled Rooh Afza syrup with fresh milk and crushed ice. A nostalgic, refreshing classic.',
      categoryId: beverages.id,
      price: 149,
      image: 'https://images.unsplash.com/photo-1560526861-ba5740f9ef27?w=600',
      calories: 180, prepTime: 2, isPopular: true, tags: ['desi', 'rooh-afza', 'traditional', 'sweet'],
    },
  })

  await prisma.product.create({
    data: {
      name: 'Salted Caramel Shake',
      slug: 'salted-caramel-shake',
      description: 'A sophisticated blend of rich caramel, a pinch of sea salt and creamy vanilla ice cream. Sweet, salty and utterly addictive.',
      categoryId: beverages.id,
      price: 349,
      image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600',
      calories: 520, prepTime: 4, isFeatured: true, tags: ['shake', 'caramel', 'premium', 'sweet'],
      customizations: {
        create: [
          { name: 'Size', type: 'SINGLE', required: false, options: { create: [{ name: 'Regular 350ml', price: 0, isDefault: true }, { name: 'Large 500ml', price: 80 }] } },
        ],
      },
    },
  })

  // ============================================
  // COUPONS
  // ============================================
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME20', description: 'Welcome discount — 20% off your first order', discountType: 'PERCENTAGE', discountValue: 20, minOrderAmount: 500, maxDiscount: 300, usageLimit: 5000, isActive: true, validFrom: new Date(), validUntil: new Date('2027-12-31') },
      { code: 'FREEDELIVERY', description: 'Free delivery on your order', discountType: 'FIXED', discountValue: 150, minOrderAmount: 800, isActive: true, validFrom: new Date(), validUntil: new Date('2027-12-31') },
      { code: 'PARTY10', description: '10% off on orders above Rs. 2000', discountType: 'PERCENTAGE', discountValue: 10, minOrderAmount: 2000, maxDiscount: 500, isActive: true, validFrom: new Date(), validUntil: new Date('2027-12-31') },
      { code: 'STUDENT15', description: 'Student special — 15% off any order', discountType: 'PERCENTAGE', discountValue: 15, minOrderAmount: 400, maxDiscount: 200, isActive: true, validFrom: new Date(), validUntil: new Date('2027-12-31') },
      { code: 'FIRST100', description: 'Rs. 100 off on your first order', discountType: 'FIXED', discountValue: 100, minOrderAmount: 600, isActive: true, validFrom: new Date(), validUntil: new Date('2027-12-31') },
    ],
  })

  // ============================================
  // RESTAURANT SETTINGS
  // ============================================
  await prisma.restaurantSetting.createMany({
    data: [
      { key: 'restaurant_name', value: 'Karachi Broast' },
      { key: 'restaurant_phone', value: '+92 21 1234567' },
      { key: 'restaurant_email', value: 'info@karachibbroast.com' },
      { key: 'restaurant_address', value: 'Main Street, Gulshan-e-Iqbal, Karachi, Pakistan' },
      { key: 'delivery_fee', value: '150' },
      { key: 'free_delivery_above', value: '1000' },
      { key: 'min_order_amount', value: '300' },
      { key: 'estimated_delivery_time', value: '30-45' },
      { key: 'tax_rate', value: '13' },
    ],
  })

  console.log('✅ Database seeded successfully with 58 products across 6 categories!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
