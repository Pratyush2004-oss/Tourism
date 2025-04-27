"use client";
import { useAuthStore } from "@/store/auth.store";
import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { checkAuth, user } = useAuthStore();
  useEffect(() => {
    if (!user) checkAuth();
  }, [user]);

  // redirecting login and signup path if user is already authenticated
  const pathname = usePathname();
  const router = useRouter();
  const isLoginOrSignupPath = pathname === "/login" || pathname === "/signup";
  useEffect(() => {
    if (user && user.isVerified && isLoginOrSignupPath) {
      router.push("/");
    }
    else if(user && !user.isVerified && isLoginOrSignupPath) {
      
    }
  }, [user, isLoginOrSignupPath, router]);

  return <>{children}</>;
}

export default RedirectIfAuthenticated;
