import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import LoginForm from "./components/login";
import RegistrationForm from "./components/register";
import { Card, CardBody, CardHeader, Tab, Tabs } from "@nextui-org/react";


export default function Form() {

    const location = useLocation();
    const navigate = useNavigate();
    const tabs = [
        {
            id: "LOGIN_LABEL",
            label: (
                <div className="flex items-center" onClick={() => navigate("/acceder")}>
                    <IoMdLogIn size={24} />
                    &nbsp;
                    Inicio de Sesión
                </div>
            ),
            content: (
                <LoginForm />
            ),
        },
        {
            id: "REGISTER_LABEL",
            label: (
                <div
                    className="flex items-center"
                    onClick={() => navigate("/registrarse")}
                >
                    <IoCreate size={24} />
                    &nbsp;
                    Crear un cuenta
                </div>
            ),
            content: (
                <RegistrationForm />
            ),
        },
    ];

    return (
        <Card className="py-4 bg-white flex w-full flex-col">
            {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
            </CardHeader> */}
            <CardBody className="overflow-visible py-2">
                <div className="basis-1/2 px-0 sm:px-8">
                    <Tabs
                        color="primary"
                        size="lg"
                        aria-label="Dynamic tabs"
                        items={tabs}
                        classNames={{
                            tabList: "w-full h-[44px] py-2 items-center px-2",
                            tabContent: "w-full",
                            tab: "h-[34px]",
                        }}

                    >
                        {(item) => <Tab title={item.label}>{item.content}</Tab>}
                    </Tabs>
                </div>
            </CardBody>
        </Card>
    )
}