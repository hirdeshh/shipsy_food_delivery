import React from "react";

export default function ShipmentActions({ onEdit, onDelete }) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onEdit}
                className="px-3 py-1 bg-blue-200 hover:bg-blue-300 text-blue-900 font-medium rounded-md transition-colors duration-200"
            >
                Edit
            </button>
            <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 font-medium rounded-md transition-colors duration-200"
            >
                Delete
            </button>
        </div>
    );
}
