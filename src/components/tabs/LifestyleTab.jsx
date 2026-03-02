import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
    Wind, Sun, Building, Dumbbell, MapPin,
    ChevronRight, ArrowLeft, Clock, Star
} from 'lucide-react';
import ExploreNearby from '../explore/ExploreNearby';

const LifestyleTab = () => {
    const navigate = useNavigate();
    const [gardenSlide, setGardenSlide] = useState(0);
    const [gymSlide, setGymSlide] = useState(0);

    const FALLBACK_IMAGE = '/images/lifestyle/restaurant.png'; // High-quality fallback
    const gardenImages = ['/images/lifestyle/garden.jpg.jpeg'];
    const gymImages = ['/images/lifestyle/gym.png', '/images/lifestyle/gym_2.png'];

    useEffect(() => {
        const gardenTimer = setInterval(() => setGardenSlide(prev => (prev + 1) % gardenImages.length), 5000);
        const gymTimer = setInterval(() => setGymSlide(prev => (prev + 1) % gymImages.length), 5000);
        return () => {
            clearInterval(gardenTimer);
            clearInterval(gymTimer);
        };
    }, []);

    const handleImageError = (e) => {
        e.target.src = FALLBACK_IMAGE;
    };

    const renderMainView = () => (
        <div className="experience-grid animate-fade-in">
            <div className="exp-card main-trigger-card" onClick={() => navigate('garden')}>
                <div className="trigger-bg-wrapper">
                    <img 
                        src={gardenImages[0]} 
                        alt="Garden" 
                        className="trigger-bg-img" 
                        onError={handleImageError}
                    />
                </div>
                <div className="trigger-overlay"></div>
                <div className="trigger-content">
                    <span className="trigger-tag">Property Feature</span>
                    <h3>6th Floor Garden</h3>
                    <p>Luxury open-air rooftop escape.</p>
                    <ChevronRight className="trigger-arrow" />
                </div>
            </div>

            <div className="exp-card main-trigger-card" onClick={() => navigate('gym')}>
                <div className="trigger-bg-wrapper">
                    <img 
                        src={gymImages[0]} 
                        alt="Gym" 
                        className="trigger-bg-img" 
                        onError={handleImageError}
                    />
                </div>
                <div className="trigger-overlay"></div>
                <div className="trigger-content">
                    <span className="trigger-tag">Property Feature</span>
                    <h3>2nd Floor Gym</h3>
                    <p>Premium 24/7 fitness center.</p>
                    <ChevronRight className="trigger-arrow" />
                </div>
            </div>

            <div className="exp-card main-trigger-card explore-trigger" onClick={() => navigate('explore')}>
                <div className="trigger-overlay"></div>
                <div className="trigger-content">
                    <div className="ec-icon-luxe"><MapPin size={32} color="#C8A74E" /></div>
                    <span className="trigger-tag">Smart System</span>
                    <h3>Explore Nearby</h3>
                    <p>Tap to discover local life.</p>
                    <ChevronRight className="trigger-arrow" />
                </div>
            </div>
        </div>
    );

    const renderGardenGymView = (type) => {
        const isGarden = type === 'garden';
        const images = isGarden ? gardenImages : gymImages;
        const currentSlide = isGarden ? gardenSlide : gymSlide;
        const title = isGarden ? "6th Floor Rooftop Garden" : "2nd Floor Fitness Center";
        const desc = isGarden
            ? "An oasis of tranquility high above the city. Our rooftop garden offers a perfect escape with lush greenery, ambient seating, and breathtaking views."
            : "Maintain your routine in our premium gym. Equipped with state-of-the-art machines and dedicated workout zones for strength and wellness.";

        return (
            <div className="detail-view animate-slide-up">
                <div className="detail-content property-detail">
                    <div className="detail-hero-slideshow">
                        {images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`${type} slide ${idx}`}
                                className={`detail-slide-img ${currentSlide === idx ? 'active' : ''}`}
                                onError={handleImageError}
                            />
                        ))}
                    </div>
                    <div className="detail-info-card card">
                        <h4>{title}</h4>
                        <p>{desc}</p>
                        <div className="detail-feature-chips">
                            {isGarden ? (
                                <><div className="chip"><Wind size={14} /> Open Air</div><div className="chip"><Sun size={14} /> Fresh Breeze</div><div className="chip"><Building size={14} /> City View</div></>
                            ) : (
                                <><div className="chip"><Dumbbell size={14} /> Treadmill</div><div className="chip"><Star size={14} /> Free Weights</div><div className="chip"><Clock size={14} /> 24/7 Access</div></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="tab-container lifestyle-complex-experience fade-in">
            <h2 className="tab-title">Outdoor & Explore</h2>
            <p className="tab-subtitle">Elite property features and an advanced smart local guide.</p>

            <div className="lifestyle-viewport">
                <Routes>
                    <Route index element={renderMainView()} />
                    <Route path="garden" element={renderGardenGymView('garden')} />
                    <Route path="gym" element={renderGardenGymView('gym')} />
                    <Route path="explore/*" element={<ExploreNearby />} />
                </Routes>
            </div>
        </div>
    );
};

export default LifestyleTab;
