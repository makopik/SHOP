import { createRootPath } from "@utils/createRootPath.ts";
import { pathSegment } from "@constants/pathSegment.ts";

export const ROUTE_PATHS = {
  MAIN: "SHOP/",
  PRODUCTS: createRootPath(pathSegment.PRODUCTS),
  PRODUCTS_ID: `${createRootPath(pathSegment.PRODUCTS)}/:id`,
};
