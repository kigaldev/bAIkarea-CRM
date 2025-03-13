import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const CustomerManagement = lazy(
  () => import("./components/customers/CustomerManagement"),
);
const RepairManagement = lazy(
  () => import("./components/repairs/RepairManagement"),
);
const InventoryManagement = lazy(
  () => import("./components/inventory/InventoryManagement"),
);
const AppointmentCalendar = lazy(
  () => import("./components/appointments/AppointmentCalendar"),
);
const WorkshopManagement = lazy(
  () => import("./components/workshop/WorkshopManagement"),
);
const OrderManagement = lazy(
  () => import("./components/orders/OrderManagement"),
);
const Settings = lazy(() => import("./components/settings/Settings"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-[#101010]">
          <p className="text-white">Cargando...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/repairs" element={<RepairManagement />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/appointments" element={<AppointmentCalendar />} />
          <Route path="/workshop" element={<WorkshopManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
