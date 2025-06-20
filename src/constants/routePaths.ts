import { createRootPath } from "@utils/createRootPath.ts";
import { PathSegment } from "@constants/pathSegment.ts";

export const ROUTE_PATHS = {
  MAIN: "SHOP/",
  PRODUCTS: createRootPath(PathSegment.PRODUCTS),
  PRODUCTS_ID: `${createRootPath(PathSegment.PRODUCTS)}/:id`,
};
