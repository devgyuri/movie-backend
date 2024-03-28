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
// 자동으로 변수로 들어간 시간에서 -9시간을 한 Date 반환
export const stringToDate = (s: string): Date => {
  const yy = Number(s.substring(0, 4));
  const mm = Number(s.substring(4, 6)) - 1;
  const dd = Number(s.substring(6, 8));

  console.log('ds: ', s, ' mm: ', mm, ' dd: ', dd);
  console.log(new Date(yy, mm, dd));
  console.log(new Date('1995-12-17T03:24:00'));

  return new Date(yy, mm, dd);
};
