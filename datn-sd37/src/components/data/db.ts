// src/components/data/db.ts

export const filterData = {
  colors: ["#414141", "#000000", "#E4DED1", "#FFFFFF", "#FF924E", "#4A5368", "#645D71", "#F3F3F3", "linear-gradient(180deg, #000 0%, #555 100%)", "#232323", "#1F473A"],
  groups: [
    { title: "Thương hiệu", stateKey: "brands", type: "checkbox", isOpen: true, items: [{ label: "Apple (15)", value: "Apple" }, { label: "Samsung (12)", value: "Samsung" }, { label: "Xiaomi (8)", value: "Xiaomi" }] },
    { title: "Màu sắc", type: "color", isOpen: true },
    { title: "Bộ nhớ trong", stateKey: "storage", type: "checkbox", isOpen: true, items: [{ label: "128GB (10)", value: "128GB" }, { label: "256GB (18)", value: "256GB" }] }
  ]
};

export const productsDB = [
  { id: 1, category: "Apple", name: "iPhone 17 Pro Max 256GB", price: 1199.00, oldPrice: 1299.00, colors: ["#333", "#fff", "#E4DED1", "#4A5368"], image: "https://placehold.co/400x400/F1F1F1/333?text=iPhone+17+Pro+Max" },
  { id: 2, category: "Samsung", name: "Samsung Galaxy S24 Ultra 512GB", price: 1299.00, oldPrice: 1399.00, colors: ["#333", "#000", "#E4DED1", "#fff", "#645D71"], image: "https://placehold.co/400x400/F1F1F1/333?text=Galaxy+S24+Ultra" },
  { id: 3, category: "Apple", name: "iPhone 17 Pro 128GB", price: 999.00, oldPrice: 1099.00, colors: ["#333", "#fff", "#E4DED1"], image: "https://placehold.co/400x400/F1F1F1/333?text=iPhone+17+Pro" },
  { id: 4, category: "Xiaomi", name: "Xiaomi 14 Ultra 512GB", price: 899.00, oldPrice: 999.00, colors: ["#000", "#fff"], image: "https://placehold.co/400x400/F1F1F1/333?text=Xiaomi+14+Ultra" }
];

export const comparisonsData = [
  { name: "iPhone 17 Pro Max", desc1: "Đỉnh Cao Công Nghệ", desc2: "Màn hình 6.9 inch", btnText: "Mua iPhone 17 Pro Max", performance: 95, camera: 95, battery: 90, reasons: ["Yêu thích hệ sinh thái Apple", "Cần camera quay video", "Thích màn hình cực lớn"], img: "https://placehold.co/200x400/transparent/333?text=17+Pro+Max" },
  { name: "Galaxy S24 Ultra", desc1: "Quyền Năng AI Đột Phá", desc2: "Tích hợp bút S-Pen", btnText: "Mua Galaxy S24 Ultra", performance: 90, camera: 98, battery: 85, reasons: ["Thích tính năng Galaxy AI", "Thường xuyên ghi chú", "Chụp ảnh zoom 10x"], img: "https://placehold.co/200x400/transparent/333?text=S24+Ultra" }
];