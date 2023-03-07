import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Nav from "../Components/Nav";
import LoginRequired from "../Components/global_components/LoginRequired";
import MyCard from "../Components/MyCard";

const MyCards = () => {
    const [generatedCards, setGeneratedCards] = useState([]);
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const getCards = () => {
        axios
            .get(`http://localhost:3000/cards?userName=${userName}`)
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
                        console.log(id, "from mycards");
                        return (
                            <MyCard
                                id={id}
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
            <Nav active='mycards' />
            <div className='flex flex-wrap justify-center mt-16'>
                {userName === "" ? (
                    <LoginRequired parent='mycards' />
                ) : generatedCards.length === 0 ? (
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

export default MyCards;
