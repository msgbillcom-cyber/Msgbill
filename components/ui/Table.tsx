import React from "react";
import { cn } from "@/lib/utils";

interface SimpleTableProps {
    headers: string[];
    children: React.ReactNode;
    className?: string;
}

export default function Table({ headers, children, className }: SimpleTableProps) {
    return (
        <div className={cn("w-full overflow-x-auto", className)}>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-secondary-500 uppercase bg-secondary-50 border-b border-secondary-100">
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="px-4 py-3 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}
