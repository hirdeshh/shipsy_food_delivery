import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Plus, Package, Search, X, ChevronDown } from "lucide-react";
import ShipmentsTable from "./ShipmentsTable";
import Pagination from "./Pagination";
import CreateShipmentModal from "./CreateShipmentModal";
import DashboardNavbar from "./DashboardNavbar";
import EditShipmentModal from "./EditShipmentModal";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config/config";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const STATUS_OPTIONS = ["NEW", "IN_TRANSIT", "DELIVERED", "CANCELLED"];

// Loading Skeleton Components
const SkeletonRow = () => (
    <div className="bg-white border-b border-gray-100 animate-pulse">
        <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    </div>
);

const SkeletonTable = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
        {/* Table Header Skeleton */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
            </div>
        </div>

        {/* Table Rows Skeleton */}
        {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
        ))}
    </div>
);

const FilterSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 w-40 bg-gray-200 rounded-xl"></div>
        </div>
    </div>
);

export default function MyShipments() {
    // State to control modal visibility & selected shipment
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [shipmentToDelete, setShipmentToDelete] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [shipments, setShipments] = useState([]);
    const [shipmentToEdit, setShipmentToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Extract fetchShipments into a separate function that can be called multiple times
    const fetchShipments = useCallback(async () => {
        const token = localStorage.getItem("token");

        try {
            // Step 1: Get logged-in user info
            const userRes = await fetch(`${BACKEND_URL}/auth/fetch/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });

            if (!userRes.ok) {
                throw new Error(`User fetch failed! Status: ${userRes.status}`);
            }

            const userData = await userRes.json();
            setUsername(userData.username);

            // Step 2: Get all shipments
            const shipmentRes = await fetch(`${BACKEND_URL}/shipment/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });

            if (!shipmentRes.ok) {
                throw new Error(`Shipments fetch failed! Status: ${shipmentRes.status}`);
            }

            const shipmentData = await shipmentRes.json();

            // Step 3: Filter by logged-in user
            const normalized = (shipmentData.data || [])
                .filter(s => s.createdBy?.username === userData.username)
                .map(s => ({
                    id: s._id,
                    title: s.title,
                    createdBy: s.createdBy?.username || "Unknown",
                    fragile: s.fragile,
                    status: s.status,
                    weight: s.weightKg,
                    distance: s.distanceKm,
                    basePrice: s.baseRate,
                    cost: s.cost,
                    createdAt: s.createdAt,
                }));

            setShipments(normalized);
            console.log(shipmentData);
        } catch (error) {
            console.error("Error fetching shipments:", error);
            toast.error("Failed to load shipments. Please refresh the page.");
        }
    }, []);

    // Open the modal
    const openDeleteModal = (id) => {
        setShipmentToDelete(id);
        setIsDeleteModalOpen(true);
    };

    // Called when confirmed
    const handleDeleteShipment = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${BACKEND_URL}/shipment/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete shipment: ${response.status}`);
            }

            // Update local state to remove the shipment
            setShipments((prev) => prev.filter((s) => s.id !== id));

            toast.success("Shipment deleted successfully!");
            setIsDeleteModalOpen(false);
            setShipmentToDelete(null);
        } catch (error) {
            console.error("Error deleting shipment:", error);
            toast.error("Failed to delete shipment. Please try again.");
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
        setCurrentPage(1); // Reset to first page when clearing filters
    };

    const handleEditShipment = (id) => {
        const ship = shipments.find((s) => s.id === id);
        setShipmentToEdit(ship);
        setIsEditModalOpen(true);
    };

    const handleSaveEditedShipment = async (updated) => {
        try {
            // Close the modal first
            setIsEditModalOpen(false);

            // Re-fetch shipments to get the latest data from the server
            await fetchShipments();

            // Show success message
            toast.success("Shipment updated successfully!");
        } catch (error) {
            console.error("Error refreshing shipments:", error);

            // Fallback: update local state if re-fetch fails
            setShipments((prev) =>
                prev.map((s) => (s.id === updated.id ? { ...s, ...updated, fragile: updated.fragile === "Yes" } : s))
            );

            toast.success("Shipment updated successfully!");
        }
    };

    // Handle successful shipment creation
    const handleShipmentCreated = async () => {
        setIsCreateModalOpen(false);
        // Refresh the shipments list
        await fetchShipments();
        toast.success("Shipment created successfully!");
    };

    // Filter shipments based on search and status
    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const matchesSearch =
                searchTerm === "" ||
                shipment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.status.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                selectedStatus === "" || shipment.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [shipments, searchTerm, selectedStatus]);

    // Calculate total pages and ensure current page is valid
    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

    // Reset to page 1 when filters change and current page becomes invalid
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [filteredShipments.length, totalPages, currentPage]);

    // Reset to page 1 when search term or status filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedStatus]);

    // Calculate paginated shipments
    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage, itemsPerPage]);

    const [activeTab, setActiveTab] = useState("MyShipments");

    const hasActiveFilters = searchTerm !== "" || selectedStatus !== "";

    // Handle page change
    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // Initial data fetch
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchShipments();
            setIsLoading(false);
        };

        fetchData();
    }, [fetchShipments]);

    return (
        <div className="min-h-screen text-gray-800 overflow-hidden relative bg-[#FFFFFF]">
            <DashboardNavbar
                username={username}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div className="min-h-screen mt-25 bg-gray-50 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl">
                            <Package className="w-7 h-7 text-white" />
                        </div>
                        My Shipments
                    </h2>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Plus className="w-5 h-5" />
                        Create Shipment
                    </button>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <>
                        <FilterSkeleton />
                        <SkeletonTable />
                        {/* Pagination Skeleton */}
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Filter Bar */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by title, creator, ID, or status..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm w-full transition-all"
                                    />
                                </div>

                                {/* Status Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setIsStatusDropdownOpen(!isStatusDropdownOpen)
                                        }
                                        className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 cursor-pointer border border-gray-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm font-medium text-gray-700 min-w-[160px] transition-all"
                                    >
                                        {selectedStatus || "All Statuses"}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {isStatusDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                                            <button
                                                onClick={() => {
                                                    setSelectedStatus("");
                                                    setIsStatusDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-xl"
                                            >
                                                All Statuses
                                            </button>
                                            {STATUS_OPTIONS.map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        setSelectedStatus(status);
                                                        setIsStatusDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-gray-50 last:rounded-b-xl ${selectedStatus === status
                                                        ? "bg-orange-50 text-orange-700 font-medium"
                                                        : "text-gray-700"
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Clear Filters */}
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex cursor-pointer items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results Info */}
                        {filteredShipments.length > 0 && (
                            <div className="mb-4 text-sm text-gray-600">
                                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredShipments.length)}-{Math.min(currentPage * itemsPerPage, filteredShipments.length)} of {filteredShipments.length} shipments
                            </div>
                        )}

                        {/* Table */}
                        {filteredShipments.length > 0 ? (
                            <>
                                <ShipmentsTable
                                    shipments={paginatedShipments}
                                    onEdit={handleEditShipment}
                                    onDelete={openDeleteModal}
                                    myshipment={true}
                                />
                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        setCurrentPage={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No shipments found
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    {hasActiveFilters
                                        ? "Try adjusting your search terms or filters."
                                        : "Create your first shipment to get started."}
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Modals */}
                <CreateShipmentModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleShipmentCreated}
                    setActiveTab={setActiveTab}
                />

                <EditShipmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveEditedShipment}
                    shipment={shipmentToEdit}
                />

                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteShipment(shipmentToDelete)}
                />
            </div>
        </div>
    );
}