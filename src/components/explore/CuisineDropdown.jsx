import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const CuisineDropdown = ({ selectedCuisine, onCuisineChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const cuisines = [
        "All Cuisines", "Chinese", "Cafe", "Fast Food",
        "South Indian", "Punjabi", "Vegetarian", "Non-Vegetarian"
    ];

    const handleSelect = (cuisine) => {
        onCuisineChange(cuisine);
        setIsOpen(false);
    };

    return (
        <div className="cuisine-dropdown-container" style={{ position: 'relative', minWidth: '200px' }}>
            <button
                className="filter-chip"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 18px',
                    borderColor: isOpen ? '#C8A74E' : '#eee'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={16} />
                    <span>{selectedCuisine}</span>
                </div>
                <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>

            {isOpen && (
                <div
                    className="dropdown-menu animate-fade-in"
                    style={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    {cuisines.map((c) => (
                        <div
                            key={c}
                            className={`dropdown-item ${selectedCuisine === c ? 'active' : ''}`}
                            onClick={() => handleSelect(c)}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                backgroundColor: selectedCuisine === c ? '#fdfaf3' : 'transparent',
                                color: selectedCuisine === c ? '#C8A74E' : '#333',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                e.currentTarget.style.color = '#C8A74E';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = selectedCuisine === c ? '#fdfaf3' : 'transparent';
                                e.currentTarget.style.color = selectedCuisine === c ? '#C8A74E' : '#333';
                            }}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CuisineDropdown;
