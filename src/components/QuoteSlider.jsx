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
    autoplaySpeed: 8000,
    arrows: false,
    fade: true,
};



const quotes = [
    {
        quote: "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.",
        author: "William Arthur Ward",
    },
    {
        quote: "Sailing a boat calls for quick action, a blending of feeling with the wind and water as well as with the very heart and soul of the boat itself. Sailing teaches alertness and courage, and gives in return a joyousness and peace that but few sports afford.",
        author: "George Matthew Adams",
    },
    {
        quote: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
        author: "Jimmy Dean",
    },
    {
        quote: "The only ship you can truly steer in this ocean is the one you're sailing. Quit trying to alter the winds; harness them.",
        author: "Richelle E. Goodrich",
    },
    {
        quote: "If one does not know to which port one is sailing, no wind is favorable.",
        author: "Lucius Annaeus Seneca",
    },

    {
        quote: "Catch the trade winds in your sails. Explore. Dream. Discover.",
        author: "Mark Twain",
    },
    {
        quote: "Calm sailing doesn’t come from calm waters, it comes from having a good navigator; a good crew and a good vessel.",
        author: "Anthony T. Hincks",
    },
    {
        quote: "Tis the set of the sail that decides the goal, and not the storm of life.",
        author: "Ella Wheeler Wilcox",
    },
    {
        quote: "When you sail for the first time, you have one of two experiences. It becomes a one-time, bucket-list thing you check off your list, or it becomes a part of your soul forever.",
        author: "Michelle Segrest",
    },
    {
        quote: "The sooner we learn to be jointly responsible, the easier the sailing will be.",
        author: "Ella Maillart",
    },
    {
        quote: "It isn't that life ashore is distasteful to me. But life at sea is better.",
        author: "Francis Drake",
    },
    {
        quote: "A sailor is an artist whose medium is the wind.",
        author: "Webb Chiles",
    },

]



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
    @media (max-width: 640px) {
                  display: none;
                }
`;

const Quote = styled.div`
    text-align: center;
    color: white;
    font-size: 20px;
    padding: 50px;
`;

const QuoteText = styled.p`
    font-style: italic;
`;

const QuoteAuthor = styled.p`
    font-style: normal;
    text-align: right;
`;
