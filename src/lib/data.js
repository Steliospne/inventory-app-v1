import { useQuery } from '@tanstack/react-query';
export const fetchProducts = () => {
  const result = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(
        new URL('http://localhost:3000/api/products'),
      );

      return await response.json();
    },
  });

  return result;
};
