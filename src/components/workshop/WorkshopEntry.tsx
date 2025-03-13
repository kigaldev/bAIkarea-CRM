import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Bike, FileText, CheckCircle } from "lucide-react";
import { t } from "@/lib/i18n";

interface WorkshopOperation {
  id: string;
  name: string;
  estimatedTime: string;
  finalPrice: number;
}

interface WorkshopEntryProps {
  operations?: WorkshopOperation[];
  technicians?: { id: string; name: string }[];
  bikeTypes?: string[];
  onSubmit?: (data: any) => void;
}

const WorkshopEntry: React.FC<WorkshopEntryProps> = ({
  operations = [
    {
      id: "1",
      name: "Ajuste de frenos",
      estimatedTime: "30 min",
      finalPrice: 21,
    },
    {
      id: "2",
      name: "Cambio de cadena",
      estimatedTime: "45 min",
      finalPrice: 33.75,
    },
    {
      id: "3",
      name: "Purgado de frenos hidráulicos",
      estimatedTime: "1 hora",
      finalPrice: 60,
    },
  ],
  technicians = [
    { id: "1", name: "Carlos Rodríguez" },
    { id: "2", name: "Ana Martínez" },
    { id: "3", name: "Miguel Sánchez" },
  ],
  bikeTypes = [
    "Montaña",
    "Carretera",
    "Urbana",
    "Eléctrica",
    "Gravel",
    "BMX",
    "Infantil",
  ],
  onSubmit = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("customer");
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      phone: "",
      email: "",
    },
    bike: {
      brand: "",
      model: "",
      type: "",
    },
    diagnosis: "",
    selectedOperations: [] as string[],
    technician: "",
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDiagnosisChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      diagnosis: value,
    }));
  };

  const handleOperationToggle = (operationId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedOperations.includes(operationId);
      return {
        ...prev,
        selectedOperations: isSelected
          ? prev.selectedOperations.filter((id) => id !== operationId)
          : [...prev.selectedOperations, operationId],
      };
    });
  };

  const handleTechnicianChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      technician: value,
    }));
  };

  const handleSubmit = () => {
    // Calculate total price
    const selectedOps = operations.filter((op) =>
      formData.selectedOperations.includes(op.id),
    );
    const totalPrice = selectedOps.reduce((sum, op) => sum + op.finalPrice, 0);

    onSubmit({
      ...formData,
      operations: selectedOps,
      totalPrice,
    });
  };

  const nextTab = () => {
    if (activeTab === "customer") setActiveTab("bike");
    else if (activeTab === "bike") setActiveTab("diagnosis");
    else if (activeTab === "diagnosis") setActiveTab("operations");
    else if (activeTab === "operations") setActiveTab("summary");
  };

  const prevTab = () => {
    if (activeTab === "bike") setActiveTab("customer");
    else if (activeTab === "diagnosis") setActiveTab("bike");
    else if (activeTab === "operations") setActiveTab("diagnosis");
    else if (activeTab === "summary") setActiveTab("operations");
  };

  const isNextDisabled = () => {
    if (activeTab === "customer") {
      return !formData.customer.name || !formData.customer.phone;
    }
    if (activeTab === "bike") {
      return !formData.bike.brand || !formData.bike.type;
    }
    if (activeTab === "diagnosis") {
      return !formData.diagnosis;
    }
    if (activeTab === "operations") {
      return formData.selectedOperations.length === 0 || !formData.technician;
    }
    return false;
  };

  const selectedOperationsTotal = operations
    .filter((op) => formData.selectedOperations.includes(op.id))
    .reduce((sum, op) => sum + op.finalPrice, 0);

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-xl font-bold text-white">
          {t("workshopEntry")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6 bg-[#1A1A1A]">
            <TabsTrigger
              value="customer"
              className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            >
              <User className="h-4 w-4 mr-2" />
              {t("customer")}
            </TabsTrigger>
            <TabsTrigger
              value="bike"
              className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            >
              <Bike className="h-4 w-4 mr-2" />
              {t("bikeDetails")}
            </TabsTrigger>
            <TabsTrigger
              value="diagnosis"
              className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            >
              <FileText className="h-4 w-4 mr-2" />
              {t("initialDiagnosis")}
            </TabsTrigger>
            <TabsTrigger
              value="operations"
              className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            >
              <Search className="h-4 w-4 mr-2" />
              {t("selectOperations")}
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("generateQuote")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">{t("customer")} *</Label>
                <Input
                  id="customerName"
                  value={formData.customer.name}
                  onChange={(e) =>
                    handleInputChange("customer", "name", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#333333] text-white"
                  placeholder="Nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Teléfono *</Label>
                <Input
                  id="customerPhone"
                  value={formData.customer.phone}
                  onChange={(e) =>
                    handleInputChange("customer", "phone", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#333333] text-white"
                  placeholder="612345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  value={formData.customer.email}
                  onChange={(e) =>
                    handleInputChange("customer", "email", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#333333] text-white"
                  placeholder="cliente@ejemplo.com"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bike" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bikeBrand">{t("brand")} *</Label>
                <Input
                  id="bikeBrand"
                  value={formData.bike.brand}
                  onChange={(e) =>
                    handleInputChange("bike", "brand", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#333333] text-white"
                  placeholder="Trek, Specialized, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bikeModel">{t("model")}</Label>
                <Input
                  id="bikeModel"
                  value={formData.bike.model}
                  onChange={(e) =>
                    handleInputChange("bike", "model", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#333333] text-white"
                  placeholder="Domane SL5, Rockhopper, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bikeType">{t("bikeType")} *</Label>
                <Select
                  value={formData.bike.type}
                  onValueChange={(value) =>
                    handleInputChange("bike", "type", value)
                  }
                >
                  <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    {bikeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">{t("initialDiagnosis")} *</Label>
              <Textarea
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleDiagnosisChange(e.target.value)}
                className="bg-[#1A1A1A] border-[#333333] text-white min-h-[150px]"
                placeholder="Descripción del problema o síntomas que presenta la bicicleta..."
              />
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="space-y-4">
              <Label>{t("selectOperations")} *</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {operations.map((operation) => (
                  <div
                    key={operation.id}
                    className="flex items-center justify-between p-3 rounded-md bg-[#1A1A1A] border border-[#333333]"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`op-${operation.id}`}
                        checked={formData.selectedOperations.includes(
                          operation.id,
                        )}
                        onCheckedChange={() =>
                          handleOperationToggle(operation.id)
                        }
                        className="border-[#FFEC5C] data-[state=checked]:bg-[#FFEC5C] data-[state=checked]:text-black"
                      />
                      <Label
                        htmlFor={`op-${operation.id}`}
                        className="cursor-pointer"
                      >
                        <div className="font-medium text-white">
                          {operation.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {operation.estimatedTime}
                        </div>
                      </Label>
                    </div>
                    <div className="text-[#FFEC5C] font-medium">
                      {operation.finalPrice.toFixed(2)} €
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician">{t("assignTechnician")} *</Label>
              <Select
                value={formData.technician}
                onValueChange={handleTechnicianChange}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-white">
                  <SelectValue placeholder="Seleccionar técnico" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center p-3 rounded-md bg-[#1A1A1A] border border-[#333333]">
              <span className="font-medium text-white">Total</span>
              <span className="text-[#FFEC5C] font-bold text-lg">
                {selectedOperationsTotal.toFixed(2)} €
              </span>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1A1A1A] border-[#333333]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">
                    {t("customer")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Nombre:</dt>
                      <dd className="text-white font-medium">
                        {formData.customer.name}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Teléfono:</dt>
                      <dd className="text-white">{formData.customer.phone}</dd>
                    </div>
                    {formData.customer.email && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Email:</dt>
                        <dd className="text-white">
                          {formData.customer.email}
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#333333]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">
                    {t("bikeDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">{t("brand")}:</dt>
                      <dd className="text-white font-medium">
                        {formData.bike.brand}
                      </dd>
                    </div>
                    {formData.bike.model && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">{t("model")}:</dt>
                        <dd className="text-white">{formData.bike.model}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-400">{t("bikeType")}:</dt>
                      <dd className="text-white">{formData.bike.type}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">
                  {t("initialDiagnosis")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">{formData.diagnosis}</p>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">
                  {t("selectOperations")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {operations
                    .filter((op) => formData.selectedOperations.includes(op.id))
                    .map((operation) => (
                      <div
                        key={operation.id}
                        className="flex justify-between items-center py-2 border-b border-[#333333] last:border-0"
                      >
                        <div>
                          <div className="font-medium text-white">
                            {operation.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {operation.estimatedTime}
                          </div>
                        </div>
                        <div className="text-[#FFEC5C] font-medium">
                          {operation.finalPrice.toFixed(2)} €
                        </div>
                      </div>
                    ))}

                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-white">Total</span>
                    <span className="text-[#FFEC5C] font-bold text-lg">
                      {selectedOperationsTotal.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">
                  {t("technician")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  {technicians.find((t) => t.id === formData.technician)?.name}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-[#333333] p-4 flex justify-between">
        {activeTab !== "customer" && (
          <Button
            variant="outline"
            onClick={prevTab}
            className="border-[#333333] text-white hover:bg-[#1A1A1A]"
          >
            Anterior
          </Button>
        )}
        {activeTab !== "summary" ? (
          <Button
            onClick={nextTab}
            disabled={isNextDisabled()}
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black ml-auto"
          >
            Siguiente
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black ml-auto"
          >
            Crear Entrada
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkshopEntry;
