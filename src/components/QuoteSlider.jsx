import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample settings for slider
const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
};




const quotes = [
    {
        quote: "Sailing a boat calls for quick action, a blending of feeling with the wind and water as well as with the very heart and soul of the boat itself. Sailing teaches alertness and courage, and gives in return a joyousness and peace that but few sports afford.",
        author: "George Matthew Adams",
    },
    {
        quote: "When I'm not surfing or sailing, I am to be found at the harbour working on my boat.",
        author: "Laura Dekker",
    },
    {
        quote: "The fact is, an America's Cup team is more than a sailing team. It's anywhere from sort of 80 to upward of 100 people; of designers, engineers, boat builders, an incredible group of people, and there are a lot of nationalities in New Zealand's team.",
        author: "James Spithill",
    },
    {
        quote: "If one does not know to which port one is sailing, no wind is favorable.",
        author: "Lucius Annaeus Seneca",
    },


];

const QuoteSlider = () => (
    <SliderWrapper>
        <Slider {...settings}>
            {quotes.map((quote, index) => (
                <Quote key={index}>
                    <QuoteText>"{quote.quote}"</QuoteText>
                    <QuoteAuthor>{quote.author}</QuoteAuthor>
                </Quote>
            ))}
        </Slider>
    </SliderWrapper>
);

export default QuoteSlider;

const SliderWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const Quote = styled.div`
    text-align: center;
    color: white;
    font-size: 24px;
    padding: 50px;
`;

const QuoteText = styled.p`
    font-style: italic;
`;

const QuoteAuthor = styled.p`
    font-style: normal;
    text-align: right;
`;
