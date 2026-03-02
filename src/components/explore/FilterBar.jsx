import React from 'react';
import DropdownFilter from './DropdownFilter';
import {
    LayoutGrid, Flame, Soup, UtensilsCrossed, Pizza,
    Leaf, Coffee, Cake, Landmark, Trees, MapPin,
    Library, Globe, Waves, Flower2, ShoppingBag,
    Film, Gamepad2, Train, Bus, Plane,
    Hospital, DollarSign, Building2, Pill, ShieldCheck,
    Beef
} from 'lucide-react';

const iconMapping = {
    "All": LayoutGrid,
    "Indian": Flame,
    "Chinese": Soup,
    "Continental": UtensilsCrossed,
    "Fast Food": Pizza,
    "South Indian": Coffee,
    "Vegetarian": Leaf,
    "Non-Vegetarian": Beef,
    "Cafe": Coffee,
    "Bakery": Cake,
    "Temples": Landmark,
    "Parks": Trees,
    "Historical Sites": MapPin,
    "Museums": Library,
    "Cultural Places": Globe,
    "Lakes": Waves,
    "Gardens": Flower2,
    "Shopping Malls": ShoppingBag,
    "Theatres / Cinema": Film,
    "Gaming Zones": Gamepad2,
    "Cafes": Coffee,
    "Railway Station": Train,
    "Bus Stand": Bus,
    "Airport": Plane,
    "Metro": Train,
    "Hospitals": Hospital,
    "ATMs": DollarSign,
    "Banks": Building2,
    "Medical Stores": Pill,
    "Police Station": ShieldCheck
};

const SubCategoryGrid = ({ options, activeValue, onChange }) => {
    return (
        <div className="sub-category-filter-grid">
            {options.map((option) => {
                const Icon = iconMapping[option] || LayoutGrid;
                return (
                    <button
                        key={option}
                        className={`sub-category-box ${activeValue === option ? 'active' : ''}`}
                        onClick={() => onChange(option)}
                    >
                        <div className="sc-icon-box">
                            <Icon size={18} />
                        </div>
                        <span>{option}</span>
                    </button>
                );
            })}
        </div>
    );
};

const FilterBar = ({ activeCategory, filters, setFilters }) => {
    const isFood = activeCategory === 'food';
    const isCulture = activeCategory === 'culture';
    const isTransport = activeCategory === 'transport';
    const isShopping = activeCategory === 'shopping';
    const isEmergency = activeCategory === 'emergency';

    const cuisines = [
        "All Cuisines", "Chinese", "Cafe", "Fast Food",
        "South Indian", "Punjabi", "Vegetarian", "Non-Vegetarian"
    ];

    const distances = ["Any", "Within 500m", "Within 1km", "Within 3km"];
    const cultureTypes = ["All", "Temples", "Parks", "Historical Sites", "Museums", "Cultural Places", "Lakes", "Gardens"];
    const shoppingTypes = ["All", "Shopping Malls", "Theatres / Cinema", "Gaming Zones", "Cafes"];
    const transportTypes = ["All", "Railway Station", "Bus Stand", "Airport", "Metro"];
    const emergencyTypes = ["All", "Hospitals", "ATMs", "Banks", "Medical Stores", "Police Station"];

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="filter-bar dropdown-mode">
            {/* Distance Filter (Shared) */}
            <DropdownFilter
                label="Distance"
                options={distances}
                activeValue={filters.distance}
                onChange={(val) => updateFilter('distance', val)}
            />

            {/* Sub-type Grid (The "Small Boxes" per user request) */}
            <div className="niche-filter-section">
                <span className="filter-label">Filter by Type:</span>
                {isFood && (
                    <SubCategoryGrid
                        options={cuisines}
                        activeValue={filters.cuisine}
                        onChange={(val) => updateFilter('cuisine', val)}
                    />
                )}
                {isCulture && (
                    <SubCategoryGrid
                        options={cultureTypes}
                        activeValue={filters.type}
                        onChange={(val) => updateFilter('type', val)}
                    />
                )}
                {isShopping && (
                    <SubCategoryGrid
                        options={shoppingTypes}
                        activeValue={filters.type}
                        onChange={(val) => updateFilter('type', val)}
                    />
                )}
                {isTransport && (
                    <SubCategoryGrid
                        options={transportTypes}
                        activeValue={filters.type}
                        onChange={(val) => updateFilter('type', val)}
                    />
                )}
                {isEmergency && (
                    <SubCategoryGrid
                        options={emergencyTypes}
                        activeValue={filters.type}
                        onChange={(val) => updateFilter('type', val)}
                    />
                )}
            </div>
        </div>
    );
};

export default FilterBar;
