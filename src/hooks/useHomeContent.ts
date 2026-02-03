import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { homeContentApi, HomeContent } from "@/lib/api";

export const HOME_CONTENT_QUERY_KEY = ["home_content"];

// Hook for fetching home content
export const useHomeContent = () => {
  return useQuery({
    queryKey: HOME_CONTENT_QUERY_KEY,
    queryFn: homeContentApi.get,
    retry: false,
  });
};

// Hook for saving home content
export const useSaveHomeContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: HomeContent) => homeContentApi.save(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_CONTENT_QUERY_KEY });
    },
  });
};
