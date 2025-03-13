import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepairList from "./RepairList";
import RepairBoard from "./RepairBoard";
import { useToast } from "@/components/ui/use-toast";

const RepairManagement: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("list");
  const { toast } = useToast();

  const handleStatusChange = (repairId: string, newStatus: string) => {
    // In a real implementation, this would call the API to update the repair status
    console.log(`Updating repair ${repairId} status to ${newStatus}`);
    toast({
      title: "Estado actualizado",
      description: `La reparación ha sido actualizada a "${newStatus}".`,
    });
  };

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="repairs" />
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
                  Lista de Reparaciones
                </TabsTrigger>
                <TabsTrigger
                  value="board"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Tablero de Reparaciones
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <RepairList onStatusChange={handleStatusChange} />
              </TabsContent>
              <TabsContent value="board" className="mt-6">
                <RepairBoard onStatusChange={handleStatusChange} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepairManagement;
