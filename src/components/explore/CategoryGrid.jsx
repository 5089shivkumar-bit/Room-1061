import React from 'react';
import { categories } from '../../data/exploreData';

const CategoryGrid = ({ onCategoryClick }) => {
    return (
        <div className="category-grid">
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className="category-card"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="category-icon-wrapper">
                        <cat.icon size={28} />
                    </div>
                    <h3>{cat.title}</h3>
                    <span>{cat.count} Places</span>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
