import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";
import { MdPersonPin } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { useNavigate } from "react-router";
import Profile_Cu from "./components/profile";
import RideDog from "./components/ride";

export default function Profile_Carer() {
    const navigate = useNavigate();

    const tabs = [
        {
            id: "PROFILE-CARER",
            label: (
                <div className="flex items-center" onClick={() => navigate("/perfil-cuidador")}>
                    <MdPersonPin size={24} />
                    &nbsp;
                    Perfil
                </div>
            ),
            content: (
                <Profile_Cu />
            ),
        },
        {
            id: "RIDE-CARER",
            label: (
                <div
                    className="flex items-center"
                    onClick={() => navigate("/paseo")}
                >
                    <FaDog size={24} />
                    &nbsp;
                    Paseos
                </div>
            ),
            content: (
                <RideDog />
            ),
        },
        {
            id: "REFERENCE",
            label: (
                <div
                    className="flex items-center"
                    onClick={() => navigate("/referencias")}
                >
                    <MdInsertComment size={24} />
                    &nbsp;
                    Referencias
                </div>
            ),
            content: (
                <></>
            ),
        },
    ];

    return (
        <Card className="py-4 bg-white flex w-3/4 flex-col">
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