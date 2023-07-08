import { ExitIcon } from "@/assets/icons/exit-arrow";
import { Navbar } from "../components/Navbar";
import Link from "next/link";
import { supabaseServer } from "@/services/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
            <ExitIcon className="w-5 h-5 ml-1" />
          </Navbar.Item>
        </form>
      </Navbar>
      {children}
    </>
  );
}
