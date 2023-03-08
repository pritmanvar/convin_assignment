import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Nav from "../Components/Nav";
import LoginRequired from "../Components/global_components/LoginRequired";
import CardForm from "../Components/global_components/CardForm";
import axios from "axios";

const UpdateCard = () => {
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const { id } = useParams();

    const [cardDetails, setCardDetails] = useState({});
    const getCardDetails = () => {
        // get card details from json-server
        axios
            .get(`https://convin-assignment.onrender.com/cards/${id}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.error(res.message);
                    return;
                }

                setCardDetails({
                    id: id,
                    title: res.data.title,
                    videoUrl: res.data.videoUrl,
                    description: res.data.description,
                    bucket: res.data.bucket,
                });
            });
    };
    useEffect(() => {
        getCardDetails();
    }, []);
    return (
        <>
            <Nav active={"mycards"} />
            <div className='mt-16'>
                {userName === "" ? (
                    <LoginRequired parent='mycards' />
                ) : (
                    // give card details to card form.
                    <CardForm
                        id={cardDetails.id}
                        defaultTitle={cardDetails.title}
                        defaultVideoUrl={cardDetails.videoUrl}
                        defaultDescription={cardDetails.description}
                        defaultBucket={cardDetails.bucket}
                    />
                )}
            </div>
        </>
    );
};

export default UpdateCard;
