import { SyntheticEvent } from 'react';

const Button = ({
  onClick,
  title,
  className,
}: {
  onClick: (e: SyntheticEvent) => void;
  title: string;
  className?: string;
}) => (
  <button className={className + ' global-button secondary'} onClick={onClick}>
    {title}
  </button>
);

export default Button;
