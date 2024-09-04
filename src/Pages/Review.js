import React, { useState, useEffect } from "react";
import '../Css/Review.css';
import t1 from "../Images/t1.jpg"; 
import t2 from "../Images/t2.jpg"
import t4 from "../Images/t4.jpg"

const Review = () => {
  // Dummy testimonial data
  const testimonials = [
  
    {
      id: 1,
      image: t1, // Use imported local image
      name: "Amisi Fred",
      occupation: "Regular Customer",
      text: "I always leave feeling relaxed and refreshed after my treatments at Luxe Salon. The atmosphere is calming and the staff are friendly and professional. Highly recommend!",
    },
    {
      id: 2,
      image: t2,
      name: "Pretty Essie M.",
      occupation: "Graphic Designer",
      text: "Luxe Salon offers top-notch services with attention to detail. Every visit is a treat, from hair styling to skincare. I love their personalized approach!",
    },
    {
      id: 3,
      image: t4,
      name: "Abdalla Hamara",
      occupation: "Marketing Specialist",
      text: "I've been a client of Luxe Salon for years and they never disappoint. Their expertise in beauty services is unmatched, and the results speak for themselves. Truly exceptional!",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="Review_page">
      <div className="review_main">
        <div className="testimonial">
          <div className="testimonials_image">
            <img
              src={testimonials[activeIndex].image}
              alt="testimonial avatar"
              className="rounded-circle shadow-1 mb-4"
              width="150"
              height="150"
            />
          </div>
          <div className="testimonials">
            <h4 className="mb-4">
              {testimonials[activeIndex].name} - {testimonials[activeIndex].occupation}
            </h4>
            <p className="mb-0 pb-3">{testimonials[activeIndex].text}</p>
          </div>
        </div>
        <div className="controls">
          <button onClick={prevTestimonial}>&#8249;</button>
          <button onClick={nextTestimonial}>&#8250;</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
