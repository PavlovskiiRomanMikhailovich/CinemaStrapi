import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilmById, getFilms, type Film } from '../../../api/filmsApi';
import Text from 'components/Text/Text.tsx';
import Button from 'components/Button/Button.tsx';
import Card from 'components/Card/Card.tsx';
import Badge from 'components/Badge/Badge.tsx';
import arrowRight from 'assets/arrow-right.svg'
import arrowLeft from 'assets/arrow-left.svg'
import styles from './FilmPage.module.scss';
import classNames from 'classnames';

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatAgeLimit = (age: number): string => {
  return `${age}+`;
};

const FilmPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [recommendations, setRecommendations] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmAndRecommendations = async () => {
      if (!documentId) return;
      
      setLoading(true);
      setError(null);
      try {
        const filmResponse = await getFilmById(documentId);
        setFilm(filmResponse.data);
        
        const allFilmsResponse = await getFilms();
        const otherFilms = allFilmsResponse.data
          .filter(f => f.documentId !== documentId)
          .slice(0, 6);
        setRecommendations(otherFilms);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch film');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmAndRecommendations();
  }, [documentId]);

  const handleCardClick = (id: string) => {
    navigate(`/film/${id}`);
  };

  if (loading) return <div className={styles.loading}>Загрузка фильма...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!film) return <div className={styles.error}>Фильм не найден</div>;

  const posterUrl = film.poster?.formats?.large?.url || film.poster?.url || '';
  const infoString = [
    film.releaseYear,
    film.category?.title,
    formatAgeLimit(film.ageLimit)
  ].filter(Boolean).join(' • ');

  return (
    <div className={styles['film-page']}>
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className={styles['back-button']}
      >
        <img src={arrowLeft}/>
        <div>Назад</div>
      </Button>

      <div className={styles['film-page__content']}>
        <div className={styles['film-page__trailer']}>
          <iframe
            src={`${film.trailerUrl}&autoplay=0&hd=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={`${film.title} trailer`}
            className={styles['film-page__video']}
          />
        </div>

        <div className={styles['film-page__info']}>
          <div className={styles['film-page__title-wrapper']}>
            <Text weight="medium" view="title" color="primary">
              {film.title}
            </Text>
            {film.rating && <Badge type="rating" value={film.rating.toFixed(1)} className={styles['title-badge']}/>}
          </div>
          
          <Text view="p-20" color="primary" className={styles['film-page__meta']}>
            {infoString + " • " + formatDuration(film.duration)}
          </Text>

          <Text view="p-20" className={styles['film-page__description']}>
            {film.description}
          </Text>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className={styles['film-page__recommendations']}>
          <Text tag='h2' color="primary" weight='normal' className={styles['recommendations-title']}>
            Рекомендации
          </Text>
          
          <div className={styles['recommendations-carousel']}>
            <button 
                className={classNames(
                    styles['carousel-arrow'],
                    styles['carousel-arrow--left']
                )}
              onClick={() => {
                const container = document.querySelector(`.${styles['recommendations-track']}`);
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
            >
              <img src={arrowLeft}/>
            </button>
            
            <div className={styles['recommendations-track']}>
              {recommendations.map(film => {
                const posterUrl = film.poster?.formats?.small?.url || film.poster?.url || '';
                const infoString = [
                  film.releaseYear,
                  film.category?.title,
                  formatAgeLimit(film.ageLimit)
                ].filter(Boolean).join(' • ');

                return (
                  <div key={film.documentId} className={styles['recommendations-item']}>
                    <Card
                      image={posterUrl}
                      captionSlot={infoString}
                      title={film.title}
                      rating={film.rating}
                      duration={film.duration}
                      subtitle={film.shortDescription || film.description}
                      onClick={() => handleCardClick(film.documentId)}
                    />
                  </div>
                );
              })}
            </div>

            <button 
                className={classNames(
                    styles['carousel-arrow'],
                    styles['carousel-arrow--right']
                )}
              onClick={() => {
                const container = document.querySelector(`.${styles['recommendations-track']}`);
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
            >
              <img src={arrowRight}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmPage;
