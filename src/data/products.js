export const CATEGORIES = [
  {
    id: 'roasted-makhana',
    name: 'Roasted Makhana',
    tagline: 'Crunchy fox nuts slow-roasted to perfection',
    count: 6,
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop',
    color: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'kettle-chips',
    name: 'Artisanal Chips',
    tagline: 'Hand-cooked crisps with gourmet spices',
    count: 5,
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop',
    color: 'from-yellow-500/20 to-amber-500/10'
  },
  {
    id: 'roasted-nuts',
    name: 'Nuts & Seeds',
    tagline: 'Protein-packed California almonds & walnuts',
    count: 7,
    icon: 'Nut',
    image: 'https://images.unsplash.com/photo-1508061252224-43775270e0a4?q=80&w=800&auto=format&fit=crop',
    color: 'from-orange-600/20 to-amber-600/10'
  },
  {
    id: 'desi-namkeen',
    name: 'Desi Munchies',
    tagline: 'Heritage Indian savouries with a modern twist',
    count: 6,
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    color: 'from-red-500/20 to-orange-500/10'
  },
  {
    id: 'healthy-bakes',
    name: 'Gourmet Cookies',
    tagline: 'Butter-rich shortbread & oat baked delights',
    count: 5,
    icon: 'Cookie',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
    color: 'from-amber-700/20 to-yellow-600/10'
  },
  {
    id: 'trail-mixes',
    name: 'Exotic Trail Mixes',
    tagline: 'Superfood blends of berries, seeds & dark chocolate',
    count: 4,
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop',
    color: 'from-purple-500/20 to-pink-500/10'
  }
];

