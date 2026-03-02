import React from 'react';
import { Star, MapPin, Navigation, Navigation2, ShoppingCart, Clock } from 'lucide-react';

const PlaceCard = ({ place, categoryId }) => {
    const isTransport = categoryId === 'transport';
    const isEmergency = categoryId === 'emergency';

    return (
        <div className="place-card">
            {place.img && (
                <div className="place-image-container">
                    <img src={place.img} alt={place.name} className="place-image" />
                    <div className="distance-badge">
                        <MapPin size={12} /> {place.dist} km
                    </div>
                </div>
            )}

            <div className="place-info">
                <div className="place-header">
                    <h4 className="place-name">{place.name}</h4>
                    {place.rating && (
                        <div className="place-rating">
                            <Star size={12} fill="#C8A74E" /> {place.rating}
                        </div>
                    )}
                </div>

                {!place.img && (
                    <div className="travel-info">
                        <MapPin size={14} /> {place.dist} km
                        {place.travelTime && <span style={{ marginLeft: '10px' }}><Clock size={14} /> {place.travelTime}</span>}
                    </div>
                )}

                <div className="cuisine-tags">
                    {place.cuisine && place.cuisine.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                    {place.type && <span className="tag">{place.type}</span>}
                </div>

                <p className="place-desc">{place.desc}</p>

                <div className="place-actions">
                    <a
                        href={place.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        <Navigation2 size={16} /> Get Directions
                    </a>
                    {place.orderNow && (
                        <button className="btn-secondary">
                            <ShoppingCart size={16} /> Order Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
