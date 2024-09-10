import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
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

    return (
        <Navbar isBordered className="bg-green-200 h-20 w-screen" maxWidth="full">
            <Container className="grid grid-cols-3 items-center">
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
                            <span className="text-3xl font-bold text-white">Pata AMIGA</span>
                        </div>
                    </Link>
                </NavbarBrand>

                {/* Centered Search Bar */}
                <NavbarContent className="flex justify-center">
                    <div className="relative flex w-full max-w-lg">
                        <Input
                            placeholder="Buscar..."
                            radius="lg"
                            className="w-full"
                            startContent={<FaSearch />}
                        />
                    </div>
                </NavbarContent>

                {/* Right-aligned Button and Avatar */}
                <NavbarContent justify="end" className="flex justify-end space-x-4">
                    <Button startContent={<FaDog />} className="bg-green-500" radius="full">
                        Empezar a pasear
                    </Button>
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
                </NavbarContent>
            </Container>
        </Navbar>
    );
}
