import { Link, useLocation } from 'react-router-dom';
import logo from 'assets/logo.png';
import bookmarkIcon from 'assets/Bookmark.svg';
import userIcon from 'assets/user.svg';
import styles from './Header.module.scss';
import classNames from 'classnames';

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
        className={classNames(
            styles['header__link'],
            { [styles['active']]: isActive('/') }
        )}
        >
          Фильмы
        </Link>
        <Link 
        to="/new_films" 
        className={classNames(
            styles['header__link'],
            { [styles['active']]: isActive('/new_films') }
        )}
        >
          Новинки
        </Link>
        <Link 
        to="/recomendations" 
        className={classNames(
            styles['header__link'],
            { [styles['active']]: isActive('/recomendations') }
        )}
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
