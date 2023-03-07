import React, { useEffect, useState } from "react";

import Nav from "../Components/Nav";
import { useSelector } from "react-redux";
import LoginRequired from "../Components/global_components/LoginRequired";
import CardForm from "../Components/global_components/CardForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateCard = () => {
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    const { id } = useParams();

    const [cardDetails, setCardDetails] = useState({});
    const getCardDetails = () => {
        axios.get(`http://localhost:3000/cards/${id}`).then((res) => {
            if (res.status !== 200) {
                console.log(res.message);
                alert("Some error occured");
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
