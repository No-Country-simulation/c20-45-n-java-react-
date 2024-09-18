import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import ApiService from "../../config/ApiService";

interface Prestacion {
    id_prestacion: number;
    nombrePrest: string;
    descripcionPrest: string;
    caracteristicasPrest: string;
    precio: number;
    duracion: number;
    zona: string;
}

export default function ListCard() {
    const [isContract, setIsContract] = useState(false);
    const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
    const userId = localStorage.getItem("userId");

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
    }, []);

    const handleContract = async (prestacion: Prestacion) => {
        if (isContract) {
            // Eliminar turno
            try {
                await ApiService.deleteTurno(prestacion.id_prestacion); // Necesitas el ID del turno para eliminarlo
                console.log("Turno eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar turno:", error);
            }
        } else {
            // Crear turno
            console.log("ID_prestacion", prestacion)
            const turno = {
                fecha: new Date().toISOString().split('T')[0],
                hora: new Date().toISOString().split('T')[1].substring(0, 5),
                cliente: {
                    id: 1,
                },
                prestador: {
                    id: 2,
                },
                prestacion: {
                    id_prestacion: prestacion.id_prestacion
                }
            };

            console.log(turno);
            try {
                await ApiService.createTurno(turno);
                console.log("Turno creado correctamente");
            } catch (error) {
                console.error("Error al crear turno:", error);
            }
        }

        setIsContract(!isContract);

    };
    return (
        <div>
            {prestaciones.length > 0 ? (
                prestaciones.map((prestacion) => (
                    <Card
                        key={prestacion.id_prestacion}
                        className="h-2/4 w-[600px] bg-slate-700 my-4"
                        shadow="sm"
                        isBlurred
                    ><CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" src="" />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{prestacion.nombrePrest}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">Zona: {prestacion.zona}</h5>
                                </div>
                            </div>
                            <Button
                                className={isContract ? "bg-red-800 text-black border-default-200" : ""}
                                color={isContract ? "danger" : "primary"}
                                radius="full"
                                size="sm"
                                variant={isContract ? "bordered" : "solid"}
                                onPress={() => handleContract(prestacion)}
                            >
                                {isContract ? "Cancelar" : "Contratar"}
                            </Button>
                        </CardHeader>

                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <h2 className="text-small font-semibold leading-none text-default-600">{prestacion.nombrePrest}</h2>
                            <span className="pt-2">
                                <p>
                                    {prestacion.descripcionPrest}
                                </p>
                            </span>
                            <span className="pt-2">
                                <p>
                                    {prestacion.caracteristicasPrest}
                                </p>
                            </span>
                        </CardBody>
                        <CardFooter className="grid grid-cols-3">
                            <div className="flex gap-1 ">
                                <p className="font-semibold text-default-400 text-small">Costo:</p>
                                <p className=" text-default-400 text-small">$</p>
                                <p className="font-semibold text-default-400 text-small ml-3">{prestacion.precio}</p>
                            </div>
                            <div className="flex col-start-3 gap-1">
                                <p className="font-semibold text-default-400 text-small">Duracion:</p>
                                <p className="font-semibold text-default-400 text-small ml-3">{prestacion.duracion} horas</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p>No hay prestaciones disponibles</p>
            )}
        </div>
    )
}