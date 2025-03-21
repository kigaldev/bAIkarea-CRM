import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Bell,
  Wrench,
  Building,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useAppContext } from "../layout/AppContext";
import { useToast } from "@/components/ui/use-toast";

const MyModules: React.FC = () => {
  const { modules, deactivateModule } = useAppContext();
  const { toast } = useToast();

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case "basic":
        return <Zap className="h-5 w-5 text-[#FFEC5C]" />;
      case "notifications":
        return <Bell className="h-5 w-5 text-[#FFEC5C]" />;
      case "repair-pro":
        return <Wrench className="h-5 w-5 text-[#FFEC5C]" />;
      case "inventory-pro":
        return <ShoppingCart className="h-5 w-5 text-[#FFEC5C]" />;
      case "multi-workshop":
        return <Building className="h-5 w-5 text-[#FFEC5C]" />;
      default:
        return <Zap className="h-5 w-5 text-[#FFEC5C]" />;
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

  // Group modules by status
  const activeModules = modules.filter((module) => module.isActive);
  const inactiveModules = modules.filter((module) => !module.isActive);

  return (
    <div className="container mx-auto p-6 bg-[#101010] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Mis Módulos</h1>

      <div className="space-y-8">
        {/* Active Modules */}
        <div>
          <h2 className="text-xl font-medium text-white mb-4 flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            Módulos Activos ({activeModules.length})
          </h2>

          {activeModules.length === 0 ? (
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardContent className="p-6 text-center text-gray-400">
                No tienes módulos activos además del módulo básico.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeModules.map((module) => (
                <Card key={module.id} className="bg-[#1A1A1A] border-[#333333]">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        {getModuleIcon(module.id)}
                        <div>
                          <h3 className="font-medium text-white">
                            {module.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-500/20 text-green-500">
                          Activo
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#333333] text-white hover:bg-[#1A1A1A]"
                          onClick={() =>
                            handleDeactivate(module.id, module.name)
                          }
                          disabled={module.id === "basic"}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Desactivar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Inactive Modules */}
        {inactiveModules.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-white mb-4 flex items-center">
              <X className="h-5 w-5 text-gray-500 mr-2" />
              Módulos Inactivos ({inactiveModules.length})
            </h2>

            <div className="space-y-4">
              {inactiveModules.map((module) => (
                <Card
                  key={module.id}
                  className="bg-[#1A1A1A] border-[#333333] opacity-70 hover:opacity-100 transition-opacity"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        {getModuleIcon(module.id)}
                        <div>
                          <h3 className="font-medium text-white">
                            {module.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gray-500/20 text-gray-400">
                          Inactivo
                        </Badge>
                        <Button
                          className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                          size="sm"
                          onClick={() =>
                            (window.location.href = "/modules/store")
                          }
                        >
                          Activar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyModules;
