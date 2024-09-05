import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import { Button, Input } from "../../../export-components";
import { Select, SelectItem } from '@nextui-org/select';
import { Textarea } from "@nextui-org/input";
import latam_paises from "./latam_paises.json"

interface City {
    key: string;
    label: string;
}

interface FormValues {
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    experiencia_previa: string;
    certificaciones: string;
    pais: string;
    ciudad: string;
    telefono: string;
    foto: string;
}

const validationSchema = Yup.object({});

export default function Profile_Mascota() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cityOptions, setCityOptions] = useState<City[]>([]);

    const handleCountryChange = (e: any) => {
        const selectedCountryKey = e.target.value;
        setSelectedCountry(selectedCountryKey);

        const selectedCountryObj = latam_paises.countries.find(c => c.key === selectedCountryKey);
        if (selectedCountryObj) {
            setCityOptions(selectedCountryObj.cities);
        } else {
            setCityOptions([]);
        }
    };

    const handleSubmit = (values: FormValues) => {
        // Handle form submission
    };

    return (
        <Formik
            initialValues={{
                nombre: '',
                apellido: '',
                email: '',
                dni: '',
                experiencia_previa: '',
                certificaciones: '',
                pais: '',
                ciudad: '',
                telefono: '',
                foto: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <div className="flex justify-center font-extrabold text-xl font-mono">
                        Información de tu mascota
                    </div>
                    <div className="w-8/12">
                        <div className='flex'>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='nombre'
                                    variant='faded'
                                    radius='md'
                                    label="Nombre"
                                    className=" mt-2 mr-2"
                                />
                                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='raza'
                                    variant='faded'
                                    radius='md'
                                    label="Raza"
                                    className=" mt-2 mr-2"
                                />
                                <ErrorMessage name="raza" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='edad'
                                    variant='faded'
                                    radius='md'
                                    label="Edad"
                                    className="w-full mt-2"
                                />
                                <ErrorMessage name="edad" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='sexo'
                                    variant='faded'
                                    radius='md'
                                    label="Genero"
                                    className="mt-2 mr-2"
                                />
                                <ErrorMessage name="sexo" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                    </div>

                    <div className='flex'>
                        <Field
                            as={Textarea}
                            type="text"
                            name='condiciones'
                            variant='faded'
                            radius='md'
                            label="Condiciones médicas"
                            className=" mt-2"
                        />

                        <Field
                            as={Textarea}
                            type="text"
                            name='vacunas'
                            variant='faded'
                            radius='md'
                            label="Vacunas"
                            className="mt-2"
                        />
                    </div>

                    <div className='flex'>
                        <Field
                            as={Textarea}
                            type="text"
                            name='comportamiento'
                            variant='faded'
                            radius='md'
                            label="Comportamiento"
                            className=" mt-2"
                        />

                        <Field
                            as={Textarea}
                            type="text"
                            name='dieta'
                            variant='faded'
                            radius='md'
                            label="Dieta"
                            className="mt-2"
                        />
                    </div>

                    <div className='flex justify-center'>
                        <Button type="submit" color="success" disabled={isSubmitting} className="w-52 mt-2">Guardar cambios</Button>
                    </div>

                </Form>
            )}
        </Formik>
    );

}