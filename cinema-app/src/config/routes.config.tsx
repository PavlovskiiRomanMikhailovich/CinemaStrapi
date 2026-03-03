import { type RouteProps } from 'react-router-dom';
import MoviesContent from 'App/pages/MoviesContent/MoviesContent';
import FilmPage from 'App/pages/FilmPage/FilmPage';

type Category = 'home' | 'new_films' | 'recomendations';

export const ROUTES = {
  HOME: '/',
  NEW_FILMS: '/new_films',
  RECOMENDATIONS: '/recomendations',
  FILM: '/film/:documentId',
} as const;

export type RoutesType = typeof ROUTES;

interface RouteConfig extends Omit<RouteProps, 'element'> {
  element: React.ReactNode;
  title?: string;
  category?: Category;
}

export const ROUTES_CONFIG: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <MoviesContent title="Фильмы" category="home" />,
    title: 'Фильмы',
    category: 'home',
  },
  {
    path: ROUTES.NEW_FILMS,
    element: <MoviesContent title="Новинки" category="new_films" />,
    title: 'Новинки',
    category: 'new_films',
  },
  {
    path: ROUTES.RECOMENDATIONS,
    element: <MoviesContent title="Подборки" category="recomendations" />,
    title: 'Подборки',
    category: 'recomendations',
  },
  {
    path: ROUTES.FILM,
    element: <FilmPage />,
    title: 'Фильм',
  },
];

export const getRouteTitle = (pathname: string): string | undefined => {
  const route = ROUTES_CONFIG.find(route => route.path === pathname);
  return route?.title;
};
