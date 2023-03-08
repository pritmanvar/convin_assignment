import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardForm = ({
    id = null,
    defaultTitle = "",
    defaultVideoUrl = "",
    defaultDescription = "",
    defaultBucket = "",
}) => {
    const navigateTo = useNavigate();

    // states for form data.
    const [cardId, setCardId] = useState(null);
    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [description, setDescription] = useState("");
    const [bucket, setBucket] = useState("");
    const [createNewBucket, setCreateNewBucket] = useState(false);
    const [newBucket, setNewBucket] = useState("");

    // user name and user id from redux store
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const userId = useSelector((state) => state.CurrentUser.user.id);

    // to show options in select tag
    const [bucketList, setBucketList] = useState([]);
    const [bucketOptions, setBucketOptoins] = useState([]);

    // function to get bucket list of user from json-server
    const getBucketList = () => {
        if (userName === "") {
            return;
        }
        axios
            .get(
                `https://convin-assignment.onrender.com/users?userName=${userName}`
            )
            .then((res) => {
                setBucketList(res.data[0].bucket);
                const buckets = res.data[0].bucket.map((bucket) => {
                    return (
                        <option key={bucket} value={bucket}>
                            {bucket}
                        </option>
                    );
                });

                setBucketOptoins(buckets);
            });
    };

    // update form data states
    useEffect(() => {
        getBucketList();
        setCardId(id);
        setTitle(defaultTitle);
        setVideoUrl(defaultVideoUrl);
        setDescription(defaultDescription);
        setBucket(defaultBucket);
    }, [id, defaultTitle, defaultVideoUrl, defaultDescription, defaultBucket]);

    // sumbit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            id: cardId ? cardId : new Date().getTime(), // if we have card id then we have to update else creae new.
            title,
            videoUrl,
            description,
            userName,
            bucket: createNewBucket === true ? newBucket : bucket,
        };

        // new bucket was added in user bucket list.
        if (createNewBucket) {
            if (bucketList.indexOf(newBucket) === -1) {
                axios.patch(
                    `https://convin-assignment.onrender.com/users/${userId}`,
                    {
                        bucket: [...bucketList, newBucket],
                    }
                );
                setBucketList((prev) => {
                    return [...prev, newBucket];
                });
                setBucketOptoins((prev) => {
                    return [
                        ...prev,
                        <option key={newBucket} value={newBucket}>
                            {newBucket}
                        </option>,
                    ];
                });
            }
        }

        if (cardId) {
            // update card iteam
            axios
                .put(
                    `https://convin-assignment.onrender.com/cards/${cardId}`,
                    formData
                )
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error(
                            "Something went wront, please try again."
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // post req to json-server to add new card
            axios
                .post("https://convin-assignment.onrender.com/cards", formData)
                .then((res) => {
                    if (res.status !== 201) {
                        throw new Error(
                            "Something went wront, please try again."
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        // reset form states
        setTitle("");
        setVideoUrl("");
        setDescription("");
        setBucket("");
        setCreateNewBucket(false);
        setNewBucket("");
    };
    return (
        <form
            className='w-1/2 mx-auto'
            onSubmit={(e) => {
                handleSubmit(e);
            }}>
            <div className='shadow'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                    {/* Input for title */}
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-800'>
                            Title
                        </label>
                        <div className='mt-2 flex rounded-md shadow-sm'>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='block w-full rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                placeholder='Title of Your Card'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Input for Video URL */}
                    <div>
                        <label
                            htmlFor='video-url'
                            className='block text-sm font-medium text-gray-800'>
                            Video URL
                        </label>
                        <div className='mt-2 flex rounded-md shadow-sm'>
                            <input
                                type='url'
                                name='video-url'
                                id='video-url'
                                className='block w-full rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                placeholder='https://www.youtube.com/'
                                required
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Input for Description */}
                    <div>
                        <label
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-800'>
                            Description
                        </label>
                        <div className='mt-2'>
                            <textarea
                                id='description'
                                name='description'
                                rows={3}
                                className='mt-1 p-1.5 block w-full rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                placeholder='Write about your card'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                            Brief description for card.
                        </p>
                    </div>

                    {/* Input for Bucket */}
                    <div>
                        {/* check box if user wants to create a new bucket */}
                        <input
                            type='checkbox'
                            name='createNewBucker'
                            id='createNewBucker'
                            checked={createNewBucket}
                            onChange={(e) => {
                                setCreateNewBucket((prev) => !prev);
                            }}
                        />
                        <label
                            htmlFor='createNewBucker'
                            className='ml-1 text-sm font-medium text-gray-900'>
                            Create New Bucket
                        </label>
                        <label
                            htmlFor='Bucket'
                            className='block text-sm font-medium text-gray-900'>
                            Bucket Name
                        </label>

                        {/* Display dropdown or input box for new bucket conditionally  */}
                        {!createNewBucket && (
                            <select
                                id='country'
                                name='country'
                                onChange={(e) => {
                                    setBucket(e.target.value);
                                }}
                                required
                                value={bucket}
                                className='mt-2 mb-1 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm sm'>
                                <option value=''>Select Bucket</option>
                                {bucketOptions}
                            </select>
                        )}

                        {createNewBucket && (
                            <input
                                type='text'
                                name='new-bucket'
                                id='new-bucket'
                                className='block w-full flex-1 rounded-md border-0 p-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-800'
                                placeholder='Give Some Unique Name'
                                value={newBucket}
                                onChange={(e) => setNewBucket(e.target.value)}
                                required
                            />
                        )}
                    </div>
                </div>

                {/* Submit button */}
                <div className='bg-gray-50 px-4 py-3 text-center sm:px-6'>
                    <button
                        type='submit'
                        className='rounded-md bg-gray-800 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900'>
                        {id !== null ? "Update a Card" : "Create a Card"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CardForm;
