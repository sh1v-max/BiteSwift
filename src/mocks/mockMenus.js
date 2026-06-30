// Fallback menu data used when the Swiggy menu API is unreachable.
// Structure mirrors the real Swiggy API response shape so no component changes needed.
// imageId values starting with "https://" are handled as full URLs in ItemList.js.

const makeItem = (id, name, price, description, imageId, rating = '4.1', ratingCount = '120+') => ({
  card: {
    info: {
      id,
      name,
      price: price * 100,        // Swiggy stores price in paise
      defaultPrice: price * 100,
      description,
      imageId,
      ratings: {
        aggregatedRating: { rating, ratingCountV2: ratingCount },
      },
    },
  },
})

const makeCategory = (title, items) => ({
  card: {
    card: {
      '@type': 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory',
      title,
      itemCards: items,
    },
  },
})

const makeMenu = (resId, info, categories) => ({
  cards: [
    {},
    {},
    { card: { card: { info } } },
    {},
    {
      groupedCard: {
        cardGroupMap: {
          REGULAR: { cards: categories },
        },
      },
    },
  ],
})

// ─── North Indian — The Spice Route (mock-101) ───────────────────────────────

const SPICE_ROUTE_MENU = makeMenu(
  'mock-101',
  {
    cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
    name: 'The Spice Route',
    areaName: 'Koramangala',
    avgRating: 4.4,
    avgRatingString: '4.4',
    totalRatingsString: '5K+ ratings',
    costForTwoMessage: '₹350 for two',
    cuisines: ['North Indian', 'Mughlai', 'Biryani'],
    sla: { slaString: '28-33 mins' },
  },
  [
    makeCategory('Bestsellers 🔥', [
      makeItem('i101a', 'Butter Chicken', 299, 'Tender chicken in a rich, creamy tomato-butter gravy. Best paired with naan.', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&q=80', '4.5', '2.1K+'),
      makeItem('i101b', 'Dal Makhani', 229, 'Slow-cooked black lentils simmered overnight in butter and cream. A classic.', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80', '4.3', '1.4K+'),
      makeItem('i101c', 'Chicken Biryani', 349, 'Fragrant basmati rice layered with spiced chicken, saffron, and caramelised onions.', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=80', '4.6', '3.2K+'),
    ]),
    makeCategory('Breads & Rice', [
      makeItem('i101d', 'Garlic Naan', 69, 'Soft leavened bread brushed with garlic butter, baked in a tandoor.', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80', '4.2', '800+'),
      makeItem('i101e', 'Steamed Basmati Rice', 79, 'Long-grain aromatic basmati rice, steamed to perfection.', 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b5d0?w=300&q=80', '4.0', '600+'),
      makeItem('i101f', 'Laccha Paratha', 89, 'Flaky, layered whole wheat flatbread cooked on a griddle with butter.', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80', '4.1', '450+'),
    ]),
    makeCategory('Starters', [
      makeItem('i101g', 'Chicken Tikka', 279, 'Juicy chicken marinated in yoghurt and spices, char-grilled in the tandoor.', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&q=80', '4.4', '1.8K+'),
      makeItem('i101h', 'Paneer Tikka', 249, 'Cottage cheese cubes marinated in spiced yoghurt and grilled with peppers & onions.', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&q=80', '4.3', '1.2K+'),
      makeItem('i101i', 'Seekh Kebab', 299, 'Minced lamb mixed with herbs and spices, skewered and grilled over charcoal.', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80', '4.2', '950+'),
    ]),
    makeCategory('Desserts', [
      makeItem('i101j', 'Gulab Jamun', 99, 'Soft milk-solid dumplings soaked in rose-flavoured sugar syrup. Served warm.', 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=300&q=80', '4.5', '700+'),
      makeItem('i101k', 'Kheer', 119, 'Creamy rice pudding simmered with cardamom, saffron, and topped with pistachios.', 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300&q=80', '4.2', '480+'),
    ]),
  ]
)

// ─── Italian — Pizzeria Roma (mock-102) ──────────────────────────────────────

const PIZZERIA_ROMA_MENU = makeMenu(
  'mock-102',
  {
    cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
    name: 'Pizzeria Roma',
    areaName: 'Indiranagar',
    avgRating: 4.5,
    avgRatingString: '4.5',
    totalRatingsString: '8K+ ratings',
    costForTwoMessage: '₹450 for two',
    cuisines: ['Pizza', 'Italian', 'Pasta'],
    sla: { slaString: '25-30 mins' },
  },
  [
    makeCategory('Pizzas 🍕', [
      makeItem('i102a', 'Margherita', 299, 'San Marzano tomato, fresh mozzarella, basil, extra-virgin olive oil. A timeless classic.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80', '4.6', '3.5K+'),
      makeItem('i102b', 'Pepperoni Feast', 399, 'Loaded with premium pepperoni slices on a mozzarella base with rich tomato sauce.', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&q=80', '4.7', '4.1K+'),
      makeItem('i102c', 'BBQ Chicken', 429, 'Smoky BBQ base, grilled chicken, red onions, and mozzarella finished with fresh coriander.', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80', '4.4', '2.2K+'),
      makeItem('i102d', 'Farm Veggie', 349, 'Bell peppers, mushrooms, olives, sun-dried tomatoes, and spinach on a garlic white sauce.', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&q=80', '4.2', '1.1K+'),
    ]),
    makeCategory('Pasta', [
      makeItem('i102e', 'Penne Arrabbiata', 279, 'Penne in a spicy San Marzano tomato and garlic sauce with fresh basil.', 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=300&q=80', '4.3', '980+'),
      makeItem('i102f', 'Spaghetti Carbonara', 329, 'Spaghetti tossed with egg, pecorino romano, guanciale, and black pepper.', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&q=80', '4.5', '1.6K+'),
      makeItem('i102g', 'Pesto Fusilli', 299, 'Fusilli with house-made basil pesto, cherry tomatoes, and parmesan shavings.', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80', '4.2', '760+'),
    ]),
    makeCategory('Sides & Drinks', [
      makeItem('i102h', 'Garlic Bread', 149, 'Toasted ciabatta with roasted garlic butter and parsley. Add cheese for ₹30 extra.', 'https://images.unsplash.com/photo-1619535860434-cf9b902db9b6?w=300&q=80', '4.4', '2.4K+'),
      makeItem('i102i', 'Tiramisu', 199, 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80', '4.6', '1.3K+'),
      makeItem('i102j', 'San Pellegrino Sparkling', 99, 'Chilled Italian sparkling mineral water, 500ml.', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&q=80', '4.0', '300+'),
    ]),
  ]
)

// ─── Chinese — Dragon Bowl (mock-103) ────────────────────────────────────────

const DRAGON_BOWL_MENU = makeMenu(
  'mock-103',
  {
    cloudinaryImageId: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=660&q=80',
    name: 'Dragon Bowl',
    areaName: 'HSR Layout',
    avgRating: 4.2,
    avgRatingString: '4.2',
    totalRatingsString: '3K+ ratings',
    costForTwoMessage: '₹300 for two',
    cuisines: ['Chinese', 'Asian', 'Noodles'],
    sla: { slaString: '30-35 mins' },
  },
  [
    makeCategory('Dim Sum & Starters 🥟', [
      makeItem('i103a', 'Steamed Chicken Dumplings', 199, 'Juicy chicken and ginger dumplings, steamed and served with soy-chilli dipping sauce.', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=80', '4.5', '1.8K+'),
      makeItem('i103b', 'Crispy Spring Rolls', 169, 'Golden fried rolls stuffed with glass noodles, cabbage, and mushrooms.', 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=300&q=80', '4.2', '1.1K+'),
      makeItem('i103c', 'Chilli Chicken (Dry)', 229, 'Wok-tossed crispy chicken with chillies, soy, and sesame. A restaurant classic.', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&q=80', '4.4', '2.3K+'),
    ]),
    makeCategory('Noodles & Rice', [
      makeItem('i103d', 'Hakka Noodles', 199, 'Wok-tossed egg noodles with vegetables in a dark soy and sesame sauce.', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80', '4.3', '1.9K+'),
      makeItem('i103e', 'Schezwan Fried Rice', 219, 'Spicy Schezwan sauce tossed with rice, eggs, spring onions, and your choice of protein.', 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b5d0?w=300&q=80', '4.2', '1.4K+'),
      makeItem('i103f', 'Singapore Noodles', 239, 'Thin rice vermicelli stir-fried with curry powder, shrimp, and colourful vegetables.', 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&q=80', '4.1', '820+'),
    ]),
    makeCategory('Soups', [
      makeItem('i103g', 'Hot & Sour Soup', 149, 'Bold, tangy broth with tofu, mushrooms, bamboo shoots, and chilli oil.', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80', '4.0', '640+'),
      makeItem('i103h', 'Sweet Corn Chicken Soup', 139, 'Comforting cream-style corn soup with shredded chicken and egg ribbons.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80', '4.1', '570+'),
    ]),
  ]
)

// ─── Generic fallback (shown for mock-104 through mock-120) ──────────────────

const GENERIC_MENU = (resId, resName, cuisine) =>
  makeMenu(
    resId,
    {
      cloudinaryImageId: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=660&q=80',
      name: resName,
      areaName: 'Bangalore',
      avgRating: 4.2,
      avgRatingString: '4.2',
      totalRatingsString: '1K+ ratings',
      costForTwoMessage: '₹300 for two',
      cuisines: [cuisine],
      sla: { slaString: '30-35 mins' },
    },
    [
      makeCategory('Popular', [
        makeItem(`${resId}-a`, 'Chef\'s Special', 299, 'Our most-loved dish, prepared fresh with premium ingredients and the chef\'s secret spice blend.', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80', '4.4', '900+'),
        makeItem(`${resId}-b`, 'Classic Combo', 349, 'A satisfying combination of our bestsellers served together — great value for one.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80', '4.2', '650+'),
        makeItem(`${resId}-c`, 'House Starter', 179, 'A crispy, flavourful starter that\'s been a crowd favourite since day one.', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80', '4.1', '480+'),
      ]),
      makeCategory('Mains', [
        makeItem(`${resId}-d`, 'Signature Main Course', 329, 'Our flagship main course — bold flavours, generous portions, made to order.', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&q=80', '4.3', '1.1K+'),
        makeItem(`${resId}-e`, 'Vegetarian Delight', 249, 'A hearty, flavour-packed vegetarian option that satisfies every time.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80', '4.0', '420+'),
      ]),
      makeCategory('Desserts & Drinks', [
        makeItem(`${resId}-f`, 'House Dessert', 149, 'A sweet finish to your meal — ask your delivery partner for today\'s special.', 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=300&q=80', '4.3', '390+'),
        makeItem(`${resId}-g`, 'Fresh Lime Soda', 79, 'Chilled fresh lime with soda — sweet, salted, or mixed.', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&q=80', '4.0', '290+'),
      ]),
    ]
  )

// Map of resId → menu data
const MOCK_MENU_MAP = {
  'mock-101': SPICE_ROUTE_MENU,
  'mock-102': PIZZERIA_ROMA_MENU,
  'mock-103': DRAGON_BOWL_MENU,
}

// For restaurants without a dedicated mock menu, generate a generic one
export const getMockMenu = (resId, resName = 'Restaurant', cuisine = 'Indian') =>
  MOCK_MENU_MAP[resId] ?? GENERIC_MENU(resId, resName, cuisine)

export default MOCK_MENU_MAP
