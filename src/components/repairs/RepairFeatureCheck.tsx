import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useAppContext } from "../layout/AppContext";

interface RepairFeatureCheckProps {
  children: React.ReactNode;
}

const RepairFeatureCheck: React.FC<RepairFeatureCheckProps> = ({
  children,
}) => {
  const { hasModuleAccess } = useAppContext();
  const hasRepairProAccess = hasModuleAccess("repair-pro");

  if (hasRepairProAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="bg-[#101010] border-[#333333] h-full">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
        <Lock className="h-12 w-12 text-[#FFEC5C] mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">
          Funcionalidad Premium
        </h3>
        <p className="text-gray-400 max-w-md mb-6">
          Esta vista avanzada de reparaciones está disponible en el módulo
          "Gestión Avanzada de Reparaciones".
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Incluye seguimiento avanzado de estado, programación automatizada y
          estimación de tiempos.
        </p>
        <Button
          className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
          onClick={() => {
            window.location.href = "/settings?tab=subscriptions";
          }}
        >
          Ver Opciones de Suscripción
        </Button>
      </CardContent>
    </Card>
  );
};

export default RepairFeatureCheck;
