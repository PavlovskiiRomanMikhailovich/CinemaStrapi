import { Link, useLocation } from 'react-router-dom';
import logo from 'assets/logo.png';
import bookmarkIcon from 'assets/Bookmark.svg';
import userIcon from 'assets/user.svg';
import styles from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles['header__logo']}>
        <img src={logo} alt="Logo" />
      </div>
      <nav className={styles['header__nav']}>
        <Link 
          to="/" 
          className={`${styles['header__link']} ${isActive('/') ? styles['active'] : ''}`}
        >
          Фильмы
        </Link>
        <Link 
          to="/new_films" 
          className={`${styles['header__link']} ${isActive('/new_films') ? styles['active'] : ''}`}
        >
          Новинки
        </Link>
        <Link 
          to="/recomendations" 
          className={`${styles['header__link']} ${isActive('/recomendations') ? styles['active'] : ''}`}
        >
          Подборки
        </Link>
      </nav>
      <div className={styles['icons-container']}>
        <img src={bookmarkIcon}/>
        <img src={userIcon}/>
      </div>
    </header>
  );
};

export default Header;
