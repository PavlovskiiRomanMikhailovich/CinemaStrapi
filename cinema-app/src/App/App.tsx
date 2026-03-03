import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header.jsx';
import { ROUTES_CONFIG } from 'config/routes.config';
import { StoresProvider } from '../hooks/useStores';
import { RootStore } from 'stores/RootStore';

const rootStore = new RootStore();

function App() {
  return (
    <StoresProvider store={rootStore}>
      <BrowserRouter>
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
    </StoresProvider>
  );
}

export default App;