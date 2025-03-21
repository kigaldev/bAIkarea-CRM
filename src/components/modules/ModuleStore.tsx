import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Check,
  Bell,
  Wrench,
  Building,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useAppContext } from "../layout/AppContext";
import { useToast } from "@/components/ui/use-toast";

interface Module {
  id: string;
  name: string;
  description: string;
  price: number;
  isSubscription: boolean;
  isActive: boolean;
  icon: React.ReactNode;
  features: string[];
}

const ModuleStore: React.FC = () => {
  const { modules, activateModule, hasModuleAccess } = useAppContext();
  const { toast } = useToast();

  const modulesList: Module[] = [
    {
      id: "basic",
      name: "Funcionalidades Básicas",
      description:
        "Gestión de clientes, bicicletas, reparaciones básicas, inventario limitado y citas.",
      price: 0,
      isSubscription: false,
      isActive: true, // Always active (free)
      icon: <Zap className="h-6 w-6 text-[#FFEC5C]" />,
      features: [
        "Gestión de clientes",
        "Registro de bicicletas",
        "Reparaciones básicas",
        "Inventario limitado (10 items)",
        "Plantillas de notificación predefinidas",
      ],
    },
    {
      id: "notifications",
      name: "Notificaciones Avanzadas",
      description:
        "Notificaciones automáticas por email y WhatsApp, plantillas personalizables.",
      price: 19.99,
      isSubscription: true,
      isActive: hasModuleAccess && hasModuleAccess("notifications"),
      icon: <Bell className="h-6 w-6 text-[#FFEC5C]" />,
      features: [
        "Plantillas personalizables",
        "Automatización de notificaciones",
        "Integración con WhatsApp",
        "Programación de recordatorios",
        "Seguimiento de lectura",
      ],
    },
    {
      id: "repair-pro",
      name: "Gestión Avanzada de Reparaciones",
      description:
        "Reparaciones ilimitadas, seguimiento avanzado, programación automatizada y estimación de tiempos.",
      price: 29.99,
      isSubscription: true,
      isActive: hasModuleAccess && hasModuleAccess("repair-pro"),
      icon: <Wrench className="h-6 w-6 text-[#FFEC5C]" />,
      features: [
        "Reparaciones ilimitadas",
        "Seguimiento avanzado de estado",
        "Programación automatizada",
        "Estimación de tiempos",
        "Historial detallado",
      ],
    },
    {
      id: "inventory-pro",
      name: "Inventario Pro",
      description:
        "Inventario ilimitado, alertas de reabastecimiento, seguimiento de uso, gestión de proveedores.",
      price: 99.99,
      isSubscription: false,
      isActive: hasModuleAccess && hasModuleAccess("inventory-pro"),
      icon: <ShoppingCart className="h-6 w-6 text-[#FFEC5C]" />,
      features: [
        "Inventario ilimitado",
        "Alertas de reabastecimiento",
        "Seguimiento de uso por reparación",
        "Gestión de proveedores",
        "Informes de inventario",
      ],
    },
    {
      id: "multi-workshop",
      name: "Multi-Taller",
      description:
        "Soporte para múltiples ubicaciones, acceso basado en roles, panel centralizado.",
      price: 49.99,
      isSubscription: true,
      isActive: hasModuleAccess && hasModuleAccess("multi-workshop"),
      icon: <Building className="h-6 w-6 text-[#FFEC5C]" />,
      features: [
        "Múltiples ubicaciones",
        "Acceso basado en roles",
        "Panel centralizado",
        "Transferencia de inventario",
        "Informes por ubicación",
      ],
    },
  ];

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

  return (
    <div className="container mx-auto p-6 bg-[#101010] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Tienda de Módulos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesList.map((module) => (
          <Card
            key={module.id}
            className={`bg-[#1A1A1A] border-[#333333] overflow-hidden h-full flex flex-col ${!module.isActive && "opacity-90"}`}
          >
            <CardHeader className="pb-2 border-b border-[#333333]">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {module.icon}
                  <CardTitle className="text-lg font-bold text-white">
                    {module.name}
                  </CardTitle>
                </div>
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
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
              <p className="text-sm text-gray-400 mb-4">{module.description}</p>

              <div className="space-y-3 mb-4 flex-grow">
                <h3 className="text-sm font-medium text-white">
                  Características:
                </h3>
                <ul className="space-y-2">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-[#333333]">
                <div className="flex justify-between items-center mb-4">
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

                {module.isActive ? (
                  <Button
                    variant="outline"
                    className="w-full border-[#333333] text-white hover:bg-[#1A1A1A]"
                    disabled
                  >
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Módulo Activado
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                    onClick={() =>
                      handleActivate(module.id, module.name, module.price)
                    }
                  >
                    {module.price === 0 ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Activar Gratis
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Desbloquear Módulo
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleStore;
