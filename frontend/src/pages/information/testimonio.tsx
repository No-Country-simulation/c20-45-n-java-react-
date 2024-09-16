import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

function Testimonios() {
    return (
        <Card className="py-4 bg-white flex w-4/5 p-8 flex-col h-full">
            <h1 className="text-3xl font-bold text-center mb-6">Testimonios</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="bg-green-200 shadow-md hover:shadow-lg transition duration-300">
                        <CardBody className="p-6">
                            <p className="text-gray-700 mb-4">
                                "Excelente atención al cliente y cuidado de mis mascotas."
                            </p>
                            <span className="text-sm text-gray-500 block">Juan Pérez</span>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Card>
    );
}

export default Testimonios;
