// src/data/db.ts

export interface Product {
  id: number;
  type: string;
  category: string;
  name: string;
  price: number;
  oldPrice: number | null;
  colors?: string[];
  image: string;
  description?: string;
  specs?: Record<string, string>;
  gallery?: string[];
  features?: string[]; // Dùng cho bộ lọc
  models?: string[];   // Dùng cho bộ lọc
}

export const filterData = {
  colors: ["#414141", "#000000", "#E4DED1", "#FFFFFF", "#FF924E", "#4A5368", "#645D71", "#F3F3F3", "linear-gradient(180deg, #000 0%, #555 100%)", "#232323", "#1F473A"],
  groups: [
    { title: "Thương hiệu", stateKey: "brands", type: "checkbox", isOpen: true, items: [{ label: "Apple", value: "Apple" }, { label: "Samsung", value: "Samsung" }, { label: "Xiaomi", value: "Xiaomi" }] },
    { title: "Màu sắc", type: "color", isOpen: true },
    { title: "Bộ nhớ trong", stateKey: "storage", type: "checkbox", isOpen: true, items: [{ label: "128GB", value: "128GB" }, { label: "256GB", value: "256GB" }] }
  ]
};

export const productsDB = [
  { 
    id: 1, type: "Phone", category: "Apple", name: "iPhone 17 Pro Max 256GB", 
    price: 1199.00, oldPrice: 1299.00, 
    colors: ["#333", "#fff", "#E4DED1", "#4A5368"], 
    image: "https://placehold.co/400x400/F1F1F1/333?text=iPhone+17+Pro+Max",
    description: "Chiếc điện thoại mạnh mẽ nhất với màn hình ProMotion 6.9 inch.",
    specs: { screen: "6.9 inch", chip: "A19 Bionic", battery: "29 hours" },
    gallery: ["https://placehold.co/600x600/F1F1F1/333?text=Front", "https://placehold.co/600x600/F1F1F1/333?text=Back"]
  },
  { 
    id: 2, type: "Phone", category: "Samsung", name: "Samsung Galaxy S24 Ultra 512GB", 
    price: 1299.00, oldPrice: 1399.00, 
    colors: ["#333", "#000", "#E4DED1", "#fff", "#645D71"], 
    image: "https://placehold.co/400x400/F1F1F1/333?text=Galaxy+S24+Ultra",
    description: "Quyền Năng AI Đột Phá cùng bút S-Pen.",
    specs: { screen: "6.8 inch", chip: "Snapdragon 8 Gen 3", battery: "5000mAh" },
    gallery: ["https://placehold.co/600x600/F1F1F1/333?text=S24+Front"]
  },
  { 
    id: 3, type: "Phone", category: "Apple", name: "iPhone 17 Pro 128GB", 
    price: 999.00, oldPrice: 1099.00, 
    colors: ["#333", "#fff", "#E4DED1"], 
    image: "https://placehold.co/400x400/F1F1F1/333?text=iPhone+17+Pro",
    description: "Hiệu năng đỉnh cao trong kích thước nhỏ gọn.",
    specs: { screen: "6.3 inch", chip: "A19 Bionic", battery: "23 hours" },
    gallery: ["https://placehold.co/600x600/F1F1F1/333?text=17Pro+Front"]
  },
  { 
    id: 4, type: "Case", category: "Apple", name: "Super Thin iPhone 17 Pro Max Case", 
    price: 35.00, oldPrice: null, 
    colors: ["#000", "#fff", "#333"], 
    image: "https://placehold.co/400x400/222/fff?text=Super+Thin+Case",
    description: "Ốp lưng siêu mỏng, giữ nguyên thiết kế máy.",
    specs: { thickness: "0.35mm", material: "Nhựa PP" },
    gallery: ["https://placehold.co/600x600/222/fff?text=Case+Front"]
  }
];

export const comparisonsData = [
  { name: "iPhone 17 Pro Max", desc1: "Đỉnh Cao Công Nghệ", desc2: "Màn hình 6.9 inch", btnText: "Mua iPhone 17 Pro Max", performance: 95, camera: 95, battery: 90, reasons: ["Yêu thích hệ sinh thái Apple", "Cần camera quay video", "Thích màn hình cực lớn"], img: "https://placehold.co/200x400/transparent/333?text=17+Pro+Max" },
  { name: "Galaxy S24 Ultra", desc1: "Quyền Năng AI Đột Phá", desc2: "Tích hợp bút S-Pen", btnText: "Mua Galaxy S24 Ultra", performance: 90, camera: 98, battery: 85, reasons: ["Thích tính năng Galaxy AI", "Thường xuyên ghi chú", "Chụp ảnh zoom 10x"], img: "https://placehold.co/200x400/transparent/333?text=S24+Ultra" }
];

export const navigationData = {
  mainMenu: [
    { name: "iPhone", slug: "iphone", subItems: ["iPhone 17 Series", "iPhone 16 Series", "Cases"] },
    { name: "Samsung", slug: "samsung", subItems: ["Galaxy S24 Series", "Galaxy Z Fold6", "Cases"] },
    { name: "Accessories", slug: "accessories", subItems: ["MagSafe", "Chargers", "Cables"] }
  ],
  footerLinks: [
    { title: "Shop", links: ["All Products", "Best Sellers", "New Arrivals"] },
    { title: "Support", links: ["Help Center", "Shipping", "Returns", "Contact"] },
    { title: "Company", links: ["About Us", "Sustainability", "Terms of Service"] }
  ]
};

export const homeData = {
  heroBanners: [
    { id: 1, title: "The iPhone 17 Pro Case", subtitle: "Super Thin. Branded-Free. Minimalist.", image: "https://placehold.co/1920x800/222/fff?text=iPhone+17+Pro+Banner", btnText: "Shop Now", link: "/product/super-thin-iphone-17-pro" },
    { id: 2, title: "Galaxy S24 Ultra Series", subtitle: "Experience AI with the thinnest protection.", image: "https://placehold.co/1920x800/333/fff?text=Galaxy+S24+Banner", btnText: "Explore More", link: "/category/samsung" }
  ]
};

export const reviewsData = [
  { id: 1, userName: "Khách hàng 1", rating: 5, date: "2026-03-20", comment: "Ốp lưng cực mỏng, giao hàng nhanh!", productName: "Super Thin iPhone 17 Pro Case" },
  { id: 2, userName: "Khách hàng 2", rating: 4, date: "2026-03-22", comment: "Điện thoại xài mượt, đóng gói kỹ.", productName: "iPhone 17 Pro Max" }
];

export const cartInitialState = {
  items: [
    { cartId: "c1", productId: 1, name: "iPhone 17 Pro Max", variant: "256GB / Titanium Gray", quantity: 1, price: 1199.00, image: "https://placehold.co/100x100/F1F1F1/333?text=Thumb" },
    { cartId: "c2", productId: 4, name: "Super Thin iPhone 17 Pro Max Case", variant: "Black", quantity: 2, price: 35.00, image: "https://placehold.co/100x100/222/fff?text=Case" }
  ],
  subtotal: 1269.00,
  shipping: 0.00,
  total: 1269.00
};