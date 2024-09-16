import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

function Servicios() {
    return (
        <Card className="py-4 bg-white flex w-4/5 p-8 flex-col h-full">

            <div className='grid grid-cols-2'>
                <h1 className="text-3xl font-bold text-center mb-6">Servicios</h1>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-44"  > Reservar</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="bg-gray-100 hover:bg-gray-200 transition duration-300">
                        <CardHeader className="flex items-center justify-between p-4">
                            <h3 className="font-semibold">{`Servicio ${index + 1}`}</h3>
                            
                        </CardHeader>
                        <CardBody className="p-4">
                            <ul className="space-y-2">
                                <li>Paseos</li>
                                <li>Cuidado de día</li>
                                <li>Consulta veterinaria</li>
                            </ul>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Card>
    );
}

export default Servicios;
