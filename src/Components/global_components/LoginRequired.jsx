import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequired = () => {
    const navigateTo = useNavigate();
    return (
        <div className='text-center'>
            <p className='text-3xl my-3'>
                You must be logged in to access this section
            </p>
            <button
                className='rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'
                onClick={() => navigateTo("/login")}>
                Login Now
            </button>
        </div>
    );
};

export default LoginRequired;
