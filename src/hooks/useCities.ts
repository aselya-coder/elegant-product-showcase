import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { citiesApi, City } from "@/lib/api";

export const CITIES_QUERY_KEY = ["cities"];

// Hook for fetching all cities
export const useCities = () => {
  return useQuery({
    queryKey: CITIES_QUERY_KEY,
    queryFn: citiesApi.getAll,
    retry: false,
  });
};

// Hook for saving cities
export const useSaveCities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cities: City[]) => citiesApi.save(cities),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CITIES_QUERY_KEY });
    },
  });
};
