import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/types";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}
