import { StyleButtonProps } from '@repo/types/richTextEditor';
import { SyntheticEvent } from 'react';

const StyleButton = ({
  onToggle,
  style,
  active,
  label,
  icon,
}: StyleButtonProps) => {
  const toggle = (e: SyntheticEvent) => {
    e.preventDefault();

    if (onToggle) {
      onToggle(style);
    }
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  const buttonIcon = <i className={icon} title={label}></i>;

  return (
    <span className={className} onMouseDown={toggle}>
      {icon ? buttonIcon : label}
    </span>
  );
};

export default StyleButton;
