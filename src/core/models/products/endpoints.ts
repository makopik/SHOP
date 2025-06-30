import { api } from "@core/services/api.ts";
import type {
  Product,
  ProductsResponse,
  ProductsQueryParams,
  ProductsByCategoryParams,
  ProductFormValue,
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
      providesTags: ["Product"],
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
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => API_URLS.PRODUCTS.BY_ID(id),
    }),

    addProduct: builder.mutation<Product, ProductFormValue>({
      query: (body) => ({
        url: API_URLS.PRODUCTS.BASE,
        method: HttpMethod.POST,
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: number; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: API_URLS.PRODUCTS.BY_ID(id),
        method: HttpMethod.PUT,
        body,
      }),
      invalidatesTags: ["Product"],
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
  useUpdateProductMutation,
  useDeleteProductMutation,
} = products;
