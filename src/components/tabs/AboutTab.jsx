import React from 'react';
import { Star } from 'lucide-react';

const AboutTab = () => {
    return (
        <div className="tab-container fade-in center-text">
            <div className="about-header">
                <h2 className="tab-title">About Room 1061</h2>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />)}
                </div>
            </div>

            <div className="card about-content">
                <p className="highlight-text">
                    "A sanctuary in the city."
                </p>
                <p>
                    Room 1061 offers a premium, minimalist luxury experience designed for both business and leisure travelers.
                    We pride ourselves on:
                </p>
                <ul className="about-list">
                    <li>✨ Impeccable Cleanliness</li>
                    <li>🛏️ Supreme Comfort</li>
                    <li>📍 Central Location</li>
                    <li>🔧 Well-maintained Facilities</li>
                </ul>
                <p>
                    Thank you for choosing us for your stay. We hope you find peace and comfort within these walls.
                </p>
            </div>
        </div>
    );
};

export default AboutTab;
