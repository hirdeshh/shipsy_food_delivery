import React, { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, TrendingUp, Plus } from "lucide-react";
import DashboardStatCard from './DashboardStatsCard';
import DashboardNavbar from "./DashboardNavbar";
import { BACKEND_URL } from "../config/config";
import CreateShipmentModal from "./CreateShipmentModal";

// Loading Skeleton Components
const SkeletonStatCard = ({ index }) => (
    <div
        className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 animate-pulse"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>
    </div>
);

const DashboardSkeleton = () => (
    <div className="w-1/2 h-full p-12 flex flex-col justify-start">
        <div className="flex items-center justify-between mb-8">
            <div className="h-12 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-6 mb-6">
            {[0, 1, 2, 3].map((index) => (
                <SkeletonStatCard key={index} index={index} />
            ))}
        </div>

        <div className="mt-4 h-12 bg-gray-200 rounded-2xl w-60 animate-pulse"></div>
    </div>
);

export default function DashboardStats() {
    const [shipments, setShipments] = useState([]);
    const [username] = useState("Alex Chen");
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const videos = [
        "/page1.mp4",
        "/page2.mp4",
        "/page3.mp4",
        "/page4.mp4",
        "/page5.mp4",
    ];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Auto-play videos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prev => (prev + 1) % videos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Fetch shipment data from API
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            setIsLoading(true);

            try {
                const response = await fetch(`${BACKEND_URL}/shipment/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                // Assuming your API returns { data: [...] }
                setShipments(result.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Set empty array on error to show 0 stats
                setShipments([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate counts dynamically
    const stats = [
        { label: "NEW", value: shipments.filter(s => s.status === "NEW").length, icon: Package },
        { label: "IN_TRANSIT", value: shipments.filter(s => s.status === "IN_TRANSIT").length, icon: Clock },
        { label: "DELIVERED", value: shipments.filter(s => s.status === "DELIVERED").length, icon: CheckCircle },
        { label: "CANCELLED", value: shipments.filter(s => s.status === "CANCELLED").length, icon: TrendingUp },
    ];

    const handleCreateShipment = () => {
        setIsCreateModalOpen(true);
    };

    return (
        <div className="min-h-screen text-gray-800 overflow-hidden relative bg-[#FFFFFF]">
            <DashboardNavbar
                username={username}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div className="flex mb-20 w-full mt-25 h-[85vh]">
                {/* Left: Animated Video */}
                <div className="w-1/2 h-full relative overflow-hidden">
                    {videos.map((video, idx) => (
                        <video
                            key={idx}
                            src={video}
                            autoPlay
                            loop
                            muted
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        />
                    ))}
                </div>

                {/* Right: Stats or Loading Skeleton */}
                {isLoading ? (
                    <DashboardSkeleton />
                ) : (
                    <div className="w-1/2 h-full p-12 flex flex-col justify-start">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 animate-fadeIn">
                                CatchUp Today's Stats
                            </h1>
                        </div>

                        <div className="flex flex-col gap-6 mb-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="animate-slideInUp"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <DashboardStatCard stat={stat} index={index} />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleCreateShipment}
                            className="mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-md min-w-[150px]
                            transition-all duration-300 transform hover:bg-orange-500 hover:scale-105 cursor-pointer hover:shadow-lg animate-fadeIn"
                            style={{ animationDelay: '400ms' }}
                        >
                            <Plus className="w-5 h-5" /> Create New Shipment
                        </button>
                    </div>
                )}

                {/* Modals */}
                <CreateShipmentModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={() => setIsCreateModalOpen(false)}
                    setActiveTab={setActiveTab}
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-slideInUp {
                    animation: slideInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}