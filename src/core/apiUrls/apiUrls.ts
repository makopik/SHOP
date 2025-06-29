export const API_URLS = {
  PRODUCTS: {
    BASE: "products",
    BY_ID: (id: number) => `products/${id}`,
    CATEGORIES: (category: string) => `products/category/${category}`,
  },
};
