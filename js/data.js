// ===== CUISINE CATEGORIES =====
const CATEGORIES = [
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣' },
  { id: 'burger', name: 'Burgers', emoji: '🍔' },
  { id: 'indian', name: 'Indian', emoji: '🍛' },
  { id: 'chinese', name: 'Chinese', emoji: '🥡' },
  { id: 'mexican', name: 'Mexican', emoji: '🌮' },
  { id: 'italian', name: 'Italian', emoji: '🍝' },
  { id: 'dessert', name: 'Desserts', emoji: '🍰' },
  { id: 'healthy', name: 'Healthy', emoji: '🥗' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' }
];

// ===== RESTAURANTS =====
const RESTAURANTS = [
  {
    id: 'r1', name: 'Pizza Paradise', cuisine: ['pizza','italian'], rating: 4.8, reviews: 1240,
    deliveryTime: '25-35', deliveryFee: 2.99, minOrder: 12, priceRange: '$$',
    address: '123 Main Street', phone: '(555) 123-4567', hours: '10:00 AM - 11:00 PM',
    description: 'Authentic wood-fired pizzas crafted with imported Italian ingredients and love.',
    tags: ['Wood-Fired', 'Family Friendly', 'Vegetarian Options'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    logo: '🍕'
  },
  {
    id: 'r2', name: 'Sakura Sushi Bar', cuisine: ['sushi','japanese'], rating: 4.9, reviews: 890,
    deliveryTime: '30-40', deliveryFee: 3.99, minOrder: 15, priceRange: '$$$',
    address: '456 Oak Avenue', phone: '(555) 234-5678', hours: '11:00 AM - 10:00 PM',
    description: 'Premium sushi and sashimi prepared by master chefs with the freshest fish.',
    tags: ['Premium', 'Fresh Fish', 'Sake Bar'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    logo: '🍣'
  },
  {
    id: 'r3', name: 'Burger Barn', cuisine: ['burger','american'], rating: 4.6, reviews: 2100,
    deliveryTime: '20-30', deliveryFee: 1.99, minOrder: 10, priceRange: '$$',
    address: '789 Elm Street', phone: '(555) 345-6789', hours: '11:00 AM - 12:00 AM',
    description: 'Juicy handcrafted burgers with premium Angus beef and secret sauces.',
    tags: ['Best Seller', 'Quick Delivery', 'Late Night'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    logo: '🍔'
  },
  {
    id: 'r4', name: 'Spice Route', cuisine: ['indian'], rating: 4.7, reviews: 670,
    deliveryTime: '30-45', deliveryFee: 2.49, minOrder: 15, priceRange: '$$',
    address: '321 Spice Lane', phone: '(555) 456-7890', hours: '11:30 AM - 10:30 PM',
    description: 'Authentic Indian cuisine with rich curries, fresh naan, and aromatic biryanis.',
    tags: ['Authentic', 'Spicy', 'Vegetarian Friendly'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    logo: '🍛'
  },
  {
    id: 'r5', name: 'Dragon Palace', cuisine: ['chinese'], rating: 4.5, reviews: 1560,
    deliveryTime: '25-35', deliveryFee: 2.99, minOrder: 12, priceRange: '$$',
    address: '654 Dragon Ave', phone: '(555) 567-8901', hours: '11:00 AM - 11:00 PM',
    description: 'Traditional Chinese dishes from dim sum to Peking duck, family recipes since 1985.',
    tags: ['Family Style', 'Dim Sum', 'Noodles'],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
    logo: '🥡'
  },
  {
    id: 'r6', name: 'Taco Fiesta', cuisine: ['mexican'], rating: 4.4, reviews: 980,
    deliveryTime: '20-30', deliveryFee: 1.99, minOrder: 10, priceRange: '$',
    address: '987 Fiesta Blvd', phone: '(555) 678-9012', hours: '10:00 AM - 11:00 PM',
    description: 'Street-style Mexican food with handmade tortillas and fresh salsas.',
    tags: ['Street Food', 'Spicy', 'Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    logo: '🌮'
  },
  {
    id: 'r7', name: 'Green Bowl', cuisine: ['healthy','salad'], rating: 4.7, reviews: 430,
    deliveryTime: '15-25', deliveryFee: 2.49, minOrder: 10, priceRange: '$$',
    address: '246 Health Way', phone: '(555) 789-0123', hours: '7:00 AM - 9:00 PM',
    description: 'Fresh, nutrient-packed bowls and smoothies for a healthier lifestyle.',
    tags: ['Organic', 'Vegan', 'Gluten-Free Options'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    logo: '🥗'
  },
  {
    id: 'r8', name: 'Sweet Surrender', cuisine: ['dessert','bakery'], rating: 4.8, reviews: 760,
    deliveryTime: '20-30', deliveryFee: 3.49, minOrder: 8, priceRange: '$$',
    address: '135 Sugar St', phone: '(555) 890-1234', hours: '8:00 AM - 10:00 PM',
    description: 'Artisan desserts, cakes, and pastries baked fresh daily with premium ingredients.',
    tags: ['Artisan', 'Fresh Baked', 'Gift Options'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    logo: '🍰'
  }
];

// ===== MENU ITEMS =====
const MENU_ITEMS = [
  // Pizza Paradise
  { id: 'm1', restaurantId: 'r1', name: 'Margherita Pizza', category: 'Classics', price: 14.99, rating: 4.9, description: 'Fresh mozzarella, San Marzano tomatoes, basil on wood-fired dough.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', popular: true, sizes: [{name:'Small 10"',price:0},{name:'Medium 12"',price:3},{name:'Large 14"',price:5}], toppings: [{name:'Extra Cheese',price:2},{name:'Mushrooms',price:1.5},{name:'Olives',price:1}] },
  { id: 'm2', restaurantId: 'r1', name: 'Pepperoni Feast', category: 'Classics', price: 16.99, rating: 4.8, description: 'Double pepperoni with mozzarella and our signature tomato sauce.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', popular: true, sizes: [{name:'Small 10"',price:0},{name:'Medium 12"',price:3},{name:'Large 14"',price:5}], toppings: [{name:'Extra Pepperoni',price:2.5},{name:'Jalapeños',price:1},{name:'Onions',price:1}] },
  { id: 'm3', restaurantId: 'r1', name: 'Truffle Mushroom', category: 'Gourmet', price: 19.99, rating: 4.7, description: 'Wild mushrooms, truffle oil, fontina cheese, fresh thyme.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', popular: false, sizes: [{name:'Small 10"',price:0},{name:'Medium 12"',price:3},{name:'Large 14"',price:5}], toppings: [{name:'Extra Truffle Oil',price:3},{name:'Arugula',price:1.5}] },
  { id: 'm4', restaurantId: 'r1', name: 'Garlic Bread', category: 'Sides', price: 6.99, rating: 4.6, description: 'Toasted ciabatta with garlic butter and herbs.', image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&q=80', popular: false, sizes: [], toppings: [{name:'Add Cheese',price:1.5}] },
  { id: 'm5', restaurantId: 'r1', name: 'Tiramisu', category: 'Desserts', price: 8.99, rating: 4.9, description: 'Classic Italian tiramisu with mascarpone and espresso.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', popular: true, sizes: [], toppings: [] },

  // Sakura Sushi Bar
  { id: 'm6', restaurantId: 'r2', name: 'Salmon Nigiri Set', category: 'Nigiri', price: 18.99, rating: 4.9, description: '8 pieces of premium Atlantic salmon nigiri.', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', popular: true, sizes: [{name:'6 pcs',price:0},{name:'8 pcs',price:4},{name:'12 pcs',price:8}], toppings: [] },
  { id: 'm7', restaurantId: 'r2', name: 'Dragon Roll', category: 'Specialty Rolls', price: 16.99, rating: 4.8, description: 'Shrimp tempura, avocado, eel, and special sauce.', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&q=80', popular: true, sizes: [{name:'8 pcs',price:0},{name:'12 pcs',price:6}], toppings: [{name:'Extra Avocado',price:2},{name:'Spicy Mayo',price:0.5}] },
  { id: 'm8', restaurantId: 'r2', name: 'Miso Soup', category: 'Soups', price: 4.99, rating: 4.5, description: 'Traditional miso soup with tofu, seaweed, and scallions.', image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=400&q=80', popular: false, sizes: [], toppings: [] },
  { id: 'm9', restaurantId: 'r2', name: 'Edamame', category: 'Appetizers', price: 5.99, rating: 4.4, description: 'Steamed edamame with sea salt.', image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=400&q=80', popular: false, sizes: [], toppings: [{name:'Chili Flakes',price:0.5}] },
  { id: 'm10', restaurantId: 'r2', name: 'Sashimi Platter', category: 'Sashimi', price: 24.99, rating: 4.9, description: 'Chef selection of 15 pieces of premium sashimi.', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80', popular: true, sizes: [], toppings: [] },

  // Burger Barn
  { id: 'm11', restaurantId: 'r3', name: 'Classic Smash Burger', category: 'Burgers', price: 12.99, rating: 4.7, description: 'Double smashed Angus patties, American cheese, pickles, special sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', popular: true, sizes: [{name:'Single',price:0},{name:'Double',price:4},{name:'Triple',price:7}], toppings: [{name:'Bacon',price:2},{name:'Avocado',price:2.5},{name:'Fried Egg',price:1.5}] },
  { id: 'm12', restaurantId: 'r3', name: 'BBQ Bacon Burger', category: 'Burgers', price: 14.99, rating: 4.8, description: 'Angus beef, crispy bacon, cheddar, onion rings, smoky BBQ sauce.', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80', popular: true, sizes: [{name:'Single',price:0},{name:'Double',price:4}], toppings: [{name:'Extra Bacon',price:2},{name:'Jalapeños',price:1}] },
  { id: 'm13', restaurantId: 'r3', name: 'Loaded Fries', category: 'Sides', price: 7.99, rating: 4.6, description: 'Crispy fries with cheese sauce, bacon bits, and chives.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', popular: false, sizes: [{name:'Regular',price:0},{name:'Large',price:2}], toppings: [] },
  { id: 'm14', restaurantId: 'r3', name: 'Milkshake', category: 'Drinks', price: 6.99, rating: 4.5, description: 'Thick and creamy hand-spun milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', popular: false, sizes: [], toppings: [{name:'Whipped Cream',price:0.5},{name:'Cookie Crumble',price:1}] },
  { id: 'm15', restaurantId: 'r3', name: 'Onion Rings', category: 'Sides', price: 5.99, rating: 4.4, description: 'Beer-battered onion rings with ranch dipping sauce.', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80', popular: false, sizes: [], toppings: [] },

  // Spice Route
  { id: 'm16', restaurantId: 'r4', name: 'Butter Chicken', category: 'Curries', price: 15.99, rating: 4.9, description: 'Tender chicken in rich, creamy tomato-butter sauce with aromatic spices.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Extra Naan',price:2},{name:'Basmati Rice',price:2.5}] },
  { id: 'm17', restaurantId: 'r4', name: 'Chicken Biryani', category: 'Rice', price: 16.99, rating: 4.8, description: 'Fragrant basmati rice layered with spiced chicken and saffron.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Raita',price:1.5},{name:'Extra Chicken',price:3}] },
  { id: 'm18', restaurantId: 'r4', name: 'Garlic Naan', category: 'Breads', price: 3.99, rating: 4.7, description: 'Freshly baked naan bread brushed with garlic butter.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', popular: false, sizes: [], toppings: [] },
  { id: 'm19', restaurantId: 'r4', name: 'Samosa', category: 'Appetizers', price: 5.99, rating: 4.6, description: 'Crispy pastry filled with spiced potatoes and peas. Served with chutney.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', popular: false, sizes: [{name:'2 pcs',price:0},{name:'4 pcs',price:4}], toppings: [] },
  { id: 'm20', restaurantId: 'r4', name: 'Mango Lassi', category: 'Drinks', price: 4.99, rating: 4.5, description: 'Creamy mango yogurt drink, naturally sweetened.', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80', popular: false, sizes: [], toppings: [] },

  // Dragon Palace
  { id: 'm21', restaurantId: 'r5', name: 'Kung Pao Chicken', category: 'Mains', price: 14.99, rating: 4.7, description: 'Stir-fried chicken with peanuts, chili peppers, and Sichuan sauce.', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Extra Spicy',price:0},{name:'Add Rice',price:2}] },
  { id: 'm22', restaurantId: 'r5', name: 'Dim Sum Basket', category: 'Dim Sum', price: 12.99, rating: 4.8, description: 'Assorted steamed dumplings: shrimp, pork, and vegetable.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80', popular: true, sizes: [{name:'6 pcs',price:0},{name:'12 pcs',price:8}], toppings: [] },
  { id: 'm23', restaurantId: 'r5', name: 'Fried Rice', category: 'Rice', price: 11.99, rating: 4.5, description: 'Wok-fried rice with egg, vegetables, and choice of protein.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', popular: false, sizes: [], toppings: [{name:'Shrimp',price:3},{name:'Chicken',price:2}] },
  { id: 'm24', restaurantId: 'r5', name: 'Spring Rolls', category: 'Appetizers', price: 6.99, rating: 4.4, description: 'Crispy vegetable spring rolls with sweet chili sauce.', image: 'https://images.unsplash.com/photo-1548507200-e7429e091299?w=400&q=80', popular: false, sizes: [{name:'3 pcs',price:0},{name:'6 pcs',price:5}], toppings: [] },

  // Taco Fiesta
  { id: 'm25', restaurantId: 'r6', name: 'Street Tacos', category: 'Tacos', price: 10.99, rating: 4.6, description: 'Three handmade corn tortilla tacos with carne asada, cilantro, onion.', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', popular: true, sizes: [{name:'3 Tacos',price:0},{name:'5 Tacos',price:5}], toppings: [{name:'Guacamole',price:2},{name:'Sour Cream',price:1}] },
  { id: 'm26', restaurantId: 'r6', name: 'Burrito Bowl', category: 'Bowls', price: 12.99, rating: 4.7, description: 'Rice, beans, choice of protein, salsa, cheese, and lettuce.', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Guacamole',price:2},{name:'Extra Protein',price:3}] },
  { id: 'm27', restaurantId: 'r6', name: 'Churros', category: 'Desserts', price: 5.99, rating: 4.5, description: 'Crispy cinnamon-sugar churros with chocolate dipping sauce.', image: 'https://images.unsplash.com/photo-1624371414361-e670246e0a39?w=400&q=80', popular: false, sizes: [{name:'3 pcs',price:0},{name:'6 pcs',price:4}], toppings: [] },

  // Green Bowl
  { id: 'm28', restaurantId: 'r7', name: 'Acai Bowl', category: 'Bowls', price: 13.99, rating: 4.8, description: 'Organic acai blended with banana, topped with granola, berries, and honey.', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80', popular: true, sizes: [{name:'Regular',price:0},{name:'Large',price:3}], toppings: [{name:'Extra Granola',price:1},{name:'Peanut Butter',price:1.5}] },
  { id: 'm29', restaurantId: 'r7', name: 'Quinoa Power Bowl', category: 'Bowls', price: 14.99, rating: 4.7, description: 'Quinoa, roasted veggies, avocado, chickpeas, tahini dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Grilled Chicken',price:3},{name:'Extra Avocado',price:2}] },
  { id: 'm30', restaurantId: 'r7', name: 'Green Smoothie', category: 'Smoothies', price: 8.99, rating: 4.6, description: 'Spinach, kale, banana, mango, and coconut water.', image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&q=80', popular: false, sizes: [{name:'16oz',price:0},{name:'24oz',price:2}], toppings: [{name:'Protein Powder',price:2}] },

  // Sweet Surrender
  { id: 'm31', restaurantId: 'r8', name: 'Chocolate Lava Cake', category: 'Cakes', price: 9.99, rating: 4.9, description: 'Warm chocolate cake with molten center, served with vanilla ice cream.', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Extra Ice Cream',price:2},{name:'Raspberry Sauce',price:1.5}] },
  { id: 'm32', restaurantId: 'r8', name: 'New York Cheesecake', category: 'Cakes', price: 8.99, rating: 4.8, description: 'Classic creamy cheesecake with graham cracker crust and berry compote.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80', popular: true, sizes: [], toppings: [{name:'Strawberry Topping',price:1.5}] },
  { id: 'm33', restaurantId: 'r8', name: 'Macarons Box', category: 'Pastries', price: 12.99, rating: 4.7, description: 'Assorted French macarons: vanilla, pistachio, raspberry, chocolate.', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=80', popular: false, sizes: [{name:'6 pcs',price:0},{name:'12 pcs',price:10}], toppings: [] },
  { id: 'm34', restaurantId: 'r8', name: 'Croissant', category: 'Pastries', price: 4.99, rating: 4.6, description: 'Flaky, buttery French croissant baked fresh every morning.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&q=80', popular: false, sizes: [], toppings: [{name:'Chocolate Filling',price:1},{name:'Almond Filling',price:1.5}] }
];

// ===== PROMO CODES =====
const PROMO_CODES = {
  'WELCOME20': { discount: 20, type: 'percent', minOrder: 15, description: '20% off your first order' },
  'FEAST10': { discount: 10, type: 'percent', minOrder: 20, description: '10% off orders over $20' },
  'FREEDEL': { discount: 0, type: 'freeDelivery', minOrder: 25, description: 'Free delivery on orders over $25' },
  'SAVE5': { discount: 5, type: 'fixed', minOrder: 15, description: '$5 off orders over $15' }
};

// ===== TESTIMONIALS =====
const TESTIMONIALS = [
  { name: 'Sarah M.', text: 'FeastFlow has completely changed how I order food. The variety is amazing and delivery is always on time!', rating: 5, avatar: '👩‍💼' },
  { name: 'James K.', text: 'The pizza from Pizza Paradise is incredible. Just like I had in Naples! Plus the app is so easy to use.', rating: 5, avatar: '👨‍💻' },
  { name: 'Emily R.', text: 'Love the healthy options from Green Bowl. Fresh, delicious, and delivered right to my door.', rating: 4, avatar: '👩‍🎨' },
  { name: 'Michael T.', text: 'Best sushi delivery I have ever had. Sakura Sushi Bar never disappoints. The fish is always fresh!', rating: 5, avatar: '👨‍🍳' }
];
