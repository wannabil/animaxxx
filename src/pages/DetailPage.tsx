import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetail, clearSelectedAnime } from '../store/animeSlice';
import '../styles/DetailPage.css';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(parseInt(id)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading anime details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Search
        </button>
      </div>
    );
  }

  if (!selectedAnime) {
    return null;
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Search
      </button>

      <div className="detail-content">
        <div className="detail-image-container">
          <img
            src={selectedAnime.images.jpg.large_image_url}
            alt={selectedAnime.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{selectedAnime.title}</h1>

          {selectedAnime.title_english && (
            <h2 className="detail-subtitle">{selectedAnime.title_english}</h2>
          )}

          {selectedAnime.title_japanese && (
            <p className="detail-japanese">{selectedAnime.title_japanese}</p>
          )}

          <div className="detail-meta">
            {selectedAnime.score && (
              <div className="meta-item">
                <span className="meta-label">Score:</span>
                <span className="meta-value">⭐ {selectedAnime.score}</span>
              </div>
            )}

            {selectedAnime.type && (
              <div className="meta-item">
                <span className="meta-label">Type:</span>
                <span className="meta-value">{selectedAnime.type}</span>
              </div>
            )}

            {selectedAnime.episodes && (
              <div className="meta-item">
                <span className="meta-label">Episodes:</span>
                <span className="meta-value">{selectedAnime.episodes}</span>
              </div>
            )}

            {selectedAnime.status && (
              <div className="meta-item">
                <span className="meta-label">Status:</span>
                <span className="meta-value">{selectedAnime.status}</span>
              </div>
            )}

            {selectedAnime.aired?.string && (
              <div className="meta-item">
                <span className="meta-label">Aired:</span>
                <span className="meta-value">{selectedAnime.aired.string}</span>
              </div>
            )}

            {selectedAnime.rating && (
              <div className="meta-item">
                <span className="meta-label">Rating:</span>
                <span className="meta-value">{selectedAnime.rating}</span>
              </div>
            )}
          </div>

          {selectedAnime.genres.length > 0 && (
            <div className="detail-section">
              <h3 className="section-title">Genres</h3>
              <div className="genre-list">
                {selectedAnime.genres.map((genre) => (
                  <span key={genre.mal_id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedAnime.studios.length > 0 && (
            <div className="detail-section">
              <h3 className="section-title">Studios</h3>
              <div className="studio-list">
                {selectedAnime.studios.map((studio) => (
                  <span key={studio.mal_id} className="studio-tag">
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedAnime.synopsis && (
            <div className="detail-section">
              <h3 className="section-title">Synopsis</h3>
              <p className="synopsis">{selectedAnime.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

