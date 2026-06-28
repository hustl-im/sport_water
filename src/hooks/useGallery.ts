import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { GalleryItem } from "@/types";

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async (): Promise<GalleryItem[]> => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}
