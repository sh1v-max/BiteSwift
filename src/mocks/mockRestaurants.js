// Fallback restaurant list shown when the Swiggy API is unreachable.
// Image IDs starting with "https://" are treated as full URLs by RestaurantCard
// and ItemList — the Swiggy CDN prefix is skipped for those.

const MOCK_RESTAURANTS = [
  // ── Batch 1 (mock-101 – mock-120) ────────────────────────────────────────
  {
    info: {
      id: 'mock-101', name: 'The Spice Route',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹350 for two',
      cuisines: ['North Indian', 'Mughlai', 'Biryani'], areaName: 'Koramangala',
      sla: { slaString: '28-33 mins', deliveryTime: 30 },
      aggregatedDiscountInfoV3: { header: '40% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-102', name: 'Pizzeria Roma',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹450 for two',
      cuisines: ['Pizza', 'Italian', 'Pasta'], areaName: 'Indiranagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹125 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-103', name: 'Dragon Bowl',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹300 for two',
      cuisines: ['Chinese', 'Asian', 'Noodles'], areaName: 'HSR Layout',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-104', name: 'Burger Barn',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹280 for two',
      cuisines: ['Burgers', 'American', 'Fries'], areaName: 'Whitefield',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹50' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-105', name: 'Biryani House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹400 for two',
      cuisines: ['Biryani', 'Mughlai', 'Kebabs'], areaName: 'Marathahalli',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-106', name: 'Sushi Garden',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.7, costForTwo: '₹800 for two',
      cuisines: ['Japanese', 'Sushi', 'Asian'], areaName: 'UB City',
      sla: { slaString: '40-45 mins', deliveryTime: 42 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'ABOVE ₹500' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-107', name: 'Taco Fiesta',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299507177-b85c4c2f0c0b?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹320 for two',
      cuisines: ['Mexican', 'Tacos', 'Burritos'], areaName: 'Jayanagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-108', name: 'The Breakfast Club',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹250 for two',
      cuisines: ['Breakfast', 'Cafe', 'Healthy'], areaName: 'Sadashivanagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹75' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-109', name: 'Green Bowl',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹300 for two',
      cuisines: ['Healthy', 'Salads', 'Smoothies', 'Vegan'], areaName: 'Bellandur',
      sla: { slaString: '25-30 mins', deliveryTime: 28 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-110', name: 'Kebab Corner',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹500 for two',
      cuisines: ['Kebabs', 'Mughlai', 'Tandoor', 'North Indian'], areaName: 'Richmond Town',
      sla: { slaString: '35-40 mins', deliveryTime: 37 },
      aggregatedDiscountInfoV3: { header: '₹100 OFF', subHeader: 'ABOVE ₹399' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-111', name: 'South Spice',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹200 for two',
      cuisines: ['South Indian', 'Dosa', 'Idli', 'Filter Coffee'], areaName: 'Malleshwaram',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-112', name: 'The Dessert Lab',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹350 for two',
      cuisines: ['Desserts', 'Ice Cream', 'Waffles', 'Cakes'], areaName: 'Lavelle Road',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹60' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-113', name: 'Punjabi Dhaba',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1555126634-323283e720fa?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹300 for two',
      cuisines: ['Punjabi', 'North Indian', 'Dal Makhani'], areaName: 'Rajajinagar',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-114', name: 'Indo-Chinese Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=660&q=80',
      avgRating: 3.9, costForTwo: '₹250 for two',
      cuisines: ['Indo-Chinese', 'Manchurian', 'Noodles', 'Fried Rice'], areaName: 'Banashankari',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '50% OFF', subHeader: 'UPTO ₹100' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-115', name: 'The Mediterranean',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹600 for two',
      cuisines: ['Mediterranean', 'Lebanese', 'Hummus', 'Falafel'], areaName: 'Cunningham Road',
      sla: { slaString: '40-45 mins', deliveryTime: 42 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-116', name: 'Street Food Junction',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1601050690593-8bf8d0fdd671?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹150 for two',
      cuisines: ['Street Food', 'Chaat', 'Pani Puri', 'Vada Pav'], areaName: 'Majestic',
      sla: { slaString: '20-25 mins', deliveryTime: 21 },
      aggregatedDiscountInfoV3: { header: '₹50 OFF', subHeader: 'ABOVE ₹149' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-117', name: 'Royal Thali',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹220 for two',
      cuisines: ['Thali', 'Indian', 'Vegetarian', 'Rajasthani'], areaName: 'Gandhinagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-118', name: 'The Grill House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹700 for two',
      cuisines: ['BBQ', 'Grills', 'Steaks', 'American'], areaName: 'MG Road',
      sla: { slaString: '40-45 mins', deliveryTime: 43 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹120' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-119', name: 'Bake & Brew',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹400 for two',
      cuisines: ['Bakery', 'Cafe', 'Pastries', 'Coffee'], areaName: 'Indiranagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-120', name: 'Coastal Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559694093-443d6f0d38c0?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹550 for two',
      cuisines: ['Seafood', 'Coastal', 'Mangalorean', 'Kerala'], areaName: 'JP Nagar',
      sla: { slaString: '35-40 mins', deliveryTime: 37 },
      aggregatedDiscountInfoV3: { header: '₹75 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },

  // ── Batch 2 (mock-121 – mock-140) — International cuisines ───────────────
  {
    info: {
      id: 'mock-121', name: 'Thai Orchid',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹480 for two',
      cuisines: ['Thai', 'Asian', 'Noodles', 'Curries'], areaName: 'Koramangala',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹60' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-122', name: 'Pho Saigon',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565560723006-aab75b94e02a?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹420 for two',
      cuisines: ['Vietnamese', 'Pho', 'Asian', 'Banh Mi'], areaName: 'Indiranagar',
      sla: { slaString: '35-40 mins', deliveryTime: 38 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-123', name: 'Seoul BBQ House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹900 for two',
      cuisines: ['Korean', 'BBQ', 'Asian', 'Bibimbap'], areaName: 'UB City',
      sla: { slaString: '40-45 mins', deliveryTime: 43 },
      aggregatedDiscountInfoV3: { header: '10% OFF', subHeader: 'ABOVE ₹600' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-124', name: 'Istanbul Grill',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹380 for two',
      cuisines: ['Turkish', 'Shawarma', 'Kebabs', 'Middle Eastern'], areaName: 'Commercial Street',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹80 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-125', name: 'Le Bistro',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹1200 for two',
      cuisines: ['French', 'Continental', 'Fine Dining'], areaName: 'Lavelle Road',
      sla: { slaString: '45-50 mins', deliveryTime: 48 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-126', name: 'Tapas & Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹700 for two',
      cuisines: ['Spanish', 'Tapas', 'Continental', 'Wine Bar'], areaName: 'Sadashivanagar',
      sla: { slaString: '40-45 mins', deliveryTime: 42 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'ABOVE ₹500' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-127', name: 'Churrasco Brazil',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1558030006-450675393462?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹850 for two',
      cuisines: ['Brazilian', 'BBQ', 'Steaks', 'Grills'], areaName: 'MG Road',
      sla: { slaString: '40-45 mins', deliveryTime: 43 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-128', name: 'Greek Taverna',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹650 for two',
      cuisines: ['Greek', 'Mediterranean', 'Souvlaki', 'Salads'], areaName: 'Koramangala',
      sla: { slaString: '35-40 mins', deliveryTime: 38 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹100' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-129', name: 'Persian Palace',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹550 for two',
      cuisines: ['Persian', 'Middle Eastern', 'Kebabs', 'Rice'], areaName: 'Frazer Town',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-130', name: 'Casa Mexicana',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299507177-b85c4c2f0c0b?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹450 for two',
      cuisines: ['Mexican', 'Quesadilla', 'Nachos', 'Burritos'], areaName: 'HSR Layout',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹90' }, veg: false,
    },
  },

  // ── Batch 3 (mock-131 – mock-140) — Regional Indian ─────────────────────
  {
    info: {
      id: 'mock-131', name: 'Rajasthani Rasoi',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹260 for two',
      cuisines: ['Rajasthani', 'Dal Baati', 'Thali', 'Indian'], areaName: 'Gandhinagar',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-132', name: 'Chettinad Express',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹320 for two',
      cuisines: ['Chettinad', 'South Indian', 'Spicy', 'Chicken'], areaName: 'Jayanagar',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '₹60 OFF', subHeader: 'ABOVE ₹249' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-133', name: 'Awadhi Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹450 for two',
      cuisines: ['Lucknowi', 'Awadhi', 'Biryani', 'Kebabs'], areaName: 'Frazer Town',
      sla: { slaString: '35-40 mins', deliveryTime: 38 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-134', name: 'Goan Fisherman',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559694093-443d6f0d38c0?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹500 for two',
      cuisines: ['Goan', 'Seafood', 'Fish Curry', 'Coastal'], areaName: 'Koramangala',
      sla: { slaString: '35-40 mins', deliveryTime: 37 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-135', name: 'Hyderabadi Nawabs',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹420 for two',
      cuisines: ['Hyderabadi', 'Biryani', 'Haleem', 'Mughlai'], areaName: 'Banaswadi',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-136', name: 'Bengal Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹300 for two',
      cuisines: ['Bengali', 'Fish Curry', 'Rosogolla', 'Mishti'], areaName: 'Ulsoor',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹70' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-137', name: 'Wazwan',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹550 for two',
      cuisines: ['Kashmiri', 'Rogan Josh', 'Wazwan', 'North Indian'], areaName: 'Whitefield',
      sla: { slaString: '40-45 mins', deliveryTime: 43 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-138', name: 'Maharashtrian Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1601050690593-8bf8d0fdd671?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹220 for two',
      cuisines: ['Maharashtrian', 'Misal Pav', 'Vada Pav', 'Thali'], areaName: 'Majestic',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-139', name: 'Gujarati Rasoi',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹200 for two',
      cuisines: ['Gujarati', 'Thali', 'Dhokla', 'Farsan'], areaName: 'Gandhinagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹50 OFF', subHeader: 'ABOVE ₹199' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-140', name: 'Parsi Cafe',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹480 for two',
      cuisines: ['Parsi', 'Dhansak', 'Patra', 'Continental'], areaName: 'Brigade Road',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },

  // ── Batch 4 (mock-141 – mock-160) — Trendy & Fast ───────────────────────
  {
    info: {
      id: 'mock-141', name: 'Ramen Lab',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹600 for two',
      cuisines: ['Japanese', 'Ramen', 'Asian', 'Noodles'], areaName: 'Indiranagar',
      sla: { slaString: '35-40 mins', deliveryTime: 38 },
      aggregatedDiscountInfoV3: { header: '₹100 OFF', subHeader: 'ABOVE ₹449' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-142', name: 'Poke Paradise',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹550 for two',
      cuisines: ['Poke Bowls', 'Hawaiian', 'Healthy', 'Sushi'], areaName: 'Koramangala',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-143', name: 'The Smoothie Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹300 for two',
      cuisines: ['Smoothies', 'Acai Bowls', 'Healthy', 'Juices'], areaName: 'HSR Layout',
      sla: { slaString: '15-20 mins', deliveryTime: 18 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹50' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-144', name: 'Sushi Lab',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹750 for two',
      cuisines: ['Sushi', 'Japanese', 'Maki', 'Sashimi'], areaName: 'Sadashivanagar',
      sla: { slaString: '40-45 mins', deliveryTime: 42 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-145', name: 'Plant Power',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹480 for two',
      cuisines: ['Vegan', 'Plant-based', 'Healthy', 'Salads'], areaName: 'Bellandur',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'UPTO ₹60' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-146', name: 'Keto Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹520 for two',
      cuisines: ['Keto', 'Low-Carb', 'Healthy', 'Grills'], areaName: 'Whitefield',
      sla: { slaString: '30-35 mins', deliveryTime: 33 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-147', name: 'Artisan Wood Fire',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹600 for two',
      cuisines: ['Artisan Pizza', 'Italian', 'Wood-Fired'], areaName: 'Indiranagar',
      sla: { slaString: '35-40 mins', deliveryTime: 37 },
      aggregatedDiscountInfoV3: { header: '₹120 OFF', subHeader: 'ABOVE ₹499' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-148', name: 'Buddha Bowl Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹400 for two',
      cuisines: ['Buddha Bowls', 'Healthy', 'Vegan', 'Quinoa'], areaName: 'Koramangala',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-149', name: 'Fusion Street',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹350 for two',
      cuisines: ['Fusion', 'Indo-Western', 'Burgers', 'Wraps'], areaName: 'HSR Layout',
      sla: { slaString: '20-25 mins', deliveryTime: 23 },
      aggregatedDiscountInfoV3: { header: '40% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-150', name: 'Cloud Nine Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹320 for two',
      cuisines: ['Multi-Cuisine', 'Cloud Kitchen', 'Indian', 'Chinese'], areaName: 'Marathahalli',
      sla: { slaString: '25-30 mins', deliveryTime: 28 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-151', name: 'Shawarma Station',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹200 for two',
      cuisines: ['Shawarma', 'Middle Eastern', 'Wraps', 'Lebanese'], areaName: 'Banaswadi',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹40 OFF', subHeader: 'ABOVE ₹149' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-152', name: 'Momo Magic',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹180 for two',
      cuisines: ['Momos', 'Tibetan', 'Dumplings', 'Street Food'], areaName: 'Jayanagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-153', name: 'The Sandwich Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹280 for two',
      cuisines: ['Sandwiches', 'Wraps', 'Cafe', 'Healthy'], areaName: 'Sadashivanagar',
      sla: { slaString: '15-20 mins', deliveryTime: 18 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹55' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-154', name: 'Paratha Paradise',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹160 for two',
      cuisines: ['Parathas', 'North Indian', 'Breakfast', 'Lassi'], areaName: 'Rajajinagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-155', name: 'Old Delhi Chaat',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1601050690593-8bf8d0fdd671?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹140 for two',
      cuisines: ['Chaat', 'Street Food', 'Dahi Bhalla', 'Golgappa'], areaName: 'Majestic',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹30 OFF', subHeader: 'ABOVE ₹99' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-156', name: 'Waffle Republic',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹350 for two',
      cuisines: ['Waffles', 'Desserts', 'Cafe', 'Ice Cream'], areaName: 'Lavelle Road',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-157', name: 'Noodle Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹280 for two',
      cuisines: ['Pan-Asian', 'Noodles', 'Ramen', 'Udon'], areaName: 'HSR Layout',
      sla: { slaString: '25-30 mins', deliveryTime: 28 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹70' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-158', name: 'Dahi Bhalle House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1601050690593-8bf8d0fdd671?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹130 for two',
      cuisines: ['Street Food', 'Chaat', 'North Indian', 'Snacks'], areaName: 'Ulsoor',
      sla: { slaString: '15-20 mins', deliveryTime: 18 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-159', name: 'The Juice Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹180 for two',
      cuisines: ['Juices', 'Smoothies', 'Health Drinks', 'Shakes'], areaName: 'Banashankari',
      sla: { slaString: '15-20 mins', deliveryTime: 16 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'UPTO ₹30' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-160', name: 'Midnight Bites',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹300 for two',
      cuisines: ['Fast Food', 'Burgers', 'Pizza', 'Sandwiches'], areaName: 'Koramangala',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },

  // ── Batch 5 (mock-161 – mock-180) — World cuisines ───────────────────────
  {
    info: {
      id: 'mock-161', name: 'Moroccan Nights',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹600 for two',
      cuisines: ['Moroccan', 'Tagine', 'Middle Eastern', 'Couscous'], areaName: 'Indiranagar',
      sla: { slaString: '40-45 mins', deliveryTime: 42 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-162', name: 'Sri Lankan Spice',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹350 for two',
      cuisines: ['Sri Lankan', 'Hoppers', 'Curry', 'Seafood'], areaName: 'Frazer Town',
      sla: { slaString: '30-35 mins', deliveryTime: 33 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-163', name: 'Ethiopian Tej',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹500 for two',
      cuisines: ['Ethiopian', 'African', 'Injera', 'Stew'], areaName: 'Sadashivanagar',
      sla: { slaString: '40-45 mins', deliveryTime: 43 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-164', name: 'Filipino Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹380 for two',
      cuisines: ['Filipino', 'Adobo', 'Asian', 'Sinigang'], areaName: 'Whitefield',
      sla: { slaString: '35-40 mins', deliveryTime: 38 },
      aggregatedDiscountInfoV3: { header: '₹70 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-165', name: 'Peruvian Ceviche Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559694093-443d6f0d38c0?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹750 for two',
      cuisines: ['Peruvian', 'Ceviche', 'Latin American', 'Seafood'], areaName: 'UB City',
      sla: { slaString: '40-45 mins', deliveryTime: 42 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-166', name: 'Malaysian Wok',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹420 for two',
      cuisines: ['Malaysian', 'Nasi Lemak', 'Laksa', 'Asian'], areaName: 'Koramangala',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹75' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-167', name: 'Indonesian Warung',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹400 for two',
      cuisines: ['Indonesian', 'Rendang', 'Nasi Goreng', 'Asian'], areaName: 'HSR Layout',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-168', name: 'Cuban Havana',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹650 for two',
      cuisines: ['Cuban', 'Latin', 'Sandwiches', 'Rice & Beans'], areaName: 'MG Road',
      sla: { slaString: '35-40 mins', deliveryTime: 38 },
      aggregatedDiscountInfoV3: { header: '₹100 OFF', subHeader: 'ABOVE ₹449' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-169', name: 'Afghan Darbar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹480 for two',
      cuisines: ['Afghani', 'Kabuli Pulao', 'Kebabs', 'Tandoor'], areaName: 'Banaswadi',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-170', name: 'Caribbean Jerk House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹550 for two',
      cuisines: ['Caribbean', 'Jerk Chicken', 'BBQ', 'Tropical'], areaName: 'Indiranagar',
      sla: { slaString: '40-45 mins', deliveryTime: 43 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'ABOVE ₹399' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-171', name: 'Dim Sum Palace',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹600 for two',
      cuisines: ['Dim Sum', 'Chinese', 'Cantonese', 'Dumplings'], areaName: 'JP Nagar',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-172', name: 'Hot Pot City',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹700 for two',
      cuisines: ['Hot Pot', 'Chinese', 'Sichuan', 'Asian'], areaName: 'Whitefield',
      sla: { slaString: '40-45 mins', deliveryTime: 43 },
      aggregatedDiscountInfoV3: { header: '₹120 OFF', subHeader: 'ABOVE ₹599' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-173', name: 'Nepali Chulo',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹280 for two',
      cuisines: ['Nepali', 'Dal Bhat', 'Momos', 'Himalayan'], areaName: 'Jayanagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-174', name: 'Coorg Curry House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹380 for two',
      cuisines: ['Coorgi', 'Pork Curry', 'Akki Roti', 'South Indian'], areaName: 'Malleshwaram',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '₹60 OFF', subHeader: 'ABOVE ₹249' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-175', name: 'Burmese Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹350 for two',
      cuisines: ['Burmese', 'Mohinga', 'Laphet', 'Asian'], areaName: 'Bellandur',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-176', name: 'Naga Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹300 for two',
      cuisines: ['Naga', 'Northeast Indian', 'Pork', 'Smoked Meats'], areaName: 'Electronic City',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹90' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-177', name: 'Odia Rasoi',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹220 for two',
      cuisines: ['Odia', 'Dalma', 'Pakhala', 'East Indian'], areaName: 'Hebbal',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-178', name: 'Creole Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹580 for two',
      cuisines: ['Creole', 'Cajun', 'American South', 'Gumbo'], areaName: 'Koramangala',
      sla: { slaString: '40-45 mins', deliveryTime: 42 },
      aggregatedDiscountInfoV3: { header: '₹80 OFF', subHeader: 'ABOVE ₹349' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-179', name: 'Fondue & Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹900 for two',
      cuisines: ['Swiss', 'Fondue', 'European', 'Cheese'], areaName: 'Lavelle Road',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-180', name: 'Scandinavian Smørrebrød',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹700 for two',
      cuisines: ['Scandinavian', 'Nordic', 'Open Sandwiches', 'European'], areaName: 'Sadashivanagar',
      sla: { slaString: '40-45 mins', deliveryTime: 42 },
      aggregatedDiscountInfoV3: { header: '10% OFF', subHeader: 'ABOVE ₹500' }, veg: false,
    },
  },

  // ── Batch 6 (mock-181 – mock-200) — Comfort & Specialty ─────────────────
  {
    info: {
      id: 'mock-181', name: 'Mac & Cheese Factory',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹380 for two',
      cuisines: ['Comfort Food', 'Mac & Cheese', 'American', 'Pasta'], areaName: 'Indiranagar',
      sla: { slaString: '20-25 mins', deliveryTime: 23 },
      aggregatedDiscountInfoV3: { header: '₹50 OFF', subHeader: 'ABOVE ₹199' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-182', name: 'Grilled Cheese Studio',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹280 for two',
      cuisines: ['Sandwiches', 'Grilled Cheese', 'Comfort Food', 'Cafe'], areaName: 'Koramangala',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-183', name: 'Protein Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹500 for two',
      cuisines: ['High Protein', 'Fitness', 'Grills', 'Healthy'], areaName: 'HSR Layout',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹70' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-184', name: 'Acai & Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹350 for two',
      cuisines: ['Acai Bowls', 'Superfood', 'Healthy', 'Vegan'], areaName: 'Bellandur',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-185', name: 'The Macro Bowl',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹420 for two',
      cuisines: ['Macro Bowls', 'Healthy', 'Quinoa', 'Meal Prep'], areaName: 'Electronic City',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'UPTO ₹55' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-186', name: 'Dosa Darbar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹180 for two',
      cuisines: ['Dosa', 'South Indian', 'Idli', 'Vada'], areaName: 'Malleshwaram',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-187', name: 'Pita & Mezze',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹450 for two',
      cuisines: ['Lebanese', 'Mezze', 'Pita', 'Hummus'], areaName: 'Church Street',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '₹75 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-188', name: 'Udon House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹500 for two',
      cuisines: ['Japanese', 'Udon', 'Tempura', 'Miso'], areaName: 'JP Nagar',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-189', name: 'The Crepe Studio',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹320 for two',
      cuisines: ['Crepes', 'French', 'Desserts', 'Cafe'], areaName: 'Indiranagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '₹40 OFF', subHeader: 'ABOVE ₹149' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-190', name: 'Fire & Ice Pizzeria',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹550 for two',
      cuisines: ['Pizza', 'Italian', 'Calzone', 'Pasta'], areaName: 'Brigade Road',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-191', name: 'The Curry Leaf',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹300 for two',
      cuisines: ['Kerala', 'Fish Curry', 'Appam', 'Coastal'], areaName: 'Banashankari',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-192', name: 'Tacos Al Pastor',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299507177-b85c4c2f0c0b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹380 for two',
      cuisines: ['Mexican', 'Street Tacos', 'Al Pastor', 'Churros'], areaName: 'Koramangala',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-193', name: 'Sindhi Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹260 for two',
      cuisines: ['Sindhi', 'Sai Bhaji', 'Dal Pakwan', 'Indian'], areaName: 'Gandhinagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹45 OFF', subHeader: 'ABOVE ₹199' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-194', name: 'Mezze & More',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1544025162-d76538f0e0d5?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹520 for two',
      cuisines: ['Israeli', 'Mezze', 'Shakshuka', 'Mediterranean'], areaName: 'Sadashivanagar',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-195', name: 'Phở 75',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹400 for two',
      cuisines: ['Vietnamese', 'Pho', 'Spring Rolls', 'Bun Bo'], areaName: 'HSR Layout',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹65' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-196', name: 'Pot Pie & Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹480 for two',
      cuisines: ['British', 'Pot Pies', 'Comfort Food', 'European'], areaName: 'Richmond Town',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-197', name: 'Manipuri Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹250 for two',
      cuisines: ['Manipuri', 'Northeast Indian', 'Eromba', 'Singju'], areaName: 'Electronic City',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '₹50 OFF', subHeader: 'ABOVE ₹199' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-198', name: 'Assamese Table',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹240 for two',
      cuisines: ['Assamese', 'Northeast Indian', 'Masor Tenga', 'Rice'], areaName: 'Hebbal',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-199', name: 'Detox & Dine',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹400 for two',
      cuisines: ['Detox', 'Juices', 'Salads', 'Vegan'], areaName: 'Bellandur',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'UPTO ₹45' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-200', name: 'The Grand Buffet',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹1200 for two',
      cuisines: ['Multi-Cuisine', 'Buffet', 'Indian', 'Continental'], areaName: 'MG Road',
      sla: { slaString: '15-20 mins', deliveryTime: 18 }, veg: false,
    },
  },

  // ── Batch 7 (mock-201 – mock-220) — Premium & Niche ─────────────────────
  {
    info: {
      id: 'mock-201', name: 'Omakase by Kenji',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.8, costForTwo: '₹2500 for two',
      cuisines: ['Japanese', 'Omakase', 'Fine Dining', 'Sushi'], areaName: 'UB City',
      sla: { slaString: '50-55 mins', deliveryTime: 52 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-202', name: 'Burger Republic',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹400 for two',
      cuisines: ['Gourmet Burgers', 'American', 'Fries', 'Milkshakes'], areaName: 'Koramangala',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '₹80 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-203', name: 'Teppanyaki Tokyo',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹1100 for two',
      cuisines: ['Japanese', 'Teppanyaki', 'Hibachi', 'Asian'], areaName: 'Lavelle Road',
      sla: { slaString: '45-50 mins', deliveryTime: 47 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-204', name: 'The Vegan Garden',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹450 for two',
      cuisines: ['Vegan', 'Raw Food', 'Plant-Based', 'Organic'], areaName: 'Indiranagar',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹80' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-205', name: 'Charcoal Barbeque',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹800 for two',
      cuisines: ['Barbeque', 'Grills', 'American BBQ', 'Ribs'], areaName: 'Whitefield',
      sla: { slaString: '40-45 mins', deliveryTime: 43 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-206', name: 'Sichuan House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹480 for two',
      cuisines: ['Sichuan', 'Chinese', 'Spicy', 'Mapo Tofu'], areaName: 'Koramangala',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '₹90 OFF', subHeader: 'ABOVE ₹349' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-207', name: 'Pasta Fresca',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹600 for two',
      cuisines: ['Italian', 'Fresh Pasta', 'Risotto', 'Tiramisu'], areaName: 'Church Street',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-208', name: 'Himalayan Kitchen',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹320 for two',
      cuisines: ['Himalayan', 'Tibetan', 'Momos', 'Thukpa'], areaName: 'Hebbal',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹70' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-209', name: 'The Breakfast Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹280 for two',
      cuisines: ['Breakfast', 'Pancakes', 'Eggs Benedict', 'Waffles'], areaName: 'HSR Layout',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-210', name: 'Andhra Spice Trail',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹280 for two',
      cuisines: ['Andhra', 'Spicy', 'Gongura', 'South Indian'], areaName: 'Banaswadi',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹55 OFF', subHeader: 'ABOVE ₹199' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-211', name: 'The Cold Press',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹250 for two',
      cuisines: ['Cold Press Juices', 'Detox', 'Healthy', 'Shots'], areaName: 'Indiranagar',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-212', name: 'Steak & Stones',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹1500 for two',
      cuisines: ['Steakhouse', 'Grills', 'American', 'Fine Dining'], areaName: 'MG Road',
      sla: { slaString: '45-50 mins', deliveryTime: 47 },
      aggregatedDiscountInfoV3: { header: '10% OFF', subHeader: 'ABOVE ₹999' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-213', name: 'Churros Corner',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹220 for two',
      cuisines: ['Churros', 'Spanish Desserts', 'Hot Chocolate', 'Cafe'], areaName: 'Koramangala',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-214', name: 'Bao House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹420 for two',
      cuisines: ['Bao', 'Taiwanese', 'Asian', 'Dumplings'], areaName: 'Indiranagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹65 OFF', subHeader: 'ABOVE ₹249' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-215', name: 'The Tandoor Room',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹500 for two',
      cuisines: ['Tandoor', 'North Indian', 'Naan', 'Kebabs'], areaName: 'Jayanagar',
      sla: { slaString: '30-35 mins', deliveryTime: 32 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-216', name: 'Quinoa Bistro',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹480 for two',
      cuisines: ['Healthy', 'Quinoa', 'Gluten-Free', 'Bowls'], areaName: 'Bellandur',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '15% OFF', subHeader: 'UPTO ₹60' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-217', name: 'Hyderabadi Dum',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.6, costForTwo: '₹450 for two',
      cuisines: ['Hyderabadi', 'Dum Biryani', 'Haleem', 'Kebabs'], areaName: 'Frazer Town',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-218', name: 'The Galette House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹380 for two',
      cuisines: ['French Crepes', 'Galette', 'Cafe', 'European'], areaName: 'Richmond Town',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹50 OFF', subHeader: 'ABOVE ₹199' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-219', name: 'Padang Express',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹360 for two',
      cuisines: ['Indonesian', 'Padang', 'Rendang', 'Asian'], areaName: 'Marathahalli',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-220', name: 'The Gelato Lab',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹280 for two',
      cuisines: ['Gelato', 'Desserts', 'Italian Ice Cream', 'Cafe'], areaName: 'Lavelle Road',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹40 OFF', subHeader: 'ABOVE ₹149' }, veg: true,
    },
  },

  // ── Batch 8 (mock-221 – mock-260) — Neighbourhood Favourites ────────────
  {
    info: {
      id: 'mock-221', name: 'Chai & Snacks',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹100 for two',
      cuisines: ['Tea', 'Snacks', 'Biscuits', 'Indian'], areaName: 'Rajajinagar',
      sla: { slaString: '10-15 mins', deliveryTime: 12 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-222', name: 'Egg Factory',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹200 for two',
      cuisines: ['Eggs', 'Breakfast', 'Omelettes', 'Cafe'], areaName: 'HSR Layout',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹30 OFF', subHeader: 'ABOVE ₹119' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-223', name: 'Rice Bowl Theory',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹280 for two',
      cuisines: ['Rice Bowls', 'Asian', 'Korean', 'Japanese'], areaName: 'Koramangala',
      sla: { slaString: '20-25 mins', deliveryTime: 23 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-224', name: 'Dilli Darbar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹350 for two',
      cuisines: ['Delhi Style', 'North Indian', 'Chaat', 'Paranthe'], areaName: 'Majestic',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '35% OFF', subHeader: 'UPTO ₹85' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-225', name: 'Wonton Express',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹240 for two',
      cuisines: ['Chinese', 'Wontons', 'Soup', 'Asian'], areaName: 'Ulsoor',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-226', name: 'The Idli House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹150 for two',
      cuisines: ['Idli', 'South Indian', 'Sambhar', 'Chutney'], areaName: 'Malleshwaram',
      sla: { slaString: '15-20 mins', deliveryTime: 15 },
      aggregatedDiscountInfoV3: { header: '₹25 OFF', subHeader: 'ABOVE ₹99' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-227', name: 'Wrap & Roll',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299507177-b85c4c2f0c0b?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹220 for two',
      cuisines: ['Wraps', 'Rolls', 'Kathi Roll', 'Fast Food'], areaName: 'Jayanagar',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-228', name: 'Soya & Tofu House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹320 for two',
      cuisines: ['Vegan', 'Tofu', 'Soya', 'Healthy'], areaName: 'Bellandur',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹55' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-229', name: 'Palak Paneer House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹260 for two',
      cuisines: ['North Indian', 'Paneer', 'Veg', 'Dal'], areaName: 'Banashankari',
      sla: { slaString: '20-25 mins', deliveryTime: 23 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-230', name: 'Street Wings',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹280 for two',
      cuisines: ['Chicken Wings', 'American', 'Fast Food', 'Sauces'], areaName: 'Electronic City',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '₹45 OFF', subHeader: 'ABOVE ₹179' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-231', name: 'The Puri House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹140 for two',
      cuisines: ['Puri Bhaji', 'Bengali', 'Breakfast', 'Street Food'], areaName: 'Ulsoor',
      sla: { slaString: '15-20 mins', deliveryTime: 16 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-232', name: 'Nachos & Dips',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299507177-b85c4c2f0c0b?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹300 for two',
      cuisines: ['Nachos', 'Mexican Snacks', 'Dips', 'Tex-Mex'], areaName: 'Koramangala',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹65' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-233', name: 'Kerala Banana Leaf',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹200 for two',
      cuisines: ['Kerala', 'Sadya', 'Banana Leaf', 'South Indian'], areaName: 'JP Nagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-234', name: 'Biryani Street',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹320 for two',
      cuisines: ['Biryani', 'Mughlai', 'Dum', 'Kebabs'], areaName: 'Banaswadi',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '₹70 OFF', subHeader: 'ABOVE ₹249' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-235', name: 'The Matcha Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹300 for two',
      cuisines: ['Matcha', 'Japanese Cafe', 'Desserts', 'Tea'], areaName: 'Indiranagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-236', name: 'Mughlai Dawat',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹480 for two',
      cuisines: ['Mughlai', 'Nihari', 'Korma', 'Biryani'], areaName: 'Frazer Town',
      sla: { slaString: '35-40 mins', deliveryTime: 37 },
      aggregatedDiscountInfoV3: { header: '20% OFF', subHeader: 'UPTO ₹80' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-237', name: 'Litti Chokha House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹160 for two',
      cuisines: ['Bihari', 'Litti Chokha', 'North Indian', 'Street Food'], areaName: 'Hebbal',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-238', name: 'Noodle Theory',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹300 for two',
      cuisines: ['Noodles', 'Pan-Asian', 'Hakka', 'Pad Thai'], areaName: 'Whitefield',
      sla: { slaString: '25-30 mins', deliveryTime: 27 },
      aggregatedDiscountInfoV3: { header: '₹55 OFF', subHeader: 'ABOVE ₹219' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-239', name: 'Cheesecake Factory',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.5, costForTwo: '₹400 for two',
      cuisines: ['Cheesecake', 'Desserts', 'Bakery', 'American'], areaName: 'Brigade Road',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-240', name: 'The South Indian',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹220 for two',
      cuisines: ['South Indian', 'Uthappam', 'Pesarattu', 'Filter Coffee'], areaName: 'Gandhinagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '₹35 OFF', subHeader: 'ABOVE ₹139' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-241', name: 'Kabab E Bahar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529685584945-3f4a9c7bd131?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹520 for two',
      cuisines: ['Kebabs', 'Seekh', 'Galouti', 'Mughlai'], areaName: 'Commercial Street',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-242', name: 'Fruit Bowl Co',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹180 for two',
      cuisines: ['Fruit Bowls', 'Healthy', 'Juices', 'Salads'], areaName: 'Koramangala',
      sla: { slaString: '15-20 mins', deliveryTime: 15 },
      aggregatedDiscountInfoV3: { header: '10% OFF', subHeader: 'ABOVE ₹99' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-243', name: 'Madurai Mess',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹200 for two',
      cuisines: ['Madurai', 'South Indian', 'Kari Dosa', 'Parotta'], areaName: 'JP Nagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-244', name: 'Cloud Kitchen 9',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹280 for two',
      cuisines: ['Multi-Cuisine', 'Cloud Kitchen', 'Burgers', 'Wraps'], areaName: 'Electronic City',
      sla: { slaString: '20-25 mins', deliveryTime: 23 },
      aggregatedDiscountInfoV3: { header: '40% OFF', subHeader: 'UPTO ₹100' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-245', name: 'The Doughnut Lab',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹260 for two',
      cuisines: ['Doughnuts', 'Bakery', 'Coffee', 'Desserts'], areaName: 'Indiranagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-246', name: 'Grill & Chill',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹450 for two',
      cuisines: ['Grills', 'Skewers', 'BBQ', 'American'], areaName: 'Marathahalli',
      sla: { slaString: '30-35 mins', deliveryTime: 33 },
      aggregatedDiscountInfoV3: { header: '₹80 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-247', name: 'Thukpa Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹260 for two',
      cuisines: ['Tibetan', 'Thukpa', 'Momos', 'Soup'], areaName: 'Sadashivanagar',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-248', name: 'Kheema Pav House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹180 for two',
      cuisines: ['Kheema Pav', 'Maharashtrian', 'Street Food', 'Bun Maska'], areaName: 'Majestic',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹30 OFF', subHeader: 'ABOVE ₹129' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-249', name: 'Espresso & Empanadas',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹350 for two',
      cuisines: ['Latin', 'Empanadas', 'Coffee', 'Cafe'], areaName: 'Church Street',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-250', name: 'The Last Bite',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹320 for two',
      cuisines: ['Late Night', 'Fast Food', 'Pizza', 'Burgers'], areaName: 'Koramangala',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '50% OFF', subHeader: 'UPTO ₹120' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-251', name: 'Tuna & Salmon Bar',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559694093-443d6f0d38c0?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹700 for two',
      cuisines: ['Seafood', 'Sashimi', 'Tuna', 'Japanese'], areaName: 'UB City',
      sla: { slaString: '40-45 mins', deliveryTime: 42 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-252', name: 'Aloo Paratha Junction',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹140 for two',
      cuisines: ['Parathas', 'Punjabi', 'Lassi', 'Pickles'], areaName: 'Rajajinagar',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '₹25 OFF', subHeader: 'ABOVE ₹109' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-253', name: 'Coastal Catch',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1559694093-443d6f0d38c0?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹520 for two',
      cuisines: ['Seafood', 'Mangalorean', 'Fish Fry', 'Prawns'], areaName: 'Banashankari',
      sla: { slaString: '35-40 mins', deliveryTime: 37 }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-254', name: 'The Curry Club',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹360 for two',
      cuisines: ['Indian', 'Curry', 'Butter Chicken', 'Dal Makhani'], areaName: 'HSR Layout',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '25% OFF', subHeader: 'UPTO ₹75' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-255', name: 'Halwa Puri House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1551024709-8f23081b5cc2?w=660&q=80',
      avgRating: 4.4, costForTwo: '₹160 for two',
      cuisines: ['Halwa Puri', 'Punjabi Breakfast', 'Chana', 'Kheer'], areaName: 'Gandhinagar',
      sla: { slaString: '15-20 mins', deliveryTime: 17 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-256', name: 'Tokyo Street Food',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹450 for two',
      cuisines: ['Japanese Street Food', 'Takoyaki', 'Okonomiyaki', 'Gyoza'], areaName: 'Indiranagar',
      sla: { slaString: '30-35 mins', deliveryTime: 32 },
      aggregatedDiscountInfoV3: { header: '₹70 OFF', subHeader: 'ABOVE ₹299' }, veg: false,
    },
  },
  {
    info: {
      id: 'mock-257', name: 'The Roti Shop',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=660&q=80',
      avgRating: 4.1, costForTwo: '₹180 for two',
      cuisines: ['Rotis', 'North Indian', 'Sabzi', 'Dal'], areaName: 'Bellandur',
      sla: { slaString: '20-25 mins', deliveryTime: 22 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-258', name: 'Loaded Fries',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.0, costForTwo: '₹240 for two',
      cuisines: ['Loaded Fries', 'Fast Food', 'Nachos', 'Cheese'], areaName: 'Koramangala',
      sla: { slaString: '15-20 mins', deliveryTime: 17 },
      aggregatedDiscountInfoV3: { header: '30% OFF', subHeader: 'UPTO ₹60' }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-259', name: 'Sindhi Kadhi House',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=660&q=80',
      avgRating: 4.3, costForTwo: '₹220 for two',
      cuisines: ['Sindhi', 'Kadhi Chawal', 'Sai Bhaji', 'Indian'], areaName: 'Jayanagar',
      sla: { slaString: '25-30 mins', deliveryTime: 27 }, veg: true,
    },
  },
  {
    info: {
      id: 'mock-260', name: 'Bun & Beyond',
      cloudinaryImageId: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=660&q=80',
      avgRating: 4.2, costForTwo: '₹320 for two',
      cuisines: ['Gourmet Burgers', 'Sliders', 'Milkshakes', 'Fries'], areaName: 'Whitefield',
      sla: { slaString: '20-25 mins', deliveryTime: 22 },
      aggregatedDiscountInfoV3: { header: '₹60 OFF', subHeader: 'ABOVE ₹249' }, veg: false,
    },
  },
]

export default MOCK_RESTAURANTS
