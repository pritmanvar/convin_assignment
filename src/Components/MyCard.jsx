import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../store/current-user-slice";

const Card = ({
    id,
    title,
    videoUrl,
    description,
    userName,
    bucket,
    deleteMultiple,
    setDeleteMultipleList,
    deleteCard,
    setVideoUrl,
    setIsYtVideo,
    setShowVideo,
}) => {
    const [selectMe, setSelectMe] = useState(false);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    // regex to get youtube video id if it is youtube video
    const youtube_parser = (url) => {
        var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    };

    // handle change in check box at every card to delete multiple at once
    const handleSelectMeChange = (e) => {
        if (selectMe === false) {
            setDeleteMultipleList((prev) => [...prev, id]);
        } else {
            setDeleteMultipleList((prev) =>
                prev.filter((cardId) => cardId !== id)
            );
        }
        setSelectMe((prev) => !prev);
    };

    const yt_id = youtube_parser(videoUrl);

    // show iframe
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

            {/* checks that we have to show multiple delete checkbox or not */}
            {deleteMultiple && (
                <div className='px-2'>
                    <input
                        type='checkbox'
                        name='deleteMultiple'
                        id='deleteMultiple'
                        checked={selectMe}
                        onChange={(e) => {
                            handleSelectMeChange(e);
                        }}
                    />
                    <label
                        htmlFor='select-multiple'
                        className='ml-1 text-sm font-medium text-gray-900'>
                        Select Me
                    </label>
                </div>
            )}
            <div className='flex justify-evenly my-3'>
                <button
                    onClick={() => navigateTo(`/updatecard/${id}`)}
                    className=' rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'>
                    Edit
                </button>
                <button
                    onClick={() => {
                        deleteCard(id);
                    }}
                    className=' rounded-md bg-red-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-800'>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;
