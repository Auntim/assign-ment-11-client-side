import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProviders";
import { AiOutlineClose } from "react-icons/ai";
import { GoLaw } from 'react-icons/go';
import { FaSun, FaMoon } from 'react-icons/fa';



const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire({
                icon: "success",
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <nav className="bg-gradient-to-r fixed top-0  w-full z-50 shadow-lg from-cyan-500 to-blue-600 text-white dark:bg-gray-900 dark:text-white">
            <div className="w-full md:container mx-auto flex justify-between items-center py-4 px-6 ">
                <Link to="/" className="text-xl md:text-2xl font-bold text-slate-700 flex items-center">
                    <span className="text-pink-600 mx-1 "><GoLaw className="h-10 w-10" /></span> <span className="hidden md:flex">Attorney</span>
                </Link>

                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[22px]" : "hover:text-yellow-500 text-[22px]"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[22px]" : "hover:text-yellow-500 text-[22px]"
                            }
                        >
                            Services
                        </NavLink>
                    </li>
                    {user && (
                        <li className="relative group">
                            <button className="hover:text-yellow-500 text-[22px]">
                                Dashboard
                            </button>
                            {/* Dropdown Menu */}
                            <ul className="absolute hidden group-hover:grid bg-gray-900 text-white mt-2 rounded-lg shadow-lg p-4 grid-cols-2 gap-4 w-48 left-1/2 transform -translate-x-1/2">
                                <li>
                                    <Link
                                        to="/dashboard/add-service"
                                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Add Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/manage-service"
                                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Manage Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/booked-services"
                                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Booked Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard/service-to-do"
                                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Service To-Do
                                    </Link>
                                </li>
                            </ul>
                        </li>

                    )}
                </ul>

                <div className="flex justify-center items-center ">
                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-yellow-500 font-semibold btn btn-outline text-white mr-2">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-yellow-500 text-white font-semibold btn btn-outline">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative group flex gap-2">
                            <img
                                src={user.photoURL || <FaUserCircle className="text-3xl" />}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-yellow-500 cursor-pointer"
                            />
                            <div className="absolute hidden group-hover:block bg-black text-white rounded-2xl shadow-lg p-4 top-12 right-0">
                                <p className="font-semibold">{user.displayName || "User"}</p>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-yellow-500  btn btn-outline text-white mt-2 text-xl"
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    )}

                    <div className="rounded bg-gray-200 dark:bg-gray-800 mx-1">
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 bg-transparent text-white rounded flex items-center space-x-2"
                        >
                            {theme === 'light' ? (
                                <>
                                    <FaMoon className="w-5 h-5" />

                                </>
                            ) : (
                                <>
                                    <FaSun className="w-5 h-5" />

                                </>
                            )}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        {isMenuOpen ? (
                            <AiOutlineClose
                                className="text-3xl cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        ) : (
                            <GiHamburgerMenu
                                className="text-3xl cursor-pointer"
                                onClick={() => setIsMenuOpen(true)}
                            />
                        )}
                    </div>
                </div>

            </div>


            {isMenuOpen && (
                <ul className="md:hidden  bg-violet-500 space-y-4 p-4">
                    <li>
                        <Link
                            to="/dashboard/add-service"
                            className="block px-3 py-2 hover:bg-gray-700 rounded"
                        >
                            Add Service
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/manage-service"
                            className="block px-3 py-2 hover:bg-gray-700 rounded"
                        >
                            Manage Service
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/booked-services"
                            className="block px-3 py-2 hover:bg-gray-700 rounded"
                        >
                            Booked Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/service-to-do"
                            className="block px-3 py-2 hover:bg-gray-700 rounded"
                        >
                            Service To-Do
                        </Link>
                    </li>

                </ul>
            )}


            {/* Mobile Menu */}
            {/* <div className="md:hidden flex justify-between px-6 py-4">
                <GiHamburgerMenu className="text-3xl" />
            </div> */}
        </nav>
    );
};

export default Navbar;
