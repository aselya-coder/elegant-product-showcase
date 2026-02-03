import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { navigationApi, MenuItem } from "@/lib/api";

export const NAVIGATION_QUERY_KEY = ["navigation"];

export const defaultNavigation: MenuItem[] = [
  { id: "1", name: "Beranda", href: "/", order: 1, visible: true },
  { id: "2", name: "Tentang Kami", href: "/tentang-kami", order: 2, visible: true },
  { id: "3", name: "Katalog", href: "/katalog", order: 3, visible: true },
  { id: "4", name: "Testimoni", href: "/testimoni", order: 4, visible: true },
  { id: "5", name: "Kontak", href: "/kontak", order: 5, visible: true },
];

export const useNavigation = () => {
  return useQuery({
    queryKey: NAVIGATION_QUERY_KEY,
    queryFn: async () => {
      const data = await navigationApi.get();
      return data || defaultNavigation;
    },
    // Don't retry if it fails (will use default if get returns null)
    retry: false, 
  });
};

export const useSaveNavigation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: MenuItem[]) => navigationApi.save(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NAVIGATION_QUERY_KEY });
    },
  });
};
