import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle } from "lucide-react";
import { useAppContext } from "../layout/AppContext";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionManagement: React.FC = () => {
  const { modules, hasModuleAccess, activateModule, deactivateModule } =
    useAppContext();
  const { toast } = useToast();

  const handleActivate = (
    moduleId: string,
    moduleName: string,
    price: number,
  ) => {
    // In a real app, this would open a payment flow
    if (
      confirm(
        `¿Estás seguro de que deseas activar el módulo "${moduleName}" por ${price}€?`,
      )
    ) {
      activateModule(moduleId);
      toast({
        title: "Módulo activado",
        description: `El módulo "${moduleName}" ha sido activado correctamente.`,
      });
    }
  };

  const handleDeactivate = (moduleId: string, moduleName: string) => {
    if (moduleId === "basic") {
      toast({
        title: "No se puede desactivar",
        description: "El módulo básico no puede ser desactivado.",
        variant: "destructive",
      });
      return;
    }

    if (
      confirm(
        `¿Estás seguro de que deseas desactivar el módulo "${moduleName}"?`,
      )
    ) {
      deactivateModule(moduleId);
      toast({
        title: "Módulo desactivado",
        description: `El módulo "${moduleName}" ha sido desactivado correctamente.`,
      });
    }
  };

  return (
    <Card className="bg-[#101010] border-[#333333]">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-xl font-bold text-white">
          Gestión de Módulos y Suscripciones
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-sm text-gray-400 mb-4">
            <AlertCircle className="inline-block mr-2 h-4 w-4" />
            Activa o desactiva módulos para personalizar tu experiencia. Los
            módulos marcados como suscripción se facturarán mensualmente.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`bg-[#1A1A1A] border-[#333333] overflow-hidden ${!module.isActive && "opacity-80"}`}
              >
                <div className="p-4 border-b border-[#333333] flex justify-between items-center">
                  <h3 className="font-medium text-white">{module.name}</h3>
                  <Badge
                    className={
                      module.isActive
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gray-500/20 text-gray-400"
                    }
                  >
                    {module.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-sm text-gray-400">{module.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={`text-lg font-bold ${module.price === 0 ? "text-green-500" : "text-[#FFEC5C]"}`}
                      >
                        {module.price === 0 ? "Gratis" : `${module.price}€`}
                      </span>
                      {module.isSubscription && module.price > 0 && (
                        <span className="text-xs text-gray-400 ml-1">/mes</span>
                      )}
                    </div>
                    <Badge
                      className={
                        module.isSubscription
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-purple-500/20 text-purple-500"
                      }
                    >
                      {module.isSubscription ? "Suscripción" : "Pago único"}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 bg-[#101010] border-t border-[#333333]">
                  {module.isActive ? (
                    <Button
                      variant="outline"
                      className="w-full border-[#333333] text-white hover:bg-[#1A1A1A]"
                      onClick={() => handleDeactivate(module.id, module.name)}
                      disabled={module.id === "basic"}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Desactivar
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                      onClick={() =>
                        handleActivate(module.id, module.name, module.price)
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {module.price === 0 ? "Activar" : "Comprar"}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#101010] border-t border-[#333333] flex justify-between">
        <div className="text-sm text-gray-400">
          Contacta con soporte para opciones de facturación personalizadas.
        </div>
        <Button
          variant="outline"
          className="border-[#333333] text-white hover:bg-[#1A1A1A]"
        >
          Historial de Facturación
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionManagement;
