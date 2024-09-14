import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Button, Input } from "../../../export-components";
import { Select, SelectItem } from '@nextui-org/select';
import { Textarea } from "@nextui-org/input";
import latam_paises from "./latam_paises.json"
import ApiService from "../../../config/ApiService";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

interface City {
    key: string;
    label: string;
}

interface User {
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

export default function Profile_Client() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cityOptions, setCityOptions] = useState<City[]>([]);
    const [imageUrl, setImageUrl] = useState(null);


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
                setUser(response);
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

    const handleSubmit = async (values: User) => {
        const clienteId = localStorage.getItem("clienteId");

        if (!clienteId) {
            console.error('No se encontró ID de cliente');
            return;
        }

        const perfil = {
            ...values,
            fotoUrl: imageUrl,
        };
        try {
            const response = await ApiService.updateCliente(clienteId, perfil);
            console.log('Cliente actualizado con éxito:', response.data);
        } catch (error) {
            console.error('Error actualizando cliente:', error.response?.data || error.message);
        }
    };

    return (
        <Formik
            initialValues={{
                nombre: user?.nombre || '',
                apellido: user?.apellido || '',
                email: user?.email || '',
                dni: user?.dni || '',
                experiencia_previa: user?.experiencia_previa || '',
                certificaciones: user?.certificaciones || '',
                pais: user?.pais || '',
                ciudad: user?.ciudad || '',
                telefono: user?.telefono || '',
                foto: user?.foto || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
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
                                    name='telefonoemerg'
                                    variant='faded'
                                    radius='md'
                                    label="Teléfono Emergencia"
                                    className="mt-2 mr-2"

                                />
                                <ErrorMessage name="telefonoemerg" component="div" className="text-red-500 text-sm" />
                            </div>
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
                        name='direccion'
                        variant='faded'
                        radius='md'
                        label="Dirección"
                        className=" mt-2"
                    />

                    <Field
                        as={Textarea}
                        type="text"
                        name='preferencia'
                        variant='faded'
                        radius='md'
                        label="Preferencia de servicio o comentarios"
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