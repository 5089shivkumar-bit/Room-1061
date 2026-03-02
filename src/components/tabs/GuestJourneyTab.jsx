import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const GuestJourneyTab = () => {
    const journey = [
        { label: "Booking Confirmed", status: "done", time: "2 Days ago" },
        { label: "Pre-Check In", status: "done", time: "Yesterday" },
        { label: "Check In", status: "current", time: "Today, 2:00 PM" },
        { label: "Stay Experience", status: "upcoming", time: "Ongoing" },
        { label: "Check Out", status: "upcoming", time: "Tomorrow, 11:00 AM" },
    ];

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Your Journey</h2>

            <div className="timeline-container">
                {journey.map((step, index) => (
                    <div key={index} className={`timeline-item ${step.status}`}>
                        <div className="timeline-marker">
                            {step.status === 'done' ? <CheckCircle size={20} /> :
                                step.status === 'current' ? <Clock size={20} /> :
                                    <Circle size={16} />}
                        </div>
                        <div className="timeline-content">
                            <h3>{step.label}</h3>
                            <span>{step.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestJourneyTab;
