import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import CustomerOrders from "./CustomerOrders";
import { useToast } from "@/components/ui/use-toast";

const OrderManagement: React.FC = () => {
  const { toast } = useToast();

  const handleAddOrder = (order: any) => {
    // In a real implementation, this would call the API to add an order
    console.log("Adding order:", order);
    toast({
      title: "Pedido añadido",
      description: `El pedido para ${order.customer.name} ha sido añadido correctamente.`,
    });
  };

  const handleUpdateOrder = (id: string, updates: any) => {
    // In a real implementation, this would call the API to update an order
    console.log(`Updating order ${id}:`, updates);
    toast({
      title: "Pedido actualizado",
      description: `El pedido ha sido actualizado correctamente.`,
    });
  };

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="orders" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <CustomerOrders
              onAddOrder={handleAddOrder}
              onUpdateOrder={handleUpdateOrder}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
