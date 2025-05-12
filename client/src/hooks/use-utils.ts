import { useMemo } from 'react';
import { getBasePath } from '@/lib/utils';

export function useUtils() {
  const basePath = useMemo(() => getBasePath(), []);

  const createPath = (path: string) => {
    return `${basePath}${path.startsWith('/') ? path.slice(1) : path}`;
  };

  return {
    basePath,
    createPath,
  };
}
