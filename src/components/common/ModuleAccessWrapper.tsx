import React from "react";
import { useAppContext } from "../layout/AppContext";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ModuleAccessWrapperProps {
  moduleId: string;
  children: React.ReactNode;
  fallbackMessage?: string;
}

const ModuleAccessWrapper: React.FC<ModuleAccessWrapperProps> = ({
  moduleId,
  children,
  fallbackMessage = "Esta funcionalidad requiere un módulo premium",
}) => {
  const { hasModuleAccess } = useAppContext();
  const hasAccess = hasModuleAccess(moduleId);

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#1A1A1A] border border-[#333333] rounded-md text-center">
      <Lock className="h-12 w-12 text-[#FFEC5C] mb-4" />
      <h3 className="text-xl font-medium text-white mb-2">
        Funcionalidad Premium
      </h3>
      <p className="text-gray-400 max-w-md mb-6">{fallbackMessage}</p>
      <Button
        className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
        onClick={() => {
          // Navigate to subscription page
          window.location.href = "/modules/store";
        }}
      >
        Ver Opciones de Suscripción
      </Button>
    </div>
  );
};

export default ModuleAccessWrapper;
