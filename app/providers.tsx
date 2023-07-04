"use client";

import { UserProvider } from "@/store/user";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
