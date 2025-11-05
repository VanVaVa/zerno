"use client";

import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { AdminHeader } from "@/features/auth/ui/admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard>
      <AdminHeader />
      {children}
    </AuthGuard>
  );
}
