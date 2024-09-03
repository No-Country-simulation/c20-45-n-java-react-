import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from './resource/EyeFilledIcon';
import { EyeSlashFilledIcon } from './resource/EyeSlashFilledIcon';



interface LoginValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (values: LoginValues, actions: any) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
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
                <><div>
                    <Input
                        type="email"
                        variant='faded'
                        radius='full'
                        label="Email"
                        name='Email'
                        placeholder="Ingresa tu email"
                        className="mt-1 block w-full" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                    <Input
                        name="password"
                        variant='faded'
                        radius='full'
                        label="Contraseña"
                        placeholder="Enter your password"
                        className="max-w-xs"
                        endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>}
                        type={isVisible ? "text" : "password"} />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div><Button type="submit" color="primary" disabled={isSubmitting} className="w-full">Login</Button></>

            )}
        </Formik>
    );
};


