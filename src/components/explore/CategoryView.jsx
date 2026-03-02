import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import FilterBar from './FilterBar';
import PlaceCard from './PlaceCard';
import { exploreData } from '../../data/exploreData';

const CategoryView = ({ category, onBack, filters, setFilters, searchQuery }) => {
    const data = exploreData[category.id] || [];

    const filteredData = useMemo(() => {
        return data.filter(item => {
            // Search filter
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.cuisine && item.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            // Distance filter
            const distLimit = filters.distance === 'Within 500m' ? 0.5 :
                filters.distance === 'Within 1km' ? 1 :
                    filters.distance === 'Within 3km' ? 3 : Infinity;
            if (item.dist > distLimit) return false;

            // Cuisine filter (Food only)
            if (category.id === 'food' && filters.cuisine !== 'All') {
                if (!item.cuisine.includes(filters.cuisine)) return false;
            }

            // Type filter (All others)
            if (category.id !== 'food' && filters.type !== 'All') {
                if (item.type !== filters.type) return false;
            }

            return true;
        });
    }, [data, category.id, filters, searchQuery]);

    return (
        <div className="category-view">
            <div className="view-header">
                <button className="back-button" onClick={onBack}>
                    <ArrowLeft size={20} />
                </button>
                <div className="view-title">
                    <category.icon size={24} color="#C8A74E" />
                    <h2>{category.title}</h2>
                </div>
            </div>

            <FilterBar
                activeCategory={category.id}
                filters={filters}
                setFilters={setFilters}
            />

            <div className="places-grid">
                {filteredData.length > 0 ? (
                    filteredData.map(place => (
                        <PlaceCard key={place.id} place={place} categoryId={category.id} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No places found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryView;
