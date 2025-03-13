import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Bike } from "lucide-react";
import { t } from "@/lib/i18n";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  bikeCount: number;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Juan Pérez",
      phone: "612345678",
      email: "juan@example.com",
      address: "Calle Mayor 123, Madrid",
      notes: "Cliente habitual, prefiere ser contactado por WhatsApp",
      bikeCount: 2,
    },
    {
      id: "2",
      name: "María García",
      phone: "623456789",
      email: "maria@example.com",
      address: "Avenida Principal 45, Barcelona",
      notes: "Ciclista profesional",
      bikeCount: 3,
    },
    {
      id: "3",
      name: "Carlos Rodríguez",
      phone: "634567890",
      email: "carlos@example.com",
      address: "Plaza Central 7, Valencia",
      notes: "",
      bikeCount: 1,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<
    Omit<Customer, "id" | "bikeCount">
  >({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const { toast } = useToast();

  // Simulate API call to fetch customers
  useEffect(() => {
    // In a real implementation, this would be an API call
    console.log("Fetching customers...");
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (isEditDialogOpen && currentCustomer) {
      setCurrentCustomer({ ...currentCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  const handleAddCustomer = () => {
    // Validate phone number format (Spanish format)
    const phoneRegex = /^[6-9]\d{8}$/;
    if (!phoneRegex.test(newCustomer.phone)) {
      toast({
        title: "Error de validación",
        description:
          "El número de teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.",
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (
      newCustomer.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.email)
    ) {
      toast({
        title: "Error de validación",
        description: "El formato del email no es válido.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate phone
    if (customers.some((c) => c.phone === newCustomer.phone)) {
      toast({
        title: "Error de validación",
        description: "Ya existe un cliente con este número de teléfono.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would be an API call
    const newId = (
      parseInt(customers[customers.length - 1]?.id || "0") + 1
    ).toString();
    const customerToAdd = { ...newCustomer, id: newId, bikeCount: 0 };
    setCustomers([...customers, customerToAdd]);
    setIsAddDialogOpen(false);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });

    toast({
      title: "Cliente añadido",
      description: `${newCustomer.name} ha sido añadido correctamente.`,
    });
  };

  const handleEditCustomer = () => {
    if (!currentCustomer) return;

    // Validate phone number format (Spanish format)
    const phoneRegex = /^[6-9]\d{8}$/;
    if (!phoneRegex.test(currentCustomer.phone)) {
      toast({
        title: "Error de validación",
        description:
          "El número de teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.",
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (
      currentCustomer.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentCustomer.email)
    ) {
      toast({
        title: "Error de validación",
        description: "El formato del email no es válido.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate phone (excluding current customer)
    if (
      customers.some(
        (c) => c.phone === currentCustomer.phone && c.id !== currentCustomer.id,
      )
    ) {
      toast({
        title: "Error de validación",
        description: "Ya existe un cliente con este número de teléfono.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would be an API call
    setCustomers(
      customers.map((customer) =>
        customer.id === currentCustomer.id ? currentCustomer : customer,
      ),
    );
    setIsEditDialogOpen(false);
    setCurrentCustomer(null);

    toast({
      title: "Cliente actualizado",
      description: `${currentCustomer.name} ha sido actualizado correctamente.`,
    });
  };

  const handleDeleteCustomer = (id: string) => {
    // In a real implementation, this would be an API call with confirmation
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.",
      )
    ) {
      const customerToDelete = customers.find((c) => c.id === id);
      setCustomers(customers.filter((customer) => customer.id !== id));

      toast({
        title: "Cliente eliminado",
        description: `${customerToDelete?.name || "El cliente"} ha sido eliminado correctamente.`,
      });
    }
  };

  const openEditDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsEditDialogOpen(true);
  };

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {t("customers")}
          </CardTitle>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("createNew")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex mb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("search")}
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-[#1A1A1A] border-[#333333] text-white"
            />
          </div>
        </div>

        <div className="rounded-md border border-[#333333] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#333333] hover:bg-transparent">
                <TableHead className="text-[#777777]">
                  {t("customer")}
                </TableHead>
                <TableHead className="text-[#777777]">Teléfono</TableHead>
                <TableHead className="text-[#777777]">Email</TableHead>
                <TableHead className="text-[#777777]">Bicicletas</TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-400"
                  >
                    No se encontraron clientes
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                  >
                    <TableCell>
                      <div className="font-medium text-white">
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {customer.address}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-white">
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Bike className="h-4 w-4 mr-1 text-[#FFEC5C]" />
                        <span className="text-white">{customer.bikeCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(customer)}
                          className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Añadir Nuevo Cliente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                  required
                  placeholder="612345678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="bg-[#101010] border-[#333333] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
                className="bg-[#101010] border-[#333333] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                name="notes"
                value={newCustomer.notes}
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
              onClick={handleAddCustomer}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              disabled={!newCustomer.name || !newCustomer.phone}
            >
              {t("createNew")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      {currentCustomer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Editar Cliente
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={currentCustomer.name}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono *</Label>
                  <Input
                    id="edit-phone"
                    name="phone"
                    value={currentCustomer.phone}
                    onChange={handleInputChange}
                    className="bg-[#101010] border-[#333333] text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={currentCustomer.email}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Dirección</Label>
                <Input
                  id="edit-address"
                  name="address"
                  value={currentCustomer.address}
                  onChange={handleInputChange}
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notas</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={currentCustomer.notes}
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
                onClick={handleEditCustomer}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                disabled={!currentCustomer.name || !currentCustomer.phone}
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

export default CustomerList;
