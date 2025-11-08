import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './context/ThemeContext';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/anime/:id" element={<DetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

