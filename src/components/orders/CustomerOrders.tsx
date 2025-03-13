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
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Edit, CheckCircle, XCircle } from "lucide-react";
import { t } from "@/lib/i18n";

type OrderStatus = "pending" | "placed" | "received" | "notified";
type PaymentStatus = "paid" | "unpaid";

interface CustomerOrder {
  id: string;
  customer: {
    id: string;
    name: string;
    phone: string;
  };
  product: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

interface CustomerOrdersProps {
  orders?: CustomerOrder[];
  onAddOrder?: (order: Omit<CustomerOrder, "id" | "createdAt">) => void;
  onUpdateOrder?: (id: string, updates: Partial<CustomerOrder>) => void;
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-500";
    case "placed":
      return "bg-blue-500/20 text-blue-500";
    case "received":
      return "bg-purple-500/20 text-purple-500";
    case "notified":
      return "bg-green-500/20 text-green-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return t("pendingOrder");
    case "placed":
      return t("orderPlaced");
    case "received":
      return t("receivedAtWorkshop");
    case "notified":
      return t("customerNotified");
    default:
      return status;
  }
};

const CustomerOrders: React.FC<CustomerOrdersProps> = ({
  orders = [
    {
      id: "1",
      customer: {
        id: "c1",
        name: "Juan Pérez",
        phone: "612345678",
      },
      product: "Cubierta Continental GP5000 700x25",
      amount: 59.99,
      status: "pending" as OrderStatus,
      paymentStatus: "unpaid" as PaymentStatus,
      createdAt: "2023-06-15",
    },
    {
      id: "2",
      customer: {
        id: "c2",
        name: "María García",
        phone: "623456789",
      },
      product: "Potencia Ritchey WCS 100mm",
      amount: 89.95,
      status: "placed" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      createdAt: "2023-06-14",
    },
    {
      id: "3",
      customer: {
        id: "c3",
        name: "Carlos Rodríguez",
        phone: "634567890",
      },
      product: "Grupo Shimano 105 R7000",
      amount: 649.99,
      status: "received" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      createdAt: "2023-06-10",
    },
    {
      id: "4",
      customer: {
        id: "c4",
        name: "Laura Martínez",
        phone: "645678901",
      },
      product: "Sillín Fizik Arione R3",
      amount: 129.95,
      status: "notified" as OrderStatus,
      paymentStatus: "unpaid" as PaymentStatus,
      createdAt: "2023-06-08",
    },
  ],
  onAddOrder = () => {},
  onUpdateOrder = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<CustomerOrder | null>(null);
  const [newOrder, setNewOrder] = useState({
    customer: {
      id: "",
      name: "",
      phone: "",
    },
    product: "",
    amount: 0,
    status: "pending" as OrderStatus,
    paymentStatus: "unpaid" as PaymentStatus,
  });

  // Mock customers for the demo
  const customers = [
    { id: "c1", name: "Juan Pérez", phone: "612345678" },
    { id: "c2", name: "María García", phone: "623456789" },
    { id: "c3", name: "Carlos Rodríguez", phone: "634567890" },
    { id: "c4", name: "Laura Martínez", phone: "645678901" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddOrder = () => {
    onAddOrder(newOrder);
    setIsAddDialogOpen(false);
    setNewOrder({
      customer: {
        id: "",
        name: "",
        phone: "",
      },
      product: "",
      amount: 0,
      status: "pending",
      paymentStatus: "unpaid",
    });
  };

  const handleEditOrder = () => {
    if (currentOrder) {
      onUpdateOrder(currentOrder.id, currentOrder);
      setIsEditDialogOpen(false);
      setCurrentOrder(null);
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    const selectedCustomer = customers.find((c) => c.id === customerId);
    if (selectedCustomer) {
      setNewOrder({
        ...newOrder,
        customer: selectedCustomer,
      });
    }
  };

  const openEditDialog = (order: CustomerOrder) => {
    setCurrentOrder(order);
    setIsEditDialogOpen(true);
  };

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">
            {t("customerOrders")}
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
                <TableHead className="text-[#777777]">
                  {t("orderedProduct")}
                </TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("orderAmount")}
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("orderStatus")}
                </TableHead>
                <TableHead className="text-[#777777]">
                  {t("paymentStatus")}
                </TableHead>
                <TableHead className="text-[#777777] text-right">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-gray-400"
                  >
                    No se encontraron pedidos
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-[#333333] hover:bg-[#1A1A1A]"
                  >
                    <TableCell>
                      <div className="font-medium text-white">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {order.customer.phone}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      {order.product}
                    </TableCell>
                    <TableCell className="text-right font-medium text-[#FFEC5C]">
                      {order.amount.toFixed(2)} €
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.paymentStatus === "paid" ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t("paid")}
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="h-4 w-4 mr-1" />
                          {t("unpaid")}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(order)}
                        className="text-[#FFEC5C] hover:text-[#FFEC5C] hover:bg-[#1A1A1A]"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {t("edit")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Order Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Nuevo Pedido de Cliente
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">{t("customer")}</Label>
              <Select
                onValueChange={handleCustomerSelect}
                value={newOrder.customer.id}
              >
                <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent className="bg-[#101010] border-[#333333] text-white">
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">{t("orderedProduct")}</Label>
              <Input
                id="product"
                value={newOrder.product}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, product: e.target.value })
                }
                className="bg-[#101010] border-[#333333] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">{t("orderAmount")} (€)</Label>
              <Input
                id="amount"
                type="number"
                value={newOrder.amount || ""}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="bg-[#101010] border-[#333333] text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">{t("orderStatus")}</Label>
                <Select
                  onValueChange={(value: OrderStatus) =>
                    setNewOrder({ ...newOrder, status: value })
                  }
                  value={newOrder.status}
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#101010] border-[#333333] text-white">
                    <SelectItem value="pending">{t("pendingOrder")}</SelectItem>
                    <SelectItem value="placed">{t("orderPlaced")}</SelectItem>
                    <SelectItem value="received">
                      {t("receivedAtWorkshop")}
                    </SelectItem>
                    <SelectItem value="notified">
                      {t("customerNotified")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">{t("paymentStatus")}</Label>
                <Select
                  onValueChange={(value: PaymentStatus) =>
                    setNewOrder({ ...newOrder, paymentStatus: value })
                  }
                  value={newOrder.paymentStatus}
                >
                  <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#101010] border-[#333333] text-white">
                    <SelectItem value="paid">{t("paid")}</SelectItem>
                    <SelectItem value="unpaid">{t("unpaid")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              onClick={handleAddOrder}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
              disabled={
                !newOrder.customer.id ||
                !newOrder.product ||
                newOrder.amount <= 0
              }
            >
              {t("createNew")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      {currentOrder && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#1A1A1A] border-[#333333] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Editar Pedido
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{t("customer")}</Label>
                <div className="p-2 bg-[#101010] rounded-md border border-[#333333]">
                  <div className="font-medium text-white">
                    {currentOrder.customer.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentOrder.customer.phone}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-product">{t("orderedProduct")}</Label>
                <Input
                  id="edit-product"
                  value={currentOrder.product}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      product: e.target.value,
                    })
                  }
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-amount">{t("orderAmount")} (€)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={currentOrder.amount || ""}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="bg-[#101010] border-[#333333] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">{t("orderStatus")}</Label>
                  <Select
                    onValueChange={(value: OrderStatus) =>
                      setCurrentOrder({ ...currentOrder, status: value })
                    }
                    value={currentOrder.status}
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#101010] border-[#333333] text-white">
                      <SelectItem value="pending">
                        {t("pendingOrder")}
                      </SelectItem>
                      <SelectItem value="placed">{t("orderPlaced")}</SelectItem>
                      <SelectItem value="received">
                        {t("receivedAtWorkshop")}
                      </SelectItem>
                      <SelectItem value="notified">
                        {t("customerNotified")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-payment">{t("paymentStatus")}</Label>
                  <Select
                    onValueChange={(value: PaymentStatus) =>
                      setCurrentOrder({
                        ...currentOrder,
                        paymentStatus: value,
                      })
                    }
                    value={currentOrder.paymentStatus}
                  >
                    <SelectTrigger className="bg-[#101010] border-[#333333] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#101010] border-[#333333] text-white">
                      <SelectItem value="paid">{t("paid")}</SelectItem>
                      <SelectItem value="unpaid">{t("unpaid")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                onClick={handleEditOrder}
                className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
                disabled={!currentOrder.product || currentOrder.amount <= 0}
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

export default CustomerOrders;
