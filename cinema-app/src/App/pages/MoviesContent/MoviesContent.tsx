import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card/Card.tsx';
import Text from 'components/Text/Text.tsx';
import Button from 'components/Button/Button.tsx';
import styles from './MoviesContent.module.scss';
import { formatAgeLimit, formatDuration, isTruthy } from 'utils/dataFromat';
import { getFilms, getCategories, type Film, type StrapiResponse, type Category } from 'api/filmsApi';
import Input, {type InputRef} from 'components/Input/Input';
import Dropdown, {type DropdownOption} from 'components/Dropdow/Dropdow';

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
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [category]);

  const fetchFilms = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {};
      
      const response: StrapiResponse<Film[]> = await getFilms(params);
      setFilms(response.data);
      setTotal(response.meta.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch films');
    } finally {
      setLoading(false);
    }
  };

const handleSearch = async () => {
  setLoading(true);
  setError(null);
  try {
    const params: any = {};
    
    if (tempSearchQuery) {
      params.search = tempSearchQuery;
    }
    
    if (tempSelectedCategories.length > 0) {
      params.categoryIds = tempSelectedCategories.map(id => Number(id));
    }

    setSearchQuery(tempSearchQuery);
    setSelectedCategories(tempSelectedCategories);
    
    const response: StrapiResponse<Film[]> = await getFilms(params);
    setFilms(response.data);
    setTotal(response.meta.pagination.total);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch films');
  } finally {
    setLoading(false);
  }
};


  const handleCardClick = (documentId: string) => {
    navigate(`/film/${documentId}`);
  };

  if (loading && films.length === 0) return <div className="loading">Загрузка фильмов...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const categoryOptions: DropdownOption[] = categories.map(cat => ({
    value: cat.id.toString(),
    label: cat.title
  }));

  return (
    <div className={styles["movies-content"]}>
      <div className={styles["serch-container"]}>
        <Input 
          onChange={(e) => setTempSearchQuery(e.target.value)}
          placeholder="Поиск по названию"
        />
        <Button variant='filled' onClick={handleSearch}>
          Найти
        </Button>
      </div>
      <Dropdown
        options={categoryOptions}
        value={tempSelectedCategories}
        onChange={(selected) => setTempSelectedCategories(selected)}
        placeholder="Фильтры"
        multiple
      />
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
