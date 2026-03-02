import React, { useEffect, useRef } from 'react';
import { Key, Wifi, MapPin, Phone, Star, Tv, Wind, Coffee, Droplets, Home, Map, Bath, Flower2, Shield, Info, MessageSquare } from 'lucide-react';
import HeroSlideshow from '../HeroSlideshow';

// ─── Ambient Gold Particle System ────────────────────────────────────────────
function AmbientParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const gold = [
            'rgba(201,168,76,',
            'rgba(230,194,122,',
            'rgba(245,223,160,',
            'rgba(180,140,55,',
        ];

        class Particle {
            constructor() { this.reset(true); }
            reset(init = false) {
                this.x = Math.random() * canvas.width;
                this.y = init ? Math.random() * canvas.height : canvas.height + 10;
                this.r = Math.random() * 1.8 + 0.4;
                this.speedY = -(Math.random() * 0.35 + 0.08);
                this.speedX = (Math.random() - 0.5) * 0.18;
                this.opacity = Math.random() * 0.55 + 0.1;
                this.fade = Math.random() * 0.003 + 0.001;
                this.color = gold[Math.floor(Math.random() * gold.length)];
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.015 + 0.005;
            }
            draw() {
                this.pulse += this.pulseSpeed;
                const flicker = Math.sin(this.pulse) * 0.12;
                const o = Math.min(this.opacity + flicker, 0.75);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color}${o})`;
                ctx.fill();

                // Tiny soft glow
                const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3.5);
                grd.addColorStop(0, `${this.color}${(o * 0.35).toFixed(2)})`);
                grd.addColorStop(1, `${this.color}0)`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }
        }

        const COUNT = 55;
        for (let i = 0; i < COUNT; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.draw(); p.update(); });
            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="ambient-particles"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.7,
            }}
        />
    );
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────
const HomeTab = ({ onNavigate }) => {
    const primaryActions = [
        { id: 'checkin', label: 'Self Check-In', icon: Key },
        { id: 'wifi', label: 'WiFi Details', icon: Wifi },
        { id: 'journey', label: 'Location', icon: MapPin, url: 'https://www.google.com/maps/place/Hotel+Sky+5/@30.7217488,76.8525503,189m/data=!3m1!1e3!4m9!3m8!1s0x390f931efe4f1db9:0xb63f25b2ba18497a!5m2!4m1!1i2!8m2!3d30.7219135!4d76.8524115!16s%2Fg%2F1thcl4lb?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D' },
        { id: 'contacts', label: 'Contact Host', icon: Phone },
        { id: 'request', label: 'Special Request', icon: MessageSquare },
    ];

    const secondaryActions = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'amenities', label: 'Amenities', icon: Bath },
        { id: 'tv', label: 'TV Guide', icon: Tv },
        { id: 'lifestyle', label: 'Lifestyle', icon: Flower2 },
        { id: 'safety', label: 'Safety', icon: Shield },
        { id: 'about', label: 'About', icon: Info },
        { id: 'journey', label: 'Journey', icon: Map },
    ];

    return (
        <div className="tab-container home-tab-container fade-in">
            <AmbientParticles />

            {/* ── Hero Slideshow ── */}
            <HeroSlideshow onExplore={() => onNavigate('amenities')} />

            {/* ── Welcome Info ── */}
            <div className="tab-header home-welcome-info">
                <p>Oct 12 – Oct 15 &nbsp;•&nbsp; Guest: Harman Singh</p>
            </div>

            <div className="tab-content-inner dashboard-main-content">

                {/* ── SECTION 1: PRIMARY ACTIONS ── */}
                <div className="dashboard-primary-grid" style={{ marginBottom: '24px' }}>
                    <div className="dashboard-row">
                        {primaryActions.slice(0, 3).map((action) => (
                            <div key={action.id} className="dashboard-card" onClick={() => action.url ? window.open(action.url, '_blank') : onNavigate(action.id)}>
                                <action.icon className="dashboard-card-icon" size={24} strokeWidth={1.5} />
                                <span className="dashboard-card-label">{action.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="dashboard-row">
                        {primaryActions.slice(3, 5).map((action) => (
                            <div key={action.id} className="dashboard-card" onClick={() => action.url ? window.open(action.url, '_blank') : onNavigate(action.id)}>
                                <action.icon className="dashboard-card-icon" size={24} strokeWidth={1.5} />
                                <span className="dashboard-card-label">{action.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── DESKTOP ONLY: ADDITIONAL CONTENT ── */}
                <div className="desktop-extras" style={{ marginTop: '20px' }}>
                    {/* Room Highlights */}
                    <div className="card highlight-section">
                        <h3>Room Highlights</h3>
                        <div className="highlight-grid">
                            <div className="highlight-item"><Wind size={14} /> AC</div>
                            <div className="highlight-item"><Tv size={14} /> Smart TV</div>
                            <div className="highlight-item"><Wifi size={14} /> 5G WiFi</div>
                            <div className="highlight-item"><Coffee size={14} /> Balcony</div>
                            <div className="highlight-item"><Droplets size={14} /> Hot Water</div>
                            <div className="highlight-item">🌡 AC: 24°C</div>
                        </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="card">
                        <h3>Quick Controls</h3>
                        <div className="home-controls-grid">
                            <button className="control-btn">💡 Lights</button>
                            <button className="control-btn">❄️ AC: 24°C</button>
                        </div>
                    </div>

                    {/* Review Reminder */}
                    <div className="card review-section">
                        <div style={{ fontSize: '1.5rem', marginBottom: '8px', letterSpacing: '4px' }}>
                            ★★★★★
                        </div>
                        <h3>Enjoying your stay?</h3>
                        <p>Your 5-star review helps us immensely!</p>
                        <button
                            className="review-btn"
                            onClick={() => window.open('https://airbnb.com', '_blank')}
                        >
                            Leave a Review on Airbnb
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomeTab;
