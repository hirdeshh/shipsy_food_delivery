import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../config/config';

const ShipsyLanding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const navigate = useNavigate();
    const page6 = '/page6.mp4'

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form fields when modal closes
        setUsername("");
        setPassword("");
        setIsSubmitting(false);
    };

    // Modified function to clear inputs when toggling
    const handleToggleMode = (loginMode) => {
        setIsLogin(loginMode);
        // Clear form inputs when switching modes
        setUsername("");
        setPassword("");
        setIsSubmitting(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set loading state

        // Use the state values directly instead of FormData
        const formValues = {
            username: username,
            password: password
        };

        if (isLogin) {
            try {
                const response = await fetch(`${BACKEND_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const token = data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    toast.success(`Welcome back, ${formValues.username || "User"}!`);
                    navigate("/dashboard");
                    handleCloseModal();
                } else {
                    toast.error("Login failed: No token received.");
                }
            } catch (e) {
                console.error("Error occurred!!", e.message);
                toast.warning("Error logging in");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // TODO: Replace with actual signup API call
            try {
                const response = await fetch(`${BACKEND_URL}/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  // tell the server it's JSON
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data) {
                    toast.success("You have registered Successfully!!");
                    toast.success("You can now login again to access dashboard!!");
                    navigate("/");
                    handleCloseModal();
                } else {
                    toast.error("SignUp failed");
                }
            } catch (e) {
                console.error("Error occurred!!", e.message);
                toast.warning("Error creating account");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen text-white overflow-hidden relative">
            {/* Modern Gradient Background with Mesh */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10"></div>
                {/* Animated mesh gradient */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                </div>
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .glassmorphism {
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>

            {/* Navigation - Enhanced Glass Navbar */}
            <motion.div className="fixed top-0 left-0 w-full px-4 sm:px-6 lg:px-8 pt-6 z-50">
                <motion.nav
                    className="flex items-center justify-between px-8 py-4 rounded-3xl glassmorphism shadow-2xl border border-white/10"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Left: Logo + Brand Name */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="32" fill="none" className="drop-shadow-lg">
                                <path d="M 39.106 13.451 L 38.488 13.451 L 34.556 6.403 C 34.407 6.135 34.124 5.978 33.793 5.978 L 29.169 5.978 L 30.085 1.063 C 30.195 0.476 29.812 0 29.231 0 L 4.779 0.011 C 4.151 0.011 3.641 0.525 3.641 1.159 C 3.641 1.794 4.151 2.308 4.779 2.308 L 18.237 2.308 C 18.772 2.401 19.18 2.871 19.18 3.439 C 19.18 4.04 18.722 4.533 18.139 4.582 L 1.138 4.582 C 0.51 4.583 0 5.097 0 5.731 C 0 6.366 0.51 6.88 1.138 6.88 L 18.187 6.88 C 18.747 6.952 19.18 7.433 19.18 8.018 C 19.18 8.606 18.743 9.089 18.18 9.158 L 2.807 9.158 C 2.178 9.158 1.669 9.672 1.669 10.307 C 1.669 10.941 2.178 11.455 2.807 11.455 L 6.37 11.455 L 4.495 21.519 C 4.385 22.106 4.768 22.582 5.35 22.582 L 7.028 22.582 C 6.704 25.012 8.341 26.949 10.779 26.949 C 13.218 26.949 15.577 25.012 16.158 22.582 L 25.021 22.582 L 27.527 22.582 C 27.202 25.012 28.839 26.949 31.278 26.949 C 33.716 26.949 36.076 25.012 36.657 22.582 L 37.404 22.582 L 38.336 22.582 C 38.917 22.582 39.478 22.106 39.587 21.519 L 39.926 19.7 C 40.028 19.155 39.704 18.705 39.191 18.645 L 39.961 14.514 C 40.07 13.927 39.687 13.451 39.106 13.451 Z M 14.105 22.334 C 13.85 23.706 12.535 24.823 11.176 24.823 C 9.816 24.823 8.918 23.706 9.174 22.334 C 9.43 20.961 10.744 19.845 12.104 19.845 C 13.463 19.845 14.361 20.961 14.105 22.334 Z M 34.604 22.334 C 34.348 23.706 33.033 24.823 31.674 24.823 C 30.314 24.823 29.416 23.706 29.672 22.334 C 29.928 20.961 31.242 19.845 32.602 19.845 C 33.962 19.845 34.86 20.961 34.604 22.334 Z M 27.776 13.451 L 28.773 8.104 L 32.871 8.104 L 35.854 13.451 Z" fill="url(#gradient)" strokeWidth="0.34" stroke="rgba(0,0,0,0.3)" strokeMiterlimit="10" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#ea580c" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full"></div>
                        </div>
                        <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                            Shipsy
                        </span>
                    </motion.div>

                    {/* Right: Enhanced Login/Register Button */}
                    <motion.button
                        className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-orange-400/20 overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenModal}
                    >
                        <span className="relative z-10">Login / Register</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                </motion.nav>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Background Overlay */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={handleCloseModal}
                        ></div>

                        {/* Modal */}
                        <motion.div
                            className="relative w-full max-w-md glassmorphism rounded-3xl p-8 border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                                    {isLogin ? "Welcome Back" : "Join Shipsy"}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {isLogin
                                        ? "Sign in to your account"
                                        : "Create your account"}
                                </p>
                            </div>

                            {/* Toggle Buttons - Updated with new onClick handlers */}
                            <div className="flex bg-slate-800/50 rounded-2xl p-1 mb-6">
                                <button
                                    onClick={() => handleToggleMode(true)}
                                    className={`flex-1 py-2 px-4 rounded-xl font-medium cursor-pointer transition-all duration-200 ${isLogin
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleToggleMode(false)}
                                    className={`flex-1 py-2 px-4 rounded-xl font-medium cursor-pointer transition-all duration-200 ${!isLogin
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Updated submit button with loading state */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 border border-orange-400/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {isSubmitting
                                        ? (isLogin ? "Signing in..." : "Registration...")
                                        : (isLogin ? "Sign In" : "Create Account")
                                    }
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.main
                className="container mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid lg:grid-cols-2 ml-10 gap-8 lg:gap-16 items-center text-center lg:text-left">
                    {/* Left Content */}
                    <motion.div
                        className="space-y-6 lg:space-y-8"
                        variants={itemVariants}
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-snug tracking-tight"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                                Your Products,
                            </span>
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-lg"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                Their Doorstep —
                            </motion.span>
                            <br />
                            <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-xl">
                                Without the Stress.
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-sm"
                            variants={itemVariants}
                        >
                            Say goodbye to logistics headaches — we'll get your products to your customers, faster and safer than ever.
                        </motion.p>
                    </motion.div>

                    {/* Right Content - Fixed Video Container */}
                    <motion.div
                        className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                        variants={itemVariants}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <AnimatePresence>
                            <motion.video
                                key={page6}
                                src={page6}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1 }}
                            />
                        </AnimatePresence>
                        {/* Overlay gradient for better integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
                    </motion.div>
                </div>

                {/* Enhanced Testimonial */}
                <motion.section
                    className="mt-12 lg:mt-12 xl:mt-24 flex justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                >
                    <div className="max-w-5xl w-full glassmorphism rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl">
                        <motion.div
                            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 text-center lg:text-left"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex-shrink-0 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-lg opacity-30 rounded-full"></div>
                                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-white/10">
                                    <motion.h3
                                        className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Love Babbar
                                    </motion.h3>
                                    <p className="text-gray-400 font-medium">Manager at TechCo</p>
                                </div>
                            </div>

                            <motion.blockquote
                                className="text-gray-200 text-lg sm:text-xl lg:text-2xl italic leading-relaxed border-l-4 border-gradient-to-b from-orange-500 to-red-500 pl-6 lg:pl-8 relative"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.5, duration: 0.8 }}
                            >
                                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                                "Shipsy has transformed our logistics operations. Their real-time tracking and on-time deliveries have made a significant impact on our business. Highly recommended!"
                            </motion.blockquote>
                        </motion.div>
                    </div>
                </motion.section>
            </motion.main>

            {/* Enhanced Bottom CTA */}
            <motion.section
                className="text-center glassmorphism mx-4 sm:mx-6 lg:mx-8 rounded-3xl py-20 lg:py-24 px-6 sm:px-8 lg:px-12 border border-white/10 shadow-2xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <motion.h2
                    className="text-4xl p-3 sm:text-5xl lg:text-7xl font-black mb-6 lg:mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                >
                    Are you ready.
                </motion.h2>

                <motion.p
                    className="text-gray-300 text-xl sm:text-2xl mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.4, duration: 0.6 }}
                >
                    This could be the start of something big.
                </motion.p>

                <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.6, duration: 0.6 }}
                >
                    <motion.button
                        className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 sm:px-12 py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-2xl transition-all duration-300 border cursor-pointer border-orange-400/20 overflow-hidden group"
                        whileHover={{
                            scale: 1.08,
                            boxShadow: "0 30px 60px -12px rgba(251, 146, 60, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenModal}
                    >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                    <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-2xl -z-10"></div>
                </motion.div>

            </motion.section>

            {/* Enhanced Footer */}
            <motion.footer
                className="glassmorphism mx-4 sm:mx-6 lg:mx-8 rounded-3xl py-8 lg:py-10 px-6 sm:px-8 lg:px-12 text-center lg:text-left border border-white/10 shadow-xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, duration: 0.6 }}
            >
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8 text-sm text-gray-300">
                        <a
                            href="https://github.com/hirdeshh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent hover:underline"
                        >
                            Read Docs
                        </a>
                    </div>

                    <motion.div
                        className="text-sm text-gray-300 font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        Created by{" "}
                        <a
                            href="https://github.com/hirdeshh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent font-bold hover:underline"
                        >
                            Hirdesh Kumar
                        </a>
                    </motion.div>

                </div>
            </motion.footer>
        </div>
    );
};

export default ShipsyLanding;