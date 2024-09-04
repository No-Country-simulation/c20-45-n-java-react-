import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';
import { Input } from '../../../../export-components';
import { MdOutlineAttachEmail } from "react-icons/md";
import { TbEyeFilled } from "react-icons/tb";
import { FaEyeSlash } from "react-icons/fa";


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
                        name='Email'
                        variant='faded'
                        radius='md'
                        label="Ingrese tu correo electrónico"
                        className=" mt-3"
                        endContent={<MdOutlineAttachEmail />}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                    <Input
                        type={isVisible ? "text" : "password"}
                        name="password"
                        variant='faded'
                        radius='md'
                        label="Ingrese su contraseña"
                        className=" mt-3"
                        endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <FaEyeSlash />
                            ) : (
                                <TbEyeFilled />
                            )}
                        </button>}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                    <div className='flex justify-center'>
                        <Button type="submit" color="success" disabled={isSubmitting} className="w-52 mt-3">Iniciar sesion</Button>
                    </div>
                </>
            )}
        </Formik>
    );
};


