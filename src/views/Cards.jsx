import React from "react";
import Nav from "../Components/Nav";
import Card from "../Components/Card";
const Cards = () => {
    return (
        <>
            <Nav active='cards' />
            <div className='flex flex-wrap justify-center mt-16'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    );
};

export default Cards;
