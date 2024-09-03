import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaSearch } from "react-icons/fa";
import { default as Container } from "../container/container";
import { Input } from "../../export-components";

export default function HomeNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <Navbar isBordered className="bg-green-200 h-20 p-5">
            <Container className="grid grid-cols-3 items-center px-8">
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
                            className="bg-slate-50 w-full"
                            startContent={<FaSearch />}
                        />
                    </div>
                </NavbarContent>

                {/* Right-aligned Button and Avatar */}
                <NavbarContent className="flex justify-end space-x-4">
                    <Button startContent={<FaDog />} className="bg-green-500" radius="full">
                        Empezar a pasear
                    </Button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                radius="full"
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
