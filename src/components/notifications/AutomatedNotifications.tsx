import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Clock,
  Bell,
  Calendar,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ModuleAccessWrapper from "../common/ModuleAccessWrapper";

interface AutomatedNotification {
  id: string;
  name: string;
  eventType:
    | "repair_completed"
    | "order_received"
    | "follow_up"
    | "maintenance_reminder";
  templateId: string;
  sendAfterDays: number;
  isActive: boolean;
  method: "email" | "whatsapp" | "both";
}

const AutomatedNotifications: React.FC = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAutomation, setSelectedAutomation] =
    useState<AutomatedNotification | null>(null);
  const [newAutomation, setNewAutomation] = useState<
    Omit<AutomatedNotification, "id">
  >({
    name: "",
    eventType: "repair_completed",
    templateId: "",
    sendAfterDays: 0,
    isActive: true,
    method: "email",
  });

  // Mock data for automated notifications
  const automatedNotifications: AutomatedNotification[] = [
    {
      id: "1",
      name: "Recordatorio de Recogida",
      eventType: "repair_completed",
      templateId: "2", // ID of the "Reparación Completada" template
      sendAfterDays: 3,
      isActive: true,
      method: "both",
    },
    {
      id: "2",
      name: "Seguimiento Post-Reparación",
      eventType: "repair_completed",
      templateId: "5", // ID of the "Recordatorio de Mantenimiento" template
      sendAfterDays: 30,
      isActive: true,
      method: "email",
    },
    {
      id: "3",
      name: "Recordatorio de Mantenimiento Semestral",
      eventType: "maintenance_reminder",
      templateId: "5", // ID of the "Recordatorio de Mantenimiento" template
      sendAfterDays: 180,
      isActive: false,
      method: "email",
    },
  ];

  // Mock data for templates
  const templates = [
    { id: "2", title: "Reparación Completada" },
    { id: "3", title: "Pedido Recibido" },
    { id: "5", title: "Recordatorio de Mantenimiento" },
    { id: "6", title: "Oferta Especial" },
  ];

  const handleCreateAutomation = () => {
    // Validate
    if (!newAutomation.name || !newAutomation.templateId) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Automatización creada",
      description: `La automatización "${newAutomation.name}" ha sido creada correctamente.`,
    });

    setIsCreateDialogOpen(false);
    setNewAutomation({
      name: "",
      eventType: "repair_completed",
      templateId: "",
      sendAfterDays: 0,
      isActive: true,
      method: "email",
    });
  };

  const handleEditAutomation = () => {
    if (!selectedAutomation) return;

    // Validate
    if (!selectedAutomation.name || !selectedAutomation.templateId) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Automatización actualizada",
      description: `La automatización "${selectedAutomation.name}" ha sido actualizada correctamente.`,
    });

    setIsEditDialogOpen(false);
    setSelectedAutomation(null);
  };

  const handleDeleteAutomation = (id: string, name: string) => {
    // In a real app, this would be an API call with confirmation
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar la automatización "${name}"? Esta acción no se puede deshacer.`,
      )
    ) {
      toast({
        title: "Automatización eliminada",
        description: `La automatización "${name}" ha sido eliminada correctamente.`,
      });
    }
  };

  const handleToggleActive = (
    id: string,
    name: string,
    currentState: boolean,
  ) => {
    // In a real app, this would be an API call
    toast({
      title: currentState
        ? "Automatización desactivada"
        : "Automatización activada",
      description: `La automatización "${name}" ha sido ${currentState ? "desactivada" : "activada"} correctamente.`,
    });
  };

  const openEditDialog = (automation: AutomatedNotification) => {
    setSelectedAutomation(automation);
    setIsEditDialogOpen(true);
  };

  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case "repair_completed":
        return "Reparación Completada";
      case "order_received":
        return "Pedido Recibido";
      case "follow_up":
        return "Seguimiento";
      case "maintenance_reminder":
        return "Recordatorio de Mantenimiento";
      default:
        return eventType;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-400" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-400" />;
      case "both":
        return (
          <div className="flex space-x-1">
            <Mail className="h-4 w-4 text-blue-400" />
            <MessageSquare className="h-4 w-4 text-green-400" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-[#101010] min-h-screen">
      <ModuleAccessWrapper
        moduleId="notifications"
        fallbackMessage="Para configurar notificaciones automatizadas, necesitas activar el módulo de Notificaciones Avanzadas."
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Notificaciones Automatizadas
          </h1>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Automatización
          </Button>
        </div>

        <div className="space-y-6">
          {automatedNotifications.length === 0 ? (
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardContent className="p-6 text-center text-gray-400">
                No hay notificaciones automatizadas configuradas.
              </CardContent>
            </Card>
          ) : (
            automatedNotifications.map((automation) => (
              <Card
                key={automation.id}
                className={`bg-[#1A1A1A] border-[#333333] ${!automation.isActive ? "opacity-70" : ""}`}
              >
                <CardHeader className="pb-2 border-b border-[#333333]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-[#FFEC5C]" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg font-bold text-white">
                            {automation.name}
                          </CardTitle>
                          <Badge
                            className={
                              automation.isActive
                                ? "bg-green-500/20 text-green-500"
                                : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {automation.isActive ? "Activa" : "Inactiva"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {getEventTypeLabel(automation.eventType)}
                          <span className="mx-2">•</span>
                          {getMethodIcon(automation.method)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={automation.isActive}
                        onCheckedChange={() =>
                          handleToggleActive(
                            automation.id,
                            automation.name,
                            automation.isActive,
                          )
                        }
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="space-y-2 mb-4 md:mb-0">
                      <div className="flex items-center text-white">
                        <Clock className="h-4 w-4 mr-2 text-[#FFEC5C]" />
                        <span>
                          Enviar después de {automation.sendAfterDays}{" "}
                          {automation.sendAfterDays === 1 ? "día" : "días"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Plantilla:{" "}
                        {templates.find((t) => t.id === automation.templateId)
                          ?.title || "Desconocida"}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDeleteAutomation(automation.id, automation.name)
                        }
                        className="text-red-500 hover:text-red-400 hover:bg-[#1A1A1A]"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(automation)}
                        className="border-[#333333] text-white hover:bg-[#1A1A1A]"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Create Automation Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Crear Nueva Automatización
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Nombre *</Label>
                <Input
                  id="automation-name"
                  value={newAutomation.name}
                  onChange={(e) =>
                    setNewAutomation({ ...newAutomation, name: e.target.value })
                  }
                  className="bg-[#101010] border-[#333333] text-white"
                  placeholder="Ej: Recordatorio de Recogida"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-type">Evento Desencadenante *</Label>
                <Select
                  value={newAutomation.eventType}
                  onValueChange={(value: any) =>
                    setNewAutomation({ ...newAutomation, eventType: value })
                  }
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue placeholder="Seleccionar evento" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    <SelectItem value="repair_completed">
                      Reparación Completada
                    </SelectItem>
                    <SelectItem value="order_received">
                      Pedido Recibido
                    </SelectItem>
                    <SelectItem value="follow_up">Seguimiento</SelectItem>
                    <SelectItem value="maintenance_reminder">
                      Recordatorio de Mantenimiento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-select">Plantilla *</Label>
                <Select
                  value={newAutomation.templateId}
                  onValueChange={(value) =>
                    setNewAutomation({ ...newAutomation, templateId: value })
                  }
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="send-after-days">
                  Enviar Después de (días) *
                </Label>
                <Input
                  id="send-after-days"
                  type="number"
                  min="0"
                  value={newAutomation.sendAfterDays}
                  onChange={(e) =>
                    setNewAutomation({
                      ...newAutomation,
                      sendAfterDays: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
                <p className="text-xs text-gray-400">
                  0 = Inmediatamente, 1 = Después de 1 día, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Método de Envío *</Label>
                <div className="flex space-x-2 pt-2">
                  <Button
                    type="button"
                    variant={
                      newAutomation.method === "email" ? "default" : "outline"
                    }
                    className={
                      newAutomation.method === "email"
                        ? "bg-[#FFEC5C] text-black"
                        : "border-[#333333] text-white"
                    }
                    onClick={() =>
                      setNewAutomation({ ...newAutomation, method: "email" })
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={
                      newAutomation.method === "whatsapp"
                        ? "default"
                        : "outline"
                    }
                    className={
                      newAutomation.method === "whatsapp"
                        ? "bg-[#FFEC5C] text-black"
                        : "border-[#333333] text-white"
                    }
                    onClick={() =>
                      setNewAutomation({ ...newAutomation, method: "whatsapp" })
                    }
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant={
                      newAutomation.method === "both" ? "default" : "outline"
                    }
                    className={
                      newAutomation.method === "both"
                        ? "bg-[#FFEC5C] text-black"
                        : "border-[#333333] text-white"
                    }
                    onClick={() =>
                      setNewAutomation({ ...newAutomation, method: "both" })
                    }
                  >
                    Ambos
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="is-active"
                  checked={newAutomation.isActive}
                  onCheckedChange={(checked) =>
                    setNewAutomation({ ...newAutomation, isActive: checked })
                  }
                />
                <Label htmlFor="is-active">Activar inmediatamente</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-[#333333] text-white hover:bg-[#101010]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAutomation}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                disabled={!newAutomation.name || !newAutomation.templateId}
              >
                Crear Automatización
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Automation Dialog */}
        {selectedAutomation && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">
                  Editar Automatización
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-automation-name">Nombre *</Label>
                  <Input
                    id="edit-automation-name"
                    value={selectedAutomation.name}
                    onChange={(e) =>
                      setSelectedAutomation({
                        ...selectedAutomation,
                        name: e.target.value,
                      })
                    }
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-event-type">
                    Evento Desencadenante *
                  </Label>
                  <Select
                    value={selectedAutomation.eventType}
                    onValueChange={(value: any) =>
                      setSelectedAutomation({
                        ...selectedAutomation,
                        eventType: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue placeholder="Seleccionar evento" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                      <SelectItem value="repair_completed">
                        Reparación Completada
                      </SelectItem>
                      <SelectItem value="order_received">
                        Pedido Recibido
                      </SelectItem>
                      <SelectItem value="follow_up">Seguimiento</SelectItem>
                      <SelectItem value="maintenance_reminder">
                        Recordatorio de Mantenimiento
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-template-select">Plantilla *</Label>
                  <Select
                    value={selectedAutomation.templateId}
                    onValueChange={(value) =>
                      setSelectedAutomation({
                        ...selectedAutomation,
                        templateId: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-send-after-days">
                    Enviar Después de (días) *
                  </Label>
                  <Input
                    id="edit-send-after-days"
                    type="number"
                    min="0"
                    value={selectedAutomation.sendAfterDays}
                    onChange={(e) =>
                      setSelectedAutomation({
                        ...selectedAutomation,
                        sendAfterDays: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                  <p className="text-xs text-gray-400">
                    0 = Inmediatamente, 1 = Después de 1 día, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Método de Envío *</Label>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      type="button"
                      variant={
                        selectedAutomation.method === "email"
                          ? "default"
                          : "outline"
                      }
                      className={
                        selectedAutomation.method === "email"
                          ? "bg-[#FFEC5C] text-black"
                          : "border-[#333333] text-white"
                      }
                      onClick={() =>
                        setSelectedAutomation({
                          ...selectedAutomation,
                          method: "email",
                        })
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={
                        selectedAutomation.method === "whatsapp"
                          ? "default"
                          : "outline"
                      }
                      className={
                        selectedAutomation.method === "whatsapp"
                          ? "bg-[#FFEC5C] text-black"
                          : "border-[#333333] text-white"
                      }
                      onClick={() =>
                        setSelectedAutomation({
                          ...selectedAutomation,
                          method: "whatsapp",
                        })
                      }
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      type="button"
                      variant={
                        selectedAutomation.method === "both"
                          ? "default"
                          : "outline"
                      }
                      className={
                        selectedAutomation.method === "both"
                          ? "bg-[#FFEC5C] text-black"
                          : "border-[#333333] text-white"
                      }
                      onClick={() =>
                        setSelectedAutomation({
                          ...selectedAutomation,
                          method: "both",
                        })
                      }
                    >
                      Ambos
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="edit-is-active"
                    checked={selectedAutomation.isActive}
                    onCheckedChange={(checked) =>
                      setSelectedAutomation({
                        ...selectedAutomation,
                        isActive: checked,
                      })
                    }
                  />
                  <Label htmlFor="edit-is-active">Activa</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-[#333333] text-white hover:bg-[#101010]"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleEditAutomation}
                  className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                  disabled={
                    !selectedAutomation.name || !selectedAutomation.templateId
                  }
                >
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </ModuleAccessWrapper>
    </div>
  );
};

export default AutomatedNotifications;
