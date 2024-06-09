import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import axios from 'axios';

const FeedBack = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [slidesPerView, setSlidesPerView] = useState(2);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllFeedback`)
            .then(response => setFeedbackData(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSlidesPerView(1);
            } else {
                setSlidesPerView(2);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <h1 className='text-center fw-bold text-black mb-5 headfeedback mt-5'>Student's Feedback</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={slidesPerView}
                autoplay
                pagination={{ clickable: true }}
            >
                {feedbackData.map(fb => (
                    <SwiperSlide key={fb.id}>
                        <FeedbackItem image={fb.image} name={fb.name} feedback={fb.feedback} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

const FeedbackItem = ({ name, feedback, image }) => {
    return (
        <section className="container testimonials__container mySwiper">
            <div className="swiper-wrapper">
                <article className="testimonial swiper-slide">
                    <div className="avatar">
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/${image}`} className='img-thumbnail rounded-circle' alt="Student Image" />
                    </div>
                    <div className="testimonial__info">
                        <h5>{name}</h5>
                    </div>
                    <div className="testimonial__body">
                        <p>{feedback}</p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default FeedBack;
