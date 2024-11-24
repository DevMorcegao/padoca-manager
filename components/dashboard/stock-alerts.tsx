import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Alertas de estoque
const alerts = [
  {
    title: "Estoque Baixo",
    description: "Estoque de farinha está baixo (2kg restantes)",
  },
  {
    title: "Próximo ao Vencimento",
    description: "5 pães franceses vencem amanhã",
  },
  {
    title: "Sem Estoque",
    description: "Gotas de chocolate em falta no estoque",
  },
];

export function StockAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Estoque</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <Alert key={index} variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>
              {alert.description}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}