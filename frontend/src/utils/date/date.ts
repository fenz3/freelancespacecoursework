export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') return date;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateYYYYMMDD = (date: Date | string): string => {
  if (typeof date === 'string') return date;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatDateForBackend = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('-');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}T00:00:00Z`;

  return formattedDate;
};

export const reformatDate = (date: string): string => {
  const parts = date.split('-');
  const reversedParts = parts.reverse();
  const reversedStr = reversedParts.join('-');
  return reversedStr;
};
