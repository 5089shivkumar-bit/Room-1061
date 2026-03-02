import React, { useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { HOTEL_CONFIG } from '../../config';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#C8A74E" }, { "visibility": "on" }, { "lightness": 82 }]
        }
    ]
};

const MapView = ({ selectedPlace, directions, onLoaded }) => {
    const mapRef = useRef(null);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        if (onLoaded) onLoaded(map);
    }, [onLoaded]);

    const center = useMemo(() => {
        if (selectedPlace) {
            return {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng()
            };
        }
        return HOTEL_CONFIG.coords;
    }, [selectedPlace]);

    // Re-center map when selectedPlace changes
    useEffect(() => {
        if (mapRef.current && center) {
            mapRef.current.panTo(center);
        }
    }, [center]);

    return (
        <div className="map-view-container animate-fade-in">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                onLoad={onMapLoad}
                options={mapOptions}
            >
                {/* Always show Hotel Marker */}
                <Marker
                    position={HOTEL_CONFIG.coords}
                    title={HOTEL_CONFIG.name}
                    label={{
                        text: "H",
                        color: "white",
                        fontWeight: "bold"
                    }}
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }}
                />

                {/* Show Selected Restaurant Marker if no directions (directions renders its own markers usually) */}
                {selectedPlace && !directions && (
                    <Marker
                        position={{
                            lat: selectedPlace.geometry.location.lat(),
                            lng: selectedPlace.geometry.location.lng()
                        }}
                        title={selectedPlace.name}
                        icon={{
                            url: "https://maps.google.com/mapfiles/ms/icons/gold-dot.png"
                        }}
                    />
                )}

                {/* Render Directions/Route */}
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            polylineOptions: {
                                strokeColor: "#C8A74E",
                                strokeOpacity: 0.8,
                                strokeWeight: 5
                            },
                            suppressMarkers: false // Keep markers for origin/dest
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

// Simple memoization for center coords
function useMemo(factory, deps) {
    return React.useMemo(factory, deps);
}

export default MapView;
