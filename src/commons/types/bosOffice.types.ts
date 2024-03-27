export interface IDailyBoxOfficeResult {
  boxOfficeResult: IBoxOfficeResult;
}

export interface IBoxOfficeResult {
  boxOfficeType: string;
  showRange: string;
  dailyBoxOfficeList: IBoxOfficeList[];
}

export interface IBoxOfficeList {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
}
