import React from 'react';
import { Flame, Heart, DoorOpen, Building2, Phone } from 'lucide-react';

const SafetyTab = () => {
    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Safety First</h2>
            <p className="tab-subtitle">Your wellbeing is our priority.</p>

            <div className="contacts-list" style={{ marginTop: '16px' }}>

                {/* FIRE EXTINGUISHER */}
                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(244, 67, 54, 0.1)', padding: '12px', borderRadius: '50%' }}>
                        <Flame size={24} color="#F44336" />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Fire Extinguisher</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Located in the hallway cupboard outside your door.</p>
                    </div>
                </div>

                {/* FIRST AID */}
                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '12px', borderRadius: '50%' }}>
                        <Heart size={24} color="#4CAF50" />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>First Aid Kit</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Under the bathroom sink in the marked box.</p>
                    </div>
                </div>

                {/* EMERGENCY EXIT */}
                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(33, 150, 243, 0.1)', padding: '12px', borderRadius: '50%' }}>
                        <DoorOpen size={24} color="#2196F3" />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Emergency Exit</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Turn right leaving the room. Stairs are at the end of the hall.</p>
                    </div>
                </div>

                {/* HOSPITAL */}
                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(156, 39, 176, 0.1)', padding: '12px', borderRadius: '50%' }}>
                        <Building2 size={24} color="#9C27B0" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>City Hospital</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>2.5 km away • 10 min drive</p>
                    </div>
                    <a href="tel:911" className="control-btn" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'auto',
                        padding: '12px 20px',
                        background: 'var(--gold-primary)',
                        color: 'white',
                        border: 'none',
                        minHeight: '50px'
                    }}>
                        <Phone size={20} />
                    </a>
                </div>

            </div>
        </div>
    );
};

export default SafetyTab;
