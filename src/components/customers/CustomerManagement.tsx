import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerImport from "./CustomerImport";
import CustomerList from "./CustomerList";
import { useToast } from "@/components/ui/use-toast";

const CustomerManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const { toast } = useToast();

  const handleImport = (data: any[]) => {
    // In a real implementation, this would call the API to import customers
    console.log("Importing customers:", data);
    toast({
      title: "Clientes importados",
      description: `${data.length} clientes han sido importados correctamente.`,
      variant: "default",
    });
  };

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="customers" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-[400px] grid-cols-2 bg-[#1A1A1A]">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Lista de Clientes
                </TabsTrigger>
                <TabsTrigger
                  value="import"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Importar Clientes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <CustomerList />
              </TabsContent>
              <TabsContent value="import" className="mt-6">
                <CustomerImport onImport={handleImport} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerManagement;
