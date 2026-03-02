import React from 'react';
import { Tv, Youtube, Film, PlayCircle } from 'lucide-react';

const TVGuideTab = () => {
    const apps = [
        { name: "Netflix", icon: Film, color: "#E50914" },
        { name: "YouTube", icon: Youtube, color: "#FF0000" },
        { name: "Prime Video", icon: PlayCircle, color: "#00A8E1" },
    ];

    const channels = [
        { number: 101, name: "MTV Live", category: "Music" },
        { number: 105, name: "CNN International", category: "News" },
        { number: 112, name: "HBO Movies", category: "Movies" },
        { number: 120, name: "Discovery Channel", category: "Docu" },
        { number: 205, name: "Sports 1", category: "Sports" },
    ];

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Entertainment</h2>
            <p className="tab-subtitle">Enjoy premium content on the 55" 4K Smart TV.</p>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Streaming Apps</h3>
            <div className="quick-actions-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {apps.map((app, index) => (
                    <div key={index} className="quick-action-card" style={{ padding: '16px 8px' }}>
                        <app.icon size={28} color={app.color} style={{ marginBottom: '8px' }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{app.name}</span>
                    </div>
                ))}
            </div>

            <div className="card remote-guide" style={{ marginTop: '24px' }}>
                <div className="guide-header">
                    <Tv size={20} color="var(--gold-primary)" />
                    <h3 style={{ margin: 0 }}>Cable Channels</h3>
                </div>

                <div className="channel-list" style={{ marginTop: '16px' }}>
                    {channels.map((ch) => (
                        <div key={ch.number} className="channel-row">
                            <div className="ch-number">{ch.number}</div>
                            <div className="ch-info">
                                <strong>{ch.name}</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ch.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TVGuideTab;
