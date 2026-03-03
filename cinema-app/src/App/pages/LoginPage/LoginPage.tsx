import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import { useAuthStore } from '../../../hooks/useStores';
import styles from './LoginPage.module.scss';

const LoginPage = observer(() => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authStore.login(identifier, password);
    navigate('/');

  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text tag="h1" color="primary" className={styles.title}>
          Вход
        </Text>

        {authStore.error && (
          <div className={styles.error}>
            {authStore.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email или имя пользователя"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="example@mail.com"
            required
            size="md"
          />

          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
            size="md"
          />

          <Button 
            type="submit" 
            variant="filled" 
            disabled={authStore.loading}
            className={styles.button}
          >
            {authStore.loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className={styles.footer}>
          <Text color="secondary">Нет аккаунта?</Text>
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;
