import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './ExploreNearby.css';
import { categories } from '../../data/exploreData';
import CategoryGrid from './CategoryGrid';
import CategoryView from './CategoryView';
import FoodDiningDynamic from './FoodDiningDynamic';
import SearchBar from './SearchBar';

const ExploreNearby = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        distance: 'Any',
        cuisine: 'All',
        type: 'All'
    });

    const handleCategoryClick = (category) => {
        navigate(category.id);
    };

    const renderGridView = () => (
        <div className="main-grid-view">
            <div className="view-intro">
                <h2 style={{ color: '#C8A74E', marginBottom: '10px' }}>Explore Nearby</h2>
                <p style={{ color: '#d8d2c5', marginBottom: '30px' }}>Discover the best of the city around our luxury property.</p>
            </div>
            <CategoryGrid onCategoryClick={handleCategoryClick} />
        </div>
    );

    const CategoryWrapper = () => {
        const { categoryId } = useParams();
        const category = categories.find(c => c.id === categoryId);

        if (!category) return renderGridView();

        if (categoryId === 'food') {
            return (
                <FoodDiningDynamic
                    onBack={() => navigate('/lifestyle/explore')}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            );
        }

        return (
            <CategoryView
                category={category}
                onBack={() => navigate('/lifestyle/explore')}
                filters={filters}
                setFilters={setFilters}
                searchQuery={searchQuery}
            />
        );
    };

    return (
        <div className="explore-container fade-in">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <Routes>
                <Route index element={renderGridView()} />
                <Route path=":categoryId" element={<CategoryWrapper />} />
            </Routes>
        </div>
    );
};

export default ExploreNearby;
