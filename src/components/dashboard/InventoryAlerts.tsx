import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShoppingCart } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentQuantity: number;
  reorderThreshold: number;
  price: number;
}

interface InventoryAlertsProps {
  items?: InventoryItem[];
  onReorder?: (itemId: string) => void;
}

const InventoryAlerts = ({
  items = [
    {
      id: "1",
      name: "Chain Lubricant",
      category: "Maintenance",
      currentQuantity: 2,
      reorderThreshold: 5,
      price: 12.99,
    },
    {
      id: "2",
      name: "Brake Pads - Shimano",
      category: "Brakes",
      currentQuantity: 3,
      reorderThreshold: 10,
      price: 24.99,
    },
    {
      id: "3",
      name: 'Inner Tubes - 26"',
      category: "Tires",
      currentQuantity: 4,
      reorderThreshold: 15,
      price: 8.99,
    },
    {
      id: "4",
      name: "Handlebar Tape",
      category: "Components",
      currentQuantity: 1,
      reorderThreshold: 8,
      price: 19.99,
    },
  ],
  onReorder = (itemId) => console.log(`Reordering item ${itemId}`),
}: InventoryAlertsProps) => {
  // Calculate percentage of stock remaining
  const calculateStockPercentage = (current: number, threshold: number) => {
    return Math.min(Math.round((current / threshold) * 100), 100);
  };

  return (
    <Card className="w-full h-full bg-[#101010] border-gray-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-800">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Inventory Alerts
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-gray-700 hover:bg-gray-800 hover:text-white"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="pt-4 px-4 pb-2 overflow-auto max-h-[calc(300px-4rem)]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <p>No low stock items</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-800 pb-4 last:border-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/80 text-black"
                    onClick={() => onReorder(item.id)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                    Reorder
                  </Button>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">
                    {item.currentQuantity} / {item.reorderThreshold} units
                  </span>
                  <span className="text-sm font-medium text-[#B37A1A]">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <Progress
                  value={calculateStockPercentage(
                    item.currentQuantity,
                    item.reorderThreshold,
                  )}
                  className="h-1.5 bg-gray-700"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;
