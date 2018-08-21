import React from 'react'
import Slider from 'react-slick'
import Category from './Category';

const sliderSettings = {
    dots: false,
    slidesToShow: 6,
    responsive: [
        {
        breakpoint: 650,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
        }
        },
        {
            breakpoint: 870,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1
            }
        },
        {
            breakpoint: 1130,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 1
            }
        },
        {
            breakpoint: 1300,
            settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 1
            }
        }
    ]
}

export default ({categoryName,children}) => (
    <div className="videos_container">
        <Category categoryName={categoryName} />
        <div className="videoContent_container">
            <Slider {...sliderSettings}>
                {children}
            </Slider>
        </div>
    </div>
)