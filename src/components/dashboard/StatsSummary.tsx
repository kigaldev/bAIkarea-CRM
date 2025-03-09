import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Wrench, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title = "Stat Title",
  value = "0",
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("bg-[#1A1A1A] border-[#2A2A2A] h-full", className)}>
      <CardContent className="p-6 flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs flex items-center gap-1",
                trend.isPositive ? "text-green-500" : "text-red-500",
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
              <span className="text-gray-400 ml-1">from last week</span>
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-[#2A2A2A]">{icon}</div>
      </CardContent>
    </Card>
  );
};

interface StatsSummaryProps {
  stats?: {
    activeRepairs: number;
    todaysAppointments: number;
    lowStockItems: number;
    completedRepairs: number;
  };
  className?: string;
}

const StatsSummary = ({
  stats = {
    activeRepairs: 24,
    todaysAppointments: 8,
    lowStockItems: 12,
    completedRepairs: 37,
  },
  className,
}: StatsSummaryProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full",
        className,
      )}
    >
      <StatCard
        title="Active Repairs"
        value={stats.activeRepairs}
        icon={<Wrench className="h-6 w-6 text-[#FF6B00]" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Today's Appointments"
        value={stats.todaysAppointments}
        icon={<Calendar className="h-6 w-6 text-[#B37A1A]" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="Low Stock Items"
        value={stats.lowStockItems}
        icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        trend={{ value: 3, isPositive: false }}
      />
      <StatCard
        title="Completed This Week"
        value={stats.completedRepairs}
        icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        trend={{ value: 8, isPositive: true }}
      />
    </div>
  );
};

export default StatsSummary;
