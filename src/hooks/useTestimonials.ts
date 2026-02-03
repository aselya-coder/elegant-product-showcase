import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialsApi, Testimonial } from "@/lib/api";

export const TESTIMONIALS_QUERY_KEY = ["testimonials"];

// Hook for fetching all testimonials
export const useTestimonials = () => {
  return useQuery({
    queryKey: TESTIMONIALS_QUERY_KEY,
    queryFn: testimonialsApi.getAll,
  });
};

// Hook for fetching a single testimonial by ID
export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: [...TESTIMONIALS_QUERY_KEY, id],
    queryFn: () => testimonialsApi.getById(id),
    enabled: !!id,
  });
};

// Hook for creating a testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonial: Partial<Testimonial>) => testimonialsApi.create(testimonial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};

// Hook for updating a testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Testimonial> }) =>
      testimonialsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};

// Hook for deleting a testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_QUERY_KEY });
    },
  });
};
