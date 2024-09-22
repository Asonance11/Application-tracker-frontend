"use client";

import { ReactNode, useEffect, useState } from "react";
import { getUser } from "@/services/auth";
import { useUser } from "@/store/use-auth-store";
import { FullPageLoader } from "../common/Loaders";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { updateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await getUser();
        if (user) {
          updateUser(user);
          router.push("/dashboard");
        } else {
          router.push("login");
        }
      } catch (error) {
        console.error("[AUTH_PROVIDER]", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [updateUser]);

  if (loading) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
