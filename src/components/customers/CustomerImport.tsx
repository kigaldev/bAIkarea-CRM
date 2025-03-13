import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { t } from "@/lib/i18n";

interface CustomerImportProps {
  onImport?: (data: any[]) => void;
}

const CustomerImport: React.FC<CustomerImportProps> = ({
  onImport = () => {},
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImportStatus(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setImportStatus(null);

    // Simulate file processing
    setTimeout(() => {
      // This is a mock implementation
      // In a real app, you would parse the CSV/Excel file here
      const mockData = [
        {
          name: "Juan Pérez",
          phone: "612345678",
          email: "juan@example.com",
          address: "Calle Mayor 123, Madrid",
        },
        {
          name: "María García",
          phone: "623456789",
          email: "maria@example.com",
          address: "Avenida Principal 45, Barcelona",
        },
      ];

      onImport(mockData);
      setImporting(false);
      setImportStatus({
        success: true,
        message: `Importados 2 clientes correctamente`,
      });
      setFile(null);
    }, 2000);
  };

  const downloadTemplate = () => {
    // In a real app, this would generate and download a CSV template
    const csvContent =
      "Nombre,Teléfono,Email,Dirección\nJuan Pérez,612345678,juan@example.com,Calle Mayor 123 Madrid\nMaría García,623456789,maria@example.com,Avenida Principal 45 Barcelona";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "plantilla_clientes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full h-full bg-[#101010] border-[#333333] overflow-hidden">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-xl font-bold text-white">
          {t("importCustomers")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">{t("importInstructions")}</p>
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="border-[#333333] text-white hover:bg-[#1A1A1A]"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("downloadTemplate")}
            </Button>
          </div>

          <div className="border-2 border-dashed border-[#333333] rounded-lg p-6 text-center">
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-12 w-12 text-[#FFEC5C] mb-4" />
              <span className="text-white font-medium mb-1">
                {file ? file.name : t("uploadFile")}
              </span>
              <span className="text-sm text-gray-400">
                {file
                  ? `${(file.size / 1024).toFixed(2)} KB`
                  : "CSV, Excel (.xlsx, .xls)"}
              </span>
            </Label>
          </div>

          {importStatus && (
            <Alert
              className={`border ${importStatus.success ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}
            >
              <div className="flex items-center gap-2">
                {importStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription
                  className={
                    importStatus.success ? "text-green-500" : "text-red-500"
                  }
                >
                  {importStatus.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black"
            >
              {importing ? "Importando..." : t("importCustomers")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerImport;
