import React from "react";

const Card = ({ title, videoUrl, description, userName, bucket }) => {
    const youtube_parser = (url) => {
        var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    };

    return (
        <div className='w-72 border-solid border-2 border-gray-800 rounded-xl overflow-hidden pb-2 m-4'>
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
        </div>
    );
};

export default Card;
