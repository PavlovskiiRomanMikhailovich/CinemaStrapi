import React from 'react';
import styles from './Badge.module.scss';
import star from 'assets/Star.svg';
import classNames from 'classnames';

export type BadgeProps = {
  type: 'duration' | 'rating';
  value: number | string;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  const displayValue = type === 'duration' ? `${value} m` : value;

  return (
    <div className={classNames(
        styles.badge,
        styles[`badge--${type}`],
        className
      )}>
        <span className={styles.badge__value}>{displayValue}</span>
        {type === 'rating' && (
          <img className={styles.badge__icon} src={star} alt="star" />
        )}
    </div>
  );
};

export default Badge;
