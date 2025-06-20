import { api } from "@core/services/api.ts";
import type {
  Product,
  ProductsResponse,
  ProductsQueryParams,
  ProductsByCategoryParams,
} from "./products.interface.ts";
import { HttpMethod } from "@core/enum/httpMetod.ts";
import { API_URLS } from "@core/apiUrls/apiUrls.ts";

export const products = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit, sort, category }) => ({
        url: API_URLS.PRODUCTS.BASE,
        params: {
          limit,
          sort,
          ...(category && { category }),
        },
      }),
    }),

    getProductsByCategory: builder.query<
      ProductsResponse,
      ProductsByCategoryParams
    >({
      query: ({ sort, limit, category }) => ({
        url: API_URLS.PRODUCTS.CATEGORIES(category!),
        params: {
          sort,
          limit,
        },
      }),
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => API_URLS.PRODUCTS.BY_ID(id),
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: API_URLS.PRODUCTS.BASE,
        method: HttpMethod.POST,
        body,
      }),
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: API_URLS.PRODUCTS.BY_ID(id),
        method: HttpMethod.DELETE,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = products;
