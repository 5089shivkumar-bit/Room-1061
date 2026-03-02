import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { ArrowLeft, Loader2, MapPin, Star, Navigation2, Map as MapIcon, Search, AlertTriangle, Coffee, Info, LayoutGrid, Soup, Pizza, Flame, Leaf, Beef } from 'lucide-react';
import { HOTEL_CONFIG } from '../../config';
import MapView from './MapView';

// Define libraries outside the component to prevent unnecessary script reloads
const LIBRARIES = ['places', 'geometry'];

const FoodDiningDynamic = ({ onBack, searchQuery, setSearchQuery }) => {
    const cuisineOptions = [
        { name: "All Cuisines", icon: LayoutGrid },
        { name: "Chinese", icon: Soup },
        { name: "Cafe", icon: Coffee },
        { name: "Fast Food", icon: Pizza },
        { name: "South Indian", icon: Coffee },
        { name: "Punjabi", icon: Flame },
        { name: "Vegetarian", icon: Leaf },
        { name: "Non-Vegetarian", icon: Beef }
    ];

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: HOTEL_CONFIG.googleMapsApiKey,
        libraries: LIBRARIES,
    });

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
    const [apiStatus, setApiStatus] = useState(null); // To track detailed Google API status
    const [directions, setDirections] = useState(null);

    // Initial Fetch: Nearby Search
    const fetchVisiblePlaces = useCallback(() => {
        if (!isLoaded || !window.google) return;

        setLoading(true);
        setApiStatus(null);

        const service = new window.google.maps.places.PlacesService(document.createElement('div'));

        const request = {
            location: new window.google.maps.LatLng(HOTEL_CONFIG.coords.lat, HOTEL_CONFIG.coords.lng),
            radius: 3000,
            type: ['restaurant']
        };

        service.nearbySearch(request, (results, status) => {
            console.log("Google Places Status:", status);
            setApiStatus(status);

            if (status === window.google.maps.places.PlacesServiceStatus.OK || status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                // Process results and calculate distance using geometry library
                const processedResults = (results || []).map(place => {
                    const placePos = place.geometry.location;
                    const hotelPos = new window.google.maps.LatLng(HOTEL_CONFIG.coords.lat, HOTEL_CONFIG.coords.lng);
                    const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(hotelPos, placePos);

                    return {
                        ...place,
                        calculatedDistance: (distanceInMeters / 1000).toFixed(1) // km
                    };
                });

                setPlaces(processedResults);
                setLoading(false);
            } else {
                console.error("Google Places Error Status:", status);
                setLoading(false);
            }
        });
    }, [isLoaded]);

    useEffect(() => {
        let timeout;
        if (isLoaded) {
            fetchVisiblePlaces();

            // Safety timeout: if after 10s we are still loading, something is wrong (API hang)
            timeout = setTimeout(() => {
                setLoading(currentLoading => {
                    if (currentLoading) {
                        console.warn("Places Search timed out. Callback never triggered.");
                        setApiStatus('TIMEOUT');
                        return false;
                    }
                    return currentLoading;
                });
            }, 10000);
        }
        return () => clearTimeout(timeout);
    }, [isLoaded, fetchVisiblePlaces]);

    // Directions Logic
    const fetchDirections = useCallback((dest) => {
        if (!dest || !window.google) return;

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: HOTEL_CONFIG.coords,
                destination: { lat: dest.lat(), lng: dest.lng() },
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, []);

    const filteredPlaces = useMemo(() => {
        return places.filter(place => {
            const nameMatch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
            const cuisineMatch = selectedCuisine === 'All Cuisines' ||
                (place.types && place.types.some(t => t.replace('_', ' ').toLowerCase().includes(selectedCuisine.toLowerCase())));
            return nameMatch && cuisineMatch;
        });
    }, [places, searchQuery, selectedCuisine]);

    const handleViewOnMap = (place) => {
        setSelectedPlace(place);
        setShowMap(true);
        setDirections(null); // Reset prev directions
        fetchDirections(place.geometry.location);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Error Message Generator
    const getErrorMessage = () => {
        switch (apiStatus) {
            case 'REQUEST_DENIED': return "API Key denied. Please ensure your Maps API Key is valid and has both Places and Maps JavaScript APIs enabled.";
            case 'OVER_QUERY_LIMIT': return "Usage limit exceeded. Please ensure billing is enabled on your Google Cloud project.";
            case 'INVALID_REQUEST': return "The request was invalid. Check your location parameters.";
            case 'NOT_FOUND': return "Location search failed.";
            case 'TIMEOUT': return "The Google Maps API did not respond in time. This is likely due to an invalid API key or network restrictions.";
            default: return "An unexpected error occurred while fetching nearby dining.";
        }
    };

    if (loadError) return (
        <div className="error-card card animate-fade-in" style={{ textAlign: 'center', padding: '60px' }}>
            <AlertTriangle size={48} color="#d9534f" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ color: '#222' }}>Maps Platform Error</h3>
            <p style={{ color: '#666' }}>The Google Maps script failed to load. Please verify your internet connection and API key.</p>
            <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>Reload Page</button>
        </div>
    );

    if (!isLoaded) {
        console.log("Google Maps API Loading... Key present:", !!HOTEL_CONFIG.googleMapsApiKey);
        return (
            <div className="loading-results" style={{ textAlign: 'center', padding: '150px 0' }}>
                <Loader2 className="animate-spin" size={48} color="#C8A74E" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ color: '#C8A74E', letterSpacing: '2px', fontWeight: 700 }}>INITIALIZING LUXURY GUIDE</h3>
                <p style={{ color: '#d8d2c5', marginTop: '10px' }}>Connecting to premium location services...</p>
                {!HOTEL_CONFIG.googleMapsApiKey && (
                    <p style={{ color: '#fa5252', marginTop: '20px', fontSize: '0.9rem' }}>
                        Warning: VITE_GOOGLE_MAPS_API_KEY is missing in .env
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="food-dining-dynamic animate-fade-in" style={{ paddingBottom: '100px' }}>
            {/* Header Section */}
            <div className="view-header" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button className="back-button" onClick={onBack}>
                            <ArrowLeft size={18} />
                        </button>
                        <div className="view-title">
                            <span style={{ color: '#C8A74E', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', display: 'block' }}>GASTRONOMY GUIDE</span>
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>Nearby Dining</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Filters & Search */}
            <div className="filter-controls" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px', position: 'sticky', top: '0px', zIndex: 100, background: 'rgba(255,255,255,0.95)', padding: '15px', borderRadius: '18px', backdropFilter: 'blur(15px)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(200, 167, 78, 0.1)' }}>
                <div style={{ width: '100%' }}>
                    <div className="explore-search-bar" style={{ marginBottom: 0, border: '1px solid #eee' }}>
                        <Search size={20} color="#C8A74E" />
                        <input
                            type="text"
                            placeholder="Find a specific restaurant..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="niche-filter-section">
                    <span className="filter-label" style={{ color: '#E6C27A' }}>Explore Cuisines:</span>
                    <div className="sub-category-filter-grid">
                        {cuisineOptions.map((c) => (
                            <button
                                key={c.name}
                                className={`sub-category-box ${selectedCuisine === c.name ? 'active' : ''}`}
                                onClick={() => setSelectedCuisine(c.name)}
                            >
                                <div className="sc-icon-box">
                                    <c.icon size={18} />
                                </div>
                                <span>{c.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Smart Map Container */}
            {showMap && (
                <div className="map-portal animate-slide-up" style={{ marginBottom: '40px' }}>
                    <div className="card" style={{ padding: '15px', border: '1px solid #fdfaf3' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#fdfaf3', padding: '8px', borderRadius: '8px' }}>
                                    <MapIcon size={20} color="#C8A74E" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{selectedPlace ? selectedPlace.name : 'Interactive Map'}</h4>
                                    <span style={{ fontSize: '0.75rem', color: '#888' }}>Real-time location & routing</span>
                                </div>
                            </div>
                            <button
                                className="filter-chip"
                                onClick={() => setShowMap(false)}
                                style={{ background: '#f8f9fa' }}
                            >
                                Close Map
                            </button>
                        </div>
                        <MapView
                            selectedPlace={selectedPlace}
                            directions={directions}
                        />
                    </div>
                </div>
            )}

            {/* Results Rendering */}
            {loading ? (
                <div className="loading-results" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Loader2 className="animate-spin" size={40} color="#C8A74E" style={{ margin: '0 auto 15px' }} />
                    <p style={{ color: '#888', fontStyle: 'italic' }}>Curating local culinary experiences...</p>
                </div>
            ) : apiStatus !== 'OK' && apiStatus !== 'ZERO_RESULTS' ? (
                <div className="error-card card" style={{ textAlign: 'center', padding: '60px 40px', background: '#fffcfc', borderColor: '#ffebeb' }}>
                    <AlertTriangle size={40} color="#d9534f" style={{ margin: '0 auto 15px' }} />
                    <h4 style={{ color: '#333' }}>Service Unavailable</h4>
                    <p style={{ color: '#666', marginBottom: '20px' }}>{getErrorMessage()}</p>
                    <button className="btn-primary" onClick={fetchVisiblePlaces}>Retry Connection</button>
                </div>
            ) : filteredPlaces.length === 0 ? (
                <div className="no-results" style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <Coffee size={40} color="#ddd" style={{ margin: '0 auto 15px' }} />
                    <h4>No Dining Found</h4>
                    <p style={{ color: '#999' }}>We couldn't find any restaurants matching your current filters in this 3km radius.</p>
                    <button className="filter-chip" onClick={() => { setSelectedCuisine('All Cuisines'); setSearchQuery(''); }} style={{ marginTop: '15px' }}>Clear All Filters</button>
                </div>
            ) : (
                <div className="places-grid animate-fade-in">
                    {filteredPlaces.map(place => (
                        <div className="place-card" key={place.place_id}>
                            <div className="place-image-container">
                                <img
                                    src={place.photos ? place.photos[0].getUrl({ maxWidth: 400 }) : "/images/lifestyle/restaurant.png"}
                                    alt={place.name}
                                    className="place-image"
                                    onError={(e) => { e.target.src = "/images/lifestyle/restaurant.png"; }}
                                />
                                <div className="distance-badge">
                                    <MapPin size={10} /> {place.calculatedDistance} km away
                                </div>
                                {place.opening_hours && (
                                    <div className={`status-badge ${place.opening_hours.open_now ? 'open' : 'closed'}`} style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        left: '15px',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        background: place.opening_hours.open_now ? '#e6fcf5' : '#fff5f5',
                                        color: place.opening_hours.open_now ? '#0ca678' : '#fa5252',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}>
                                        {place.opening_hours.open_now ? 'OPEN NOW' : 'CLOSED'}
                                    </div>
                                )}
                            </div>
                            <div className="place-info">
                                <div className="place-header">
                                    <h4 className="place-name">{place.name}</h4>
                                    <div className="place-rating">
                                        <Star size={12} fill="#C8A74E" /> {place.rating?.toFixed(1) || 'N/A'}
                                    </div>
                                </div>
                                <div className="cuisine-tags">
                                    {place.types && place.types.filter(t => !['restaurant', 'food', 'point_of_interest', 'establishment'].includes(t)).slice(0, 2).map(t => (
                                        <span key={t} className="tag">{t.replace('_', ' ')}</span>
                                    ))}
                                    {place.price_level && (
                                        <span className="tag" style={{ color: '#C8A74E', fontWeight: 700 }}>
                                            {'$'.repeat(place.price_level)}
                                        </span>
                                    )}
                                </div>
                                <p className="place-desc" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                    {place.vicinity}
                                </p>
                                <div className="place-actions">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&origin=${HOTEL_CONFIG.coords.lat},${HOTEL_CONFIG.coords.lng}&destination_place_id=${place.place_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        <Navigation2 size={14} /> Directions
                                    </a>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => handleViewOnMap(place)}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        <MapIcon size={14} /> Map View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodDiningDynamic;
