import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseClient = createClientComponentClient<Database>();
