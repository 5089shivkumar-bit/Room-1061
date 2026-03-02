import React from 'react';
import { Phone, MessageSquare, AlertTriangle, Utensils, Shield, Activity, Flame } from 'lucide-react';

const ContactsTab = () => {
    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Contact Host</h2>
            <p className="tab-subtitle">We are here to help 24/7.</p>

            <div className="contact-actions">
                {/* MANAGER SERVICE CARD */}
                <div className="contact-action-card">
                    <div className="card-header-row">
                        <div className="action-icon action-icon-gold">
                            <Phone size={20} />
                        </div>
                        <div className="action-info">
                            <span className="action-label">Property Manager</span>
                            <span className="action-phone">Shreeya Khanna - +91 91158 95673</span>
                            <p className="action-sub">Available 24/7 for any assistance</p>
                        </div>
                    </div>

                    <div className="card-actions-row">
                        <a href="tel:+919115895673" className="contact-btn btn-gold">
                            <Phone size={18} />
                            Call Manager
                        </a>
                        <a href="https://wa.me/919115895673" target="_blank" rel="noopener noreferrer" className="contact-btn btn-whatsapp">
                            <MessageSquare size={18} />
                            WhatsApp Manager
                        </a>
                    </div>
                </div>

                {/* FOOD SERVICE */}
                <div className="contact-action-card">
                    <div className="card-header-row">
                        <div className="action-icon action-icon-orange">
                            <Utensils size={20} />
                        </div>
                        <div className="action-info">
                            <span className="action-label">Order Food Service</span>
                            <span className="action-sub">Quick food delivery to your room</span>
                            <span className="action-phone text-orange">+91 81464 07934</span>
                        </div>
                    </div>

                    <div className="card-actions-row">
                        <a href="tel:+918146407934" className="contact-btn btn-orange">
                            <Phone size={18} />
                            Call Service
                        </a>
                        <a href="https://wa.me/918146407934" target="_blank" rel="noopener noreferrer" className="contact-btn btn-whatsapp">
                            <MessageSquare size={18} />
                            WhatsApp Service
                        </a>
                    </div>
                </div>

                {/* EMERGENCY UPGRADE */}
                <div className="contact-action-card emergency-card">
                    <div className="card-header-row">
                        <div className="action-icon action-icon-red">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="action-info">
                            <span className="action-label text-red">Emergency Contacts</span>
                            <span className="action-sub text-white-muted">Tap for immediate one-tap assistance</span>
                        </div>
                    </div>

                    <div className="emergency-actions-col">
                        <a href="tel:100" className="contact-btn btn-blue">
                            <Shield size={18} />
                            Call Police (100)
                        </a>
                        <div className="emergency-actions-row">
                            <a href="tel:108" className="contact-btn btn-red">
                                <Activity size={18} />
                                Ambulance (108)
                            </a>
                            <a href="tel:101" className="contact-btn btn-orange-solid">
                                <Flame size={18} />
                                Fire (101)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsTab;
