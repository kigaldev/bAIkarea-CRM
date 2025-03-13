import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Bike, Calendar as CalendarIcon } from "lucide-react";

const AppointmentCalendar: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [view, setView] = React.useState<"day" | "week">("day");

  // Mock appointments data
  const appointments = [
    {
      id: "1",
      time: "9:00 AM",
      customer: "Juan Pérez",
      service: "Tune-Up",
      bike: "Trek Domane SL 5",
      technician: "Carlos Rodríguez",
    },
    {
      id: "2",
      time: "10:30 AM",
      customer: "María García",
      service: "Brake Adjustment",
      bike: "Specialized Rockhopper",
      technician: "Ana Martínez",
    },
    {
      id: "3",
      time: "2:00 PM",
      customer: "David López",
      service: "Wheel Truing",
      bike: "Cannondale SuperSix",
      technician: "Carlos Rodríguez",
    },
  ];

  return (
    <div className="flex h-screen bg-[#101010] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="appointments" />
        <main className="flex-1 overflow-auto p-6">
          <div className="container mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Calendario de Citas</h1>
              <div className="flex space-x-4">
                <Select
                  value={view}
                  onValueChange={(value: "day" | "week") => setView(value)}
                >
                  <SelectTrigger className="w-[180px] bg-[#1A1A1A] border-[#333333] text-white">
                    <SelectValue placeholder="Vista" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333333] text-white">
                    <SelectItem value="day">Vista Diaria</SelectItem>
                    <SelectItem value="week">Vista Semanal</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#FFEC5C] hover:bg-[#FFEC5C]/90 text-black">
                  Nueva Cita
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#101010] border-[#333333]">
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <CardTitle className="text-xl font-bold text-white flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-[#FFEC5C]" />
                      {date?.toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-[#333333] bg-[#1A1A1A] p-3"
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-[#101010] border-[#333333]">
                  <CardHeader className="pb-2 border-b border-[#333333]">
                    <CardTitle className="text-xl font-bold text-white">
                      Citas del Día
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-[#333333]">
                      {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="p-4 hover:bg-[#1A1A1A] transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Badge className="bg-[#FFEC5C]/20 text-[#FFEC5C]">
                                {appointment.time}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-white">
                                  {appointment.customer}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Bike className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-white">
                                  {appointment.bike}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400">
                                {appointment.service} • {appointment.technician}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-400">
                          No hay citas programadas para este día
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
