"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

// Dados de exemplo de vendas mensais
const data = [
  { name: "Jan", total: 2400 },
  { name: "Fev", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Abr", total: 3908 },
  { name: "Mai", total: 4800 },
  { name: "Jun", total: 3800 },
];

// Função para formatar valores em reais
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function SalesOverview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral de Vendas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 65, bottom: 25 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "hsl(var(--muted-foreground))" : "#e5e7eb"}
              />
              <XAxis 
                dataKey="name" 
                stroke={isDark ? "hsl(var(--foreground))" : "#6b7280"}
                dy={16}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke={isDark ? "hsl(var(--foreground))" : "#6b7280"}
                width={60}
                dx={-10}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Total"]}
                labelFormatter={(label) => `Mês: ${label}`}
                contentStyle={isDark ? {
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))"
                } : undefined}
                labelStyle={isDark ? {
                  color: "hsl(var(--foreground))"
                } : undefined}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}