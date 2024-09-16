import React from 'react';
import { Card, CardFooter, CardHeader } from '@nextui-org/react';

function QuienesSomos() {
    const teamMembers = [
        { name: 'Daiana Palacios', role: 'Fundador y Director' },
        { name: 'Gaston Herrmann', role: 'Veterinario' },
        { name: 'Gabriel Romero', role: 'Cuidador principal' },
        { name: 'Antony Tenorio', role: 'Adminitrador de Pagina' }
    ];

    return (
        <Card className="py-4 bg-white flex w-4/5 p-8 flex-col h-full">
            <h1 className="text-3xl font-bold text-center mb-6">Quiénes somos</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                    <Card key={index} className="bg-white shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
                                {/* Add initials or icon here */}
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                        </CardHeader>
                        <CardFooter className="pt-0 pb-2 flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Conocer más
                            </button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Card>
    );
}

export default QuienesSomos;
