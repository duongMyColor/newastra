import dayjs from 'dayjs';

export const formatDate = (date: string): string => {
  const formattedDate = dayjs(date).format('YYYY/MM/DD hh/MM/ss');
  return formattedDate;
};
