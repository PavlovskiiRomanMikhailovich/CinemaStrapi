import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header.jsx';
import { ROUTES_CONFIG } from 'config/routes.config';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {ROUTES_CONFIG.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;