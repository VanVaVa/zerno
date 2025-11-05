"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { useEffect } from "react";
// import { LoadingScreen } from "@/shared/ui/loading-screen";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push("/admin/login");
      } else if (!requireAuth && user) {
        router.push("/admin");
      }
    }
  }, [user, loading, requireAuth, router]);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // if (requireAuth && !user) {
  //   return <LoadingScreen message="Перенаправление..." />;
  // }

  // if (!requireAuth && user) {
  //   return <LoadingScreen message="Перенаправление..." />;
  // }

  return <>{children}</>;
}
