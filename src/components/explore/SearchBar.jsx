import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search for restaurants, temples, malls..." }) => {
    return (
        <div className="explore-search-wrapper">
            <div className="explore-search-bar">
                <Search size={20} color="#C8A74E" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
