import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const DropdownFilter = ({ label, options, activeValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="dropdown-filter-container" ref={dropdownRef}>
            <span className="filter-label">{label}:</span>
            <div className="dropdown-wrapper">
                <button
                    className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{activeValue}</span>
                    <ChevronDown size={16} className={`chevron ${isOpen ? 'rotate' : ''}`} />
                </button>

                {isOpen && (
                    <div className="dropdown-menu animate-slide-down">
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`dropdown-item ${activeValue === option ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{option}</span>
                                {activeValue === option && <Check size={14} color="#C8A74E" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownFilter;
