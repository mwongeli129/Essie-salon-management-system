import React, { useState, useEffect, useRef } from 'react';

const ScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const topOffset = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (topOffset < windowHeight * 0.75) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { ref, isVisible };
};

export default ScrollAnimation;