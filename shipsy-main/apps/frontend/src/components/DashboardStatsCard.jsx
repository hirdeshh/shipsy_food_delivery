import React from "react";
import { motion } from "framer-motion";


// Gradient colors for each status
const statusColors = {
    NEW: "from-blue-400 to-cyan-400",
    IN_TRANSIT: "from-yellow-400 to-orange-400",
    DELIVERED: "from-green-400 to-emerald-400",
    CANCELLED: "from-red-400 to-pink-500",
};

const DashboardStatCard = ({ stat, index }) => {
    const gradient = statusColors[stat.label] || "from-gray-400 to-gray-500";
    const Icon = stat.icon;

    return (
        <motion.div
            className="relative group rounded-2xl px-4 py-3 border border-gray-200 shadow-md hover:shadow-lg flex items-center justify-between cursor-pointer bg-white min-w-[150px] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -1 }}
        >
            {/* Icon + Label + Value in a row */}
            <div className="flex items-center gap-3 w-full justify-between">
                <motion.div
                    className={`p-2 rounded-xl bg-gradient-to-r ${gradient} shadow flex items-center justify-center text-white`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                >
                    <Icon className="w-5 h-5" />
                </motion.div>

                <p className="text-gray-700 font-medium flex-1 text-sm ml-2 truncate">
                    {stat.label.replace("_", " ")}
                </p>

                <motion.p
                    className="text-lg font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index + 0.3, duration: 0.4, type: "spring" }}
                >
                    {stat.value}
                </motion.p>
            </div>

            {/* Glow effect */}
            <div
                className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300`}
            ></div>
        </motion.div>
    );
};

// Default export
export default DashboardStatCard;