import { api } from "@core/services/api.ts";
import { API_URLS } from "@core/apiUrls/apiUrls.ts";

export const categories = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => API_URLS.PRODUCTS.CATEGORIES,
    }),
  }),
});
