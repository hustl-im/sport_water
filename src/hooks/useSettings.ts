import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase.from("settings").select("key, value");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data || []).forEach((s: { key: string; value: string | null }) => {
        if (s.value) map[s.key] = s.value;
      });
      return map;
    },
  });
}
