import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

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

const RegistrationForm: React.FC = () => {
    const handleSubmit = (values: FormValues, actions: any) => {
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Register Account</h1>
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
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Field
                                type="text"
                                name="name"
                                as={Input}
                                placeholder="Enter your name"
                                className="mt-1 block w-full"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                type="email"
                                name="email"
                                as={Input}
                                placeholder="Enter your email"
                                className="mt-1 block w-full"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                type="password"
                                name="password"
                                as={Input}
                                placeholder="Enter your password"
                                className="mt-1 block w-full"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                as={Input}
                                placeholder="Confirm your password"
                                className="mt-1 block w-full"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Select
                                placeholder="Elige un rol"
                                className="max-w-xs"
                            >
                                {roles.map((role) => (
                                    <SelectItem key={role.key} value={role.key}>
                                        {role.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <Button type="submit" color="primary" disabled={isSubmitting} className="w-full">Register</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
