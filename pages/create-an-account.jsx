import { useEffect } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';

export default function CreateAnAccount() {
  const registerSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be at most 50 characters')
      .required('Password is required'),
    username: yup
      .string()
      .required('Username is required ')
      .matches(/^[a-zA-Z0-9_]+$/, 'Only alphabets are allowed for this field ')
      .max(15, 'Username must be at most 15 characters'),
    name: yup.string().required('Name is required'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.registerError);
  const usernameError = useSelector((state) => state.auth.updateProfileError);
  const isUsernameAvailable = useSelector(
    (state) => state.auth.isUsernameAvailable
  );
  useEffect(() => {
    if (Symbol.iterator in Object(usernameError)) {
      usernameError.forEach((err) => {
        setError('username', {
          type: 'manuel',
          message: err.message,
        });
      });
    }
  }, [usernameError, setError]);
  useEffect(() => {
    if (isUsernameAvailable) {
      clearErrors('username');
    }
  }, [isUsernameAvailable]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(authActions.registerRequest(data));
  };

  useEffect(() => {
    if (error && !loading) {
      error.forEach((err) => {
        if (err.message.includes('username')) {
          setError('username', {
            type: 'manuel',
            message: 'This username already exists',
          });
        } else if (err.message?.includes('6')) {
          setError('password', {
            type: 'manuel',
            message: 'Password must be at least 8 characters',
          });
        } else if (err.message?.includes('50')) {
          setError('password', {
            type: 'manuel',
            message: 'Password must be at most 50 characters',
          });
        } else if (err.message?.includes('email')) {
          setError('email', {
            type: 'manuel',
            message: err.message,
          });
        } else setError('email', { type: 'manuel', message: err?.message });
      });
    }
  }, [error, setError, usernameError]);
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  const checkUsername = (e) => {
    dispatch(authActions.checkUsernameRequest(e.target.value));
  };
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <img
            className="absolute top-8 left-8 w-[123px] h-[42px] mb-20 md:mb-44"
            src="./logo.svg"
            alt="Altogic"
          />
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div>
              <h1 className="mb-3 text-3xl font-semibold text-slate-800 tracking-md">
                Sign Up
              </h1>
              <p className="text-md text-slate-600 tracking-sm">
                Start your blog.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Name-Surname"
                    id="name"
                    name="name"
                    register={register('name')}
                    placeholder="johndoe"
                    error={errors.name}
                  />

                  <Input
                    label="Username"
                    id="username"
                    name="username"
                    register={register('username')}
                    placeholder="johndoe"
                    error={errors.username}
                    onBlur={checkUsername}
                  />

                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    register={register('email')}
                    error={errors.email}
                    placeholder="johndoe@example.com"
                  />

                  <div className="space-y-1">
                    <div className="mt-1">
                      <div className="space-y-1">
                        <Input
                          label="Password"
                          id="password"
                          name="password"
                          register={register('password')}
                          placeholder="************ "
                          type="password"
                          error={errors.password}
                        />
                      </div>

                      <span className="inline-block text-slate-500 mt-2 text-sm tracking-sm">
                        Must be at least 8 characters.
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Get started
                    </button>
                  </div>
                  <div className="mt-6 relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-8">
                      <p className="inline-block text-slate-700 mb-3 text-sm font-medium tracking-sm">
                        Sign in with
                      </p>

                      <div className="mt-1 grid grid-cols-4 gap-3">
                        <div>
                          <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with Google</span>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1015_28687)">
                                <path
                                  d="M23.7663 12.9661C23.7663 12.1504 23.7001 11.3302 23.559 10.5277H12.2402V15.1487H18.722C18.453 16.6391 17.5888 17.9575 16.3233 18.7952V21.7936H20.1903C22.4611 19.7036 23.7663 16.617 23.7663 12.9661Z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12.2401 24.6905C15.4766 24.6905 18.2059 23.6278 20.1945 21.7936L16.3276 18.7952C15.2517 19.5272 13.8627 19.9416 12.2445 19.9416C9.11388 19.9416 6.45946 17.8296 5.50705 14.99H1.5166V18.0809C3.55371 22.1331 7.7029 24.6905 12.2401 24.6905Z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M5.50277 14.9899C5.00011 13.4996 5.00011 11.8858 5.50277 10.3954V7.30447H1.51674C-0.185266 10.6953 -0.185266 14.6901 1.51674 18.0809L5.50277 14.9899Z"
                                  fill="#FBBC04"
                                />
                                <path
                                  d="M12.2401 5.43933C13.9509 5.41287 15.6044 6.05663 16.8434 7.23833L20.2695 3.81228C18.1001 1.77517 15.2208 0.655201 12.2401 0.690475C7.7029 0.690475 3.55371 3.24789 1.5166 7.30447L5.50264 10.3954C6.45064 7.5514 9.10947 5.43933 12.2401 5.43933Z"
                                  fill="#EA4335"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1015_28687">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0 0.689667)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">
                              Sign in with Twitter
                            </span>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.54752 22.4404C16.6042 22.4404 21.5578 14.937 21.5578 8.43013C21.5578 8.21701 21.5578 8.00485 21.5434 7.79365C22.507 7.0966 23.3389 6.23353 24 5.24485C23.1014 5.64325 22.148 5.9044 21.1718 6.01957C22.1998 5.40425 22.9692 4.43635 23.3366 3.29605C22.3701 3.86965 21.3126 4.27387 20.2099 4.49125C19.4675 3.70182 18.4856 3.17909 17.4162 3.00393C16.3468 2.82877 15.2494 3.01096 14.294 3.5223C13.3385 4.03364 12.5782 4.84562 12.1307 5.83259C11.6833 6.81957 11.5735 7.92651 11.8186 8.98213C9.8609 8.88392 7.94576 8.37516 6.19745 7.48885C4.44915 6.60254 2.90676 5.35851 1.6704 3.83749C1.04073 4.92148 0.847872 6.20471 1.1311 7.42591C1.41433 8.6471 2.15234 9.71444 3.19488 10.4106C2.41123 10.3876 1.64465 10.1762 0.96 9.79429V9.85669C0.960311 10.9935 1.35385 12.0953 2.07387 12.9751C2.79389 13.8548 3.79606 14.4585 4.9104 14.6836C4.18548 14.8813 3.42487 14.9102 2.68704 14.768C3.00181 15.7464 3.61443 16.6019 4.43924 17.215C5.26405 17.8281 6.25983 18.1681 7.28736 18.1876C6.26644 18.99 5.09731 19.5834 3.84687 19.9336C2.59643 20.2838 1.28921 20.384 0 20.2285C2.25183 21.6735 4.87192 22.44 7.54752 22.4365"
                                fill="#1DA1F2"
                              />
                            </svg>
                          </button>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">
                              Sign in with Linkedin
                            </span>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1015_28702)">
                                <path
                                  d="M22.2283 0.689667H1.77167C1.30179 0.689667 0.851161 0.876324 0.518909 1.20858C0.186657 1.54083 0 1.99146 0 2.46133V22.918C0 23.3879 0.186657 23.8385 0.518909 24.1708C0.851161 24.503 1.30179 24.6897 1.77167 24.6897H22.2283C22.6982 24.6897 23.1488 24.503 23.4811 24.1708C23.8133 23.8385 24 23.3879 24 22.918V2.46133C24 1.99146 23.8133 1.54083 23.4811 1.20858C23.1488 0.876324 22.6982 0.689667 22.2283 0.689667ZM7.15333 21.1347H3.545V9.673H7.15333V21.1347ZM5.34667 8.08467C4.93736 8.08236 4.53792 7.95886 4.19873 7.72975C3.85955 7.50065 3.59584 7.1762 3.44088 6.79736C3.28591 6.41851 3.24665 6.00226 3.32803 5.60112C3.40941 5.19998 3.6078 4.83194 3.89816 4.54345C4.18851 4.25495 4.55782 4.05893 4.95947 3.98013C5.36112 3.90132 5.77711 3.94326 6.15495 4.10065C6.53279 4.25804 6.85554 4.52383 7.08247 4.86448C7.30939 5.20512 7.43032 5.60536 7.43 6.01467C7.43386 6.2887 7.38251 6.56071 7.27901 6.81447C7.17551 7.06824 7.02198 7.29857 6.82757 7.49173C6.63316 7.6849 6.40185 7.83695 6.14742 7.93882C5.893 8.04069 5.62067 8.09029 5.34667 8.08467ZM20.4533 21.1447H16.8467V14.883C16.8467 13.0363 16.0617 12.4663 15.0483 12.4663C13.9783 12.4663 12.9283 13.273 12.9283 14.9297V21.1447H9.32V9.68133H12.79V11.2697H12.8367C13.185 10.5647 14.405 9.35967 16.2667 9.35967C18.28 9.35967 20.455 10.5547 20.455 14.0547L20.4533 21.1447Z"
                                  fill="#0A66C2"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1015_28702">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0 0.689667)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">
                              Sign in with Facebook
                            </span>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1015_28711)">
                                <path
                                  d="M24 12.6897C24 6.06225 18.6274 0.689667 12 0.689667C5.37258 0.689667 0 6.06225 0 12.6897C0 18.6791 4.3882 23.6437 10.125 24.5439V16.1584H7.07812V12.6897H10.125V10.0459C10.125 7.03842 11.9166 5.37717 14.6576 5.37717C15.9701 5.37717 17.3438 5.61154 17.3438 5.61154V8.56467H15.8306C14.34 8.56467 13.875 9.48975 13.875 10.4397V12.6897H17.2031L16.6711 16.1584H13.875V24.5439C19.6118 23.6437 24 18.6791 24 12.6897Z"
                                  fill="#1877F2"
                                />
                                <path
                                  d="M16.6711 16.1584L17.2031 12.6897H13.875V10.4397C13.875 9.49068 14.34 8.56467 15.8306 8.56467H17.3438V5.61154C17.3438 5.61154 15.9705 5.37717 14.6576 5.37717C11.9166 5.37717 10.125 7.03842 10.125 10.0459V12.6897H7.07812V16.1584H10.125V24.5439C11.3674 24.7383 12.6326 24.7383 13.875 24.5439V16.1584H16.6711Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1015_28711">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0 0.689667)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <p className="text-center text-sm text-slate-500">
                  Don’t have an account?{' '}
                  <Link href="/login">
                    <a
                      href="#"
                      className="font-medium text-purple-700 tracking-sm hover:text-purple-500"
                    >
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block relative">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="./login.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
