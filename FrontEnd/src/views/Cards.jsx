import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Card from "../Components/Card";
import axios from "axios";
const Cards = () => {
    const [generatedCards, setGeneratedCards] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [isYtVideo, setIsYtVideo] = useState(false);

    // function to get cards from json-server
    const getCards = () => {
        axios
            .get("https://convin-assignment.onrender.com/cards")
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.message);
                }

                // convert card data into card component
                const cards = res.data.map(
                    ({
                        id,
                        title,
                        videoUrl,
                        description,
                        userName,
                        bucket,
                    }) => {
                        return (
                            <Card
                                id={id}
                                key={id}
                                title={title}
                                videoUrl={videoUrl}
                                description={description}
                                userName={userName}
                                bucket={bucket}
                                setVideoUrl={setVideoUrl}
                                setIsYtVideo={setIsYtVideo}
                                setShowVideo={setShowVideo}
                            />
                        );
                    }
                );

                setGeneratedCards(cards);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // get cards at first load.
    useEffect(() => {
        getCards();
    }, []);
    return (
        <>
            <Nav active='cards' />
            <div className='flex flex-wrap justify-center mt-16'>
                {generatedCards.length === 0 ? (
                    <p className='text-2xl'>
                        No cards found. Please create some.
                    </p>
                ) : (
                    generatedCards
                )}
            </div>

            {/* manage show iframe */}
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

export default Cards;
