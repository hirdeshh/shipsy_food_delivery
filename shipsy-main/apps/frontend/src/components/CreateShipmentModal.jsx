import React, { useState, useEffect } from "react";
import { X as Cross, Ship as ShipIcon, Loader2 as SplineIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config/config';
import { toast } from 'react-toastify';

const CreateShipmentModal = ({ isOpen, onClose, onCreate }) => {
    const [form, setForm] = useState({
        title: "",
        fragile: "No",
        status: "New",
        weight: "",
        distance: "",
        baseRate: "",
        cost: 0,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const weightNum = parseFloat(form.weight) || 0;
        const baseRateNum = parseFloat(form.baseRate) || 0;
        const distanceNum = parseFloat(form.distance) || 0;
        let calculatedCost = weightNum * baseRateNum + distanceNum * 0.5;
        setForm((prev) => ({ ...prev, cost: calculatedCost }));
    }, [form.weight, form.baseRate, form.distance]);

    const [username, setUsername] = useState('John Deo');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${BACKEND_URL}/auth/fetch/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.weight || parseFloat(form.weight) <= 0) newErrors.weight = "Valid weight is required";
        if (!form.distance || parseFloat(form.distance) <= 0) newErrors.distance = "Valid distance is required";
        if (!form.baseRate || parseFloat(form.baseRate) <= 0) newErrors.baseRate = "Valid base rate is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            const token = localStorage.getItem("token");

            const response = await fetch(`${BACKEND_URL}/shipment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
                },
                body: JSON.stringify({
                    title: form.title,
                    status: form.status.toUpperCase(), // API expects uppercase
                    fragile: form.fragile === "Yes" ? "true" : "false",
                    weightKg: form.weight,
                    distanceKm: form.distance,
                    baseRate: form.baseRate,
                    createdBy: username,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create shipment: ${response.status}`);
            }

            const data = await response.json();

            // Optional: Update parent state with new shipment
            if (onCreate) onCreate(data);

            // Reset and navigate
            setForm({
                title: "",
                fragile: "No",
                status: "New",
                weight: "",
                distance: "",
                baseRate: "",
                cost: 0,
            });

            toast.success("Created New Shipment!!");
            navigate("/myshipments");
            onClose();

        } catch (error) {
            console.error("Error creating shipment:", error);
            toast.warning("Failed to create shipment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-20 overflow-y-auto">
            {/* Added py-12 here to give top/bottom margin */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl transform transition-all duration-300 scale-95 opacity-0 animate-scaleIn">
                <div className="overflow-y-auto m-2 p-2">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <ShipIcon size={20} />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Create Shipment</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Cross size={24} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter a descriptive title"
                                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.title ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={form.weight}
                                    onChange={handleChange}
                                    placeholder="0.0"
                                    min="0"
                                    step="0.1"
                                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.weight ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.weight && <p className="mt-1 text-xs text-red-600">{errors.weight}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                                <input
                                    type="number"
                                    name="distance"
                                    value={form.distance}
                                    onChange={handleChange}
                                    placeholder="0.0"
                                    min="0"
                                    step="0.1"
                                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.distance ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.distance && <p className="mt-1 text-xs text-red-600">{errors.distance}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate ($/kg)</label>
                                <input
                                    type="number"
                                    name="baseRate"
                                    value={form.baseRate}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.baseRate ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.baseRate && <p className="mt-1 text-xs text-red-600">{errors.baseRate}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fragile Handling</label>
                                <select
                                    name="fragile"
                                    value={form.fragile}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 cursor-pointer rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <option value="New">New</option>
                                <option value="In-Transit">In-Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Estimated Cost</span>
                            <span className="text-2xl font-bold text-gray-800">${form.cost.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-gray-700 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <SplineIcon className="animate-spin h-4 w-4 mr-2" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <span>Create Shipment</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateShipmentModal;

// Animation style
const style = document.createElement("style");
style.innerHTML = `
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    .animate-scaleIn {
        animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
`;
document.head.appendChild(style);
