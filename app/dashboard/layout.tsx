"use client";
import { supabaseClient } from "@/services/supabase";
import { ExitIcon } from "@/assets/icons/exit-arrow";
import { Navbar } from "../components/Navbar";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/store/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useUser();
  const getUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return (window.location.href = "/signin");
    }

    setUser({ email: user.email || "", id: user.id || "" });
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <Navbar>
        <Navbar.Item>
          <Link href="/dashboard/account">{user?.email}</Link>
        </Navbar.Item>
        <form action="/auth/signout" method="POST">
          <Navbar.Item type="submit">
            Sign Out
            <ExitIcon />
          </Navbar.Item>
        </form>
      </Navbar>
      {children}
    </>
  );
}
