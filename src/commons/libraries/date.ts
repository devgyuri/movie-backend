// Date => yyyymmdd
export const dateToString = (d: Date): string => {
  const yy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();

  return (
    String(yy).padStart(4, '0') +
    String(mm).padStart(2, '0') +
    String(dd).padStart(2, '0')
  );
};

// yyyymmdd => Date
export const stringToDate = (s: string): Date => {
  const yy = Number(s.substring(0, 4));
  const mm = Number(s.substring(4, 6)) - 1;
  const dd = Number(s.substring(6, 8));

  return new Date(yy, mm, dd);
};
