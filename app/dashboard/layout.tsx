import { ExitIcon } from "@/assets/icons/exit-arrow";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/services/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await supabaseServer({ cookies }).auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
      <Navbar>
        <Navbar.Item>
          <Link href="/dashboard/account">{user?.email}</Link>
        </Navbar.Item>
        <form action="/auth/signout" method="POST">
          <Navbar.Item type="submit">
            Sign Out
            <ExitIcon className="ml-1 h-5 w-5" />
          </Navbar.Item>
        </form>
      </Navbar>
      <section className="body-font text-gray-600">
        <div className="px-5 py-8 md:container md:mx-auto">{children}</div>
      </section>
    </>
  );
}
