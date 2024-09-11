import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import { Button, Input } from "../../../export-components";
import { Select, SelectItem } from '@nextui-org/select';
import { Textarea } from "@nextui-org/input";
import latam_paises from "./latam_paises.json"
import ApiService from "../../../config/ApiService";


interface FormValues {
    nombre: string;
    raza: string;
    edad: string;
    sexo: string;
    condiciones: string;
    vacunas: string;
    comportamiento: string;
    dieta: string;
}

const validationSchema = Yup.object({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    raza: Yup.string().required('La raza es obligatoria'),
    edad: Yup.number().integer().positive().required('La edad es obligatoria'),
    sexo: Yup.string().required('El sexo es obligatorio'),
    condiciones: Yup.string().required('Las condiciones médicas son obligatorias'),
    vacunas: Yup.string().required('Las vacunas son obligatorias'),
    comportamiento: Yup.string().required('El comportamiento es obligatorio'),
    dieta: Yup.string().required('La dieta es obligatoria')
});

export default function Profile_Mascota() {


    const handleSubmit = async (values: FormValues) => {
        try {
            await ApiService.createMascota(values);
            alert('Mascota creada con éxito');
        } catch (error) {
            console.error('Error al crear la mascota:', error);
            alert('Error al crear la mascota');
        }
    };

    return (
        <Formik
            initialValues={{
                nombre: '',
                raza: '',
                edad: '',
                sexo: '',
                condiciones: '',
                vacunas: '',
                comportamiento: '',
                dieta: '',
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