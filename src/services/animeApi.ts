import { SearchResponse, AnimeDetailResponse } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

let currentController: AbortController | null = null;

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();

  try {
    const response = await fetch(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
      { signal: currentController.signal }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch anime');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  const response = await fetch(`${BASE_URL}/anime/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch anime details');
  }

  const data = await response.json();
  return data;
};

