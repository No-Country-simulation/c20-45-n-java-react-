import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import ApiService from "../../config/ApiService";

interface Turno {
  id_turno: number;
  fecha: string;
  hora: string;
  cliente: { id: number; nombre: string; apellido: string };
  prestador: { id: number; nombre: string; apellido: string };
  prestacion: { id_prestacion: number; nombrePrest: string; precio: number };
}

export default function ListCard() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await ApiService.getTurnosByCliente(userId);
        console.log("TURNOS", data);
        setTurnos(data as Turno[]);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };
    fetchTurnos();
  }, []);

  //   const handleCancelReservation = async (turno: Turno) => {
  //     try {
  //       await ApiService.deleteTurno(turno.id_turno);
  //       alert("Reserva cancelada exitosamente.");
  //       // Refresh the list after cancellation
  //       const fetchTurnos = async () => {
  //         try {
  //           const data = await ApiService.getTurnosByCliente(userId);
  //           console.log("TURNOS", data);
  //           setTurnos(data as Turno[]);
  //         } catch (error) {
  //           console.error("Error al obtener turnos:", error);
  //         }
  //       };
  //       fetchTurnos();
  //     } catch (error) {
  //       console.error("Error al cancelar reserva:", error);
  //       alert("Ha ocurrido un error al cancelar la reserva.");
  //     }
  //   };

  console.log("TURNOS2", turnos);
  return (
    <Card className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 bg-gray-200 h-full w-full p-5">
      {turnos.length > 0 ? (
        turnos.map((turno) => (
          <Card
            key={turno.id_turno}
            className="h-48 w-full bg-white shadow-sm"
            shadow="sm"
            isBlurred
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-base font-semibold leading-none text-gray-800">
                    Cliente: {turno.cliente.nombre} {turno.cliente.apellido}
                  </h4>
                  <h5 className="text-xs tracking-tight text-gray-500">
                    Fecha: {turno.fecha}
                  </h5>
                  <h5 className="text-xs tracking-tight text-gray-500">
                    Hora: {turno.hora}
                  </h5>
                </div>
              </div>
              <Button
                color="danger"
                size="sm"
                variant="bordered"
                //onPress={() => handleCancelReservation(turno)}
              >
                Cancelar Reserva
              </Button>
            </CardHeader>

            <CardBody className="px-3 py-0 text-xs text-gray-500">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold leading-none text-gray-800">
                  Servicio: {turno.prestacion.nombrePrest}
                </h2>
                <p className="font-semibold text-gray-600">
                  Precio: ${turno.prestacion.precio}
                </p>
              </div>
            </CardBody>
            <CardFooter className="grid grid-cols-3">
              <div className="flex gap-1">
                <p className="font-semibold text-gray-500 text-xs">Estado:</p>
                <p className="text-gray-500 text-xs">{/* Add status here */}</p>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No tienes reservas</p>
      )}
    </Card>
  );
}