export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
}
export type ProductsResponse = Product[];

export interface ProductsQueryParams {
  limit?: number;
  sort?: "asc" | "desc";
  category?: string;
}
export interface ProductsByCategoryParams
  extends Omit<ProductsQueryParams, "category"> {
  category: string;
}
