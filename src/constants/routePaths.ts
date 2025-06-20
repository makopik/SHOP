import { createRootPath } from "@utils/createRootPath.ts";
import { PATH_SEGMENTS } from "@constants/pathSegment.ts";

export const ROUTE_PATHS = {
  MAIN: "SHOP/",
  PRODUCTS: createRootPath(PATH_SEGMENTS.PRODUCTS),
  PRODUCTS_ID: `${createRootPath(PATH_SEGMENTS.PRODUCTS)}/:id`,
};
