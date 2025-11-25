import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProviders";
import { AiOutlineClose } from "react-icons/ai";
import { GoLaw } from 'react-icons/go';
import ThemeToggle from "../ThemeToggle";
import { FiChevronDown } from 'react-icons/fi';
import useToast from "../hooks/useToast";




const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dashboardRef = useRef(null);
    const userRef = useRef(null);
    const { success, error } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isOpens, setIsOpens] = useState(false);
    const toggleDropdownUser = () => setIsOpens(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dashboardRef.current &&
                !dashboardRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }

            if (
                userRef.current &&
                !userRef.current.contains(event.target)
            ) {
                setIsOpens(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = async () => {
        try {
            await logout();
            success("Logout Successful");
            navigate("/login");
        } catch (err) {
            error("Logout Failed. Please try again.", err.message);
        }
    };


    return (
        <nav className=" bg-black/70 backdrop-blur-xl fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] rounded-full z-50 shadow-lg text-white  dark:text-white dark:border-b-2 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500">
            <div className="w-full md:container mx-auto flex justify-between items-center py-2 md:py-2 px-6">
                <Link to="/" className="text-xl md:text-2xl font-bold text-slate-700 flex items-center">
                    <span className="text-pink-600 mx-1 "><GoLaw className="h-8 w-8" /></span> <span className="hidden md:flex dark:text-white text-white"></span>
                </Link>

                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[18px]" : "hover:text-yellow-500 text-[18px]"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                isActive ? "text-yellow-500 text-[18px]" : "hover:text-yellow-500 text-[18px]"
                            }
                        >
                            Services
                        </NavLink>
                    </li>


                    {user && (
                        <li className="relative" ref={dashboardRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-1 text-[18px] hover:text-yellow-500 transition duration-300"
                            >
                                Dashboard <FiChevronDown className="text-[14px] text-gray-300 mt-1" />
                            </button>

                            {isOpen && (
                                <ul className="absolute  backdrop-blur-md bg-black/70 text-white mt-3 rounded-xl shadow-2xl p-2 grid grid-cols-1 gap-1 w-40 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 border border-gray-800">
                                    <li>
                                        <Link
                                            to="/dashboard/add-service"
                                            className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Add Service
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
                            <Link to="/login" className="hover:text-yellow-500 text-sm md:text-[16px] border px-3 py-1 rounded-2xl btn-outline text-white mr-1 scale-100 hover:scale-105 transition-transform duration-300">
                                Login
                            </Link>

                        </>
                    ) : (
                        <div className="relative flex gap-2  items-center" ref={userRef}>
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
                                <div className="absolute bg-black/70 backdrop-blur-md border border-gray-900 text-white rounded-2xl shadow-lg px-3 py-2 top-12 right-0 z-50" ref={userRef}>
                                    <p className="font-semibold">{user?.displayName || 'User'}</p>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpens(false);
                                        }}
                                        className="hover:text-yellow-500 bg-orange-800 px-3 py-2 rounded-md text-white mt-2 text-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    )}
                    <div className=" md:mx-3 rounded-2xl ">
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
                                className="text-3xl cursor-pointer "
                                onClick={() => setIsMenuOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>


            {isMenuOpen && (
                <ul className="absolute top-20 right-4 w-40 backdrop-blur-md bg-black/70 text-white rounded-xl shadow-2xl p-1 space-y-3 z-50 border border-gray-700" >
                    {user ? (
                        <>
                            <li>
                                <Link
                                    to="/dashboard/add-service"
                                    className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                >
                                    Add Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/manage-service"
                                    className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                >
                                    Manage Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/booked-services"
                                    className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                >
                                    Booked Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/service-to-do"
                                    className="block px-3 py-2 hover:bg-gray-800 hover:text-yellow-400 rounded transition"
                                >
                                    Service To-Do
                                </Link>
                            </li>
                            <li>
                                {/* Theme Toggle with custom wrapper */}
                                {/* <div className="flex  items-center gap-2">
                                    <p className="text-md ml-3">Theme:</p>
                                    <ThemeToggle />
                                </div> */}
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-yellow-500 text-[22px]"
                                            : "hover:text-yellow-500 text-[22px]"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-yellow-500 text-[22px]"
                                            : "hover:text-yellow-500 text-[22px]"
                                    }
                                >
                                    Services
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            )}




        </nav>
    );
};

export default Navbar;



