import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, ArrowRight, MoreHorizontal } from "lucide-react";

interface Repair {
  id: string;
  customer: string;
  bikeDetails: string;
  status: "intake" | "diagnosis" | "in-progress" | "quality-check" | "ready";
  progress: number;
  estimatedCompletion: string;
}

interface RepairsOverviewProps {
  repairs?: Repair[];
  onViewDetails?: (repairId: string) => void;
  onUpdateStatus?: (repairId: string, newStatus: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "intake":
      return "bg-blue-500/20 text-blue-500";
    case "diagnosis":
      return "bg-purple-500/20 text-purple-500";
    case "in-progress":
      return "bg-amber-500/20 text-amber-500";
    case "quality-check":
      return "bg-teal-500/20 text-teal-500";
    case "ready":
      return "bg-green-500/20 text-green-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "intake":
      return "Intake";
    case "diagnosis":
      return "Diagnosis";
    case "in-progress":
      return "In Progress";
    case "quality-check":
      return "Quality Check";
    case "ready":
      return "Ready";
    default:
      return status;
  }
};

const defaultRepairs: Repair[] = [
  {
    id: "1",
    customer: "Alex Johnson",
    bikeDetails: "Trek Domane SL 5 - Brake adjustment",
    status: "in-progress",
    progress: 65,
    estimatedCompletion: "Today, 4:00 PM",
  },
  {
    id: "2",
    customer: "Maria Garcia",
    bikeDetails: "Specialized Rockhopper - Drivetrain overhaul",
    status: "diagnosis",
    progress: 30,
    estimatedCompletion: "Tomorrow, 2:00 PM",
  },
  {
    id: "3",
    customer: "David Kim",
    bikeDetails: "Canyon Endurace - Wheel truing",
    status: "quality-check",
    progress: 90,
    estimatedCompletion: "Today, 1:30 PM",
  },
  {
    id: "4",
    customer: "Sarah Williams",
    bikeDetails: "Giant Revolt - Tubeless conversion",
    status: "intake",
    progress: 10,
    estimatedCompletion: "Tomorrow, 5:00 PM",
  },
];

const RepairsOverview: React.FC<RepairsOverviewProps> = ({
  repairs = defaultRepairs,
  onViewDetails = () => {},
  onUpdateStatus = () => {},
}) => {
  return (
    <Card className="w-full h-full bg-[#101010] border-[#2A2A2A] text-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            Active Repairs
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#B37A1A] hover:text-[#B37A1A] hover:bg-[#1A1A1A]"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {repairs.map((repair) => (
            <div
              key={repair.id}
              className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-white">{repair.customer}</h3>
                  <p className="text-sm text-gray-400">{repair.bikeDetails}</p>
                </div>
                <Badge
                  className={`${getStatusColor(repair.status)} border-none`}
                >
                  {getStatusLabel(repair.status)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span>{repair.progress}%</span>
                </div>
                <Progress
                  value={repair.progress}
                  className="h-1.5 bg-[#2A2A2A]"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {repair.estimatedCompletion}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => onViewDetails(repair.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => onUpdateStatus(repair.id, repair.status)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepairsOverview;
