import React, { useState } from 'react';
import { Send, Upload, CheckCircle2 } from 'lucide-react';

const SpecialRequestTab = () => {
    const [requestType, setRequestType] = useState('cleaning');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('normal');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setMessage('');
            setPriority('normal');
        }, 3000);
    };

    const categories = [
        { id: 'early_in', label: 'Early Check-In' },
        { id: 'late_out', label: 'Late Check-Out' },
        { id: 'towels', label: 'Extra Towels' },
        { id: 'cleaning', label: 'Room Cleaning' },
        { id: 'food', label: 'Food Preference' },
        { id: 'other', label: 'Other' },
    ];

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Special Request</h2>
            <p className="tab-subtitle">How can we assist you today?</p>

            {!submitted ? (
                <form className="request-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category</label>
                        <div className="chips-container">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`chip ${requestType === cat.id ? 'active' : ''}`}
                                    onClick={() => setRequestType(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            rows="4"
                            placeholder="Describe your request..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Priority</label>
                        <div className="priority-selector">
                            <button
                                type="button"
                                className={`priority-btn normal ${priority === 'normal' ? 'active' : ''}`}
                                onClick={() => setPriority('normal')}
                            >
                                Normal
                            </button>
                            <button
                                type="button"
                                className={`priority-btn urgent ${priority === 'urgent' ? 'active' : ''}`}
                                onClick={() => setPriority('urgent')}
                            >
                                Urgent
                            </button>
                        </div>
                    </div>

                    <div className="form-group file-upload">
                        <label className="upload-btn">
                            <Upload size={18} />
                            <span>Attach Photo (Optional)</span>
                            <input type="file" hidden />
                        </label>
                    </div>

                    <button type="submit" className="submit-btn full-width">
                        <Send size={18} />
                        Submit Request
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    <CheckCircle2 size={64} color="#4CAF50" />
                    <h3>Request Received</h3>
                    <p>We have received your request and will attend to it shortly.</p>
                </div>
            )}
        </div>
    );
};

export default SpecialRequestTab;
