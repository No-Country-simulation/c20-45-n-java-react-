import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { FaEyeSlash } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import apiClient from '../../../../config/axiosConfig';

interface LoginValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo invalido').required('Correo invalido'),
    password: Yup.string().required('Contraseña requerida').min(6, 'Mínimo 6 caracteres'),
});

export default function LoginForm() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (values: LoginValues) => {
        try {
            const response = await apiClient.post('/login', values); 
            localStorage.setItem('token', response.data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <Field name="email">
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    type="email"
                                    variant='faded'
                                    radius='md'
                                    label="Ingrese tu correo electrónico"
                                    className="mt-3"
                                    endContent={<MdOutlineAttachEmail />}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <Field name="password">
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    type={isVisible ? "text" : "password"}
                                    variant='faded'
                                    radius='md'
                                    label="Ingrese su contraseña"
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
