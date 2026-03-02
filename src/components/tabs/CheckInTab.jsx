import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUp, Building, PlayCircle, Phone, MessageSquare } from 'lucide-react';

const CheckInTab = () => {
    const navigate = useNavigate();

    const openVideo = () => {
        navigate('/checkin-video');
    };

    const steps = [
        { title: "Arrive at Disha Arcade", desc: "Locate the building main entrance.", icon: Building },
        { title: "Enter Building", desc: "Lift is straight ahead. Stairs are to the right.", icon: ArrowUp },
        { title: "Go to 6th Floor", desc: "Take lift or stairs to floor 6.", icon: ArrowUp },
        { title: "Find Room 1061", desc: "Located directly behind the lift.", icon: MapPin }
    ];

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Self Check-In Guide</h2>
            <p className="tab-subtitle">Follow these steps to reach Room 1061.</p>

            {/* WATCH VIDEO BUTTON */}
            <button className="video-entry-btn" onClick={openVideo}>
                <PlayCircle size={24} color="#E6C27A" fill="rgba(230,194,122,0.15)" />
                <span>Watch Entry Video</span>
            </button>

            {/* STEPS TIMELINE */}
            <div className="checkin-timeline">
                {steps.map((step, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-marker">{index + 1}</div>
                        <div className="timeline-content card">
                            <div className="step-header">
                                <step.icon size={20} color="#E6C27A" />
                                <h3>{step.title}</h3>
                            </div>
                            <p>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* NEED HELP */}
            <div className="help-section">
                <h3>Need Help?</h3>
                <div className="help-buttons">
                    <a href="tel:+919115895673" className="help-btn">
                        <Phone size={18} /> Call Host
                    </a>
                    <a href="https://wa.me/919115895673" target="_blank" rel="noopener noreferrer" className="help-btn whatsapp">
                        <MessageSquare size={18} /> WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CheckInTab;
