import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnime, setSearchQuery, setCurrentPage } from '../store/animeSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Anime } from '../types/anime';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { AnimeCard } from '../components/AnimeCard';
import { Pagination } from '../components/Pagination';
import '../styles/SearchPage.css';

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchResults, loading, error, currentPage, totalPages, searchQuery } = useAppSelector(
    (state) => state.anime
  );
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [savedAnime, setSavedAnime] = useLocalStorage<Anime[]>('savedAnime', []);
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

  const toggleSaveAnime = (e: React.MouseEvent, anime: Anime) => {
    e.stopPropagation();
    if (savedAnime.some(saved => saved.mal_id === anime.mal_id)) {
      setSavedAnime(savedAnime.filter(saved => saved.mal_id !== anime.mal_id));
    } else {
      setSavedAnime([...savedAnime, anime]);
    }
  };

  const isSaved = (animeId: number) => savedAnime.some(anime => anime.mal_id === animeId);

  return (
    <div className="search-page">
      <header className="header">
        <SearchBar value={localQuery} onChange={handleSearchChange} />
        
        <FilterPanel
          showFilters={showFilters}
          filters={filters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({ type: '', status: '', rating: '', minScore: '' })}
        />
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

        {!loading && !searchQuery && savedAnime.length > 0 && (
          <div className="results-grid">
            {savedAnime.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                isSaved={true}
                onAnimeClick={handleAnimeClick}
                onToggleSave={toggleSaveAnime}
              />
            ))}
          </div>
        )}

        {!loading && !searchQuery && savedAnime.length === 0 && (
          <div className="empty-state">
            <p>No bookmarked anime yet. Search and bookmark your favorites!</p>
          </div>
        )}

        {!loading && searchQuery && searchResults.length > 0 && (
          <>
            <div className="results-grid">
              {searchResults.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  isSaved={isSaved(anime.mal_id)}
                  onAnimeClick={handleAnimeClick}
                  onToggleSave={toggleSaveAnime}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
