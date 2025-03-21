import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Send,
  Mail,
  MessageSquare,
  Clock,
  Lock,
} from "lucide-react";
import { useAppContext } from "../layout/AppContext";
import { useToast } from "@/components/ui/use-toast";
import ModuleAccessWrapper from "../common/ModuleAccessWrapper";

interface Template {
  id: string;
  type: "repair" | "order" | "custom";
  title: string;
  content: string;
  isDefault: boolean;
}

const NotificationTemplates: React.FC = () => {
  const { hasModuleAccess } = useAppContext();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("predefined");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [newTemplate, setNewTemplate] = useState<Omit<Template, "id">>({
    type: "repair",
    title: "",
    content: "",
    isDefault: false,
  });
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [sendDetails, setSendDetails] = useState({
    templateId: "",
    method: "email",
    customerId: "",
  });

  // Mock data for predefined templates
  const predefinedTemplates: Template[] = [
    {
      id: "1",
      type: "repair",
      title: "Reparación Iniciada",
      content:
        "Estimado/a [NOMBRE_CLIENTE], le informamos que hemos comenzado a trabajar en la reparación de su bicicleta [MODELO_BICICLETA]. Le notificaremos cuando esté lista. Gracias por confiar en nosotros.",
      isDefault: true,
    },
    {
      id: "2",
      type: "repair",
      title: "Reparación Completada",
      content:
        "Estimado/a [NOMBRE_CLIENTE], nos complace informarle que la reparación de su bicicleta [MODELO_BICICLETA] ha sido completada. Puede pasar a recogerla en nuestro taller en horario de 9:00 a 18:00. Gracias por su confianza.",
      isDefault: true,
    },
    {
      id: "3",
      type: "order",
      title: "Pedido Recibido",
      content:
        "Estimado/a [NOMBRE_CLIENTE], hemos recibido su pedido #[NUMERO_PEDIDO]. Le notificaremos cuando esté listo para recoger. Gracias por su compra.",
      isDefault: true,
    },
    {
      id: "4",
      type: "order",
      title: "Pedido Listo para Recoger",
      content:
        "Estimado/a [NOMBRE_CLIENTE], su pedido #[NUMERO_PEDIDO] está listo para recoger en nuestro taller. Horario de recogida: 9:00 a 18:00. Gracias por su compra.",
      isDefault: true,
    },
  ];

  // Mock data for custom templates (only available with notifications module)
  const customTemplates: Template[] = [
    {
      id: "5",
      type: "custom",
      title: "Recordatorio de Mantenimiento",
      content:
        "Estimado/a [NOMBRE_CLIENTE], le recordamos que su bicicleta [MODELO_BICICLETA] debería pasar por un mantenimiento preventivo. Han pasado 6 meses desde su última revisión. ¿Le gustaría programar una cita?",
      isDefault: false,
    },
    {
      id: "6",
      type: "custom",
      title: "Oferta Especial",
      content:
        "Estimado/a [NOMBRE_CLIENTE], queremos ofrecerle un 15% de descuento en su próxima reparación como agradecimiento por su fidelidad. Esta oferta es válida hasta el [FECHA_LIMITE].",
      isDefault: false,
    },
  ];

  // Mock customers for the send dialog
  const customers = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "María García" },
    { id: "3", name: "Carlos Rodríguez" },
  ];

  const handleCreateTemplate = () => {
    // Validate
    if (!newTemplate.title || !newTemplate.content) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Plantilla creada",
      description: `La plantilla "${newTemplate.title}" ha sido creada correctamente.`,
    });

    setIsCreateDialogOpen(false);
    setNewTemplate({
      type: "repair",
      title: "",
      content: "",
      isDefault: false,
    });
  };

  const handleEditTemplate = () => {
    if (!selectedTemplate) return;

    // Validate
    if (!selectedTemplate.title || !selectedTemplate.content) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Plantilla actualizada",
      description: `La plantilla "${selectedTemplate.title}" ha sido actualizada correctamente.`,
    });

    setIsEditDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (id: string, title: string) => {
    // In a real app, this would be an API call with confirmation
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar la plantilla "${title}"? Esta acción no se puede deshacer.`,
      )
    ) {
      toast({
        title: "Plantilla eliminada",
        description: `La plantilla "${title}" ha sido eliminada correctamente.`,
      });
    }
  };

  const handleSendNotification = () => {
    // Validate
    if (!sendDetails.templateId || !sendDetails.customerId) {
      toast({
        title: "Error de validación",
        description: "Por favor, selecciona una plantilla y un cliente.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    const template = [...predefinedTemplates, ...customTemplates].find(
      (t) => t.id === sendDetails.templateId,
    );
    const customer = customers.find((c) => c.id === sendDetails.customerId);

    toast({
      title: "Notificación enviada",
      description: `Se ha enviado "${template?.title}" a ${customer?.name} por ${sendDetails.method === "email" ? "correo electrónico" : "WhatsApp"}.`,
    });

    setIsSendDialogOpen(false);
    setSendDetails({
      templateId: "",
      method: "email",
      customerId: "",
    });
  };

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditDialogOpen(true);
  };

  const openSendDialog = (templateId: string) => {
    setSendDetails({
      ...sendDetails,
      templateId,
    });
    setIsSendDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6 bg-[#101010] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Plantillas de Notificación
        </h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsSendDialogOpen(true)}
            variant="outline"
            className="border-[#333333] text-white hover:bg-[#1A1A1A]"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Notificación
          </Button>

          {hasModuleAccess && hasModuleAccess("notifications") ? (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Plantilla
            </Button>
          ) : (
            <Button
              onClick={() => (window.location.href = "/modules/store")}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
            >
              <Lock className="h-4 w-4 mr-2" />
              Desbloquear Plantillas Personalizadas
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 bg-[#1A1A1A]">
          <TabsTrigger
            value="predefined"
            className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
          >
            Plantillas Predefinidas
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            disabled={!hasModuleAccess || !hasModuleAccess("notifications")}
          >
            Plantillas Personalizadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predefined" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predefinedTemplates.map((template) => (
              <Card key={template.id} className="bg-[#1A1A1A] border-[#333333]">
                <CardHeader className="pb-2 border-b border-[#333333]">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge
                        className={
                          template.type === "repair"
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-purple-500/20 text-purple-500"
                        }
                      >
                        {template.type === "repair" ? "Reparación" : "Pedido"}
                      </Badge>
                      <CardTitle className="text-lg font-bold text-white mt-2">
                        {template.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openSendDialog(template.id)}
                      className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-[#101010] p-3 rounded-md text-gray-300 text-sm min-h-[100px] mb-3">
                    {template.content}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(template)}
                      className="border-[#333333] text-white hover:bg-[#1A1A1A]"
                      disabled={
                        template.isDefault &&
                        (!hasModuleAccess || !hasModuleAccess("notifications"))
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <ModuleAccessWrapper
            moduleId="notifications"
            fallbackMessage="Para crear y gestionar plantillas personalizadas, necesitas activar el módulo de Notificaciones Avanzadas."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-[#1A1A1A] border-[#333333]"
                >
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="bg-green-500/20 text-green-500">
                          Personalizada
                        </Badge>
                        <CardTitle className="text-lg font-bold text-white mt-2">
                          {template.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openSendDialog(template.id)}
                        className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="bg-[#101010] p-3 rounded-md text-gray-300 text-sm min-h-[100px] mb-3">
                      {template.content}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDeleteTemplate(template.id, template.title)
                        }
                        className="text-red-500 hover:text-red-400 hover:bg-[#1A1A1A]"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(template)}
                        className="border-[#333333] text-white hover:bg-[#1A1A1A]"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ModuleAccessWrapper>
        </TabsContent>
      </Tabs>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Crear Nueva Plantilla
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-type">Tipo de Plantilla</Label>
              <Select
                value={newTemplate.type}
                onValueChange={(value: "repair" | "order" | "custom") =>
                  setNewTemplate({ ...newTemplate, type: value })
                }
              >
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                  <SelectItem value="repair">Reparación</SelectItem>
                  <SelectItem value="order">Pedido</SelectItem>
                  <SelectItem value="custom">Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-title">Título *</Label>
              <Input
                id="template-title"
                value={newTemplate.title}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, title: e.target.value })
                }
                className="bg-[#101010] border-[#333333] text-white"
                placeholder="Ej: Recordatorio de Mantenimiento"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-content">Contenido *</Label>
              <div className="text-xs text-gray-400 mb-2">
                Usa [NOMBRE_CLIENTE], [MODELO_BICICLETA], [NUMERO_PEDIDO], etc.
                como variables que serán reemplazadas automáticamente.
              </div>
              <Textarea
                id="template-content"
                value={newTemplate.content}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, content: e.target.value })
                }
                className="bg-[#101010] border-[#333333] text-white min-h-[150px]"
                placeholder="Estimado/a [NOMBRE_CLIENTE], ..."
                required
              />
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
              onClick={handleCreateTemplate}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              disabled={!newTemplate.title || !newTemplate.content}
            >
              Crear Plantilla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      {selectedTemplate && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Editar Plantilla
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-template-type">Tipo de Plantilla</Label>
                <Select
                  value={selectedTemplate.type}
                  onValueChange={(value: "repair" | "order" | "custom") =>
                    setSelectedTemplate({ ...selectedTemplate, type: value })
                  }
                  disabled={selectedTemplate.isDefault}
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    <SelectItem value="repair">Reparación</SelectItem>
                    <SelectItem value="order">Pedido</SelectItem>
                    <SelectItem value="custom">Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-template-title">Título *</Label>
                <Input
                  id="edit-template-title"
                  value={selectedTemplate.title}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      title: e.target.value,
                    })
                  }
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                  disabled={
                    selectedTemplate.isDefault &&
                    (!hasModuleAccess || !hasModuleAccess("notifications"))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-template-content">Contenido *</Label>
                <div className="text-xs text-gray-400 mb-2">
                  Usa [NOMBRE_CLIENTE], [MODELO_BICICLETA], [NUMERO_PEDIDO],
                  etc. como variables que serán reemplazadas automáticamente.
                </div>
                <Textarea
                  id="edit-template-content"
                  value={selectedTemplate.content}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      content: e.target.value,
                    })
                  }
                  className="bg-[#101010] border-[#333333] text-white min-h-[150px]"
                  required
                  disabled={
                    selectedTemplate.isDefault &&
                    (!hasModuleAccess || !hasModuleAccess("notifications"))
                  }
                />
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
                onClick={handleEditTemplate}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                disabled={
                  !selectedTemplate.title ||
                  !selectedTemplate.content ||
                  (selectedTemplate.isDefault &&
                    (!hasModuleAccess || !hasModuleAccess("notifications")))
                }
              >
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Send Notification Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Enviar Notificación
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-select">Plantilla</Label>
              <Select
                value={sendDetails.templateId}
                onValueChange={(value) =>
                  setSendDetails({ ...sendDetails, templateId: value })
                }
              >
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Seleccionar plantilla" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white max-h-[300px]">
                  <SelectItem value="" disabled>
                    Seleccionar plantilla
                  </SelectItem>
                  <SelectItem
                    value=""
                    disabled
                    className="font-semibold text-gray-400"
                  >
                    -- Plantillas de Reparación --
                  </SelectItem>
                  {predefinedTemplates
                    .filter((t) => t.type === "repair")
                    .map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.title}
                      </SelectItem>
                    ))}
                  <SelectItem
                    value=""
                    disabled
                    className="font-semibold text-gray-400"
                  >
                    -- Plantillas de Pedido --
                  </SelectItem>
                  {predefinedTemplates
                    .filter((t) => t.type === "order")
                    .map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.title}
                      </SelectItem>
                    ))}
                  {hasModuleAccess && hasModuleAccess("notifications") && (
                    <>
                      <SelectItem
                        value=""
                        disabled
                        className="font-semibold text-gray-400"
                      >
                        -- Plantillas Personalizadas --
                      </SelectItem>
                      {customTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-select">Cliente</Label>
              <Select
                value={sendDetails.customerId}
                onValueChange={(value) =>
                  setSendDetails({ ...sendDetails, customerId: value })
                }
              >
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Método de Envío</Label>
              <div className="flex space-x-2 pt-2">
                <Button
                  type="button"
                  variant={
                    sendDetails.method === "email" ? "default" : "outline"
                  }
                  className={
                    sendDetails.method === "email"
                      ? "bg-[#FFEC5C] text-black"
                      : "border-[#333333] text-white"
                  }
                  onClick={() =>
                    setSendDetails({ ...sendDetails, method: "email" })
                  }
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={
                    sendDetails.method === "whatsapp" ? "default" : "outline"
                  }
                  className={
                    sendDetails.method === "whatsapp"
                      ? "bg-[#FFEC5C] text-black"
                      : "border-[#333333] text-white"
                  }
                  onClick={() =>
                    setSendDetails({ ...sendDetails, method: "whatsapp" })
                  }
                  disabled={
                    !hasModuleAccess || !hasModuleAccess("notifications")
                  }
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                  {(!hasModuleAccess || !hasModuleAccess("notifications")) && (
                    <Lock className="h-3 w-3 ml-1" />
                  )}
                </Button>
              </div>
              {sendDetails.method === "whatsapp" &&
                (!hasModuleAccess || !hasModuleAccess("notifications")) && (
                  <p className="text-xs text-amber-500 mt-1">
                    El envío por WhatsApp requiere el módulo de Notificaciones
                    Avanzadas.
                  </p>
                )}
            </div>

            {hasModuleAccess && hasModuleAccess("notifications") && (
              <div className="space-y-2 pt-2">
                <Label className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#FFEC5C]" />
                  Programar Envío
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="datetime-local"
                    className="bg-[#101010] border-[#333333] text-white"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Opcional: Deja en blanco para enviar inmediatamente.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSendDialogOpen(false)}
              className="border-[#333333] text-white hover:bg-[#101010]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSendNotification}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              disabled={
                !sendDetails.templateId ||
                !sendDetails.customerId ||
                (sendDetails.method === "whatsapp" &&
                  (!hasModuleAccess || !hasModuleAccess("notifications")))
              }
            >
              Enviar Notificación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationTemplates;
