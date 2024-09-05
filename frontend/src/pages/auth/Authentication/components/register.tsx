import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../../../export-components';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { TbEyeFilled, TbTooltip } from "react-icons/tb";
import { FaEyeSlash } from "react-icons/fa";
import { Select, SelectItem } from '@nextui-org/select';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es requerido'),
    lastname: Yup.string().required('Apellido es requerido'),
    email: Yup.string().email('Correo invalido').required('Email es requerido'),
    password: Yup.string().min(6, 'Contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'La contraseña debe coincidir')
        .required('Confirmación de contraseña requerida'),
    role: Yup.string().oneOf(['owner', 'caregiver'], 'Rol es requerido').required('Rol es requerido'),
});

const roles = [
    { key: "owner", label: "Dueño" },
    { key: "caregiver", label: "Cuidador" },
];

export default function RegistrationForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (values: FormValues) => {
        // Handle form submission
    };

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <div className='flex justify-between'>
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type="text"
                                name='name'
                                variant='faded'
                                radius='md'
                                label="Ingrese tu nombre"
                                className="max-w-72 mt-2"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        </div>
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type="text"
                                name='lastname'
                                variant='faded'
                                radius='md'
                                label="Ingrese tu apellido"
                                className="max-w-72 mt-2"
                            />
                            <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />

                        </div>
                    </div>

                    <div>
                        <Field
                            as={Input}
                            type="email"
                            name='email'
                            variant='faded'
                            radius='md'
                            label="Ingrese tu correo electrónico"
                            className="mt-2"
                            endContent={<MdOutlineAttachEmail />}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                    </div>

                    <div className='flex justify-between'>
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type={isVisible ? "text" : "password"}
                                name="password"
                                variant='faded'
                                radius='md'
                                label="Ingresa Contraseña"
                                className="max-w-72 mt-2"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        </div>
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type={isVisible ? "text" : "password"}
                                name="confirmPassword"
                                variant='faded'
                                radius='md'
                                label="Confirmar Contraseña"
                                className="max-w-72 mt-2"
                                endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <TbEyeFilled />
                                    )}
                                </button>}
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

                        </div>
                    </div>

                    <div className='w-full'>
                        <Field
                            as={Select}
                            name="role"
                            label="Selecciona tu Pata Rol"
                            className="max-w-72 mt-2 text-black"
                            color='primary'
                            onChange={(e: any) => setFieldValue("role", e.target.value)}
                        >
                            {roles.map(rol => (
                                <SelectItem key={rol.key} value={rol.key}>
                                    {rol.label}
                                </SelectItem>
                            ))}
                        </Field>
                        <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />

                    </div>


                    <div className='flex justify-center'>
                        <Button type="submit" color="success" disabled={isSubmitting} className="w-52 mt-2">Crea tu cuenta</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
