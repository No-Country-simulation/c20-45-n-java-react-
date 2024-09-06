import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { TbEyeFilled } from "react-icons/tb";
import { FaEyeSlash } from "react-icons/fa";
import { Select, SelectItem } from '@nextui-org/select';
import apiClient from '../../../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';




interface FormValues {
    usuario: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

const validationSchema = Yup.object().shape({
    usuario: Yup.string().required('Usuario es requerido'),
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
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isVisibleC, setIsVisibleC] = useState(false);
    const toggleVisibilityC = () => setIsVisibleC(!isVisibleC);
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues) => {



        try {
            const response = await apiClient.post('/create', values);
            console.log("OK pasamos", values)
            navigate('/acceder');
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <Formik
            initialValues={{
                usuario: '',
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
                        <Field
                            as={Input}
                            type="text"
                            name='usuario'
                            variant='faded'
                            radius='md'
                            label="Usuario"
                            className="max-w-72 mt-2"
                        />
                        <ErrorMessage name="usuario" component="div" className="text-red-500 text-sm" />
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type="text"
                                name='name'
                                variant='faded'
                                radius='md'
                                label="Nombre"
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
                                label="Apellido"
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
                            label="Correo electrónico"
                            className="mt-2"
                            endContent={<MdOutlineAttachEmail />}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                    </div>

                    <div className='flex justify-between'>
                        <div className='w-full'>

                            <Field name="password">
                                {({ field }: any) => (
                                    <Input
                                        {...field}
                                        type={isVisible ? "text" : "password"}
                                        variant='faded'
                                        radius='md'
                                        label="Contraseña"
                                        className="mt-3"
                                        endContent={
                                            <button
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                                aria-label="toggle password visibility"
                                            >
                                                {isVisible ? <FaEyeSlash /> : <TbEyeFilled />}
                                            </button>
                                        }
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        </div>
                        <div className='w-full'>
                            <Field
                                as={Input}
                                type={isVisibleC ? "text" : "password"}
                                name="confirmPassword"
                                variant='faded'
                                radius='md'
                                label="Confirmar Contraseña"
                                className="mt-3"
                                endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibilityC} aria-label="toggle password visibility">
                                    {isVisibleC ? (
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
