import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';

function Galeria() {
    const images = [
        { img: "../../../src/pages/information/images/dog.png", alt: 'Mascota feliz en un paseo' },
        { img: "../../../src/pages/information/images/dog2.png", alt: 'Mascota feliz en un paseo' },
        { img: "../../../src/pages/information/images/paseadores.png", alt: 'Paseo múltiple' }
    ];

    return (
        <Card className="py-4 bg-white flex w-4/5 p-8 flex-col h-full">
            <h1 className="text-3xl font-bold text-center mb-6">Galería</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, index) => (
                    <Card key={index} className="bg-green-200 shadow-md hover:shadow-lg transition duration-300 p-3">
                        <CardBody className="overflow-visible p-0">
                            <img
                                src={img.img}
                                alt={img.alt}
                                className="h-[250px] w-full rounded-lg shadow-2xl "
                            />
                        </CardBody>
                        <CardFooter className="flex items-center pt-3 pb-3 justify-center">
                            <span className="text-xs text-gray-500">{img.alt}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Card>
    );
}

export default Galeria;
