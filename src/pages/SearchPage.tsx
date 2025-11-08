import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnime, setSearchQuery, setCurrentPage } from '../store/animeSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../styles/SearchPage.css';

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchResults, loading, error, currentPage, totalPages, searchQuery } = useAppSelector(
    (state) => state.anime
  );
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [savedAnime, setSavedAnime] = useLocalStorage<number[]>('savedAnime', []);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    rating: '',
    minScore: ''
  });
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchAnime({ query: searchQuery, page: currentPage }));
    }
  }, [searchQuery, currentPage, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      dispatch(setSearchQuery(value));
      dispatch(setCurrentPage(1));
    }, 250);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnimeClick = (id: number) => {
    navigate(`/anime/${id}`);
  };

  const toggleSaveAnime = (e: React.MouseEvent, animeId: number) => {
    e.stopPropagation();
    if (savedAnime.includes(animeId)) {
      setSavedAnime(savedAnime.filter(id => id !== animeId));
    } else {
      setSavedAnime([...savedAnime, animeId]);
    }
  };

  const isSaved = (animeId: number) => savedAnime.includes(animeId);

  return (
    <div className="search-page">
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for anime..."
            value={localQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg className="filter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {Object.values(filters).filter(v => v).length > 0 && `(${Object.values(filters).filter(v => v).length})`}
        </button>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Type:</label>
              <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
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
              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                <option value="">All</option>
                <option value="airing">Airing</option>
                <option value="complete">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Rating:</label>
              <select value={filters.rating} onChange={(e) => setFilters({...filters, rating: e.target.value})}>
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
                onChange={(e) => setFilters({...filters, minScore: e.target.value})}
                placeholder="0-10"
              />
            </div>

            <button className="clear-filters" onClick={() => setFilters({type: '', status: '', rating: '', minScore: ''})}>
              Clear All
            </button>
          </div>
        )}
      </header>

      <main className="main-content">
        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading anime...</p>
          </div>
        )}

        {!loading && searchQuery && searchResults.length === 0 && (
          <div className="empty-state">
            <p>No anime found for "{searchQuery}"</p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <>
            <div className="results-grid">
              {searchResults.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="anime-card"
                  onClick={() => handleAnimeClick(anime.mal_id)}
                >
                  <button
                    className={`bookmark-btn ${isSaved(anime.mal_id) ? 'saved' : ''}`}
                    onClick={(e) => toggleSaveAnime(e, anime.mal_id)}
                    aria-label={isSaved(anime.mal_id) ? 'Remove from saved' : 'Save anime'}
                  >
                    <svg className="bookmark-icon" fill={isSaved(anime.mal_id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <div className="anime-image-container">
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="anime-image"
                    />
                  </div>
                  <div className="anime-info">
                    <h3 className="anime-title">{anime.title}</h3>
                    {anime.score && (
                      <div className="anime-score">⭐ {anime.score}</div>
                    )}
                    {anime.episodes && (
                      <div className="anime-episodes">{anime.episodes} episodes</div>
                    )}
                    {anime.type && (
                      <div className="anime-type">{anime.type}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

