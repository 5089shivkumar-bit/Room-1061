import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import './MainApp.css';
import Logo from './Logo';
import BackButton from './common/BackButton';

// Tab Components
import HomeTab from './tabs/HomeTab';
import CheckInTab from './tabs/CheckInTab';
import WiFiTab from './tabs/WiFiTab';
import AmenitiesTab from './tabs/AmenitiesTab';
import TVGuideTab from './tabs/TVGuideTab';
import LifestyleTab from './tabs/LifestyleTab';
import ContactsTab from './tabs/ContactsTab';
import SafetyTab from './tabs/SafetyTab';
import AboutTab from './tabs/AboutTab';
import SpecialRequestTab from './tabs/SpecialRequestTab';
import GuestJourneyTab from './tabs/GuestJourneyTab';
import CheckInVideoPage from './tabs/CheckInVideoPage';

// Icons
import { Home, Bath, Tv, Flower2, Shield, Info, Map } from 'lucide-react';

const MainApp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isVideoPage = location.pathname === '/checkin-video';

    const secondaryActions = [
        { id: 'home', label: 'Home', icon: Home, path: '/home' },
        { id: 'amenities', label: 'Amenities', icon: Bath, path: '/amenities' },
        { id: 'tv', label: 'TV Guide', icon: Tv, path: '/tv' },
        { id: 'lifestyle', label: 'Lifestyle', icon: Flower2, path: '/lifestyle' },
        { id: 'safety', label: 'Safety', icon: Shield, path: '/safety' },
        { id: 'about', label: 'About', icon: Info, path: '/about' },
        { id: 'journey', label: 'Journey', icon: Map, path: '/journey' },
    ];

    const isActive = (path) => {
        if (path === '/home' && (location.pathname === '/home' || location.pathname === '/')) return true;
        return location.pathname.startsWith(path);
    };

    return (
        <div className={`main-app ${isVideoPage ? 'video-mode' : ''}`}>
            {/* HEADER */}
            {!isVideoPage && (
                <header className="app-header" style={{ justifyContent: 'space-between', padding: '0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <BackButton />
                    </div>

                    <div className="logo-wrapper" onClick={() => navigate('/home')}>
                        <Logo variant="header" />
                    </div>

                    <div style={{ width: '80px' }}></div>
                </header>
            )}

            {/* WATERMARK */}
            {!isVideoPage && (
                <div className="app-watermark">
                    <Logo variant="watermark" />
                </div>
            )}

            {/* CONTENT */}
            <main className={`content-area ${isVideoPage ? 'fullscreen-mode' : ''}`}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomeTab onNavigate={(id) => navigate(`/${id}`)} />} />
                    <Route path="/checkin" element={<CheckInTab />} />
                    <Route path="/checkin-video" element={<CheckInVideoPage />} />
                    <Route path="/wifi" element={<WiFiTab />} />
                    <Route path="/amenities" element={<AmenitiesTab />} />
                    <Route path="/tv" element={<TVGuideTab />} />
                    <Route path="/lifestyle/*" element={<LifestyleTab />} />
                    <Route path="/contacts" element={<ContactsTab />} />
                    <Route path="/safety" element={<SafetyTab />} />
                    <Route path="/about" element={<AboutTab />} />
                    <Route path="/request" element={<SpecialRequestTab />} />
                    <Route path="/journey" element={<GuestJourneyTab />} />
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </main>

            {/* GLOBAL DASHBOARD SECONDARY NAV (Mobile Only) */}
            {!isVideoPage && (
                <div className="dashboard-secondary-nav global-nav">
                    {secondaryActions.map((action) => (
                        <div
                            key={action.id}
                            className={`dashboard-nav-item ${isActive(action.path) ? 'active' : ''}`}
                            onClick={() => navigate(action.path)}
                        >
                            <action.icon className="nav-icon" size={20} strokeWidth={1.5} />
                            <span className="nav-label">{action.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MainApp;
