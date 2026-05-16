import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthCtx = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('authToken') : null;
    if (!token) {
      setLoading(false);
      return;
    }

    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const result = await api.get<User>("/users/me");
      const profile = result.data;
      setUser(profile);
      setIsAdmin(profile.role === "ADMIN" || profile.role === "SUPERADMIN");
    } catch (error) {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('authToken');
      }
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  const value: AuthCtx = {
    user,
    isAdmin,
    loading,
    async signIn(email, password) {
      try {
        const result = await api.post<{ id: string; name: string; email: string; role: string; accessToken: string }>("/auth/login", {
          email,
          password,
        });
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('authToken', result.data.accessToken);
        }
        const profile = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          role: result.data.role,
        };
        setUser(profile);
        setIsAdmin(profile.role === "ADMIN" || profile.role === "SUPERADMIN");
        return { error: null };
      } catch (error: any) {
        return { error: error?.message ?? "Login failed" };
      }
    },
    async signUp(email, password, fullName) {
      try {
        const [firstName, ...rest] = (fullName ?? "").trim().split(" ");
        const lastName = rest.join(" ");
        await api.post("/users/register", {
          email,
          password,
          firstName: firstName || "",
          lastName: lastName || "",
        });
        return { error: null };
      } catch (error: any) {
        return { error: error?.message ?? "Registration failed" };
      }
    },
    async signOut() {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('authToken');
      }
      setUser(null);
      setIsAdmin(false);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
