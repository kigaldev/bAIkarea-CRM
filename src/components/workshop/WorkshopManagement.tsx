import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkshopOperations from "./WorkshopOperations";
import WorkshopEntry from "./WorkshopEntry";
import { useToast } from "@/components/ui/use-toast";

const WorkshopManagement: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("operations");
  const { toast } = useToast();

  const handleAddOperation = (operation: any) => {
    // In a real implementation, this would call the API to add an operation
    console.log("Adding operation:", operation);
    toast({
      title: "Operación añadida",
      description: `${operation.name} ha sido añadida correctamente.`,
    });
  };

  const handleEditOperation = (id: string, operation: any) => {
    // In a real implementation, this would call the API to update an operation
    console.log(`Updating operation ${id}:`, operation);
    toast({
      title: "Operación actualizada",
      description: `${operation.name} ha sido actualizada correctamente.`,
    });
  };

  const handleDeleteOperation = (id: string) => {
    // In a real implementation, this would call the API to delete an operation
    console.log(`Deleting operation ${id}`);
    toast({
      title: "Operación eliminada",
      description: `La operación ha sido eliminada correctamente.`,
    });
  };

  const handleWorkshopEntry = (data: any) => {
    // In a real implementation, this would call the API to create a repair order
    console.log("Creating repair order:", data);
    toast({
      title: "Entrada creada",
      description: `La entrada de taller ha sido creada correctamente.`,
    });
  };

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Workshop" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-[400px] grid-cols-2 bg-[#1A1A1A]">
                <TabsTrigger
                  value="operations"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Operaciones de Taller
                </TabsTrigger>
                <TabsTrigger
                  value="entry"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Nueva Entrada
                </TabsTrigger>
              </TabsList>
              <TabsContent value="operations" className="mt-6">
                <WorkshopOperations
                  onAddOperation={handleAddOperation}
                  onEditOperation={handleEditOperation}
                  onDeleteOperation={handleDeleteOperation}
                />
              </TabsContent>
              <TabsContent value="entry" className="mt-6">
                <WorkshopEntry onSubmit={handleWorkshopEntry} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkshopManagement;
