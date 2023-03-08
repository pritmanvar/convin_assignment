import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../store/current-user-slice";
import Nav from "../Components/Nav";

const Login = ({}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { parent } = useParams();

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // get users from json-server
            const res = await axios.get(
                "https://convin-assignment.onrender.com/users"
            );
            if (res.status !== 200) {
                throw new Error(res);
            }

            const userExist = res.data.filter((u) => u.userName === userName);

            // user not found
            if (userExist.length == 0) {
                alert(
                    "User with user name " +
                        userName +
                        " not found. Please sigiUp first."
                );
            } else if (userExist[0].password !== password) {
                // incorrect password
                alert("Invalid Credentials, Please Try Again.");
                setPassword("");
            } else {
                // login successfull
                // set current user in redux store
                dispatch(
                    userActions.updateUser({ userName, id: userExist[0].id })
                );

                dispatch(userActions.clearHistory());
                const history = userExist[0].history.map((h) =>
                    dispatch(userActions.updateHistory(h))
                );

                // move to parent component
                navigateTo(`/${parent === undefined ? "" : parent}`);
            }
        } catch (error) {
            console.error(error);
            setUserName("");
            setPassword("");
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

                            <p className='text-center underline font-bold text-gray-700'>
                                <Link to='/signup'>Don't have an account?</Link>
                            </p>

                            <div className='bg-gray-50 px-4 py-3 text-center'>
                                <button
                                    type='submit'
                                    className=' rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'>
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
