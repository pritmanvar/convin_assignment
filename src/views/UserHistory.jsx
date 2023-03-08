import React from "react";
import { useSelector } from "react-redux";
import Nav from "../Components/Nav";

const UserHistory = () => {
    const historyData = useSelector((state) => state.CurrentUser.history);

    const historyObjects = historyData.map((h) => JSON.parse(h));
    historyObjects.reverse();
    return (
        <>
            <Nav active={"history"} />
            <div className='mt-16 flex justify-center'>
                <div className='border-gray-800 border-2 rounded-b-md rounded-t-lg w-10/12 mb-2'>
                    <div className='grid grid-cols-5 gap-2 bg-gray-800 rounded-t-md p-2 text-white text-center'>
                        <p>Name</p>
                        <p className='col-span-3'>URL</p>
                        <p>Time</p>
                    </div>
                    {historyObjects.map((h) => {
                        return (
                            <div
                                className='grid grid-cols-5 gap-2 p-2'
                                key={h.time}>
                                <p>{h.name}</p>
                                <p className='col-span-3'>{h.url}</p>
                                <p>{h.time}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default UserHistory;
