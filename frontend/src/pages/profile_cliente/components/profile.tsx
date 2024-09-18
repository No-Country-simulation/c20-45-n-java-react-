import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Input } from "../../../export-components";
import { Textarea } from "@nextui-org/input";
import ApiService from "../../../config/ApiService";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { Spinner } from "@nextui-org/spinner";

interface User {
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    observaciones: string;
    direccion: string;
    pais: string;
    ciudad: string;
    telefono: string;
    telefonoEmergencia: string;
    imagen: string;
}

interface Domicilio {
    direccion: string;
    pais: string;
    ciudad: string;
}

const validationSchema = Yup.object({});

export default function Profile_Client() {
    const [user, setUser] = useState<User | null>(null);
    const [domicilio, setDomicilio] = useState<Domicilio | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            if (!userId || !token) {
                console.error("No se encontró token o ID de usuario");
                return;
            }
            try {
                const response = await ApiService.getUserById(userId);
                console.log("Response", response.domicilio)
                setUser(response);
                setDomicilio(response.domicilio)
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleImageUploadSuccess = (url) => {
        setImageUrl(url);
        console.log("URL:", url)
    };

    const handleSubmit = async (values: User) => {
        const clienteId = localStorage.getItem("userId");

        if (!clienteId) {
            console.error('No se encontró ID de cliente');
            return;
        }

        console.log("Domicilio::", domicilio)
        console.log("values..", values)
        console.log("Imagen", imageUrl)

        const perfil = {
            nombre: values.nombre,
            apellido: values.apellido,
            email: values.email,
            dni: values.dni,
            observaciones: values.observaciones,
            domicilio: {
                direccion: values.direccion,
                pais: values.pais,
                ciudad: values.ciudad
            },
            telefono: values.telefono,
            telefonoEmergencia: values.telefonoEmergencia,
            imagen: "imageUrl"  
        };

        console.log("perfil..", perfil)
        try {
            const response = await ApiService.updateCliente(clienteId, perfil);
            console.log('Cliente actualizado con éxito:', response);
        } catch (error) {
            console.error('Error actualizando cliente:', error.response?.data || error.message);
        }
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                nombre: user?.nombre || '',
                apellido: user?.apellido || '',
                email: user?.email || '',
                dni: user?.dni || '',
                direccion: domicilio?.direccion || '',
                observaciones: user?.observaciones || '',
                pais: domicilio?.pais || '',
                ciudad: domicilio?.ciudad || '',
                telefono: user?.telefono || '',
                telefonoEmergencia: user?.telefonoEmergencia || '',
                imagen: user?.imagen || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className="m-1">
                    <div className="flex justify-center font-extrabold text-xl font-mono">
                        Información personal
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mt-2.5">
                            <ImageUpload onImageUploadSuccess={handleImageUploadSuccess} />
                        </div>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 sm:ml-1">
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='nombre'
                                    variant='faded'
                                    radius='md'
                                    label="Nombre"
                                    className=" mt-2 mr-2"
                                    initialValues={values.nombre}
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
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='dni'
                                    variant='faded'
                                    radius='md'
                                    label="DNI"
                                    readOnly
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
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='telefonoEmergencia'
                                    variant='faded'
                                    radius='md'
                                    label="Teléfono Emergencia"
                                    className="mt-2 mr-2"

                                />
                                <ErrorMessage name="telefonoEmergencia" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='pais'
                                    variant='faded'
                                    radius='md'
                                    label="Pais"
                                    className="mt-2 mr-2"
                                />
                                <ErrorMessage name="pais" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full'>
                                <Field
                                    as={Input}
                                    type="text"
                                    name='ciudad'
                                    variant='faded'
                                    radius='md'
                                    label="Ciudad"
                                    className="mt-2 mr-2"
                                />
                                <ErrorMessage name="ciudad" component="div" className="text-red-500 text-sm" />

                            </div>
                        </div>
                    </div>

                    <Field
                        as={Textarea}
                        type="text"
                        name='direccion'
                        variant='faded'
                        radius='md'
                        label="Dirección"
                        className=" mt-2"
                    />

                    <Field
                        as={Textarea}
                        type="text"
                        name='observaciones'
                        variant='faded'
                        radius='md'
                        label="Preferencia de servicio o comentarios"
                        className="mt-2"
                    />

                    <div className="flex justify-center mt-4">
                        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                            {isSubmitting ? (<Spinner className="mr-2" />) : null}
                            {isSubmitting ? "Guardando..." : "Guardar"}
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
    );

}