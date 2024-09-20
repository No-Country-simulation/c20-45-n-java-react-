import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import ApiService from "../../config/ApiService";
import { useNavigate } from "react-router";
import { PiStarThin } from "react-icons/pi";
import { Divider } from "@nextui-org/divider";

interface Prestacion {
  id_prestacion: number;
  nombrePrest: string;
  descripcionPrest: string;
  caracteristicasPrest: string;
  precio: number;
  duracion: number;
  zona: string;
  prestador: {
    id: number;
    nombre: string;
    apellido: string;
    calificacion: string;

  };
}

interface Turno {
  id_turno: number;
  fecha: string;
  hora: string;
  cliente: { id: number };
  prestador: { id: number };
  prestacion: { id_prestacion: number };
}

export default function ListCard() {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestaciones = async () => {
      try {
        const data = await ApiService.getPrestaciones();
        setPrestaciones(data as Prestacion[]);
      } catch (error) {
        console.error("Error al obtener prestaciones:", error);
      }
    };
    fetchPrestaciones();

    const fetchTurnos = async () => {
      try {
        const data = await ApiService.getTurnosByCliente(userId);
        setTurnos(data as Turno[]);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };
    fetchTurnos();
  }, []);

  const handleContract = async (prestacion: Prestacion) => {
    const turno = {
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toISOString().split("T")[1].substring(0, 5),
      cliente: {
        id: 1,
      },
      prestador: {
        id: 2,
      },
      prestacion: {
        id_prestacion: prestacion.id_prestacion,
      },
    };

    try {
      await ApiService.createTurno(turno);
      alert("El turno ha sido creado exitosamente.");
      navigate("/reserva");
    } catch (error) {
      console.error("Error al crear turno:", error);
      alert("Ha ocurrido un error al crear el turno.");
    }

    setSelectedCardId(
      selectedCardId === prestacion.id_prestacion
        ? null
        : prestacion.id_prestacion
    );
  };

  return (
    <Card className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 bg-orange-100 h-full w-full p-5">
      {prestaciones.length > 0 ? (
        prestaciones.map((prestacion) => (
          <Card
            key={prestacion.id_prestacion}
            className="bg-slate-800 "
            style={{ height: "300px", width: "auto" }}
            shadow="sm"
            isBlurred
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-100">
                    {prestacion.prestador[0].nombre}{" "}
                    {prestacion.prestador[0].apellido}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-100">
                    Zona: {prestacion.zona}
                  </h5>
                </div>
              </div>
              <Button
                className={
                  selectedCardId === prestacion.id_prestacion
                    ? "bg-red-800 text-white"
                    : ""
                }
                color={
                  selectedCardId === prestacion.id_prestacion
                    ? "danger"
                    : "primary"
                }
                radius="full"
                size="sm"
                variant={
                  selectedCardId === prestacion.id_prestacion
                    ? "bordered"
                    : "solid"
                }
                onPress={() => handleContract(prestacion)}
              >
                {selectedCardId === prestacion.id_prestacion
                  ? "Cancelar Contrato"
                  : "Contratar"}
              </Button>
            </CardHeader>

            <Divider className="bg-white" />

            <CardBody className="px-3 py-0 text-small text-default-100 mt-3">
              <h2 className="text-small font-semibold leading-none text-default-100">
                {prestacion.nombrePrest}
              </h2>
              <span className="pt-2">
                <p>{prestacion.descripcionPrest}</p>
              </span>
              <span className="pt-2">
                <p>{prestacion.caracteristicasPrest}</p>
              </span>
             
            </CardBody>

            <Divider className="bg-white"/>

            <CardFooter className="grid grid-cols-2">
              <div className="flex gap-1 ">
                <p className="font-semibold text-default-100 text-small">
                  Costo:
                </p>
                <p className=" text-default-100 text-small">$</p>
                <p className="font-semibold text-default-100 text-small ml-3">
                  {prestacion.precio}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-100 text-small">
                  Calificación:
                </p>
                <p className="font-semibold text-default-100 text-small ml-3">
                  {prestacion.prestador[0].calificacion}
                </p>
                <PiStarThin color="white" size={20} />
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No hay prestaciones disponibles</p>
      )}
    </Card>
  );
}