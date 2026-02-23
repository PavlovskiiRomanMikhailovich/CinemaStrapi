import React from 'react';
import Loader from "components/Loader/Loader.tsx";
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  variant = 'filled',
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    className,
    isDisabled ? styles['button--disabled'] : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={buttonClasses}
    >
      {loading && <Loader size='s' color={variant === 'filled' ? 'white' : 'red'} />}
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};

export default Button;
