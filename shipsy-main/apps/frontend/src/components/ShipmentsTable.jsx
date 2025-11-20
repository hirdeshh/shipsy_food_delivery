import React from "react";
import { motion } from "framer-motion";

const getStatusBadge = (status) => {
    const statusConfig = {
        NEW: {
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            text: "text-white",
            shadow: "shadow-blue-200"
        },
        IN_TRANSIT: {
            color: "bg-gradient-to-r from-amber-500 to-orange-500",
            text: "text-white",
            shadow: "shadow-amber-200"
        },
        DELIVERED: {
            color: "bg-gradient-to-r from-emerald-500 to-green-600",
            text: "text-white",
            shadow: "shadow-emerald-200"
        },
        CANCELLED: {
            color: "bg-gradient-to-r from-red-500 to-red-600",
            text: "text-white",
            shadow: "shadow-red-200"
        },
    };

    const config = statusConfig[status] || {
        color: "bg-gradient-to-r from-gray-500 to-gray-600",
        text: "text-white",
        shadow: "shadow-gray-200"
    };

    return (
        <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${config.color} ${config.text} shadow-sm ${config.shadow}`}
        >
            {status.replace('_', ' ')}
        </span>
    );
};

const getFragileBadge = (fragile) => {
    return fragile ? (
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm shadow-red-200">
            Fragile
        </span>
    ) : (
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-sm shadow-slate-200">
            Standard
        </span>
    );
};

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function ShipmentsTable({ shipments, onEdit, onDelete, myshipment }) {
    return (
        <div className="p-6 bg-gray-50">
            <div className="max-w-full">
                {/* Table Container with Horizontal Scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 tracking-wider min-w-[200px]">
                                        Title
                                    </th>
                                    {!myshipment && (
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider min-w-[140px]">
                                            Created By
                                        </th>
                                    )}
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Weight
                                        <span className="text-xs text-gray-500 block">kg</span>
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Distance
                                        <span className="text-xs text-gray-500 block">km</span>
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Base Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Weight*Base Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Total Cost
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                                        Created
                                    </th>
                                    {myshipment && (<th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 tracking-wider min-w-[120px]">
                                        Actions
                                    </th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {shipments?.map((shipment, index) => (
                                    <motion.tr
                                        key={shipment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        className="hover:bg-gray-50 transition-all duration-200 group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="max-w-[200px]">
                                                <p
                                                    className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors cursor-pointer"
                                                    title={shipment.title}
                                                >
                                                    {shipment.title}
                                                </p>
                                            </div>
                                        </td>
                                        {!myshipment && (
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="text-sm text-gray-900 font-medium">
                                                    {shipment.createdBy || "-"}
                                                </span>
                                            </td>
                                        )}
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            {getFragileBadge(shipment.fragile)}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            {getStatusBadge(shipment.status)}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-gray-900">{shipment.weight}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-gray-900">{shipment.distance}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-gray-600">{formatCurrency(shipment.basePrice)}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-gray-600">{formatCurrency(shipment.basePrice*shipment.weight)}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-bold text-green-600">{formatCurrency(shipment.cost)}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">
                                                {new Date(shipment.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        {myshipment && (<td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => onEdit && onEdit(shipment.id)}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-medium 
                                                    cursor-pointer
                                                    transition-all duration-200 hover:shadow-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(shipment.id)}
                                                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg text-sm font-medium 
                                                    cursor-pointer
                                                    transition-all duration-200 hover:shadow-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>)}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}