import React, { useEffect } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Input, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

interface LoginFormInputs {
    email: string;
    password: string;
    remember: boolean;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
        //! Default value (for development only)
        defaultValues: {
            email: 'test@demouser.com',  
            password: 'test-password',
            remember: true,
        },
    });

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in');

        try {
            const userInfo = {
                email: data.email,
                password: data.password
            };
            const res = await login(userInfo).unwrap();
            // console.log({ res })

            const { accessToken, ...userDetails } = res.data;
            const userData = userDetails.user;
            
            const user = verifyToken(accessToken);
            dispatch(setUser({ user: userData, token: res.data.accessToken  }));

            // Navigate based on role
            if (user?.role === 'admin') {
                navigate(`/${user?.role}/dashboard`);
            } else {
                navigate('/');
            }
            toast.success('Successfully Logged in', { id: toastId, duration: 2000 });
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };



    return (
        <div>
            <Helmet>
                <title>Login - Nexus Reserve</title>
            </Helmet>
            <div className="bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-8">
                <div className="flex flex-col items-center w-full max-w-lg bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 md:p-8">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-6 dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Please input your email!' }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="name@company.com"
                                        className={`mt-1 w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg shadow-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Please input your password!' }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="••••••••"
                                        className={`mt-1 w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg shadow-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        className="text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </Checkbox>
                                )}
                            />
                            <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                        </div>

                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </Button>
                        </div>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link id='signup' to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><span className='text-blue-600 font-bold'>Sign up</span></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { Input, Button, Checkbox } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from '@/redux/features/auth/authApi';
// import { useAppDispatch } from '@/redux/hooks';
// import { setUser } from '@/redux/features/auth/authSlice';
// import { verifyToken } from '@/utils/verifyToken';

// interface LoginFormInputs {
//     email: string;
//     password: string;
//     remember: boolean;
// }

// const Login: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();

//     const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
//         defaultValues: {
//             email: 'test@programming-hero.com',  // Default email value
//             password: 'test-password',           // Default password value (for development only)
//             remember: true,
//         },
//     });

//     const [login, { error }] = useLoginMutation();

//     const onSubmit = async (data: LoginFormInputs) => {
//         const userInfo = {
//             email: data.email,
//             password: data.password
//         };
//         const res = await login(userInfo).unwrap();

//         const user = verifyToken(res.data.accessToken);
//         console.log(user);

//         dispatch(setUser({ user, token: res.data.accessToken }));
//         console.log('Success:', data);

//         navigate('/');
//     };

//     return (
//         <section className="bg-cover bg-center min-h-screen flex items-center justify-center px-6 py-8"
//             style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}>
//             <div className="flex flex-col items-center w-full max-w-lg bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-8">
//                 <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-6 dark:text-white">
//                     Sign in to your account
//                 </h1>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
//                     <div>
//                         <Controller
//                             name="email"
//                             control={control}
//                             rules={{ required: 'Please input your email!' }}
//                             render={({ field }) => (
//                                 <Input
//                                     {...field}
//                                     type="email"
//                                     placeholder="name@company.com"
//                                     className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                                 />
//                             )}
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>

//                     <div>
//                         <Controller
//                             name="password"
//                             control={control}
//                             rules={{ required: 'Please input your password!' }}
//                             render={({ field }) => (
//                                 <Input.Password
//                                     {...field}
//                                     placeholder="••••••••"
//                                     className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                                 />
//                             )}
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                     </div>

//                     <div>
//                         <Controller
//                             name="remember"
//                             control={control}
//                             render={({ field }) => (
//                                 <Checkbox
//                                     {...field}
//                                     checked={field.value}
//                                     className="text-gray-500 dark:text-gray-300"
//                                 >
//                                     Remember me
//                                 </Checkbox>
//                             )}
//                         />
//                     </div>

//                     <div>
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                         >
//                             Sign in
//                         </Button>
//                     </div>

//                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
//                     </p>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Login;
