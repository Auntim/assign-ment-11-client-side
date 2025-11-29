import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProviders';
import loginLotti from '../../assets/lotti/login.json'
import Lottie from 'lottie-react';
import useToast from '../hooks/useToast';


function Login() {
    const { googleSignIn, signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { success, error } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const result = await signInUser(email, password);
            console.log('Email Login Successful:', result.user);
            success('Login Successful')
            navigate('/');
        } catch (error) {
            console.error('Email Login Error:', error.message);
            error('Login Failed. Please check your credentials... ');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            console.log('Google Sign-In Successful:', result.user);
            success('Login Successful')
            navigate('/');
        } catch (err) {
            console.error('Google Sign-In Error:', err.message);
            error('Google Sign-In Failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen gap-4 dark:bg-gradient-to-r dark:from-gray-800 dark:to-medium bg-gradient-to-r from-purple-600 to-gray-500 ">
            <Helmet>
                <title>LEWIO | Login</title>
            </Helmet>
            <div className='hidden md:flex rounded-lg p-6'>
                <Lottie animationData={loginLotti}></Lottie>
            </div>
            <div className="card text-white w-full max-w-sm shadow-2xl border-2 mx-6 md:mx-0 mt-24 ">
                <div className="card-body">
                    <h2 className="text-2xl font-bold mb-4 text-center text-black"><span className='text-amber-400'>Login</span> Now!</h2>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-[80%] mx-auto flex items-center justify-center gap-2 mb-3 dark:text-white dark:bg-slate-900 "
                    >
                        <FaGoogle className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`input input-bordered w-full text-black ${errors.email ? 'border-red-500' : ''}`}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className={`input input-bordered w-full text-black ${errors.password ? 'border-red-500' : ''}`}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="bg-amber-500  px-3 py-2 rounded-lg w-full">Login</button>
                        <p className='text-center text-black dark:text-black'>
                            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                        </p>
                    </form>




                </div>
            </div>
        </div>
    );
}

export default Login;