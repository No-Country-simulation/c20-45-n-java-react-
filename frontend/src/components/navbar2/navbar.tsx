import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarItem, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaSearch } from "react-icons/fa";
import { default as Container } from "../container/container";
import { Input } from "../../export-components";


const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export default function HomeNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleAvatarClick = () => {
        if (!isAuthenticated()) {
            window.location.href = '/login';
        }
    };

    const menuItems = ["Inicio", "Servicios", "Testimonios", "Galeria"]

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="bg-green-200 justify-center flex content-center" >
            <Container className="sm:flex items-center flex">
                <NavbarContent justify="start" >
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden"
                    />
                    {/* Left-aligned Logo */}
                    <NavbarBrand className="flex justify-start">
                        <Link
                            to={"/"}
                            onClick={() => setIsMenuOpen(false)}
                            className="m-0"
                        >
                            <div className="flex items-center space-x-2">
                                <img
                                    src="../src/assets/Icons/pata.png"
                                    alt="Pata AMIGA Logo"
                                    className="h-10 w-10"
                                />
                                <span className="hidden md:flex text-3xl font-bold font-serif text-orange-600">Pata AMIGA</span>
                            </div>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden md:flex gap-1" justify="center">
                    <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1  rounded-3xl hover:bg-orange-400 hover:underline">
                        <Link
                            to={"/"}>
                            Inicio
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1 rounded-3xl hover:bg-orange-400 hover:underline">
                        <Link
                            to={"/"}>
                            Servicios
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1  rounded-3xl hover:bg-orange-400 hover:underline">
                        <Link
                            to={"/"}>
                            Testimonios
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1 rounded-3xl hover:bg-orange-400 hover:underline">
                        <Link
                            to={"/"}>
                            Galeria
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1 rounded-3xl hover:bg-orange-400 hover:underline" >
                            <Link
                                to={item.toLowerCase()}
                                className="text-sm"
                            >
                                {item}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarMenu>

                <NavbarContent justify="end" >
                    <NavbarItem className="hidden md:flex">
                        <Button startContent={<FaDog />} className="bg-green-500" radius="full">
                            Empezar a pasear
                        </Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger onClick={handleAvatarClick}>
                                <Avatar
                                    isBordered
                                    radius="full"
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name=""
                                    src=""
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-48">
                                <DropdownItem key="settings">My Perfil</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </Container>
        </Navbar >
    );
}
