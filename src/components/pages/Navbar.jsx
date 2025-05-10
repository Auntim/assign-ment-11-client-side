import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProviders";
import { AiOutlineClose } from "react-icons/ai";
import { GoLaw } from 'react-icons/go';
// import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeToggle from "../ThemeToggle";
import { FiChevronDown } from 'react-icons/fi';




const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isOpens, setIsOpens] = useState(false);
    const toggleDropdownUser = () => setIsOpens(prev => !prev);

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


    return (
        <nav className=" bg-gradient-to-r fixed top-0  w-full z-50 shadow-lg from-cyan-500 to-blue-600 text-white  dark:text-white dark:border-b-2 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black">
            <div className="w-full  md:container mx-auto flex justify-between items-center py-4 px-6 ">
                <Link to="/" className="text-xl md:text-2xl font-bold text-slate-700 flex items-center">
                    <span className="text-pink-600 mx-1 "><GoLaw className="h-10 w-10" /></span> <span className="hidden md:flex dark:text-white">Attorney</span>
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
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-1 text-[22px] hover:text-yellow-500 transition duration-300"
                            >
                                Dashboard <FiChevronDown className="text-[18px] mt-1" />
                            </button>

                            {isOpen && (
                                <ul className="absolute bg-gray-900 text-white mt-3 rounded-xl shadow-2xl p-2 grid grid-cols-1 gap-1 w-40 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
                                    <li>
                                        <Link
                                            to="/dashboard/add-service"
                                            className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            ➕ Add Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/manage-service"
                                            className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Manage Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/booked-services"
                                            className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Booked Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/service-to-do"
                                            className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Service To-Do
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>

                <div className="flex justify-center items-center ">
                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-yellow-500 font-semibold btn btn-outline text-white mr-2">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-yellow-500 text-white font-semibold btn btn-outline mr-2">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative flex gap-2 items-center">
                            {/* Profile Image or Fallback Icon */}
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-yellow-500 cursor-pointer"
                                    onClick={toggleDropdownUser}
                                />
                            ) : (
                                <FaUserCircle
                                    className="text-3xl text-yellow-500 cursor-pointer"
                                    onClick={toggleDropdownUser}
                                />
                            )}

                            {/* Dropdown Content */}
                            {isOpens && (
                                <div className="absolute bg-black text-white rounded-2xl shadow-lg p-4 top-12 right-0 z-50">
                                    <p className="font-semibold">{user?.displayName || 'User'}</p>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpens(false);
                                        }}
                                        className="hover:text-yellow-500 btn btn-outline text-white mt-2 text-xl"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    )}
                    <div className="mx-2 md:mx-3">
                        <ThemeToggle />
                    </div>


                    <div className="md:hidden flex items-center">
                        {isMenuOpen ? (
                            <AiOutlineClose
                                className="text-3xl cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        ) : (
                            <CgMenuRightAlt
                                className="text-3xl cursor-pointer"
                                onClick={() => setIsMenuOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>


            {isMenuOpen && (
                <ul className="md:hidden  bg-violet-500 dark:bg-medium dark:text-white space-y-4 p-4">
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
        </nav>
    );
};

export default Navbar;
