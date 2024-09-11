import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import { Button, Input } from "../../../export-components";
import { Select, SelectItem } from '@nextui-org/select';
import { Textarea } from "@nextui-org/input";
import latam_paises from "./latam_paises.json"
import ApiService from "../../../config/ApiService";

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

export default function Profile_Cu() {
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

    const handleSubmit = async (values: FormValues) => {
        const clienteId = localStorage.getItem("clienteId");
        if (!clienteId) {
            console.error('No se encontró ID de cliente');
            return;
        }

        try {
            const response = await ApiService.updateCliente(clienteId, values);
            console.log('Cliente actualizado con éxito:', response.data);
        } catch (error) {
            console.error('Error actualizando cliente:', error.response?.data || error.message);
        }
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
                        Información personal
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
                                    name='apellido'
                                    variant='faded'
                                    radius='md'
                                    label="Apellido"
                                    className=" mt-2 mr-2"
                                />
                                <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                        <div className='w-full'>
                            <Field
                                as={Input}
                                type="text"
                                name='email'
                                variant='faded'
                                radius='md'
                                label="Correo"
                                className="w-full mt-2"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className='flex'>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='dni'
                                    variant='faded'
                                    radius='md'
                                    label="DNI"
                                    className="mt-2 mr-2"
                                />
                                <ErrorMessage name="dni" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='telefono'
                                    variant='faded'
                                    radius='md'
                                    label="Teléfono"
                                    className="mt-2 mr-2"
                                />
                                <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-full'>
                                <Field
                                    as={Select}
                                    name="pais"
                                    label="País"
                                    className="mt-2 text-black"
                                    color='primary'
                                    onChange={handleCountryChange}
                                >
                                    {latam_paises.countries.map(p => (
                                        <SelectItem key={p.key} value={p.key}>
                                            {p.label}
                                        </SelectItem>
                                    ))}
                                </Field>
                                <ErrorMessage name="pais" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full'>
                                <Field
                                    as={Select}
                                    name="ciudad"
                                    label="Ciudad"
                                    className="mt-2 mr-2 text-black"
                                    color='primary'
                                    disabled={!selectedCountry}
                                >
                                    {cityOptions.map((c) => (
                                        <SelectItem key={c.key} value={c.key}>
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </Field>
                                <ErrorMessage name="ciudad" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>
                    </div>

                    <Field
                        as={Textarea}
                        type="text"
                        name='experiencia_previa'
                        variant='faded'
                        radius='md'
                        label="Experiencia previa"
                        className=" mt-2"
                    />

                    <Field
                        as={Textarea}
                        type="text"
                        name='certificaciones'
                        variant='faded'
                        radius='md'
                        label="Certificaciones o Capacitación"
                        className="mt-2"
                    />

                    <div className="flex justify-center mt-4">
                        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                            {isSubmitting ? "Guardando..." : "Guardar"}
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
    );

}