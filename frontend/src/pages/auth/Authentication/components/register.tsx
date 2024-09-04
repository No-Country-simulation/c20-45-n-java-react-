import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../../../export-components';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { TbEyeFilled } from "react-icons/tb";
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
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    role: Yup.string().oneOf(['owner', 'caregiver'], 'Role is required').required('Role is required'),
});

const roles = [
    { key: "owner", label: "Dueño" },
    { key: "caregiver", label: "Cuidador" },
];


export default function RegistrationForm() {
    const handleSubmit = (values: FormValues, actions: any) => {
    };
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'owner',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <>
                    <div>
                        <div className='flex justify-between'>
                            <Input
                                type="name"
                                name='Name'
                                variant='faded'
                                radius='md'
                                label="Ingrese tu nombre"
                                className="max-w-72 mt-2"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            <Input
                                type="lastname"
                                name='Lastname'
                                variant='faded'
                                radius='md'
                                label="Ingrese tu apellido"
                                className="max-w-72 mt-2"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                        </div>

                        <Input
                            type="email"
                            name='Email'
                            variant='faded'
                            radius='md'
                            label="Ingrese tu correo electrónico"
                            className=" mt-2"
                            endContent={<MdOutlineAttachEmail />}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <div className='flex justify-between'>
                            <Input
                                type={isVisible ? "text" : "password"}
                                name="password"
                                variant='faded'
                                radius='md'
                                label="Contraseña"
                                className="max-w-72 mt-2"
                                endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <TbEyeFilled />
                                    )}
                                </button>}
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                            <Input
                                type={isVisible ? "text" : "password"}
                                name="confpassword"
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
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        </div>

                        <Select
                            items={roles}
                            label="Selecciona tu Pata Rol"
                            className="max-w-72 mt-2 text-black "
                            color='primary'
                        >
                            {(rol) => <SelectItem key={rol.key} className='text-black'>{rol.label} </SelectItem>}
                        </Select>
                    </div>
                    <div className='flex justify-center'>
                        <Button type="submit" color="success" disabled={isSubmitting} className="w-52 mt-2">Crea tu cuenta</Button>
                    </div>
                </>
            )}
        </Formik>
    );
};


