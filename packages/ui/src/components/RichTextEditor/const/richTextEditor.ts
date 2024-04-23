import { StyleType } from '@repo/types/richTextEditor';

export const HEADING_TYPES: StyleType[] = [
  { label: 'Normal', style: 'unstyled' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
];

export const LIST_TYPES: StyleType[] = [
  {
    label: 'Ordered List',
    style: 'ordered-list-item',
    icon: 'fa-solid fa-list-ol',
  },
  {
    label: 'List',
    style: 'unordered-list-item',
    icon: 'fa-solid fa-list',
  },
];

export const INLINE_STYLES: StyleType[] = [
  { label: 'Bold', style: 'BOLD', icon: 'fa-solid fa-bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'fa-solid fa-italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'fa-solid fa-underline' },
  {
    label: 'Strikethrough',
    style: 'STRIKETHROUGH',
    icon: 'fa-solid fa-strikethrough',
  },
  { label: 'Code', style: 'CODE', icon: 'fa-solid fa-code' },
];

export const COLOR_TYPES: StyleType[] = [
  { label: 'Black', style: 'black' },
  { label: 'Red', style: 'red' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Orange', style: 'orange' },
  { label: 'White', style: 'white' },
];
export const FONT_SIZE_TYPES: StyleType[] = [
  // { label: '', style: 'unstyled' },
  { label: '8', style: 'fs8' },
  { label: '10', style: 'fs10' },
  { label: '12', style: 'fs12' },
  { label: '14', style: 'fs14' },
  { label: '16', style: 'fs16' },
  { label: '18', style: 'fs18' },
  { label: '24', style: 'fs24' },
  { label: '30', style: 'fs30' },
  { label: '36', style: 'fs36' },
  { label: '48', style: 'fs48' },
];

export const TEXT_ALIGN_TYPES: StyleType[] = [
  {
    label: 'Left',
    style: 'text-align-left',
    icon: 'fa-solid fa-align-left',
  },
  {
    label: 'Center',
    style: 'text-align-center',
    icon: 'fa-solid fa-align-center',
  },
  {
    label: 'Right',
    style: 'text-align-right',
    icon: 'fa-solid fa-align-right',
  },
  {
    label: 'Justify',
    style: 'text-align-justify',
    icon: 'fa-solid fa-align-right',
  },
];

// Custom overrides for "code" style.
export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Monaco", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
    borderRadius: 3,
    border: '1px solid #ddd',
  },
};

export const colorStyleMap = {
  red: {
    color: 'red',
  },
  orange: {
    color: 'orange',
  },
  yellow: {
    color: 'yellow',
  },
  green: {
    color: 'gren',
  },
  blue: {
    color: 'blue',
  },
  black: {
    color: 'black',
  },
  white: {
    color: 'white',
  },
};

export const fontSizeMap = {
  fs8: {
    fontSize: 8,
  },
  fs10: {
    fontSize: 10,
  },
  fs12: {
    fontSize: 12,
  },
  fs14: {
    fontSize: 14,
  },
  fs16: {
    fontSize: 16,
  },
  fs18: {
    fontSize: 18,
  },
  fs24: {
    fontSize: 24,
  },
  fs30: {
    fontSize: 30,
  },
  fs36: {
    fontSize: 36,
  },
  fs48: {
    fontSize: 48,
  },
};
