import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "../layout/AppContext";

const Settings: React.FC = () => {
  const { language, setAppLanguage } = useAppContext();
  const [activeTab, setActiveTab] = React.useState("general");

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="settings" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-[600px] grid-cols-3 bg-[#1A1A1A]">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-[#FFEC5C] data-[state=active]:text-black"
                >
                  Usuarios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6">
                <Card className="bg-[#101010] border-[#333333]">
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <CardTitle className="text-xl font-bold text-white">
                      Configuración General
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="shop-name">Nombre del Taller</Label>
                      <Input
                        id="shop-name"
                        defaultValue="BikeFixPro"
                        className="bg-[#1A1A1A] border-[#333333] text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-address">Dirección</Label>
                      <Input
                        id="shop-address"
                        defaultValue="Calle Mayor 123, Madrid"
                        className="bg-[#1A1A1A] border-[#333333] text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-phone">Teléfono</Label>
                      <Input
                        id="shop-phone"
                        defaultValue="+34 612 345 678"
                        className="bg-[#1A1A1A] border-[#333333] text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-email">Email</Label>
                      <Input
                        id="shop-email"
                        defaultValue="info@bikefixpro.com"
                        className="bg-[#1A1A1A] border-[#333333] text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="language">Idioma</Label>
                        <div className="text-sm text-gray-400">
                          Cambiar el idioma de la aplicación
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${language === "es" ? "bg-[#FFEC5C] text-black" : "bg-[#1A1A1A] text-white"} border-[#333333]`}
                          onClick={() => setAppLanguage("es")}
                        >
                          🇪🇸 Español
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${language === "en" ? "bg-[#FFEC5C] text-black" : "bg-[#1A1A1A] text-white"} border-[#333333]`}
                          onClick={() => setAppLanguage("en")}
                        >
                          🇬🇧 English
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black">
                        Guardar Cambios
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card className="bg-[#101010] border-[#333333]">
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <CardTitle className="text-xl font-bold text-white">
                      Configuración de Notificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por Email</Label>
                        <div className="text-sm text-gray-400">
                          Enviar notificaciones por email a los clientes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por WhatsApp</Label>
                        <div className="text-sm text-gray-400">
                          Enviar notificaciones por WhatsApp a los clientes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Recordatorios de Mantenimiento</Label>
                        <div className="text-sm text-gray-400">
                          Enviar recordatorios de mantenimiento a los clientes
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Alertas de Stock Bajo</Label>
                        <div className="text-sm text-gray-400">
                          Recibir alertas cuando el stock esté bajo
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black">
                        Guardar Cambios
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <Card className="bg-[#101010] border-[#333333]">
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <CardTitle className="text-xl font-bold text-white">
                      Gestión de Usuarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <Button className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black">
                          Añadir Usuario
                        </Button>
                      </div>

                      <div className="rounded-md border border-[#333333] overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#1A1A1A] border-b border-[#333333]">
                              <th className="text-left p-3 text-[#777777]">
                                Nombre
                              </th>
                              <th className="text-left p-3 text-[#777777]">
                                Email
                              </th>
                              <th className="text-left p-3 text-[#777777]">
                                Rol
                              </th>
                              <th className="text-right p-3 text-[#777777]">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-[#333333]">
                              <td className="p-3 text-white">Admin</td>
                              <td className="p-3 text-white">
                                admin@bikefixpro.com
                              </td>
                              <td className="p-3 text-white">Administrador</td>
                              <td className="p-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#FFEC5C]"
                                >
                                  Editar
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b border-[#333333]">
                              <td className="p-3 text-white">
                                Carlos Rodríguez
                              </td>
                              <td className="p-3 text-white">
                                carlos@bikefixpro.com
                              </td>
                              <td className="p-3 text-white">Técnico</td>
                              <td className="p-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#FFEC5C]"
                                >
                                  Editar
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 text-white">Ana Martínez</td>
                              <td className="p-3 text-white">
                                ana@bikefixpro.com
                              </td>
                              <td className="p-3 text-white">Técnico</td>
                              <td className="p-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#FFEC5C]"
                                >
                                  Editar
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
