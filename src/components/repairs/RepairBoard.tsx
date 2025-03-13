import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock } from "lucide-react";

interface Repair {
  id: string;
  customer: {
    id: string;
    name: string;
    phone: string;
  };
  bicycle: {
    brand: string;
    model: string;
    type: string;
  };
  issueDescription: string;
  status: "pending" | "in_progress" | "completed" | "delivered" | "cancelled";
  priority: "low" | "medium" | "high";
  assignedTechnician: {
    id: string;
    name: string;
  } | null;
  estimatedCompletionDate: string;
  createdAt: string;
}

interface RepairBoardProps {
  onStatusChange: (repairId: string, newStatus: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-green-500/20 text-green-500";
    case "medium":
      return "bg-yellow-500/20 text-yellow-500";
    case "high":
      return "bg-red-500/20 text-red-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "low":
      return "Baja";
    case "medium":
      return "Media";
    case "high":
      return "Alta";
    default:
      return priority;
  }
};

const RepairBoard: React.FC<RepairBoardProps> = ({ onStatusChange }) => {
  const [repairs, setRepairs] = useState<Repair[]>([
    {
      id: "1",
      customer: {
        id: "c1",
        name: "Juan Pérez",
        phone: "612345678",
      },
      bicycle: {
        brand: "Trek",
        model: "Domane SL 5",
        type: "Carretera",
      },
      issueDescription: "Ajuste de frenos y cambio de pastillas",
      status: "in_progress",
      priority: "medium",
      assignedTechnician: {
        id: "t1",
        name: "Carlos Rodríguez",
      },
      estimatedCompletionDate: "2023-06-16",
      createdAt: "2023-06-15",
    },
    {
      id: "2",
      customer: {
        id: "c2",
        name: "María García",
        phone: "623456789",
      },
      bicycle: {
        brand: "Specialized",
        model: "Rockhopper",
        type: "Montaña",
      },
      issueDescription: "Revisión completa y cambio de cadena",
      status: "pending",
      priority: "high",
      assignedTechnician: null,
      estimatedCompletionDate: "2023-06-18",
      createdAt: "2023-06-14",
    },
    {
      id: "3",
      customer: {
        id: "c3",
        name: "Carlos Rodríguez",
        phone: "634567890",
      },
      bicycle: {
        brand: "Cannondale",
        model: "SuperSix",
        type: "Carretera",
      },
      issueDescription: "Pinchazo y cambio de cámara",
      status: "completed",
      priority: "low",
      assignedTechnician: {
        id: "t2",
        name: "Ana Martínez",
      },
      estimatedCompletionDate: "2023-06-15",
      createdAt: "2023-06-15",
    },
    {
      id: "4",
      customer: {
        id: "c4",
        name: "Laura Martínez",
        phone: "645678901",
      },
      bicycle: {
        brand: "Giant",
        model: "Revolt",
        type: "Gravel",
      },
      issueDescription: "Cambio de cubiertas y ajuste de cambios",
      status: "pending",
      priority: "medium",
      assignedTechnician: {
        id: "t1",
        name: "Carlos Rodríguez",
      },
      estimatedCompletionDate: "2023-06-17",
      createdAt: "2023-06-15",
    },
    {
      id: "5",
      customer: {
        id: "c5",
        name: "Miguel Sánchez",
        phone: "656789012",
      },
      bicycle: {
        brand: "Santa Cruz",
        model: "Hightower",
        type: "Montaña",
      },
      issueDescription: "Mantenimiento de suspensión",
      status: "delivered",
      priority: "high",
      assignedTechnician: {
        id: "t3",
        name: "Miguel Sánchez",
      },
      estimatedCompletionDate: "2023-06-14",
      createdAt: "2023-06-12",
    },
  ]);

  const handleDragStart = (e: React.DragEvent, repairId: string) => {
    e.dataTransfer.setData("repairId", repairId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const repairId = e.dataTransfer.getData("repairId");

    // Update local state
    setRepairs(
      repairs.map((repair) =>
        repair.id === repairId ? { ...repair, status: status as any } : repair,
      ),
    );

    // Call the parent handler
    onStatusChange(repairId, status);
  };

  const getRepairsByStatus = (status: string) => {
    return repairs.filter((repair) => repair.status === status);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Pending Column */}
      <div className="flex flex-col h-full">
        <div className="bg-[#1A1A1A] text-white p-3 rounded-t-md border border-[#333333] border-b-0 flex justify-between items-center">
          <h3 className="font-medium">Pendiente</h3>
          <Badge className="bg-yellow-500/20 text-yellow-500">
            {getRepairsByStatus("pending").length}
          </Badge>
        </div>
        <div
          className="flex-1 bg-[#101010] rounded-b-md border border-[#333333] p-2 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 300px)" }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pending")}
        >
          {getRepairsByStatus("pending").map((repair) => (
            <div
              key={repair.id}
              className="bg-[#1A1A1A] p-3 rounded-md mb-2 border border-[#333333] cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, repair.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={getPriorityColor(repair.priority)}>
                  {getPriorityLabel(repair.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  onClick={() => console.log(`View repair ${repair.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <h4 className="font-medium text-white mb-1">
                {repair.customer.name}
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                {repair.bicycle.brand} {repair.bicycle.model}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {repair.issueDescription}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(repair.estimatedCompletionDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {repair.assignedTechnician?.name || "Sin asignar"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div className="flex flex-col h-full">
        <div className="bg-[#1A1A1A] text-white p-3 rounded-t-md border border-[#333333] border-b-0 flex justify-between items-center">
          <h3 className="font-medium">En Progreso</h3>
          <Badge className="bg-blue-500/20 text-blue-500">
            {getRepairsByStatus("in_progress").length}
          </Badge>
        </div>
        <div
          className="flex-1 bg-[#101010] rounded-b-md border border-[#333333] p-2 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 300px)" }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "in_progress")}
        >
          {getRepairsByStatus("in_progress").map((repair) => (
            <div
              key={repair.id}
              className="bg-[#1A1A1A] p-3 rounded-md mb-2 border border-[#333333] cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, repair.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={getPriorityColor(repair.priority)}>
                  {getPriorityLabel(repair.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  onClick={() => console.log(`View repair ${repair.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <h4 className="font-medium text-white mb-1">
                {repair.customer.name}
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                {repair.bicycle.brand} {repair.bicycle.model}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {repair.issueDescription}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(repair.estimatedCompletionDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {repair.assignedTechnician?.name || "Sin asignar"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Column */}
      <div className="flex flex-col h-full">
        <div className="bg-[#1A1A1A] text-white p-3 rounded-t-md border border-[#333333] border-b-0 flex justify-between items-center">
          <h3 className="font-medium">Completada</h3>
          <Badge className="bg-green-500/20 text-green-500">
            {getRepairsByStatus("completed").length}
          </Badge>
        </div>
        <div
          className="flex-1 bg-[#101010] rounded-b-md border border-[#333333] p-2 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 300px)" }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "completed")}
        >
          {getRepairsByStatus("completed").map((repair) => (
            <div
              key={repair.id}
              className="bg-[#1A1A1A] p-3 rounded-md mb-2 border border-[#333333] cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, repair.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={getPriorityColor(repair.priority)}>
                  {getPriorityLabel(repair.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  onClick={() => console.log(`View repair ${repair.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <h4 className="font-medium text-white mb-1">
                {repair.customer.name}
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                {repair.bicycle.brand} {repair.bicycle.model}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {repair.issueDescription}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(repair.estimatedCompletionDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {repair.assignedTechnician?.name || "Sin asignar"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivered Column */}
      <div className="flex flex-col h-full">
        <div className="bg-[#1A1A1A] text-white p-3 rounded-t-md border border-[#333333] border-b-0 flex justify-between items-center">
          <h3 className="font-medium">Entregada</h3>
          <Badge className="bg-purple-500/20 text-purple-500">
            {getRepairsByStatus("delivered").length}
          </Badge>
        </div>
        <div
          className="flex-1 bg-[#101010] rounded-b-md border border-[#333333] p-2 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 300px)" }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "delivered")}
        >
          {getRepairsByStatus("delivered").map((repair) => (
            <div
              key={repair.id}
              className="bg-[#1A1A1A] p-3 rounded-md mb-2 border border-[#333333] cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, repair.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={getPriorityColor(repair.priority)}>
                  {getPriorityLabel(repair.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  onClick={() => console.log(`View repair ${repair.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <h4 className="font-medium text-white mb-1">
                {repair.customer.name}
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                {repair.bicycle.brand} {repair.bicycle.model}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {repair.issueDescription}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(repair.estimatedCompletionDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {repair.assignedTechnician?.name || "Sin asignar"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancelled Column */}
      <div className="flex flex-col h-full">
        <div className="bg-[#1A1A1A] text-white p-3 rounded-t-md border border-[#333333] border-b-0 flex justify-between items-center">
          <h3 className="font-medium">Cancelada</h3>
          <Badge className="bg-red-500/20 text-red-500">
            {getRepairsByStatus("cancelled").length}
          </Badge>
        </div>
        <div
          className="flex-1 bg-[#101010] rounded-b-md border border-[#333333] p-2 overflow-y-auto"
          style={{ minHeight: "calc(100vh - 300px)" }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "cancelled")}
        >
          {getRepairsByStatus("cancelled").map((repair) => (
            <div
              key={repair.id}
              className="bg-[#1A1A1A] p-3 rounded-md mb-2 border border-[#333333] cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, repair.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge className={getPriorityColor(repair.priority)}>
                  {getPriorityLabel(repair.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  onClick={() => console.log(`View repair ${repair.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
              <h4 className="font-medium text-white mb-1">
                {repair.customer.name}
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                {repair.bicycle.brand} {repair.bicycle.model}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {repair.issueDescription}
              </p>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(repair.estimatedCompletionDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {repair.assignedTechnician?.name || "Sin asignar"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepairBoard;
