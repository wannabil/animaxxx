import React from 'react';

interface FilterState {
  type: string;
  status: string;
  rating: string;
  minScore: string;
}

interface FilterPanelProps {
  showFilters: boolean;
  filters: FilterState;
  onToggleFilters: () => void;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  filters,
  onToggleFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const activeFilterCount = Object.values(filters).filter(v => v).length;

  return (
    <>
      <button className="filter-toggle" onClick={onToggleFilters}>
        <svg className="filter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Type:</label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            >
              <option value="">All</option>
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
              <option value="ova">OVA</option>
              <option value="special">Special</option>
              <option value="ona">ONA</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            >
              <option value="">All</option>
              <option value="airing">Airing</option>
              <option value="complete">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating:</label>
            <select
              value={filters.rating}
              onChange={(e) => onFilterChange({ ...filters, rating: e.target.value })}
            >
              <option value="">All</option>
              <option value="g">G - All Ages</option>
              <option value="pg">PG - Children</option>
              <option value="pg13">PG-13 - Teens 13+</option>
              <option value="r17">R - 17+</option>
              <option value="r">R+ - Mild Nudity</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Score:</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={filters.minScore}
              onChange={(e) => onFilterChange({ ...filters, minScore: e.target.value })}
              placeholder="0-10"
            />
          </div>

          <button className="clear-filters" onClick={onClearFilters}>
            Clear All
          </button>
        </div>
      )}
    </>
  );
};

