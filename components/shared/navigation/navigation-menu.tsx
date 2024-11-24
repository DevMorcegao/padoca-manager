"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Rotas de navegação do sistema
const routes = [
  {
    href: "/dashboard",
    label: "Painel",
  },
  {
    href: "/products",
    label: "Produtos",
  },
  {
    href: "/orders",
    label: "Pedidos",
  },
  {
    href: "/stock",
    label: "Estoque",
  },
  {
    href: "/users",
    label: "Usuários",
  },
];

export function NavigationMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navigation-menu flex items-center">
      <div className="hidden md:flex items-center gap-6">
        <Link href="/dashboard" className="text-xl font-bold">
          Padoca Manager
        </Link>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {route.label}
          </Link>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-4">
            <Link href="/dashboard" className="text-xl font-bold">
              Padoca Manager
            </Link>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}