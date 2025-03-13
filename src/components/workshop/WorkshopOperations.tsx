import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { t } from "@/lib/i18n";

interface WorkshopOperation {
  id: string;
  name: string;
  estimatedTime: string;
  serviceCost: number;
  profitMargin: number;
  finalPrice: number;
}

interface WorkshopOperationsProps {
  operations?: WorkshopOperation[];
  onAddOperation?: (operation: Omit<WorkshopOperation, "id">) => void;
  onEditOperation?: (
    id: string,
    operation: Omit<WorkshopOperation, "id">,
  ) => void;
  onDeleteOperation?: (id: string) => void;
}

const WorkshopOperations: React.FC<WorkshopOperationsProps> = ({
  operations = [
    {
      id: "1",
      name: "Ajuste de frenos",
      estimatedTime: "30 min",
      serviceCost: 15,
      profitMargin: 40,
      finalPrice: 21,
    },
    {
      id: "2",
      name: "Cambio de cadena",
      estimatedTime: "45 min",
      serviceCost: 25,
      profitMargin: 35,
      finalPrice: 33.75,
    },
    {
      id: "3",
      name: "Purgado de frenos hidráulicos",
      estimatedTime: "1 hora",
      serviceCost: 40,
      profitMargin: 50,
      finalPrice: 60,
    },
  ],
  onAddOperation = () => {},
  onEditOperation = () => {},
  onDeleteOperation = () => {},
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WorkshopOperation, "id">>({
    name: "",
    estimatedTime: "",
    serviceCost: 0,
    profitMargin: 30,
    finalPrice: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "serviceCost" || name === "profitMargin") {
      newValue = parseFloat(value) || 0;

      // Calculate final price when either cost or margin changes
      const serviceCost =
        name === "serviceCost" ? newValue : formData.serviceCost;
      const profitMargin =
        name === "profitMargin" ? newValue : formData.profitMargin;

      const finalPrice = serviceCost * (1 + profitMargin / 100);

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
        finalPrice: parseFloat(finalPrice.toFixed(2)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = () => {
    if (editingId) {
      onEditOperation(editingId, formData);
      setEditingId(null);
    } else {
      onAddOperation(formData);
    }

    setIsAdding(false);
    setFormData({
      name: "",
      estimatedTime: "",
      serviceCost: 0,
      profitMargin: 30,
      finalPrice: 0,
    });
  };

  const handleEdit = (operation: WorkshopOperation) => {
    setFormData({
      name: operation.name,
      estimatedTime: operation.estimatedTime,
      serviceCost: operation.serviceCost,
      profitMargin: operation.profitMargin,
      finalPrice: operation.finalPrice,
    });
    setEditingId(operation.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: "",
      estimatedTime: "",
      serviceCost: 0,
      profitMargin: 30,
      finalPrice: 0,
    });
  };

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {t("workshopOperations")}
          </CardTitle>
          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("createNew")}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isAdding ? (
          <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#333333]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("operationName")}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedTime">{t("estimatedTime")}</Label>
                <Input
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  placeholder="30 min, 1 hora, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceCost">{t("serviceCost")} (€)</Label>
                <Input
                  id="serviceCost"
                  name="serviceCost"
                  type="number"
                  value={formData.serviceCost}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profitMargin">{t("profitMargin")} (%)</Label>
                <Input
                  id="profitMargin"
                  name="profitMargin"
                  type="number"
                  value={formData.profitMargin}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalPrice">{t("finalPrice")} (€)</Label>
                <Input
                  id="finalPrice"
                  name="finalPrice"
                  type="number"
                  value={formData.finalPrice}
                  disabled
                  className="bg-[#101010] border-[#333333] text-white opacity-70"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-[#333333] text-white hover:bg-[#1A1A1A]"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              >
                {editingId ? t("save") : t("createNew")}
              </Button>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#333333] hover:bg-transparent">
                <TableHead className="text-[#777777]">
                  {t("operationName")}
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("estimatedTime")}
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("serviceCost")} (€)
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("profitMargin")} (%)
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("finalPrice")} (€)
                </TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.map((operation) => (
                <TableRow
                  key={operation.id}
                  className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                >
                  <TableCell className="font-medium text-white">
                    {operation.name}
                  </TableCell>
                  <TableCell className="text-white">
                    {operation.estimatedTime}
                  </TableCell>
                  <TableCell className="text-white">
                    {operation.serviceCost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-white">
                    {operation.profitMargin}%
                  </TableCell>
                  <TableCell className="text-white">
                    {operation.finalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(operation)}
                        className="h-8 w-8 p-0 text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteOperation(operation.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-[#1A1A1A]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkshopOperations;
