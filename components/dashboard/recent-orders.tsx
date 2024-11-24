import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Função para formatar valores em reais
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Dados de exemplo de pedidos recentes
const orders = [
  {
    id: "1",
    customer: "João Silva",
    status: "Concluído",
    product: "Pão Francês",
    total: 12.99,
  },
  {
    id: "2",
    customer: "Maria Santos",
    status: "Em Processo",
    product: "Croissants (6)",
    total: 18.50,
  },
  {
    id: "3",
    customer: "Pedro Oliveira",
    status: "Pendente",
    product: "Bolo de Aniversário",
    total: 45.00,
  },
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}