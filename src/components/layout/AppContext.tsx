import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, getLanguage, setLanguage } from "@/lib/i18n";

interface Module {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface AppContextType {
  language: Language;
  setAppLanguage: (lang: Language) => void;
  primaryColor: string;
  accentColor: string;
  hasModuleAccess: (moduleId: string) => boolean;
  modules: Module[];
  activateModule: (moduleId: string) => void;
  deactivateModule: (moduleId: string) => void;
}

// Mock modules data
const initialModules: Module[] = [
  {
    id: "basic",
    name: "Funcionalidades Básicas",
    description:
      "Gestión de clientes, bicicletas, reparaciones básicas, inventario limitado y citas.",
    isActive: true, // Always active (free)
  },
  {
    id: "notifications",
    name: "Notificaciones Avanzadas",
    description:
      "Notificaciones automáticas por email y WhatsApp, plantillas personalizables.",
    isActive: false,
  },
  {
    id: "repair-pro",
    name: "Gestión Avanzada de Reparaciones",
    description:
      "Reparaciones ilimitadas, seguimiento avanzado, programación automatizada y estimación de tiempos.",
    isActive: false,
  },
  {
    id: "inventory-pro",
    name: "Inventario Pro",
    description:
      "Inventario ilimitado, alertas de reabastecimiento, seguimiento de uso, gestión de proveedores.",
    isActive: false,
  },
  {
    id: "multi-workshop",
    name: "Multi-Taller",
    description:
      "Soporte para múltiples ubicaciones, acceso basado en roles, panel centralizado.",
    isActive: false,
  },
];

const AppContext = createContext<AppContextType>({
  language: "en",
  setAppLanguage: () => {},
  primaryColor: "#FFEC5C", // New yellow gold color
  accentColor: "#FFEC5C",
  hasModuleAccess: () => false,
  modules: initialModules,
  activateModule: () => {},
  deactivateModule: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(getLanguage());
  const [primaryColor] = useState("#FFEC5C"); // Changed from #FF6B00 to #FFEC5C
  const [accentColor] = useState("#FFEC5C");
  const [modules, setModules] = useState<Module[]>(initialModules);

  const setAppLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageState(lang);
  };

  // Function to check if a module is active
  const hasModuleAccess = (moduleId: string) => {
    if (moduleId === "basic") return true; // Basic module is always active
    return modules.some((module) => module.id === moduleId && module.isActive);
  };

  // Function to activate a module
  const activateModule = (moduleId: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, isActive: true } : module,
      ),
    );
  };

  // Function to deactivate a module
  const deactivateModule = (moduleId: string) => {
    if (moduleId === "basic") return; // Cannot deactivate basic module
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, isActive: false } : module,
      ),
    );
  };

  // Apply CSS variables for theming
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);
  }, [primaryColor, accentColor]);

  return (
    <AppContext.Provider
      value={{
        language,
        setAppLanguage,
        primaryColor,
        accentColor,
        hasModuleAccess,
        modules,
        activateModule,
        deactivateModule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
