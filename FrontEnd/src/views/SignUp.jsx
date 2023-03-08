import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";

const SignUp = () => {
    // form data
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // password didn't match
        if (password !== cnfPassword) {
            setPassword("");
            setCnfPassword("");
            alert("Password and Confirm Password are not matching!!!");
            return;
        }

        try {
            // check if current users is already exist or not.
            const res = await axios.get(
                "http://localhost:3000/users?userName=" + userName
            );
            if (res.status !== 200) {
                throw new Error(res);
            }

            // check current user already exist or not.
            if (res.data.length > 0) {
                alert(
                    "User with user name " +
                        userName +
                        " already exist. Please try again with different user name"
                );

                setUserName("");
                setPassword("");
                setCnfPassword("");
            } else {
                // if not add new user
                try {
                    const result = await axios.post(
                        "http://localhost:3000/users",
                        { userName, password, bucket: [], history: [] }
                    );
                    if (result.status !== 201) {
                        throw new Error(result.message);
                    }

                    navigateTo("/login/");
                } catch (error) {
                    throw new Error(error);
                }
            }
        } catch (error) {
            console.error(error);
            setUserName("");
            setPassword("");
            setCnfPassword("");
        }
    };
    return (
        <>
            <Nav active={"signin-signup"} />
            <div className='mt-24'>
                <form
                    className='w-1/3 mx-auto'
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                    <div className='shadow'>
                        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                            {/* Input for user name */}
                            <div>
                                <label
                                    htmlFor='user-name'
                                    className='block text-sm font-medium text-gray-800'>
                                    User Name
                                </label>
                                <div className='mt-2 flex rounded-md shadow-sm'>
                                    <input
                                        type='text'
                                        name='user-name'
                                        id='user-name'
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                        placeholder='Enter your userName'
                                        required
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Input for Password */}
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-800'>
                                    Password
                                </label>
                                <div className='mt-2 flex rounded-md shadow-sm'>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                        placeholder='Enter your password'
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Input for confirm Password */}
                            <div>
                                <label
                                    htmlFor='confirm-password'
                                    className='block text-sm font-medium text-gray-800'>
                                    Password
                                </label>
                                <div className='mt-2 flex rounded-md shadow-sm'>
                                    <input
                                        type='password'
                                        name='confirm-password'
                                        id='confirm-password'
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                        placeholder='Re-enter your password'
                                        required
                                        value={cnfPassword}
                                        onChange={(e) =>
                                            setCnfPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <p className='text-center underline font-bold text-gray-700'>
                                <Link to='/login'>Already have an account</Link>
                            </p>

                            <div className='bg-gray-50 px-4 py-3 text-center'>
                                <button
                                    type='submit'
                                    className=' rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
