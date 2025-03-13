import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import InventoryList from "./InventoryList";
import InventoryAlerts from "../dashboard/InventoryAlerts";

const InventoryManagement: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="inventory" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InventoryList />
              </div>
              <div>
                <InventoryAlerts />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagement;
