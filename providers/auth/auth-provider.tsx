"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  email: string;
  uid: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

const publicRoutes = ["/login"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Função para verificar o token
  const checkToken = async () => {
    const token = Cookies.get("session");
    
    if (!token) {
      setUser(null);
      setLoading(false);
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: token }),
        }
      );
      
      const data = await response.json();
      
      if (data.users && data.users[0]) {
        setUser({
          email: data.users[0].email,
          uid: data.users[0].localId,
          isAdmin: data.users[0].email === "admin@padoca.com" // Temporariamente usando email como verificação
        });
        if (publicRoutes.includes(pathname)) {
          router.push("/dashboard");
        }
      } else {
        setUser(null);
        Cookies.remove("session");
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      }
    } catch (error) {
      setUser(null);
      Cookies.remove("session");
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verificar token ao carregar e quando o pathname mudar
  useEffect(() => {
    checkToken();
  }, [pathname]);

  // Listener para mudanças nos cookies
  useEffect(() => {
    const handleStorageChange = () => {
      const token = Cookies.get("session");
      if (!token && !publicRoutes.includes(pathname)) {
        setUser(null);
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.cookie = document.cookie; // Hack para detectar mudanças nos cookies

    const cookieCheckInterval = setInterval(() => {
      const token = Cookies.get("session");
      if (!token && !publicRoutes.includes(pathname)) {
        setUser(null);
        router.push("/login");
      }
    }, 1000); // Verifica a cada segundo

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(cookieCheckInterval);
    };
  }, [pathname]);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Erro ao fazer login");
    }

    Cookies.set("session", data.idToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    setUser({
      email: data.email,
      uid: data.localId,
      isAdmin: data.email === "admin@padoca.com" // Temporariamente usando email como verificação
    });
  };

  const logout = async () => {
    Cookies.remove("session");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
