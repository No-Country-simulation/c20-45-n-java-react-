import React from "react";
import { Link } from "react-router-dom";

export default function LinkList({
    list,
    title,
}: {
    list: any[];
    title: string;
}) {
    return (
        <>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="bg-primary h-0.5 w-36 my-3" />
            <div className="flex flex-col gap-1.5 ">
                {list.map((entry) => (
                    <Link
                        to={entry.link}
                        key={entry.label}
                        className="text-secondary text-wrap w-max cursor-pointer hover:text-primary hover:scale-105 transition-transform ease-linear duration-200"
                    >
                        {entry.label}
                    </Link>
                ))}
            </div>
        </>
    );
}