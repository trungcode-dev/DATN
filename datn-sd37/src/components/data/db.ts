// File: src/data/db.ts

// Dữ liệu sản phẩm iPhone 17 Pro Max
export const productsDB = [
  // --- CASES ---
  {
    id: 1,
    type: 'case-super-thin', // Mã loại để lọc
    typeName: 'Super Thin Case', // Tên loại hiển thị
    slug: 'super-thin-iphone-17-pro-max',
    name: 'Super Thin iPhone 17 Pro Max Case',
    price: '$35.00',
    oldPrice: '$39.00',
    image: 'https://placehold.co/400x400/222222/ffffff?text=Super+Thin', // Thay URL ảnh thật vào đây
    colors: ['#333333', '#000000', '#eeeae3', '#ffffff', '#ff9f43', '#4e5b6e', '#6f6c9d', '#eee'], // Các mã màu
    features: ['thin-design']
  },
  {
    id: 2,
    type: 'case-magnetic',
    typeName: 'Magnetic Case',
    slug: 'magnetic-iphone-17-pro-max',
    name: 'Magnetic iPhone 17 Pro Max Case',
    price: '$39.00',
    oldPrice: '$45.00',
    image: 'https://placehold.co/400x400/333333/ffffff?text=Magnetic',
    colors: ['#000', '#6f6c9d', '#eeeae3', '#4e5b6e', '#ff9f43', '#7e936f', '#333'],
    features: ['magsafe-compatible']
  },
  {
    id: 3,
    type: 'case-flex',
    typeName: 'Flex Case',
    slug: 'flex-iphone-17-pro-max',
    name: 'Flex iPhone 17 Pro Max Case',
    price: '$35.00',
    oldPrice: '$39.00',
    image: 'https://placehold.co/400x400/transparent/333?text=Flex',
    colors: ['#ffffff'],
    features: ['easy-grip']
  },
  {
    id: 4,
    type: 'case-active',
    typeName: 'Active Case',
    slug: 'active-iphone-17-pro-max',
    name: 'Active iPhone 17 Pro Max Case',
    price: '$39.00',
    oldPrice: '$45.00',
    image: 'https://placehold.co/400x400/333333/ffffff?text=Active',
    colors: ['#000', '#eeeae3', '#4e5b6e', '#ff9f43', '#7e936f', '#333', '#eeeae3', '#4e5b6e'],
    features: ['drop-tested']
  },
  {
    id: 5,
    type: 'case-repeel',
    typeName: 'RePeel Case',
    slug: 'repeel-iphone-17-pro-max',
    name: 'RePeel iPhone 17 Pro Max Case',
    price: '$39.00',
    oldPrice: '$45.00',
    image: 'https://placehold.co/400x400/333333/ffffff?text=RePeel',
    colors: ['#000'],
    features: ['recycled-material']
  },
  
  // --- SCREEN PROTECTION ---
  {
    id: 6,
    type: 'screen-glass',
    typeName: 'Glass Screen Protector',
    slug: 'glass-iphone-17-pro-max',
    name: 'iPhone 17 Pro Max Glass Screen Protector',
    price: '$29.00',
    oldPrice: '$35.00',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Glass',
    features: ['9h-hardness']
  },
  {
    id: 7,
    type: 'screen-privacy',
    typeName: 'Privacy Glass Screen Protector',
    slug: 'privacy-glass-iphone-17-pro-max',
    name: 'iPhone 17 Pro Max Privacy Glass Screen Protector',
    price: '$35.00',
    oldPrice: '$40.00',
    image: 'https://placehold.co/400x400/e6e6e6/333333?text=Privacy',
    features: ['privacy-filtering']
  }
];

// Định nghĩa dữ liệu cho Sidebar để code FilterSidebar.vue được động
export const filterData = {
  types: [
    { value: 'case-super-thin', label: 'Super Thin Case' },
    { value: 'case-magnetic', label: 'Magnetic Case' },
    { value: 'case-flex', label: 'Flex Case' },
    { value: 'screen-glass', label: 'Glass Screen Protector' },
    { value: 'screen-privacy', label: 'Privacy Glass Screen Protector' },
    { value: 'case-active', label: 'Active Case' },
    { value: 'case-repeel', label: 'RePeel Case' }
  ],
  colors: [
    { value: '#000', label: 'Black' },
    { value: '#7e936f', label: 'Green' },
    { value: '#ff9f43', label: 'Orange' },
    { value: '#4e5b6e', label: 'Blue' },
    { value: '#6f6c9d', label: 'Purple' }
  ],
  caseFeatures: [
    { value: 'drop-tested', label: 'Drop-Tested' },
    { value: 'easy-grip', label: 'Easy Grip' },
    { value: 'magsafe-compatible', label: 'MagSafe-Compatible' },
    { value: 'thin-design', label: 'Thin Design' }
  ],
  screenFeatures: [
    { value: '9h-hardness', label: '9H Hardness Rating' },
    { value: 'privacy-filtering', label: '28° Privacy Filtering' }
  ]
};