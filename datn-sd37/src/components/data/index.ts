// File: src/data/db.ts

export const productsDB = [
  // --- KHO CASES ---
  {
    slug: 'iphone-17-pro-max',
    name: 'Super Thin Case cho iPhone 17 Pro Max',
    price: '$39.00',
    image: 'https://placehold.co/400x400/222222/ffffff?text=iPhone+17+Pro+Max'
  },
  
  // --- KHO SCREEN PROTECTION ---
  {
    slug: 'glass-apple-iphone',
    name: 'Glass Screen Protector Apple iPhone',
    price: '$29.00',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Glass+Screen'
  },
  
  // --- KHO CHARGING ---
  {
    slug: 'qi2-folding-stand',
    name: 'Qi2 3-in-1 Folding Wireless Charging Stand',
    price: '$79.99',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Qi2+Charger'
  },
  {
    slug: 'magnetic-car-mount',
    name: 'Magnetic Wireless Car Charging Mount',
    price: '$44.00',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Car+Mount'
  },

  // --- KHO ACCESSORIES ---
  {
    slug: 'terra-backpack',
    name: 'Terra Recycled 16" Laptop Backpack',
    price: '$45.00',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Backpack'
  }
];

// --- KHO DỮ LIỆU CHO TRANG ABOUT (Vì About chỉ là bài viết, không phải sản phẩm) ---
export const pagesDB = [
  { slug: 'about-us', title: 'Về Chúng Tôi (About Us)', content: 'Peel được thành lập để tạo ra những chiếc ốp lưng mỏng nhất thế giới...' },
  { slug: 'why-peel', title: 'Tại sao chọn Peel?', content: 'Chúng tôi giữ nguyên vẻ đẹp nguyên bản của điện thoại...' },
  { slug: 'help-center', title: 'Trung tâm hỗ trợ', content: 'Bạn cần giúp đỡ? Hãy liên hệ với chúng tôi qua email...' }
];