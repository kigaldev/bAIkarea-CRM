import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  Package,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  // Navigation items
  const navItems = [
    { icon: <LayoutDashboard size={24} />, label: "Dashboard", path: "/" },
    {
      icon: <Calendar size={24} />,
      label: "Appointments",
      path: "/appointments",
    },
    { icon: <Wrench size={24} />, label: "Repairs", path: "/repairs" },
    { icon: <Package size={24} />, label: "Inventory", path: "/inventory" },
    { icon: <Users size={24} />, label: "Customers", path: "/customers" },
  ];

  // Bottom navigation items
  const bottomNavItems = [
    { icon: <Settings size={24} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={24} />, label: "Help", path: "/help" },
    { icon: <LogOut size={24} />, label: "Logout", path: "/logout" },
  ];

  return (
    <aside className="h-full w-[280px] bg-[#101010] flex flex-col justify-between border-r border-[#2A2A2A] text-white">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#B37A1A] flex items-center justify-center">
            <Wrench size={20} className="text-white" />
          </div>
          {!collapsed && <h1 className="text-xl font-bold">BikeFixPro</h1>}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A1A1A] transition-colors"
                    >
                      <span className="text-[#B37A1A]">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="px-4 pb-6">
        {/* Bottom Navigation */}
        <ul className="space-y-2 mb-6">
          {bottomNavItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A1A1A] transition-colors"
                    >
                      <span className="text-[#B37A1A]">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1A1A1A] transition-colors cursor-pointer">
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=mechanic"
              alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-400">Master Technician</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
