import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store/current-user-slice";

const Nav = ({ active }) => {
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(userActions.updateUserName(""));
    };
    return (
        <div className='flex justify-between items-center px-4 py-2 h-12 bg-gray-800 text-gray-400 fixed w-full top-0'>
            <span className='text-white'>CONVIN</span>
            <ul className='flex justify-evenly w-1/2'>
                <li
                    className={`hover:text-white hover:cursor-pointer ${
                        active === "cards" ? "text-white underline" : ""
                    }`}>
                    <Link to='/'>Cards</Link>
                </li>
                <li
                    className={`hover:text-white hover:cursor-pointer ${
                        active === "createcard" ? "text-white underline" : ""
                    }`}>
                    <Link to='/createcard'>Create Card</Link>
                </li>
                <li
                    className={`hover:text-white hover:cursor-pointer ${
                        active === "mycards" ? "text-white underline" : ""
                    }`}>
                    <Link to='/mycards'>My Cards</Link>
                </li>
                <li
                    className={`hover:text-white hover:cursor-pointer ${
                        active === "history" ? "text-white underline" : ""
                    }`}>
                    <Link to='/history'>History</Link>
                </li>
            </ul>
            <span
                className={`hover:text-white hover:cursor-pointer ${
                    active === "signin-signup" ? "text-white underline" : ""
                }`}>
                {userName === "" ? (
                    <Link to='/login'>Sign In/ Sign Up</Link>
                ) : (
                    <p onClick={handleLogOut}>{userName + "/LogOut"}</p>
                )}
            </span>
        </div>
    );
};

export default React.memo(Nav);
