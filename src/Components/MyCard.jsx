import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, videoUrl, description, userName, bucket }) => {
    console.log(id);
    const youtube_parser = (url) => {
        var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    };

    const navigateTo = useNavigate();

    return (
        <div
            className='w-72 border-solid border-2 border-gray-800 rounded-xl overflow-hidden pb-2 m-4'
            id={id}>
            <img
                src={`http://i1.ytimg.com/vi/${youtube_parser(
                    videoUrl
                )}/hqdefault.jpg`}
                alt='Youtube Video Thumbnail'
            />
            <p className='text-lg font-bold px-2'>{title}</p>
            <p className='px-2 text-sm font-semibold'>Type: {bucket}</p>
            <p className='px-2 text-sm font-semibold'>Author: {userName}</p>
            <p className='text-xs text-justify px-2'>{description}</p>
            <div className='flex justify-evenly my-3'>
                <button
                    type='submit'
                    onClick={() => navigateTo(`/updatecard/${id}`)}
                    className=' rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'>
                    Edit
                </button>
                <button
                    type='submit'
                    className=' rounded-md bg-red-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-900'>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;
