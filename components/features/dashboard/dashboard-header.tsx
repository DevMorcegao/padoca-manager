"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, ShoppingBag, Users } from "lucide-react";

// Função para formatar valores em reais
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const stats = [
  {
    title: "Receita Total",
    value: formatCurrency(45231.89),
    icon: Coins,
    description: "Receita diária de todas as vendas",
  },
  {
    title: "Pedidos",
    value: "156",
    icon: ShoppingBag,
    description: "Total de pedidos de hoje",
  },
  {
    title: "Usuários Ativos",
    value: "2.345",
    icon: Users,
    description: "Usuários registrados este mês",
  },
];

export function DashboardHeader() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}