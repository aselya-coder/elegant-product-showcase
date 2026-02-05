import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, Product } from "@/lib/api";

export const PRODUCTS_QUERY_KEY = ["products"];

// Hook for fetching all products
export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: productsApi.getAll,
  });
};

// Hook for fetching a single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

// Hook for fetching a product by slug
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, "slug", slug],
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

// Hook for fetching products by category
export const useProductsByCategory = (category: string, limit: number = 4, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, "category", category, limit],
    queryFn: () => productsApi.getByCategory(category, limit),
    enabled: enabled && !!category,
  });
};

// Hook for creating a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Partial<Product>) => productsApi.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

// Hook for updating a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      productsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};
