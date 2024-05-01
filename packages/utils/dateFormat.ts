import dayjs from 'dayjs';

export const formatDate = (date: string, format: string): string => {
  const formattedDate = dayjs(date).format(format);
  return formattedDate;
};

export const formatDateAcstar = (date: string): string => {
  return dayjs(date).format('YYYY.MM.DD HH:MM');
};