export const PRODUCTS = [
  {
    id: 'snack-01',
    name: 'Smoky Peri-Peri Roasted Makhana',
    category: 'roasted-makhana',
    categoryName: 'Roasted Makhana',
    subtitle: 'Slow-roasted jumbo fox nuts infused with African bird’s eye chili and Himalayan pink salt.',
    price: 199,
    originalPrice: 249,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 384,
    badge: 'Bestseller',
    badgeColor: 'bg-orange-500 text-white',
    weightOptions: [
      { label: '120g Pouch', price: 199, weight: '120g' },
      { label: '250g Jar', price: 379, weight: '250g' },
      { label: '500g Value Pack', price: 699, weight: '500g' }
    ],
    dietary: ['Gluten-Free', 'Roasted Not Fried', 'Zero Trans Fat', 'Vegan'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Our signature Roasted Makhana is harvested from organic lotus ponds of Bihar, puffed to crisp perfection and gently toasted with virgin olive oil, smoked paprika, and fiery peri peri botanicals. Light on calories, heavy on crunch.',
    ingredients: 'Puffed Lotus Seeds (Makhana 82%), Cold-Pressed Olive Oil (8%), Spice Blend (Peri-Peri Chili, Smoked Paprika, Garlic Powder, Onion Flakes, Black Pepper), Himalayan Pink Salt, Acidity Regulator (Citric Acid).',
    nutrition: {
      energy: '412 kcal',
      protein: '9.8g',
      carbs: '64.2g',
      fats: '12.5g',
      fiber: '7.4g',
      sodium: '320mg'
    },
    highlights: ['Slow Roasted in Olive Oil', 'Zero Cholesterol', 'Rich in Antioxidants & Calcium']
  },
  {
    id: 'snack-02',
    name: 'Black Truffle & Rosemary Kettle Chips',
    category: 'kettle-chips',
    categoryName: 'Artisanal Chips',
    subtitle: 'Thick cut Yukon gold potatoes batch-cooked and seasoned with aromatic Italian truffle.',
    price: 249,
    originalPrice: 299,
    discount: '17% OFF',
    rating: 4.8,
    reviewsCount: 240,
    badge: 'Chef’s Pick',
    badgeColor: 'bg-stone-900 text-amber-200',
    weightOptions: [
      { label: '140g Pack', price: 249, weight: '140g' },
      { label: '280g Twin Pack', price: 469, weight: '280g' }
    ],
    dietary: ['Vegetarian', 'Gluten-Free', 'No Added MSG'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Batch-fried kettle cooked chips crafted from farm-sourced potatoes. Every batch is tumbled while warm with crushed black summer truffle powder, wild Mediterranean rosemary leaves, and flaky sea salt crystals.',
    ingredients: 'Farm Fresh Potatoes (70%), Sunflower & Rice Bran Oil, Black Truffle Seasoning (Maltodextrin, Natural Truffle Flavour, Dehydrated Rosemary, Sea Salt, Cracked Black Pepper).',
    nutrition: {
      energy: '520 kcal',
      protein: '6.5g',
      carbs: '55.0g',
      fats: '29.0g',
      fiber: '4.2g',
      sodium: '410mg'
    },
    highlights: ['Imported Summer Truffle', 'Ultra Crunchy Cut', 'Craft Small-Batch']
  },
  {
    id: 'snack-03',
    name: 'Smoked Kashmiri Walnut & Almond Mix',
    category: 'roasted-nuts',
    categoryName: 'Nuts & Seeds',
    subtitle: 'Applewood smoked California almonds paired with premium Kashmir halved walnuts and sea salt.',
    price: 349,
    originalPrice: 420,
    discount: '17% OFF',
    rating: 4.9,
    reviewsCount: 512,
    badge: 'Popular',
    badgeColor: 'bg-emerald-600 text-white',
    weightOptions: [
      { label: '180g Jar', price: 349, weight: '180g' },
      { label: '350g Jar', price: 649, weight: '350g' },
      { label: '700g Family Pack', price: 1199, weight: '700g' }
    ],
    dietary: ['High Protein', 'Keto Friendly', 'Gluten-Free', 'Vegan'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508061252224-43775270e0a4?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508061252224-43775270e0a4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An irresistible blend of hearty nuts gently cold-smoked over natural applewood chips. High in brain-fueling Omega-3 fatty acids, plant proteins, and essential minerals.',
    ingredients: 'California Whole Almonds (50%), Kashmiri Walnut Halves (45%), Virgin Coconut Oil, Natural Applewood Smoke Essence, Rock Salt.',
    nutrition: {
      energy: '614 kcal',
      protein: '19.2g',
      carbs: '15.4g',
      fats: '54.0g',
      fiber: '9.8g',
      sodium: '190mg'
    },
    highlights: ['Natural Wood Smoked', 'Over 19g Plant Protein', 'Zero Refined Sugars']
  },
  {
    id: 'snack-04',
    name: 'Dark Chocolate Sea Salt Granola Clusters',
    category: 'trail-mixes',
    categoryName: 'Exotic Trail Mixes',
    subtitle: '70% single-origin Belgian dark chocolate with rolled oats, pumpkin seeds, and fleur de sel.',
    price: 299,
    originalPrice: 350,
    discount: '15% OFF',
    rating: 4.9,
    reviewsCount: 429,
    badge: 'Indulgent',
    badgeColor: 'bg-amber-900 text-amber-100',
    weightOptions: [
      { label: '200g Pouch', price: 299, weight: '200g' },
      { label: '400g Pouch', price: 559, weight: '400g' }
    ],
    dietary: ['Whole Grain', 'No Refined Sugar', 'Vegetarian'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Crispy clusters of gluten-free rolled oats baked with date honey and virgin coconut oil, drenched in rich 70% dark chocolate chunks and finished with sparkling Maldon sea salt.',
    ingredients: 'Gluten-Free Rolled Oats (42%), 70% Dark Chocolate Chunks (20%), Roasted Pumpkin Seeds, Chia Seeds, Date Honey, Cold-Pressed Coconut Oil, Sea Salt Flakes.',
    nutrition: {
      energy: '475 kcal',
      protein: '11.0g',
      carbs: '58.0g',
      fats: '21.5g',
      fiber: '8.2g',
      sodium: '180mg'
    },
    highlights: ['70% Dark Belgian Cocoa', 'Sweetened with Real Dates', 'Crunchy Grain Clusters']
  },
  {
    id: 'snack-05',
    name: 'Ragi & Flaxseed Crunchy Bhujia',
    category: 'desi-namkeen',
    categoryName: 'Desi Munchies',
    subtitle: 'Finger millet baked crisp with nutty roasted flaxseeds, mint leaves, and royal cumin.',
    price: 169,
    originalPrice: 199,
    discount: '15% OFF',
    rating: 4.7,
    reviewsCount: 198,
    badge: 'Guilt Free',
    badgeColor: 'bg-teal-700 text-white',
    weightOptions: [
      { label: '150g Pack', price: 169, weight: '150g' },
      { label: '300g Value Pack', price: 310, weight: '300g' }
    ],
    dietary: ['Gluten-Free', 'High Calcium', 'Roasted Not Fried', 'Vegan'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A contemporary health-conscious twist on India’s most beloved tea-time snack. Made with 100% wholesome Ragi (finger millet flour) and golden flaxseeds, baked crisp without any palm oil or deep-frying.',
    ingredients: 'Ragi Flour (45%), Gram Flour (Besan 30%), Roasted Flaxseeds (12%), Groundnut Oil (8%), Roasted Cumin, Asafoetida (Hing), Mint Leaves, Black Salt.',
    nutrition: {
      energy: '388 kcal',
      protein: '14.2g',
      carbs: '52.0g',
      fats: '11.8g',
      fiber: '10.5g',
      sodium: '290mg'
    },
    highlights: ['Baked - Never Deep Fried', 'Zero Palm Oil', 'Rich in Dietary Iron & Calcium']
  },
  {
    id: 'snack-06',
    name: 'Saffron & Pistachio Artisanal Shortbread',
    category: 'healthy-bakes',
    categoryName: 'Gourmet Cookies',
    subtitle: 'Melt-in-mouth cultured butter cookies laced with Kashmiri Mongra saffron and crushed pistachios.',
    price: 329,
    originalPrice: 389,
    discount: '15% OFF',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Artisanal',
    badgeColor: 'bg-amber-600 text-white',
    weightOptions: [
      { label: '180g Box (8 Pcs)', price: 329, weight: '180g' },
      { label: '360g Gift Tin (16 Pcs)', price: 599, weight: '360g' }
    ],
    dietary: ['Vegetarian', 'Pure Butter', 'No Preservatives'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Handcrafted in small bakery kettles with churned dairy butter, unrefined raw cane sugar, fragrant Kashmiri saffron strands, and hand-selected Iranian pistachios.',
    ingredients: 'Wheat Flour, Cultured Dairy Butter (32%), Raw Cane Sugar, Iranian Roasted Pistachios (12%), Kashmiri Saffron, Green Cardamom, Sea Salt.',
    nutrition: {
      energy: '495 kcal',
      protein: '7.8g',
      carbs: '56.0g',
      fats: '26.4g',
      fiber: '3.1g',
      sodium: '110mg'
    },
    highlights: ['Pure Grass-Fed Dairy Butter', 'Real Kashmiri Saffron', 'No Artificial Flavours']
  },
  {
    id: 'snack-07',
    name: 'Tangy Raw Mango & Mint Banana Crisps',
    category: 'kettle-chips',
    categoryName: 'Artisanal Chips',
    subtitle: 'Thin sliced Nendran raw bananas crisp-tumbled in pure coconut oil with amchur and mint.',
    price: 179,
    originalPrice: 219,
    discount: '18% OFF',
    rating: 4.8,
    reviewsCount: 265,
    badge: 'New',
    badgeColor: 'bg-emerald-600 text-white',
    weightOptions: [
      { label: '150g Pouch', price: 179, weight: '150g' },
      { label: '300g Pouch', price: 329, weight: '300g' }
    ],
    dietary: ['Gluten-Free', 'Vegan', 'Cold Pressed Coconut Oil'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Sourced from organic plantation groves in Wayanad, Kerala. Cut wafer-thin and flash-crisped in cold-pressed virgin coconut oil, spiced with tangy raw mango powder and fragrant dried spearmint.',
    ingredients: 'Raw Kerala Nendran Bananas (75%), Cold-Pressed Coconut Oil (18%), Dry Mango Powder (Amchur), Dried Mint Leaves, Chaat Masala, Pink Rock Salt.',
    nutrition: {
      energy: '480 kcal',
      protein: '4.2g',
      carbs: '62.0g',
      fats: '23.0g',
      fiber: '6.5g',
      sodium: '260mg'
    },
    highlights: ['Authentic Kerala Nendran', 'Virgin Coconut Oil Cooked', 'Zero Refined Palm Oil']
  },
  {
    id: 'snack-08',
    name: 'Chili Lime Roasted Edamame & Pumpkin Seeds',
    category: 'roasted-nuts',
    categoryName: 'Nuts & Seeds',
    subtitle: 'Zesty roasted young soybeans and crunchy pepitas loaded with plant protein.',
    price: 269,
    originalPrice: 320,
    discount: '16% OFF',
    rating: 4.7,
    reviewsCount: 184,
    badge: 'High Protein',
    badgeColor: 'bg-orange-600 text-white',
    weightOptions: [
      { label: '160g Jar', price: 269, weight: '160g' },
      { label: '320g Jar', price: 499, weight: '320g' }
    ],
    dietary: ['High Protein (18g)', 'Vegan', 'Gluten-Free', 'Low Carb'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Crisp, oven-toasted green edamame beans blended with roasted pumpkin and sunflower seeds. Dusted with sun-dried lime zest and Mexican chipotle chili for an invigorating crunch.',
    ingredients: 'Dry Roasted Green Edamame (50%), Roasted Pumpkin Seeds (30%), Sunflower Seeds (15%), Lime Juice Powder, Smoked Chipotle, Sea Salt.',
    nutrition: {
      energy: '460 kcal',
      protein: '24.5g',
      carbs: '18.2g',
      fats: '28.0g',
      fiber: '12.0g',
      sodium: '240mg'
    },
    highlights: ['24.5g Protein per 100g', 'Keto & Diabetic Friendly', 'High Fiber Energy Booster']
  },
  {
    id: 'snack-09',
    name: 'Cheesy Jalapeño Roasted Fox Nuts',
    category: 'roasted-makhana',
    categoryName: 'Roasted Makhana',
    subtitle: 'Puffed lotus seeds dusted with creamy cheddar cheese and spicy jalapeño herbs.',
    price: 219,
    originalPrice: 269,
    discount: '18% OFF',
    rating: 4.8,
    reviewsCount: 342,
    badge: 'Kids Favourite',
    badgeColor: 'bg-yellow-600 text-white',
    weightOptions: [
      { label: '120g Pouch', price: 219, weight: '120g' },
      { label: '250g Jar', price: 399, weight: '250g' }
    ],
    dietary: ['Gluten-Free', 'Roasted Not Fried', 'Vegetarian'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An indulgent yet wholesome snack for movie nights. Premium grade lotus seeds popped and coated with real cheddar cheese powder and warm pickled jalapeño seasonings.',
    ingredients: 'Puffed Lotus Seeds (80%), Olive Oil (8%), Cheddar Cheese Powder (Dairy), Dried Jalapeño Flakes, Whey Protein, Sea Salt, Onion Powder.',
    nutrition: {
      energy: '425 kcal',
      protein: '10.2g',
      carbs: '61.5g',
      fats: '14.0g',
      fiber: '6.8g',
      sodium: '360mg'
    },
    highlights: ['Real Aged Cheddar', 'Zero Palm Oil', 'Subtle Jalapeño Kick']
  },
  {
    id: 'snack-10',
    name: 'Andhra Gunpowder Spiced Roasted Peanuts',
    category: 'desi-namkeen',
    categoryName: 'Desi Munchies',
    subtitle: 'Plump native peanuts roasted with fiery Guntur chilies, curry leaves, and chana dal podi.',
    price: 149,
    originalPrice: 179,
    discount: '16% OFF',
    rating: 4.9,
    reviewsCount: 460,
    badge: 'Heritage',
    badgeColor: 'bg-red-600 text-white',
    weightOptions: [
      { label: '200g Pouch', price: 149, weight: '200g' },
      { label: '400g Value Pack', price: 279, weight: '400g' }
    ],
    dietary: ['Vegan', 'Gluten-Free', 'High Protein'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Inspired by the fiery culinary traditions of Andhra Pradesh. Hand-picked bold peanuts roasted dry in sea sand, then enrobed in hot cold-pressed sesame oil with roasted lentils, Guntur red chilies, and crispy curry leaves.',
    ingredients: 'Native Peanuts (82%), Cold Pressed Sesame Oil (8%), Gunpowder Podi Blend (Chana Dal, Urad Dal, Guntur Red Chili, Roasted Cumin, Garlic, Curry Leaves), Sea Salt.',
    nutrition: {
      energy: '585 kcal',
      protein: '25.0g',
      carbs: '17.0g',
      fats: '46.0g',
      fiber: '8.5g',
      sodium: '340mg'
    },
    highlights: ['Authentic Andhra Podi Recipe', '25g Protein per 100g', 'Crispy Golden Roast']
  },
  {
    id: 'snack-11',
    name: 'Berry Blast Dried Superfruit Mix',
    category: 'trail-mixes',
    categoryName: 'Exotic Trail Mixes',
    subtitle: 'Canadian cranberries, blueberries, Turkish figs, goji berries and chia seeds.',
    price: 389,
    originalPrice: 450,
    discount: '14% OFF',
    rating: 4.8,
    reviewsCount: 220,
    badge: 'Antioxidant',
    badgeColor: 'bg-fuchsia-600 text-white',
    weightOptions: [
      { label: '200g Glass Jar', price: 389, weight: '200g' },
      { label: '400g Refill Pouch', price: 699, weight: '400g' }
    ],
    dietary: ['No Added Sugar', 'Vegan', 'Superfood', 'Gluten-Free'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'An antioxidant-rich powerhouse featuring gently sun-dried wild blueberries, cranberries infused with apple juice, sweet diced figs, and chewy Tibetan goji berries.',
    ingredients: 'Sun-dried Cranberries (30%), Wild Blueberries (25%), Diced Turkish Figs (25%), Goji Berries (10%), Raw Chia Seeds (10%).',
    nutrition: {
      energy: '345 kcal',
      protein: '5.2g',
      carbs: '74.0g',
      fats: '2.5g',
      fiber: '9.4g',
      sodium: '45mg'
    },
    highlights: ['Zero Refined Cane Sugar', 'Loaded with Vitamin C & Zinc', 'Immunity Booster']
  },
  {
    id: 'snack-12',
    name: 'Oat & Roasted Almond Butter Crunchies',
    category: 'healthy-bakes',
    categoryName: 'Gourmet Cookies',
    subtitle: 'Chewy artisan cookies crafted with stone-ground oats, slow-roasted almond butter, and dark molasses.',
    price: 279,
    originalPrice: 329,
    discount: '15% OFF',
    rating: 4.7,
    reviewsCount: 167,
    badge: 'Fiber Rich',
    badgeColor: 'bg-amber-800 text-white',
    weightOptions: [
      { label: '160g Box (6 Pcs)', price: 279, weight: '160g' },
      { label: '320g Box (12 Pcs)', price: 499, weight: '320g' }
    ],
    dietary: ['High Fiber', 'Eggless', 'No Palm Oil', 'Vegetarian'],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Decadent yet nourishing cookies baked with whole grain rolled oats and freshly ground California almond butter. Sweetened with coconut blossom nectar.',
    ingredients: 'Rolled Oats (40%), Homemade Almond Butter (25%), Whole Wheat Flour, Coconut Sugar, Sunflower Oil, Baking Soda, Madagascar Vanilla Extract, Cinnamon, Sea Salt.',
    nutrition: {
      energy: '468 kcal',
      protein: '11.8g',
      carbs: '54.2g',
      fats: '21.0g',
      fiber: '7.8g',
      sodium: '150mg'
    },
    highlights: ['House-Crafted Almond Butter', '100% Eggless', 'Slow-Release Energy']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    snack: 'Peri-Peri Roasted Makhana',
    comment: 'The peri-peri makhana is hands down the best healthy snack I have ever tasted! Extremely crisp, not oily at all, and the packaging keeps it fresh for weeks.'
  },
  {
    id: 2,
    name: 'Rohan Mehra',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    snack: 'Truffle & Rosemary Chips',
    comment: 'These kettle chips taste like they came straight out of a Michelin star kitchen. The aroma of truffle when you open the pack is unbeatable!'
  },
  {
    id: 3,
    name: 'Pooja Iyer',
    city: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    snack: 'Andhra Gunpowder Peanuts',
    comment: 'As someone who loves authentic South Indian podi, this blew my mind. Roasted without grease, and that curry leaf crunch is heavenly with evening chai.'
  }
];

export const PROMO_CODES = {
  'SNACKFIRST': { discountPercent: 15, minOrder: 399, description: '15% OFF for new snackers' },
  'CRUNCH20': { discountPercent: 20, minOrder: 799, description: '20% OFF on orders above ₹799' },
  'FREEDEL': { freeDelivery: true, minOrder: 299, description: 'Free delivery on your box' }
};
