import React from 'react';
import './FilterBar.css';

export const FilterBar = ({
  categories = [],
  activeCategory,
  onCategorySelect,
  tags = [],
  selectedTag,
  onTagSelect,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="filter-bar-container">
      {/* Category Pills */}
      <div className="category-scroll-row">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onCategorySelect(cat.name)}
            >
              <span>{cat.name}</span>
              <span className="pill-count">{cat.count}</span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Tags, Sort, Results Counter */}
      <div className="filter-secondary-row">
        {/* Tag Filters */}
        <div className="tags-quick-list">
          <span className="tag-label">Tags:</span>
          <button
            type="button"
            className={`tag-filter-btn ${selectedTag === '' ? 'active' : ''}`}
            onClick={() => onTagSelect('')}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => onTagSelect(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Sort & Counter Controls */}
        <div className="sort-controls-group">
          <div className="sort-dropdown-wrapper">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="views">Most Views</option>
              <option value="likes">Most Liked</option>
              <option value="readTime">Shortest Read</option>
            </select>
          </div>

          <div className="results-summary">
            <span className="results-text">
              Showing <strong>{filteredCount}</strong> of {totalCount}
            </span>
            {isFiltered && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={onResetFilters}
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
