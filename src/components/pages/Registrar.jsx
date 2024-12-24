import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../provider/AuthProviders';
import { Helmet } from 'react-helmet-async';

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
        <div className="flex card justify-center items-center min-h-screen bg-gray-100">
            {/* <Helmet>
                <title>LEWIO | Registrar</title>
            </Helmet> */}
            <Helmet>
                <title>LEWIO | Registrar</title>
            </Helmet>
            <div className="bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSignUp} className="card-body">
                    <h2 className="text-xl font-semibold">Register</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Photo url"
                            name="photo"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="input input-bordered"
                            required
                        />
                        <label className="flex justify-center items-center">
                            <p className="text-center my-3 label-text-alt text-[18px]">
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
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registrar;