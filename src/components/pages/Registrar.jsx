import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../provider/AuthProviders';
import { Helmet } from 'react-helmet-async';
import registrationLotti from '../../assets/lotti/register.json'
import Lottie from 'lottie-react';

function Registrar() {
    const { createUser, setUser, updateuser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRegex = /.{6,}/;

        if (!uppercaseRegex.test(password)) {
            return 'Password must have at least one uppercase letter.';
        }
        if (!lowercaseRegex.test(password)) {
            return 'Password must have at least one lowercase letter.';
        }
        if (!lengthRegex.test(password)) {
            return 'Password must be at least 6 characters long.';
        }
        return null;
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setError('');

        const form = new FormData(e.target);
        const name = form.get('name')


        // const name = e.target.name.value;
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // const email = e.target.email.value;
        // const password = e.target.password.value;

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateuser({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate('/');
                    })
                    .catch(err => console.log(err));
            })
            .catch((error) => {
                setError(error.message || 'Registration failed. Please try again.');
                console.error(error);
            });
    };

    return (
        <div className="flex  justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-gray-500 dark:bg-gradient-to-r dark:from-gray-800 dark:to-medium">
            <Helmet>
                <title>LEWIO | Registrar</title>
            </Helmet>
            <div className='hidden md:flex rounded-lg p-6'>
                <Lottie animationData={registrationLotti}></Lottie>
            </div>
            <div className="card border-2 mt-24 text-white w-full max-w-sm shadow-2xl 
             mx-6 md:mx-0">
                <form onSubmit={handleSignUp} className="card-body">
                    <h2 className="text-xl md:text-2xl text-center font-bold text-black"><span className='text-amber-400'>Lewio</span> Account</h2>
                    <div className="">
                        <label className="block text-sm font-medium mb-1 text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            className="input input-bordered text-black w-full"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium mb-1 text-black">
                            PhotoUrl
                        </label>
                        <input
                            type="text"
                            placeholder="Photo url"
                            name="photo"
                            className="input input-bordered text-black w-full"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium mb-1 text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered text-black w-full"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium mb-1 text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="input input-bordered text-black w-full"
                            required
                        />
                        <label className="flex justify-center items-center">
                            <p className="text-center mt-4 label-text-alt text-black text-[18px]">
                                Already have an Account?{' '}
                                <span>
                                    <Link to="/login" className="text-blue-500 hover:underline">
                                        Login
                                    </Link>
                                </span>
                            </p>
                        </label>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="w-full mt-6">
                        <button className="bg-amber-500 w-full px-3 py-2 rounded-lg dark:text-white">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registrar;