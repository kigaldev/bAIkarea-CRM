import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  customerName: string;
  serviceType: string;
  bikeDetails: string;
  technicianName: string;
  status: "scheduled" | "arrived" | "in-progress" | "completed";
}

interface AppointmentsOverviewProps {
  appointments?: Appointment[];
  title?: string;
  onViewDetails?: (id: string) => void;
  onMarkAsArrived?: (id: string) => void;
}

const AppointmentsOverview = ({
  appointments = [
    {
      id: "1",
      time: "9:00 AM",
      customerName: "John Smith",
      serviceType: "Tune-Up",
      bikeDetails: "Trek Domane SL 5",
      technicianName: "Mike Johnson",
      status: "scheduled",
    },
    {
      id: "2",
      time: "10:30 AM",
      customerName: "Sarah Williams",
      serviceType: "Brake Adjustment",
      bikeDetails: "Specialized Rockhopper",
      technicianName: "Lisa Chen",
      status: "arrived",
    },
    {
      id: "3",
      time: "1:15 PM",
      customerName: "David Miller",
      serviceType: "Wheel Truing",
      bikeDetails: "Cannondale SuperSix",
      technicianName: "Mike Johnson",
      status: "scheduled",
    },
    {
      id: "4",
      time: "3:00 PM",
      customerName: "Emma Davis",
      serviceType: "Drivetrain Service",
      bikeDetails: "Giant Revolt",
      technicianName: "Lisa Chen",
      status: "scheduled",
    },
    {
      id: "5",
      time: "4:30 PM",
      customerName: "Michael Brown",
      serviceType: "Suspension Service",
      bikeDetails: "Santa Cruz Hightower",
      technicianName: "James Wilson",
      status: "scheduled",
    },
  ],
  title = "Today's Appointments",
  onViewDetails = (id) => console.log(`View details for appointment ${id}`),
  onMarkAsArrived = (id) => console.log(`Mark appointment ${id} as arrived`),
}: AppointmentsOverviewProps) => {
  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto max-h-[calc(100%-110px)]">
        <div className="divide-y divide-[#333333]">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="text-[#B37A1A] font-medium mr-3">
                    {appointment.time}
                  </div>
                  <div className="text-white font-medium">
                    {appointment.customerName}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#B37A1A] hover:text-[#FF6B00] hover:bg-[#1a1a1a]"
                    onClick={() => onViewDetails(appointment.id)}
                  >
                    <Eye size={16} className="mr-1" />
                    Details
                  </Button>
                  {appointment.status === "scheduled" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FF6B00] hover:bg-[#1a1a1a]"
                      onClick={() => onMarkAsArrived(appointment.id)}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Arrived
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-[#777777]">Service</div>
                  <div className="text-white">{appointment.serviceType}</div>
                </div>
                <div>
                  <div className="text-[#777777]">Bike</div>
                  <div className="text-white">{appointment.bikeDetails}</div>
                </div>
                <div>
                  <div className="text-[#777777]">Technician</div>
                  <div className="text-white">{appointment.technicianName}</div>
                </div>
              </div>
              {appointment.status === "arrived" && (
                <div className="mt-2 inline-block px-2 py-1 rounded-full text-xs bg-[#1a3a1a] text-[#4CAF50]">
                  Customer Arrived
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#333333] p-4">
        <Button
          className="w-full bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
          onClick={() => console.log("Create new appointment")}
        >
          Create New Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsOverview;
