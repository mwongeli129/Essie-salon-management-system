
import React, { useEffect } from "react";

const Scrollbutton = () => {
    useEffect(() => {
        // Function to show/hide the scroll-to-top button based on scroll position
        function toggleScrollToTopButton() {
            const scrollToTopBtn = document.getElementById('scrollToTopBtn');
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }

        // Attach the scroll event listener
        window.addEventListener('scroll', toggleScrollToTopButton);

        return () => {
            // Clean up the event listener on component unmount
            window.removeEventListener('scroll', toggleScrollToTopButton);
        };
    }, []);

    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <div>
                <button id="scrollToTopBtn" onClick={scrollToTop}>
                    &#8593;
                </button>
            </div>
        </div>
    );
};

export default Scrollbutton;
