"use client";
import { supabaseClient } from "@/services/supabase";
import { ExitIcon } from "@/assets/icons/exit-arrow";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ id?: string; email?: string }>({});
  const getUser = async () => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (!session || !session.user) {
      return setUser({});
    }

    setUser(session.user);
  };

  useEffect(() => {
    getUser();
  });

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
