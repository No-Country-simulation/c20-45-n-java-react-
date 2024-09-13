import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../../../config/ApiService';


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
    const [error, setError] = useState("");
    const toggleVisibility = () => setIsVisible(!isVisible);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);


    const from = location.state?.from?.pathname || "/perfil-cliente";

    const handleSubmit = async (values: LoginValues) => {
        setIsLoading(true);
        try {
            console.log("User:", values.username)
            console.log("Contraseña:", values.password)
            const response = await ApiService.loginUser(values);
            console.log("Response:", response)

            if (response.status === true) {
                localStorage.setItem("token", response.token);
                console.log("Token", response.token);

                localStorage.setItem("role", response.role);
                console.log("Role", response.role);

                localStorage.setItem("userId", response.userId);
                console.log("USerId", response.userId);
                navigate(from, { replace: true });
            } else {
                throw new Error("Credenciales incorrectas");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error al iniciar sesión, intenta nuevamente");
            setTimeout(() => setError(""), 5000);
        } finally {
            setIsLoading(false);
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
                        <Button
                            type="submit"
                            color="success"
                            disabled={isSubmitting || isLoading}
                            className="w-52 mt-3">
                            {isLoading ? "Cargando..." : "Iniciar sesión"}
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </Form>
            )}
        </Formik>
    );
}
