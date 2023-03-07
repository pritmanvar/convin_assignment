import React from "react";

const Card = () => {
    return (
        <div className='w-72 border-solid border-2 border-gray-800 rounded-xl overflow-hidden pb-2 m-4'>
            <img
                src='http://i1.ytimg.com/vi/nTKdYm_5-ZY/hqdefault.jpg'
                alt='Youtube Video Thumbnail'
            />
            <p className='text-lg font-bold px-2'>Title</p>
            <p className='px-2 text-sm font-semibold'>Type: Education</p>
            <p className='text-xs text-justify px-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                odio odit dolorum mollitia enim at provident
            </p>
        </div>
    );
};

export default Card;
