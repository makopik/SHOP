import { createPath } from './createPath';

export const createRootPath = (...pathSegments: string[]) =>
  `/${createPath(...pathSegments)}`;
