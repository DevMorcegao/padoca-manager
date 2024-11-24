"use client";

import { useAuth } from "@/providers/auth/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function UserProfile() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  // Pega as iniciais do email para o avatar
  const initials = user.email
    .split("@")[0]
    .split(".")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {open && (
        <>
          <style jsx global>{`
            main, nav {
              filter: blur(4px) brightness(0.8);
              transition: all 0.2s ease;
            }
            .navigation-menu * {
              text-shadow: none !important;
              box-shadow: none !important;
            }
            .user-profile-dropdown {
              filter: none !important;
              opacity: 1 !important;
            }
          `}</style>
          <div 
            className="fixed inset-0" 
            style={{ 
              backgroundColor: 'rgba(var(--background), 0.7)',
              backdropFilter: 'blur(2px)',
            }} 
          />
        </>
      )}
      <div className="relative z-50 user-profile-dropdown">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.isAdmin ? "Administrador" : "Usuário"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
