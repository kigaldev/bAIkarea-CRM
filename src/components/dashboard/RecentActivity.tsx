import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  Wrench,
  Package,
  Calendar,
  Bell,
} from "lucide-react";

type ActivityItem = {
  id: string;
  type: "status_change" | "new_appointment" | "inventory_update";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
};

type RecentActivityProps = {
  activities?: ActivityItem[];
};

const RecentActivity = ({
  activities = defaultActivities,
}: RecentActivityProps) => {
  return (
    <Card className="w-full h-full bg-[#101010] border-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#B37A1A]" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded-full bg-gray-800">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-white">{activity.title}</h4>
                  <span className="text-xs text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "status_change",
    title: "Repair Status Updated",
    description:
      'Trek Domane SL 5 moved from "In Progress" to "Ready for Pickup"',
    timestamp: "10 min ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "2",
    type: "new_appointment",
    title: "New Appointment Scheduled",
    description: "John Smith booked a tune-up service for tomorrow at 2:00 PM",
    timestamp: "25 min ago",
    icon: <Calendar className="h-4 w-4 text-[#FF6B00]" />,
  },
  {
    id: "3",
    type: "inventory_update",
    title: "Low Stock Alert",
    description: "Shimano brake pads (3 items remaining) below threshold",
    timestamp: "1 hour ago",
    icon: <Bell className="h-4 w-4 text-yellow-500" />,
  },
  {
    id: "4",
    type: "status_change",
    title: "Repair Started",
    description: "Specialized Rockhopper repair has been started by Mike",
    timestamp: "2 hours ago",
    icon: <Wrench className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "5",
    type: "inventory_update",
    title: "Parts Received",
    description:
      "New shipment of Continental tires has been added to inventory",
    timestamp: "3 hours ago",
    icon: <Package className="h-4 w-4 text-purple-500" />,
  },
];

export default RecentActivity;
