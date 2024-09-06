import { Formik, Field, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";


const validationSchema = Yup.object({
    cost: Yup.number().required('Costo requerido'),
    // Add other field validations as necessary
});

export default function RideDog() {
    return (
        <Formik
            initialValues={{
                days: [],
                time: '',
                zone: '',
                cost: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Handle form submission
                console.log(values);
            }}
        >
            {({ values, handleChange }) => (
                <Form>

                    <div className="flex justify-center">
                        <Card className="w-[250px] space-y-5 p-4 bg-slate-500" radius="lg">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                                <p className="uppercase font-bold">Disponibilidad </p>
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                                        <label key={day}>
                                            <Field type="checkbox" name="days" value={day} />
                                            {day}
                                        </label>
                                    ))}´
                                </div>
                            </CardBody>
                        </Card>

                        <Spacer x={6} />

                        <Card className="w-[290px] h-[180px] space-y-5 p-4 bg-slate-500" radius="lg">

                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                                <p className="uppercase font-bold">Horario </p>
                            </CardHeader>

                            <CardBody>
                                <div className="grid grid-cols-2 gap-4">
                                    {['08:00 - 09:30', '10:00 - 11:30', '13:30 - 15:00', '15:30 - 17:00'].map((timeSlot) => (
                                        <label key={timeSlot}>
                                            <Field type="radio" name="time" value={timeSlot} />
                                            {timeSlot}
                                        </label>
                                    ))}
                                </div>
                            </CardBody>

                        </Card>

                        <Spacer x={6} />

                        <Card className="w-[190px] h-[180px] space-y-5 p-4 bg-slate-500" radius="lg">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                                <p className="uppercase font-bold text-xs">Zona de la ciudad </p>
                            </CardHeader>

                            <CardBody>
                                <div className='grid justify-center'>
                                    {['Norte', 'Centro', 'Sur'].map((zone) => (
                                        <label key={zone}>
                                            <Field type="radio" name="zone" value={zone} />
                                            {zone}
                                        </label>
                                    ))}
                                </div>
                            </CardBody>

                        </Card>

                        <Spacer x={6} />

                        <Card className="w-[120px] h-[180px] space-y-5 p-4 bg-slate-500" radius="lg">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                                <p className="uppercase font-bold text-xs">Costo </p>
                            </CardHeader>
                            <CardBody>
                                <Field type="number" name="cost" />
                            </CardBody>

                        </Card>
                    </div>
                    <Spacer y={10} />
                    <div className='flex justify-center'>
                        <Card className="w-[450px] h-[250px] space-y-5 p-4 bg-slate-500" radius="lg">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                                <p className="uppercase font-bold text-xs">Resumen </p>
                                <div className='grid grid-cols-4 gap-14 mt-2'>
                                    <small className="uppercase font-extrabold ">Dia</small>
                                    <small className="uppercase font-extrabold">Hora</small>
                                    <small className="uppercase font-extrabold">Sector</small>
                                    <small className="uppercase font-extrabold">Costo</small>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className='grid grid-cols-4 gap-1 '>
                                    <p>{values.days.join(', ')}</p>
                                    <p>{values.time}</p>
                                    <p>{values.zone}</p>
                                    <p>{values.cost ? `$${values.cost}` : ''}</p>
                                </div>
                            </CardBody>

                        </Card>
                        <button type="submit">Guardar</button>
                    </div>



                </Form>
            )
            }
        </Formik >
    );
};

;
