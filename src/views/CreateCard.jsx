import React from "react";

import Nav from "../Components/Nav";
import { useSelector } from "react-redux";
import LoginRequired from "../Components/global_components/LoginRequired";
import CardForm from "../Components/global_components/CardForm";

const CreateCard = () => {
    const userName = useSelector((state) => state.CurrentUser.user.userName);
    return (
        <>
            <Nav active={"createcard"} />
            <div className='mt-16'>
                {userName === "" ? (
                    <LoginRequired parent='createcard' />
                ) : (
                    <CardForm />
                )}
            </div>
        </>
    );
};

export default CreateCard;
