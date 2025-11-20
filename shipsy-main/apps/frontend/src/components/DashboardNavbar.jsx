import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LogOut, Menu, ToolCase, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../config/config';
import { toast } from 'react-toastify';

const DashboardNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('John Deo');

    const location = useLocation();
    const path = location.pathname.replace("/", ""); // e.g., "allshipments"

    const token = localStorage.getItem('token');

    const tabMap = {
        dashboard: "Dashboard",
        myshipments: "MyShipments",
        allshipments: "AllShipments"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    });


    const [activeTab, setActiveTab] = useState(tabMap[path] || "Dashboard");

    useEffect(() => {
        setActiveTab(tabMap[path] || "Dashboard");
    }, [path]);

    const navItems = [
        { name: "Dashboard", label: "Dashboard" },
        { name: "MyShipments", label: "My Shipments" },
        { name: "AllShipments", label: "All Shipments" }
    ];

    const handleClick = (item) => {
        setActiveTab(item);
        const name = item.toLowerCase();
        navigate(`/${name}`);
        setIsMenuOpen(false); // close mobile menu if open
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged Out Successfully!!!");
        navigate('/');
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-8 pt-4 z-50 bg-[#F9F6F3]"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.nav
                className="relative flex items-center justify-between px-6 py-3 rounded-3xl modern-glass border border-gray-200 shadow-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 z-10">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 7L12 13L3 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                        Shipsy
                    </span>
                </div>

                {/* Navigation Pills */}
                <div className="hidden lg:flex items-center gap-2 bg-white/10 p-1 rounded-2xl backdrop-blur-sm">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.name}
                            onClick={() => handleClick(item.name)}
                            className={`relative cursor-pointer px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm
                                ${activeTab === item.name
                                    ? "text-gray-900 bg-orange-200/30 shadow-inner"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                }
                            `}
                            whileHover={{ y: -1 }}
                            whileTap={{ y: 0 }}
                        >
                            {activeTab === item.name && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-orange-200/30 backdrop-blur-sm"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 z-10">
                    {/* Profile */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                        <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-500">Welcome back</p>
                            <p className="text-sm font-medium text-gray-900">{username}</p>
                        </div>
                        <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white shadow-lg cursor-pointer">
                            <span className="text-lg">{username.charAt(0)}</span>
                        </div>
                        <motion.div
                            onClick={handleLogout}
                            whileHover={{ scale: 1.2 }}
                            className='cursor-pointer'
                        >
                            <span><LogOut /></span>
                        </motion.div>
                    </div>

                    {/* Mobile Menu */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMenuOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="lg:hidden mt-4 p-4 rounded-2xl modern-glass border border-gray-200 shadow-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => handleClick(item.name)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all
                                        ${activeTab === item.name
                                            ? "bg-orange-200/30 text-gray-900 border border-orange-300/30"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                        }
                                    `}
                                    whileHover={{ x: 4 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .modern-glass {
                    background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                }
            `}</style>
        </motion.div >
    );
};

export default DashboardNavbar;
