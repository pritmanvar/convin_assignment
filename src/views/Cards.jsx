import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Card from "../Components/Card";
import axios from "axios";
const Cards = () => {
    const [generatedCards, setGeneratedCards] = useState([]);
    const getCards = () => {
        axios
            .get("http://localhost:3000/cards")
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res.message);
                    throw new Error("Some error occored, Please try again");
                }

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
                                id
                                key={id}
                                title={title}
                                videoUrl={videoUrl}
                                description={description}
                                userName={userName}
                                bucket={bucket}
                            />
                        );
                    }
                );

                setGeneratedCards(cards);
            })
            .catch((err) => {
                console.log(err);
                alert("Some error occured, Please try again");
            });
    };

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
        </>
    );
};

export default Cards;
