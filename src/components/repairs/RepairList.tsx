import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, AlertCircle } from "lucide-react";
import { t } from "@/lib/i18n";

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

interface RepairListProps {
  onStatusChange: (repairId: string, newStatus: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-500";
    case "in_progress":
      return "bg-blue-500/20 text-blue-500";
    case "completed":
      return "bg-green-500/20 text-green-500";
    case "delivered":
      return "bg-purple-500/20 text-purple-500";
    case "cancelled":
      return "bg-red-500/20 text-red-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "in_progress":
      return "En Progreso";
    case "completed":
      return "Completada";
    case "delivered":
      return "Entregada";
    case "cancelled":
      return "Cancelada";
    default:
      return status;
  }
};

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

const RepairList: React.FC<RepairListProps> = ({ onStatusChange }) => {
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
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (repairId: string, newStatus: string) => {
    // Update local state
    setRepairs(
      repairs.map((repair) =>
        repair.id === repairId
          ? { ...repair, status: newStatus as any }
          : repair,
      ),
    );

    // Call the parent handler
    onStatusChange(repairId, newStatus);
  };

  const filteredRepairs = repairs.filter((repair) => {
    // Apply search filter
    const searchMatch =
      repair.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.bicycle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.bicycle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.issueDescription.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const statusMatch = statusFilter ? repair.status === statusFilter : true;

    // Apply priority filter
    const priorityMatch = priorityFilter
      ? repair.priority === priorityFilter
      : true;

    return searchMatch && statusMatch && priorityMatch;
  });

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {t("repairs")}
          </CardTitle>
          <Button
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
            onClick={() => console.log("Create new repair")}
          >
            Nueva Reparación
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("search")}
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-[#1A1A1A] border-[#333333] text-white"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#1A1A1A] border-[#333333] text-white">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                <SelectItem value="">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completada</SelectItem>
                <SelectItem value="delivered">Entregada</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px] bg-[#1A1A1A] border-[#333333] text-white">
                <SelectValue placeholder="Filtrar por prioridad" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                <SelectItem value="">Todas las prioridades</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border border-[#333333] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#333333] hover:bg-transparent">
                <TableHead className="text-[#777777]">
                  {t("customer")}
                </TableHead>
                <TableHead className="text-[#777777]">{t("bike")}</TableHead>
                <TableHead className="text-[#777777]">Descripción</TableHead>
                <TableHead className="text-[#777777]">Estado</TableHead>
                <TableHead className="text-[#777777]">Prioridad</TableHead>
                <TableHead className="text-[#777777]">Técnico</TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-400"
                  >
                    No se encontraron reparaciones
                  </TableCell>
                </TableRow>
              ) : (
                filteredRepairs.map((repair) => (
                  <TableRow
                    key={repair.id}
                    className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                  >
                    <TableCell>
                      <div className="font-medium text-white">
                        {repair.customer.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {repair.customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-white">
                        {repair.bicycle.brand} {repair.bicycle.model}
                      </div>
                      <div className="text-sm text-gray-400">
                        {repair.bicycle.type}
                      </div>
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={repair.issueDescription}
                    >
                      {repair.issueDescription}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={repair.status}
                        onValueChange={(value) =>
                          handleStatusChange(repair.id, value)
                        }
                      >
                        <SelectTrigger className="h-8 w-[130px] bg-transparent border-none">
                          <Badge className={getStatusColor(repair.status)}>
                            {getStatusLabel(repair.status)}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="in_progress">
                            En Progreso
                          </SelectItem>
                          <SelectItem value="completed">Completada</SelectItem>
                          <SelectItem value="delivered">Entregada</SelectItem>
                          <SelectItem value="cancelled">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(repair.priority)}>
                        {getPriorityLabel(repair.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {repair.assignedTechnician ? (
                        <span className="text-white">
                          {repair.assignedTechnician.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Sin asignar
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                        onClick={() => console.log(`View repair ${repair.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepairList;
