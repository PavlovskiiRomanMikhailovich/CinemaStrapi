import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card/Card.tsx';
import Text from 'components/Text/Text.tsx';
import Button from 'components/Button/Button.tsx';
import { getFilms, type Film } from '../../../api/filmsApi';
import styles from './MoviesContent.module.scss';
import { formatAgeLimit, formatDuration, isTruthy } from 'utils/dataFromat';

interface MoviesContentProps {
  title: string;
  category: 'home' | 'new_films' | 'recomendations';
}

const MoviesContent = ({ title, category }: MoviesContentProps) => {
  const navigate = useNavigate();
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getFilms();
        setFilms(response.data);
        setTotal(response.meta.pagination.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch films');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [category]);

  const handleCardClick = (documentId: string) => {
    navigate(`/film/${documentId}`);
  };

  if (loading) return <div className="loading">Загрузка фильмов...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className={styles["movies-content"]}>
      <Text className={styles['movies-header']} color='primary' tag='h1'>{title}</Text>
      <div className={styles["movies-grid"]}>
        {films.map(film => {
          const posterUrl = film.poster?.formats?.small?.url || film.poster?.url || '';
          
          const infoString = [
            film.releaseYear,
            film.category?.title,
            formatAgeLimit(film.ageLimit)
          ]
            .filter(isTruthy)
            .join('  •  ');
          
          const contentSlot = (
            <div className={styles["card-footer-content"]}>
              <Text view="p-18" weight="normal" color="accent">
                ★ {film.rating.toFixed(1)}
              </Text>
              <Text view="p-14" color="secondary">
                {formatDuration(film.duration)}
              </Text>
            </div>
          );

          const actionSlot = (
            <div className={styles["card-actions"]}>
              <Button 
                variant='outline'
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('В избранное:', film.title);
                }}
              >
                В избранное
              </Button>
              <Button 
                variant='filled'
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Смотреть:', film.title);
                }}
              >
                Смотреть
              </Button>
            </div>
          );

          return (
            <Card
              key={film.documentId}
              image={posterUrl}
              captionSlot={infoString}
              title={film.title}
              rating={film.rating} 
              duration={film.duration}
              subtitle={film.shortDescription || film.description}
              contentSlot={contentSlot}
              actionSlot={actionSlot}
              onClick={() => handleCardClick(film.documentId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoviesContent;
