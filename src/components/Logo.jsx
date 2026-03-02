import React from 'react';

/**
 * Royal "Room 1061" Logo Component
 * Renders a complex SVG with Crown, Laurels, and Text in a Metallic Gold Gradient.
 * 
 * @param {string} variant - 'header' | 'watermark' | 'icon'
 * @param {string} className - Additional classes
 */
const Logo = ({ variant = 'header', className = '' }) => {
    // Royal Gold Gradient Definition
    const goldGradient = (
        <defs>
            <linearGradient id="royalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bf953f" />
                <stop offset="20%" stopColor="#fcf6ba" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="60%" stopColor="#fcf6ba" />
                <stop offset="80%" stopColor="#aa771c" />
                <stop offset="100%" stopColor="#bf953f" />
            </linearGradient>
            <filter id="royalGlow">
                <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );

    // Size configuration
    const getSize = () => {
        switch (variant) {
            case 'header': return { width: 140, height: 50 }; // Slightly wider for crest
            case 'watermark': return { width: 500, height: 350 }; // Taller for crest
            case 'icon': return { width: 64, height: 64 };
            default: return { width: 140, height: 50 };
        }
    };

    const { width, height } = getSize();

    return (
        <div className={`logo-container ${variant} ${className}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 200 140"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    overflow: 'visible',
                    transition: 'transform 0.3s ease, filter 0.3s ease'
                }}
            >
                {goldGradient}

                <g fill="url(#royalGold)" filter={variant === 'header' ? "url(#royalGlow)" : ""}>
                    {/* CROWN (Top Center) */}
                    <path d="M100 10 L115 35 L130 20 L125 50 H75 L70 20 L85 35 Z" />
                    <circle cx="100" cy="8" r="3" />
                    <circle cx="70" cy="18" r="2" />
                    <circle cx="130" cy="18" r="2" />

                    {/* TEXT: ROOM (Small Serif, Spaced) */}
                    <text
                        x="100"
                        y="70"
                        textAnchor="middle"
                        fontFamily="'Cinzel', serif"
                        fontSize="12"
                        fontWeight="700"
                        letterSpacing="4"
                    >
                        ROOM
                    </text>

                    {/* TEXT: 1061 (Large Serif) */}
                    <text
                        x="100"
                        y="105"
                        textAnchor="middle"
                        fontFamily="'Playfair Display', serif"
                        fontSize="42"
                        fontWeight="700"
                        letterSpacing="1"
                    >
                        1061
                    </text>

                    {/* STAR (Bottom Center) */}
                    <path d="M100 115 L102 120 H107 L103 124 L104 129 L100 126 L96 129 L97 124 L93 120 H98 Z" />

                    {/* WREATH / ORNAMENT (Simplified Curves) */}
                    {/* Left Branch */}
                    <path d="M50 110 C30 100, 20 60, 50 40" fill="none" stroke="url(#royalGold)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M50 110 Q40 105 45 95" fill="none" stroke="url(#royalGold)" strokeWidth="1.5" />
                    <path d="M48 100 Q35 90 45 80" fill="none" stroke="url(#royalGold)" strokeWidth="1.5" />

                    {/* Right Branch (Mirrored) */}
                    <path d="M150 110 C170 100, 180 60, 150 40" fill="none" stroke="url(#royalGold)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M150 110 Q160 105 155 95" fill="none" stroke="url(#royalGold)" strokeWidth="1.5" />
                    <path d="M152 100 Q165 90 155 80" fill="none" stroke="url(#royalGold)" strokeWidth="1.5" />
                </g>
            </svg>
        </div>
    );
};

export default Logo;
