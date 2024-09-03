import React from "react";
import { default as Container } from "../container/container"
import LinkList from "./Link";
import LinkListIcons from "./LinkIcon";
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';


const F_Middle = [
    { label: '¿Quienes somos?', link: "/" },
    { label: 'Tarifas', link: "/" },
    { label: 'Preguntas frecuentes', link: "/" },
]

const F_Right = [
    { label: 'Instagran', link: "/", icon: <FaInstagram /> },
    { label: 'Whatsapp', link: "/", icon: <FaWhatsapp /> },
    { label: 'Facebook', link: "/", icon: <FaFacebook /> },
]

export default function Footer() {
    return (
        <footer className="bg-green-200 flex justify-between  px-4 py-2" >
            <Container className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-2 gap-3 px-8 ">
                <div className="flex items-center space-x-2">
                    <img
                        src="../src/assets/Icons/pata.png"
                        alt="Pata AMIGA Logo"
                        className="h-10 w-10"
                    />
                    <span className="text-3xl font-bold text-white">Pata AMIGA</span>
                </div>
                <div>
                    <LinkList list={F_Middle} title="Pata AMIGA" />
                </div>
                <div>
                    <LinkListIcons list={F_Right} title="Nuestras Redes" />
                </div>
            </Container>
        </footer>
    )
}