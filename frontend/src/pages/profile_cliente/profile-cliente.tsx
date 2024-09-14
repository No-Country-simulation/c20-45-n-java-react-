import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";
import { MdPersonPin } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { useNavigate } from "react-router";
import Profile_Client from "./components/profile";
import Profile_Mascota from "./components/mascota";

export default function Profile_Cliente() {
    const navigate = useNavigate();

    const tabs = [
        {
            id: "PROFILE-client",
            label: (
                <div className="flex items-center" onClick={() => navigate("/perfil-cliente")}>
                    <MdPersonPin size={24} />
                    &nbsp;
                    Perfil
                </div>),
            content: (<Profile_Client />),
        },
        {
            id: "Pets",
            label: (
                <div className="flex items-center"
                    onClick={() => navigate("/mascota")}                >
                    <FaDog size={24} />
                    &nbsp;
                    Mascota
                </div>),
            content: (<Profile_Mascota />),
        },

    ];

    return (
        <Card className="py-4 bg-white flex w-4/5 p-5 flex-col">
            <CardBody className="p-px">
                <div className="basis-1/2 px-0 sm:px-8 bg-green-200 p-4 rounded-2xl" >
                    <Tabs
                        color="success"
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