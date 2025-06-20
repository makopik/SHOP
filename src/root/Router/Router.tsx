import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "@pages/ProductsPage/ProductsPage.tsx";
import { ProductPage } from "@pages/ProductPage/ProductPage.tsx";
import { ROUTE_PATHS } from "@constants/routePaths.ts";

export function Router() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.MAIN} element={<ProductsPage />} />
      <Route path={ROUTE_PATHS.PRODUCTS} element={<ProductsPage />} />
      <Route path={ROUTE_PATHS.PRODUCTS_ID} element={<ProductPage />} />
      {/*<Route path="/cart" element={<CartPage />} />*/}
    </Routes>
  );
}
