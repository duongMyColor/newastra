import { StyleType } from '@repo/types/richTextEditor';

const StyleDropdown = ({
  types,
  onToggle,
  value,
}: {
  types: StyleType[];
  onToggle: Function;
  value: string;
}) => {
  return (
    <select value={value} onChange={(e) => onToggle(e.target.value)}>
      {types.map((type) => (
        <option key={type.style} value={type.style}>
          {type.label}
        </option>
      ))}
    </select>
  );
};

export default StyleDropdown;
