import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

type SupabaseServer = {
  cookies: () => ReadonlyRequestCookies;
};

export const supabaseServer = ({ cookies }: SupabaseServer) =>
  createServerComponentClient<Database>({ cookies });
