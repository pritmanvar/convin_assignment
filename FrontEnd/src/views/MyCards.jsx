import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Nav from "../Components/Nav";
import LoginRequired from "../Components/global_components/LoginRequired";
import MyCard from "../Components/MyCard";

const MyCards = () => {
    // cards to show.
    const [generatedCards, setGeneratedCards] = useState([]);

    const [bucket, setBucket] = useState("");
    const [bucketOptions, setBucketOptoins] = useState([]);
    const [deleteMultiple, setDeleteMultiple] = useState(false);
    const [disableDelete, setDisableDelete] = useState(true);
    const [deleteMultipleList, setDeleteMultipleList] = useState([]);

    // for iframe
    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [isYtVideo, setIsYtVideo] = useState(false);

    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const userId = useSelector((state) => state.CurrentUser.user.id);

    // get list of buckets of current user from json-server
    const getBucketList = () => {
        if (userName === "") {
            return;
        }
        axios
            .get(`http://localhost:3000/users?userName=${userName}`)
            .then((res) => {
                setBucketOptoins(res.data[0].bucket);
            });
    };

    // get cards of paraticular bucket from json-server
    const getCards = (bucket = "") => {
        axios
            .get(
                `http://localhost:3000/cards?userName=${userName}${
                    bucket === "" ? "" : "&bucket=" + bucket
                }`
            )
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.message);
                }

                const cards = res.data;
                setGeneratedCards(cards);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // get bucketlist and all cards at first load
    useEffect(() => {
        getBucketList();
        getCards();
    }, []);

    // delete card
    const deleteCard = (id) => {
        // delete card from json-server
        axios
            .delete(`http://localhost:3000/cards/${id}`)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.message);
                }

                // remove card from generated cards state
                setGeneratedCards((prev) => {
                    const updatedCards = prev.filter((card) => card.id !== id);
                    return updatedCards;
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleMultipleDelete = () => {
        deleteMultipleList.forEach((cardId) => {
            deleteCard(cardId);
        });
    };

    const handleOptionChange = (e) => {
        setDeleteMultipleList([]);
        if (e.target.value === "") {
            setDisableDelete(true);
        } else {
            setDisableDelete(false);
        }
        setBucket(e.target.value);
        getCards(e.target.value);
    };

    return (
        <>
            <Nav active='mycards' />
            <div className='flex flex-col items-center mt-16'>
                <div className='flex justify-evenly items-center w-3/4'>
                    <select
                        id='country'
                        name='country'
                        onChange={(e) => handleOptionChange(e)}
                        required
                        value={bucket}
                        className='mt-2 mb-1 block w-72 rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm sm'>
                        <option value=''>Select Bucket</option>
                        {bucketOptions.map((bucket) => {
                            return (
                                <option key={bucket} value={bucket}>
                                    {bucket}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                        <input
                            type='checkbox'
                            name='deleteMultiple'
                            id='deleteMultiple'
                            disabled={disableDelete}
                            checked={deleteMultiple}
                            onChange={(e) => {
                                setDeleteMultiple((prev) => !prev);
                            }}
                        />
                        <label
                            htmlFor='select-multiple'
                            className='ml-1 text-sm font-medium text-gray-900'>
                            Delete Multiple
                        </label>
                    </div>
                    <button
                        onClick={handleMultipleDelete}
                        disabled={disableDelete}
                        className={`rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm ${
                            disableDelete === true
                                ? "bg-red-900 hover:bg-red-900"
                                : "bg-red-700 hover:bg-red-800"
                        }`}>
                        Delete Selected
                    </button>
                </div>
                <div className='flex flex-wrap justify-center'>
                    {userName === "" ? (
                        <LoginRequired parent='mycards' />
                    ) : generatedCards.length === 0 ? (
                        <p className='text-2xl'>
                            No cards found. Please create some.
                        </p>
                    ) : (
                        generatedCards.map(
                            ({
                                id,
                                title,
                                videoUrl,
                                description,
                                userName,
                                bucket,
                            }) => {
                                return (
                                    <MyCard
                                        id={id}
                                        key={id}
                                        title={title}
                                        videoUrl={videoUrl}
                                        description={description}
                                        userName={userName}
                                        bucket={bucket}
                                        deleteMultiple={deleteMultiple}
                                        setDeleteMultipleList={
                                            setDeleteMultipleList
                                        }
                                        deleteCard={deleteCard}
                                        setShowVideo={setShowVideo}
                                        setVideoUrl={setVideoUrl}
                                        setIsYtVideo={setIsYtVideo}
                                    />
                                );
                            }
                        )
                    )}
                </div>
            </div>
            {showVideo && (
                <div
                    className='absolute w-screen h-screen top-0 left-0 bg-[#000000d9] flex justify-center items-center'
                    onClick={() => setShowVideo(false)}>
                    <iframe
                        width='888'
                        height='500'
                        src={
                            isYtVideo === true
                                ? "https://www.youtube.com/embed/" + videoUrl
                                : videoUrl
                        }></iframe>
                </div>
            )}
        </>
    );
};

export default MyCards;
