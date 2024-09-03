import React from "react";
import { Link } from "react-router-dom";

export default function LinkListIcons({
    list,
    title,
}: {
    list: any[];
    title: string;
}) {
    return (
        <>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <div className="bg-primary h-0.5 w-36 my-3" />
            <div className="flex flex-col gap-1.5 ">
                {list.map((entry) => (
                    <Link
                        to={entry.link}
                        target="_blank"
                        className="flex items-center text-gray-800 group-hover:rotate-12 duration-500 transition-transform group-hover:text-gray-100 group-hover:scale-110"
                    >
                        <span className="mr-2 text-2xl">{entry.icon}</span> {entry.label}
                    </Link>
                ))}
            </div>
        </>
    );
}