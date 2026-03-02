import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { createPortal } from 'react-dom';

const HERO_IMAGES = [
    '/images/hero/Bed Room 1.png',
    '/images/hero/Bed Room 2.png',
    '/images/hero/Bed Room.png',
    '/images/hero/Bed Room3.png',
    '/images/hero/Kitchen.png',
    '/images/hero/Living Area.png',
    '/images/hero/IMG_7449.JPG.jpeg',
];

const SLIDE_INTERVAL = 5000;

const HeroSlideshow = ({ onExplore }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const touchStartX = useRef(null);

    const advance = useCallback(() => {
        setPrevIndex(activeIndex);
        setActiveIndex(i => (i + 1) % HERO_IMAGES.length);
    }, [activeIndex]);

    useEffect(() => {
        const timer = setInterval(advance, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [advance]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!modalOpen) return;
            if (e.key === 'Escape') setModalOpen(false);
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen, galleryIndex]);

    // Body scroll lock
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [modalOpen]);

    const openModal = (index) => {
        setGalleryIndex(index);
        setModalOpen(true);
    };

    const nextImage = () => setGalleryIndex(i => (i + 1) % HERO_IMAGES.length);
    const prevImage = () => setGalleryIndex(i => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

    // Swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
        touchStartX.current = null;
    };

    const galleryModal = modalOpen && createPortal(
        <div 
            className="gallery-overlay-v2 animate-fade-in" 
            onClick={() => setModalOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header Stage */}
            <div className="gallery-header-v3">
                <div className="gallery-logo-v3">
                    <span className="room-num">ROOM 1061</span>
                    <div className="luxury-divider" />
                </div>
                <button className="gallery-close-v3" onClick={() => setModalOpen(false)}>
                    <X size={24} />
                </button>
            </div>

            {/* Main Stage (Flex: 1) */}
            <div className="gallery-main-v3" onClick={e => e.stopPropagation()}>
                <button className="gallery-nav-v3 prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                    <ChevronLeft size={36} />
                </button>

                <div className="gallery-img-container-v3">
                    <img
                        key={galleryIndex}
                        src={HERO_IMAGES[galleryIndex]}
                        alt={`Room ${galleryIndex + 1}`}
                        className="gallery-img-v3 animate-zoom-in"
                    />
                    <div className="gallery-counter-v3">
                        {galleryIndex + 1} / {HERO_IMAGES.length}
                    </div>
                </div>

                <button className="gallery-nav-v3 next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                    <ChevronRight size={36} />
                </button>
            </div>

            {/* Footer Stage (Thumbnails) */}
            <div className="gallery-footer-v3" onClick={e => e.stopPropagation()}>
                <div className="gallery-thumbs-v3">
                    {HERO_IMAGES.map((src, i) => (
                        <div 
                            key={i}
                            className={`thumb-item-v3 ${i === galleryIndex ? 'active' : ''}`}
                            onClick={() => setGalleryIndex(i)}
                        >
                            <img src={src} alt={`Thumbnail ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );

    return (
        <>
            {/* ── HERO SLIDESHOW SECTION ── */}
            <section className="hero-slideshow-section" onClick={() => openModal(activeIndex)}>

                {/* SLIDES STACK */}
                {HERO_IMAGES.map((src, i) => (
                    <div
                        key={src}
                        className={`hero-slide ${i === activeIndex ? 'hero-slide--active' : ''} ${i === prevIndex ? 'hero-slide--prev' : ''}`}
                    >
                        <img src={src} alt={`Room ${i + 1}`} className="hero-slide-img" />
                    </div>
                ))}

                {/* LUXURY GRADIENT OVERLAY */}
                <div className="hero-slideshow-overlay" />

                {/* SLIDE DOT INDICATORS */}
                <div className="hero-dots">
                    {HERO_IMAGES.map((_, i) => (
                        <span key={i} className={`hero-dot ${i === activeIndex ? 'hero-dot--active' : ''}`} />
                    ))}
                </div>

                {/* TEXT CONTENT */}
                <div className="hero-slideshow-content">
                    <div className="hero-room-badge">Room 1061</div>
                    <h1 className="hero-slideshow-title">Experience Luxury &amp; Comfort</h1>
                    <button
                        className="hero-cta-btn"
                        onClick={(e) => { e.stopPropagation(); onExplore && onExplore(); }}
                    >
                        Explore Room
                    </button>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>
                        Tap anywhere to view gallery
                    </div>
                </div>
            </section>

            {galleryModal}
        </>
    );
};

export default HeroSlideshow;
