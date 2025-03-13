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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useToast } from "@/components/ui/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  lowStockAlert: number;
  price: number;
  cost: number;
  supplier: string;
  location: string;
  sku: string;
  description: string;
}

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Cadena Shimano 11v",
      category: "Transmisión",
      quantity: 15,
      lowStockAlert: 5,
      price: 29.99,
      cost: 18.5,
      supplier: "Shimano Iberia",
      location: "Estantería A3",
      sku: "SH-CN-11V",
      description:
        "Cadena Shimano 11 velocidades compatible con grupos 105, Ultegra y Dura-Ace",
    },
    {
      id: "2",
      name: "Pastillas de freno Shimano",
      category: "Frenos",
      quantity: 3,
      lowStockAlert: 10,
      price: 24.99,
      cost: 14.75,
      supplier: "Shimano Iberia",
      location: "Estantería B2",
      sku: "SH-BR-R55C4",
      description: "Pastillas de freno Shimano para frenos de zapata",
    },
    {
      id: "3",
      name: 'Cámaras 26"',
      category: "Ruedas",
      quantity: 25,
      lowStockAlert: 8,
      price: 8.99,
      cost: 4.5,
      supplier: "Continental",
      location: "Cajón C1",
      sku: "CON-TUBE-26",
      description: "Cámaras Continental para ruedas de 26 pulgadas",
    },
    {
      id: "4",
      name: "Cinta de manillar",
      category: "Componentes",
      quantity: 2,
      lowStockAlert: 5,
      price: 19.99,
      cost: 10.25,
      supplier: "Specialized",
      location: "Estantería D4",
      sku: "SP-BAR-TAPE",
      description: "Cinta de manillar Specialized S-Wrap",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [lowStockFilter, setLowStockFilter] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id">>({
    name: "",
    category: "",
    quantity: 0,
    lowStockAlert: 5,
    price: 0,
    cost: 0,
    supplier: "",
    location: "",
    sku: "",
    description: "",
  });

  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    // Convert numeric fields to numbers
    if (["quantity", "lowStockAlert", "price", "cost"].includes(name)) {
      parsedValue = value === "" ? 0 : parseFloat(value);
    }

    if (isEditDialogOpen && currentItem) {
      setCurrentItem({ ...currentItem, [name]: parsedValue });
    } else {
      setNewItem({ ...newItem, [name]: parsedValue });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (isEditDialogOpen && currentItem) {
      setCurrentItem({ ...currentItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleAddItem = () => {
    // Validate required fields
    if (!newItem.name || !newItem.category || newItem.price <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would be an API call
    const newId = (parseInt(items[items.length - 1]?.id || "0") + 1).toString();
    const itemToAdd = { ...newItem, id: newId };
    setItems([...items, itemToAdd]);
    setIsAddDialogOpen(false);
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      lowStockAlert: 5,
      price: 0,
      cost: 0,
      supplier: "",
      location: "",
      sku: "",
      description: "",
    });

    toast({
      title: "Artículo añadido",
      description: `${newItem.name} ha sido añadido al inventario.`,
    });
  };

  const handleEditItem = () => {
    if (!currentItem) return;

    // Validate required fields
    if (!currentItem.name || !currentItem.category || currentItem.price <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would be an API call
    setItems(
      items.map((item) => (item.id === currentItem.id ? currentItem : item)),
    );
    setIsEditDialogOpen(false);
    setCurrentItem(null);

    toast({
      title: "Artículo actualizado",
      description: `${currentItem.name} ha sido actualizado correctamente.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    // In a real implementation, this would be an API call with confirmation
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.",
      )
    ) {
      const itemToDelete = items.find((item) => item.id === id);
      setItems(items.filter((item) => item.id !== id));

      toast({
        title: "Artículo eliminado",
        description: `${itemToDelete?.name || "El artículo"} ha sido eliminado correctamente.`,
      });
    }
  };

  const openEditDialog = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  const filteredItems = items.filter((item) => {
    // Apply search filter
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply category filter
    const categoryMatch = categoryFilter
      ? item.category === categoryFilter
      : true;

    // Apply low stock filter
    const lowStockMatch = lowStockFilter
      ? item.quantity <= item.lowStockAlert
      : true;

    return searchMatch && categoryMatch && lowStockMatch;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {t("inventory")}
          </CardTitle>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Artículo
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-[#1A1A1A] border-[#333333] text-white">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                <SelectItem value="">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={lowStockFilter ? "default" : "outline"}
              className={`${lowStockFilter ? "bg-[#FFEC5C] text-black" : "border-[#333333] text-white"}`}
              onClick={() => setLowStockFilter(!lowStockFilter)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Bajo Stock
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-[#333333] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#333333] hover:bg-transparent">
                <TableHead className="text-[#777777]">Artículo</TableHead>
                <TableHead className="text-[#777777]">Categoría</TableHead>
                <TableHead className="text-[#777777]">Stock</TableHead>
                <TableHead className="text-[#777777]">Precio</TableHead>
                <TableHead className="text-[#777777]">Ubicación</TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-gray-400"
                  >
                    No se encontraron artículos
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                  >
                    <TableCell>
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.sku}</div>
                    </TableCell>
                    <TableCell className="text-white">
                      {item.category}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2">
                          <span
                            className={`font-medium ${item.quantity <= item.lowStockAlert ? "text-red-500" : "text-white"}`}
                          >
                            {item.quantity}
                          </span>
                          <span className="text-gray-400">
                            {" "}
                            / {item.lowStockAlert}
                          </span>
                        </div>
                        {item.quantity <= item.lowStockAlert && (
                          <Badge className="bg-red-500/20 text-red-500">
                            Bajo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#FFEC5C] font-medium">
                      {item.price.toFixed(2)} €
                    </TableCell>
                    <TableCell className="text-white">
                      {item.location}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(item)}
                          className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-400 hover:bg-[#1A1A1A]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Añadir Nuevo Artículo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="Transmisión">Transmisión</SelectItem>
                    <SelectItem value="Frenos">Frenos</SelectItem>
                    <SelectItem value="Ruedas">Ruedas</SelectItem>
                    <SelectItem value="Componentes">Componentes</SelectItem>
                    <SelectItem value="Accesorios">Accesorios</SelectItem>
                    <SelectItem value="Herramientas">Herramientas</SelectItem>
                    <SelectItem value="Lubricantes">Lubricantes</SelectItem>
                    <SelectItem value="Ropa">Ropa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowStockAlert">Alerta Stock Bajo *</Label>
                <Input
                  id="lowStockAlert"
                  name="lowStockAlert"
                  type="number"
                  value={newItem.lowStockAlert}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio de Venta (€) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newItem.price}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Coste (€)</Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={newItem.cost}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  value={newItem.supplier}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  name="location"
                  value={newItem.location}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU / Código</Label>
              <Input
                id="sku"
                name="sku"
                value={newItem.sku}
                onChange={handleInputChange}
                className="bg-[#101010] border-[#333333] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                className="bg-[#101010] border-[#333333] text-white min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-[#333333] text-white hover:bg-[#101010]"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleAddItem}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              disabled={
                !newItem.name || !newItem.category || newItem.price <= 0
              }
            >
              {t("createNew")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      {currentItem && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Editar Artículo
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={currentItem.name}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoría *</Label>
                  <Select
                    value={currentItem.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="Transmisión">Transmisión</SelectItem>
                      <SelectItem value="Frenos">Frenos</SelectItem>
                      <SelectItem value="Ruedas">Ruedas</SelectItem>
                      <SelectItem value="Componentes">Componentes</SelectItem>
                      <SelectItem value="Accesorios">Accesorios</SelectItem>
                      <SelectItem value="Herramientas">Herramientas</SelectItem>
                      <SelectItem value="Lubricantes">Lubricantes</SelectItem>
                      <SelectItem value="Ropa">Ropa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Cantidad *</Label>
                  <Input
                    id="edit-quantity"
                    name="quantity"
                    type="number"
                    value={currentItem.quantity}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lowStockAlert">
                    Alerta Stock Bajo *
                  </Label>
                  <Input
                    id="edit-lowStockAlert"
                    name="lowStockAlert"
                    type="number"
                    value={currentItem.lowStockAlert}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Precio de Venta (€) *</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    value={currentItem.price}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-cost">Coste (€)</Label>
                  <Input
                    id="edit-cost"
                    name="cost"
                    type="number"
                    value={currentItem.cost}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier">Proveedor</Label>
                  <Input
                    id="edit-supplier"
                    name="supplier"
                    value={currentItem.supplier}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Ubicación</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={currentItem.location}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sku">SKU / Código</Label>
                <Input
                  id="edit-sku"
                  name="sku"
                  value={currentItem.sku}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={currentItem.description}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-[#333333] text-white hover:bg-[#101010]"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleEditItem}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                disabled={
                  !currentItem.name ||
                  !currentItem.category ||
                  currentItem.price <= 0
                }
              >
                {t("save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default InventoryList;
