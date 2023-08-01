import { supabaseServer } from "@/services/server";
import { cookies } from "next/headers";
import { Form } from "./Form";

export const revalidate = 0;

export default async function Account() {
  const { data: track } = await supabaseServer({ cookies })
    .from("track")
    .select("*");

  const MAX_ATTEMPTS_ALLOWED = Number(
    process.env.NEXT_PUBLIC_MAX_ATTEMPTS_ALLOWED
  );

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700">
        Account information
      </h2>
      <p className="mt-5 text-sm text-red-500">
        Attempts: <strong>{track ? track[0].attempts : 0}</strong> out of{" "}
        <strong>{MAX_ATTEMPTS_ALLOWED}</strong>
      </p>
      <div className="mt-4 md:w-1/4">
        <Form />
      </div>
    </>
  );
}
