import React from 'react';

const RequestsTab = () => {
    return (
        <div className="tab-container">
            <div className="tab-header">
                <h1>Special Requests</h1>
                <p>Enhance your stay</p>
            </div>

            <div className="card">
                <h3>🍽️ In-Room Dining</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Order from our curated menu.</p>
                <button style={{ marginTop: '10px', padding: '8px 16px', background: '#bf953f', color: 'white', border: 'none', borderRadius: '4px' }}>View Menu</button>
            </div>

            <div className="card">
                <h3>💆‍♀️ Spa Services</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Book a relaxing massage or treatment.</p>
                <button style={{ marginTop: '10px', padding: '8px 16px', background: '#bf953f', color: 'white', border: 'none', borderRadius: '4px' }}>Book Appointment</button>
            </div>

            <div className="card">
                <h3>🧹 Housekeeping</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Request cleaning or extra towels.</p>
                <button style={{ marginTop: '10px', padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>Request Service</button>
            </div>
        </div>
    );
};

export default RequestsTab;
