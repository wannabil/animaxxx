export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string | null;
  score: number | null;
  episodes: number | null;
  status: string;
  aired: {
    from: string | null;
    to: string | null;
    string: string;
  };
  rating: string | null;
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
  studios: Array<{
    mal_id: number;
    name: string;
  }>;
  year: number | null;
  type: string | null;
}

export interface SearchResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeDetailResponse {
  data: Anime;
}

