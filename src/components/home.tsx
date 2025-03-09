import React from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import StatsSummary from "./dashboard/StatsSummary";
import AppointmentsOverview from "./dashboard/AppointmentsOverview";
import RepairsOverview from "./dashboard/RepairsOverview";
import InventoryAlerts from "./dashboard/InventoryAlerts";
import RecentActivity from "./dashboard/RecentActivity";

const Home: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Stats Summary */}
            <StatsSummary />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <AppointmentsOverview />
                <InventoryAlerts />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <RepairsOverview />
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
