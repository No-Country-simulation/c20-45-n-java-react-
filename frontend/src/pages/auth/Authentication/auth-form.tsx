import { useNavigate } from "react-router";
import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import LoginForm from "./components/login";
import RegistrationForm from "./components/register";
import { Card, CardBody, CardHeader, Tab, Tabs } from "@nextui-org/react";

export default function FormLogin() {
  const navigate = useNavigate();
  const tabs = [
    {
      id: "LOGIN_LABEL",
      label: (
        <div
          className="flex items-center text-xs md:text-base"
          onClick={() => navigate("/login")}
        >
          <IoMdLogIn size={22} />
          &nbsp; Inicio de Sesión
        </div>
      ),
      content: <LoginForm />,
    },
    {
      id: "REGISTER_LABEL",
      label: (
        <div
          className="flex items-center text-xs md:text-base"
          onClick={() => navigate("/registrarse")}
        >
          <IoCreate size={22} />
          &nbsp; Crear un cuenta
        </div>
      ),
      content: <RegistrationForm />,
    },
  ];

  return (
    <Card className="py-4 bg-white flex w-full flex-col">
      <CardBody className="overflow-visible py-2">
        <div className="flex gap-2 p-2 sm:p-4 mt-5 lg:flex-row flex-col-reverse ">
          <div className="basis-1/2 flex flex-col gap-8">
            <img
              src="../../../../src/assets/Icons/PataAmiga.png"
              alt="Pata AMIGA Logo"
              className="h-96"
            />
          </div>
          <div className="basis-1/2 px-0 sm:px-8 bg-green-200 p-4 rounded-2xl">
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
        </div>
      </CardBody>
    </Card>
  );
}
