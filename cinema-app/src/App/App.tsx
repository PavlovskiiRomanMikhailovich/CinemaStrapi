import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header.jsx';
import MoviesContent from 'App/pages/MoviesContent/MoviesContent';
import FilmPage from 'App/pages/FilmPage/FilmPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MoviesContent title="Фильмы" category="home" />} />
          <Route path="/new_films" element={<MoviesContent title="Новинки" category="new_films" />} />
          <Route path="/recomendations" element={<MoviesContent title="Подборки" category="recomendations" />} />
          <Route path="/film/:documentId" element={<FilmPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;