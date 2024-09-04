import React, { useEffect } from "react";
import s30 from "../Images/s30.jpg";
import Scrollbutton from "../Components/Scrollbutton";
import '../Css/ScrollAnimation.css';

const About = () => {

    useEffect(() => {
        let stylistsCount = 20;
        let servicesCount = 50;
        let clientsCount = 150;
        let branchesCount = 5;

        function updateCountsOnScroll() {
            if (window.scrollY > 300) {
                updateCount("stylistsCount", stylistsCount);
                updateCount("servicesCount", servicesCount);
                updateCount("clientsCount", clientsCount);
                updateCount("branchesCount", branchesCount);
            }
        }

        function updateCount(elementId, count) {
            let element = document.getElementById(elementId);
            let currentCount = 0;
            let updateInterval = setInterval(function () {
                if (element) {
                    element.textContent = currentCount;
                    currentCount++;
                    if (currentCount > count) {
                        clearInterval(updateInterval);
                        element.textContent = count;
                    }
                }
            }, 10);
        }

        window.addEventListener("scroll", updateCountsOnScroll);

        return () => {
            window.removeEventListener("scroll", updateCountsOnScroll);
        };
    }, []);

    return (
        <div className="about">
                <div className="vertical-about"></div>
                <h3>About<span> Luxe Salon</span></h3>
            <div className="all-containers">
                <div className="about-container1">
                    <img className="a-image" src={s30} alt="" />
                </div>
                <div className="about-container2">
                    <h4>Step into the World of <span>Luxe Salon</span>: </h4>
                </div>
            </div>
            <div className="about-container3">
                <p><span>Discover the Ultimate in Beauty and Wellness.
                    At Luxe Salon, we combine expertise, luxury, and comfort to
                    provide you with top-tier hair, skin, and nail services.
                    Experience the art of beauty with us.</span></p>
            </div>

            <Scrollbutton />
        </div>
    );
}

export default About;
