"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/providers/auth/auth-provider";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Registrar usando a API REST do Firebase
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            displayName: name,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Erro ao criar conta");
      }

      // Atualizar o perfil do usuário com o nome
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: data.idToken,
            displayName: name,
            returnSecureToken: true,
          }),
        }
      );

      router.push("/login");
    } catch (error: any) {
      console.error("Erro no registro:", error);
      setError(
        error.message === "EMAIL_EXISTS"
          ? "Este email já está em uso"
          : "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Icons.logo className="h-12 w-12" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Criar conta
        </CardTitle>
        <CardDescription className="text-center">
          Preencha os dados abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="Seu nome"
              required
              autoComplete="name"
              autoFocus
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="new-password"
              className="w-full"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-center w-full">
          Já tem uma conta?{" "}
          <a
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Faça login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
