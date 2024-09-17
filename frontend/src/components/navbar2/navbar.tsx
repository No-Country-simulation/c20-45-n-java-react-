import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarItem, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaSearch } from "react-icons/fa";
import { default as Container } from "../container/container";
import ApiService from "../../config/ApiService";

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export default function HomeNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState<boolean>(false);

    const handleAvatarClick = () => {
        if (!isAuthenticated()) {
            window.location.href = '/login';
        }
    };
    
    const handleCloseSesion = () => {
        ApiService.logout();
        window.location.href = '/login';
    };

    const menuItems = ["Inicio", "Servicios", "Testimonios", "Galeria"]

    useEffect(() => {
        setIsAuthenticatedUser(isAuthenticated())
    }, []);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="bg-green-200 justify-between " >
            <div >
                <Container className="sm:grid items-center grid grid-cols-5">
                    <NavbarContent justify="start" className="col-start-1 col-span-1">
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="md:hidden"
                        />
                        <NavbarBrand className="flex justify-start ">
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
                                    <span className="hidden lg:flex text-3xl font-bold font-serif text-orange-600">Pata AMIGA</span>
                                </div>
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent className="col-start-3   hidden md:flex gap-1" justify="center">
                        <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1  rounded-3xl hover:bg-orange-400 hover:underline">
                            <Link
                                to={"/"}>
                                Inicio
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1 rounded-3xl hover:bg-orange-400 hover:underline">
                            <Link
                                to={"/servicios"}>
                                Servicios
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1  rounded-3xl hover:bg-orange-400 hover:underline">
                            <Link
                                to={"/testimonios"}>
                                Testimonios
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive className="hover:shadow-md hover:opacity-40 font-bold duration-300 sm:p-1 rounded-3xl hover:bg-orange-400 hover:underline">
                            <Link
                                to={"/galeria"}>
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

                    <NavbarContent justify="center" className="col-end-6" >
                        <NavbarItem className="hidden lg:flex">
                            <Link to="/lista-prestaciones" className="bg-green-500 flex items-center px-4 py-2 rounded-full transition-colors duration-300 hover:bg-green-700">
                                <FaDog className="mr-2" /> Empezar a pasear
                            </Link>
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
                                        src=""
                                    />
                                </DropdownTrigger>
                                {isAuthenticatedUser ? (
                                    <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-48">
                                        <DropdownItem key="settings">
                                            <Link to="/perfil" className="dropdown-item">
                                                My Perfil
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem onClick={handleCloseSesion}>
                                            Cerrar Sesión
                                        </DropdownItem>
                                    </DropdownMenu>
                                ) : null}
                            </Dropdown>
                        </NavbarItem>

                    </NavbarContent>
                </Container>
            </div>
        </Navbar >
    );
}
