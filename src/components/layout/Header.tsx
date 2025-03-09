import React from "react";
import { Bell, Search, ChevronDown, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface HeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  notifications?: Array<{
    id: string;
    message: string;
    time: string;
    read: boolean;
  }>;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

const Header = ({
  title = "Dashboard",
  onSearch = () => {},
  notifications = [
    {
      id: "1",
      message: "New appointment scheduled",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      message: 'Repair #1234 status updated to "In Progress"',
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      message: "Low stock alert: Chain links (5 remaining)",
      time: "3 hours ago",
      read: true,
    },
  ],
  user = {
    name: "Alex Johnson",
    email: "alex@bikerepair.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-[#101010] border-b border-[#2A2A2A]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white mr-8">{title}</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#B37A1A] focus:ring-[#B37A1A]"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-gray-300" />
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#FF6B00]" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-[#1A1A1A] border-[#2A2A2A] text-white"
                >
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button
                      variant="link"
                      className="text-xs text-[#B37A1A] p-0 h-auto"
                    >
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex flex-col items-start py-3 cursor-pointer hover:bg-[#252525]"
                        >
                          <div className="flex items-start w-full">
                            <div
                              className={`h-2 w-2 mt-1.5 mr-2 rounded-full ${notification.read ? "bg-transparent" : "bg-[#FF6B00]"}`}
                            />
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                      <DropdownMenuItem className="justify-center text-[#B37A1A] hover:bg-[#252525] hover:text-[#B37A1A]">
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <div className="py-4 text-center text-gray-400">
                      No new notifications
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-3"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2A2A2A]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#1A1A1A] border-[#2A2A2A] text-white"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem className="hover:bg-[#252525]">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#252525]">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2A2A2A]" />
            <DropdownMenuItem className="text-red-500 hover:bg-[#252525] hover:text-red-400">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
