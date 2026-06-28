import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("size_ml", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
