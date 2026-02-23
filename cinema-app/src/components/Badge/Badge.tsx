// src/components/Badge/Badge.tsx
import React from 'react';
import styles from './Badge.module.scss';
import star from 'assets/Star.svg';

export type BadgeProps = {
  /** Тип плашки: duration (длительность) или rating (рейтинг) */
  type: 'duration' | 'rating';
  /** Значение для отображения */
  value: number | string;
  /** Дополнительный класс */
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  const displayValue = type === 'duration' ? `${value} m` : value;

  return (
    <div className={`${styles.badge} ${styles[`badge--${type}`]} ${className}`}>
      <span className={styles.badge__value}>{displayValue}</span>
      {type === 'rating' && (
        <img className={styles.badge__icon} src={star} alt="star" />
      )}
    </div>
  );
};

export default Badge;
