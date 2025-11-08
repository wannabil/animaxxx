import React from 'react';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
  isSaved: boolean;
  onAnimeClick: (id: number) => void;
  onToggleSave: (e: React.MouseEvent, id: number) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  isSaved,
  onAnimeClick,
  onToggleSave,
}) => {
  return (
    <div
      className="anime-card"
      onClick={() => onAnimeClick(anime.mal_id)}
    >
      <button
        className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
        onClick={(e) => onToggleSave(e, anime.mal_id)}
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
  );
};

