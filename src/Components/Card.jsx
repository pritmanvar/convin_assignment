import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/current-user-slice";

const Card = ({
    id,
    title,
    videoUrl,
    description,
    userName,
    bucket,
    setVideoUrl,
    setIsYtVideo,
    setShowVideo,
}) => {
    const dispatch = useDispatch();

    // regex to get youtube video id from youtube video
    const youtube_parser = (url) => {
        const regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    };

    const yt_id = youtube_parser(videoUrl);

    // show iframe with video
    const handleCardClick = () => {
        dispatch(
            userActions.updateHistory(
                JSON.stringify({
                    name: title,
                    url: videoUrl,
                    time: new Date().toLocaleString(),
                })
            )
        );
        setVideoUrl(yt_id === false ? videoUrl : yt_id);
        setIsYtVideo(yt_id === false ? false : true);
        setShowVideo(true);
    };

    return (
        <div
            className='w-72 border-solid border-2 border-gray-800 rounded-xl overflow-hidden pb-2 m-4'
            id={id}>
            <img
                className='w-72 hover:cursor-pointer'
                onClick={handleCardClick}
                src={`http://i1.ytimg.com/vi/${yt_id}/hqdefault.jpg`}
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
