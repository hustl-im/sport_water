import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { FaqItem } from "@/types";

export function useFaq() {
  return useQuery({
    queryKey: ["faq"],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}
