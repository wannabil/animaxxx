import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../types/anime';
import { searchAnime, getAnimeById } from '../services/animeApi';

interface AnimeState {
  searchResults: Anime[];
  selectedAnime: Anime | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
};

export const fetchAnime = createAsyncThunk(
  'anime/fetchAnime',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await searchAnime(query, page);
    return response;
  }
);

export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchAnimeDetail',
  async (id: number) => {
    const response = await getAnimeById(id);
    return response.data;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.error = null;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message !== 'Request cancelled') {
          state.error = action.error.message || 'Failed to fetch anime';
        }
      })
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch anime details';
      });
  },
});

export const { setSearchQuery, setCurrentPage, clearError, clearSelectedAnime } = animeSlice.actions;
export default animeSlice.reducer;

