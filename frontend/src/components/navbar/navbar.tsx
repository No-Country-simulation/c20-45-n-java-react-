import { Suspense, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaSearch } from "react-icons/fa";
import { default as Container } from "../container/container"

export default function HomeNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <Navbar isBordered className="bg-green-200  h-20 p-5 " >
            <Container className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-2  px-8 ">

                <NavbarBrand className="mr-4">
                    <Link
                        to={"/"}
                        onClick={() => {
                            setIsMenuOpen(false);
                        }}
                        className="m-0"
                    >
                        <div className="flex items-center space-x-2">
                            <img
                                src="../src/assets/Icons/pata.png"
                                alt="Pata AMIGA Logo"
                                className="h-10 w-10"
                            />
                            <span className="text-3xl font-bold text-white">Pata AMIGA</span>
                        </div>
                    </Link>
                </NavbarBrand>

                {/* Centered Search Bar */}
                <NavbarContent className="flex justify-center">
                    <div className="relative flex items-center w-full max-w-lg">
                        <Input
                            placeholder="Buscar..."
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                            }}
                            radius="lg"
                            className="pr-10 m-3 "
                        />
                        <FaSearch className="absolute right-8 text-gray-500" />
                    </div>
                </NavbarContent>

                {/* Right Aligned Dropdown */}
                <NavbarContent as={"div"} className="justify-end">
                    <Button startContent={<FaDog />} className="flex justify-center"> Empezar a pasear</Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-48">
                            <DropdownItem key="settings">My Settings</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Container>

        </Navbar>
    );
}
