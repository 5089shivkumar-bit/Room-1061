import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ fallbackPath = '/home' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        // Simple logic: if we are at a top-level route (e.g., /home, /checkin), 
        // maybe we don't show the back button or it goes to a landing page.
        // For sub-routes, navigate(-1) is usually correct.
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(fallbackPath);
        }
    };

    // Don't show back button on the main home screen
    if (location.pathname === '/' || location.pathname === '/home') {
        return null;
    }

    return (
        <button
            className="premium-back-btn"
            onClick={handleBack}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(201, 168, 76, 0.08)',
                border: '1px solid rgba(201, 168, 76, 0.4)',
                borderRadius: '50px',
                padding: '8px 16px',
                color: '#E6C27A',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)',
                minHeight: '40px',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.5px'
            }}
        >
            <ArrowLeft size={18} />
            <span>Back</span>
        </button>
    );
};

export default BackButton;
