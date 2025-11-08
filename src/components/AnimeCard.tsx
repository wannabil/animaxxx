import React from 'react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  isSaved: boolean;
  onAnimeClick: (id: number) => void;
  onToggleSave: (e: React.MouseEvent, anime: Anime) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  isSaved,
  onAnimeClick,
  onToggleSave,
}) => {
  // Safe access to image URL with fallback
  const imageUrl = anime.images?.jpg?.image_url || anime.images?.jpg?.small_image_url || '';
  
  return (
    <div
      className="anime-card"
      onClick={() => onAnimeClick(anime.mal_id)}
    >
      <button
        className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
        onClick={(e) => onToggleSave(e, anime)}
        aria-label={isSaved ? 'Remove from saved' : 'Save anime'}
      >
        <svg
          className="bookmark-icon"
          fill={isSaved ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
      <div className="anime-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={anime.title}
            className="anime-image"
          />
        ) : (
          <div className="anime-image-placeholder" style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#e5e7eb',
            color: '#6b7280'
          }}>
            No Image
          </div>
        )}
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
  );
};

