import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VIDEO_SRC = '/video/checkin.mp4.mp4';

const CheckInVideoPage = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        return () => {
            // Restore body scroll
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="checkin-video-fullscreen">
            {/* Dedicated Back Button */}
            <button 
                className="video-back-btn" 
                onClick={() => navigate('/checkin')}
                aria-label="Back to Check-in"
            >
                <ArrowLeft size={24} />
                <span>Back</span>
            </button>

            {/* Netflix-style Video Stage */}
            <div className="video-stage">
                <video
                    ref={videoRef}
                    autoPlay
                    controls
                    playsInline
                    preload="auto"
                    className="fullscreen-video-element"
                >
                    <source src={VIDEO_SRC} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </div>

            {/* Subtle Overlay Branding */}
            <div className="video-branding">
                <span className="room-id">ROOM 1061</span>
                <span className="brand-label">Entry Guide</span>
            </div>
        </div>
    );
};

export default CheckInVideoPage;
