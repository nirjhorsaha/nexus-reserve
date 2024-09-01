/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Spin } from 'antd';
import { useSignupMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

interface IFormInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    terms: boolean;
}

const SignUp: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const toastId = toast.loading('Signing up...');
        const { terms, ...userdata } = data;
        const userInfo = { ...userdata, role: 'user' };
        console.log(userInfo)
        try {
            await signup(userInfo).unwrap();
            toast.success('Signup successful!', { id: toastId, duration: 2000 });
            navigate('/')
        } catch (error) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Signup - Nexus Reserve</title>
            </Helmet>
            <div className="bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-8"
                style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}>
                <div className="flex flex-col items-center w-full max-w-lg bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-6 dark:text-white">
                        Create your account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <div>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Please input your name!' }}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
                                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Please input your email!',
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: 'Please input a valid email!' }
                                }}
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        {...field}
                                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Please input your password!' }}
                                render={({ field }) => (
                                    <Input.Password
                                        placeholder="Password"
                                        {...field}
                                        className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Please input your phone number!' }}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Enter your phone number"
                                        {...field}
                                        className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: 'Please input your address!' }}
                                render={({ field }) => (
                                    <Input.TextArea
                                        placeholder="Enter your address"
                                        rows={4}
                                        {...field}
                                        className={`w-full bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="terms"
                                control={control}
                                rules={{ required: 'You must accept the terms and conditions!' }}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        className="text-gray-500 dark:text-gray-300"
                                    >
                                        I agree to the <Link to="/terms" className="font-medium text-primary-600 hover:underline dark:text-primary-500">terms and conditions</Link>
                                    </Checkbox>
                                )}
                            />
                            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
                        </div>

                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spin size="small" /> : 'Sign up'}

                            </Button>
                        </div>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link id='login' to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                <span className='text-blue-600 font-bold'>Sign in</span></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
