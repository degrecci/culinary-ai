import { Database } from "@/lib/supabase";

export type Recipe = Omit<
  Database["public"]["Tables"]["recipes"]["Row"],
  "user_id"
>;
