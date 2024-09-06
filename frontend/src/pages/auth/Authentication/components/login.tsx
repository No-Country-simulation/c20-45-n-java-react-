import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import apiClient from '../../../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';


interface LoginValues {
    username: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Usuario requerido'),
    password: Yup.string().required('Contraseña requerida').min(6, 'Mínimo 6 caracteres'),
});

export default function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (values: LoginValues,) => {
        try {
            const response = await apiClient.post('/login', values);
            localStorage.setItem('token', response.data.token);
            navigate("/perfil-cliente");
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <Field name="username">
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    type="username"
                                    variant='faded'
                                    radius='md'
                                    label="Usuario"
                                    className="mt-3"
                                    endContent={<FaUser />}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

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
                    <div className='flex justify-center'>
                        <Button type="submit" color="success" disabled={isSubmitting} className="w-52 mt-3">
                            Iniciar sesión
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
