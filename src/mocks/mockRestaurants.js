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
]

export default MOCK_RESTAURANTS
