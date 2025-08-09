interface IStarData {
  level: string;
  success: number;
  fail: number;
  destroy: number;
};

export const starData: IStarData[] = [
  { level: "0성", success: 95.0, fail: 5.0, destroy: 0 },
  { level: "1성", success: 90.0, fail: 10.0, destroy: 0 },
  { level: "2성", success: 85.0, fail: 15.0, destroy: 0 },
  { level: "3성", success: 85.0, fail: 15.0, destroy: 0 },
  { level: "4성", success: 80.0, fail: 20.0, destroy: 0 },
  { level: "5성", success: 75.0, fail: 25.0, destroy: 0 },
  { level: "6성", success: 70.0, fail: 30.0, destroy: 0 },
  { level: "7성", success: 65.0, fail: 35.0, destroy: 0 },
  { level: "8성", success: 60.0, fail: 40.0, destroy: 0 },
  { level: "9성", success: 55.0, fail: 45.0, destroy: 0 },
  { level: "10성", success: 50.0, fail: 50.0, destroy: 0 },
  { level: "11성", success: 45.0, fail: 55.0, destroy: 0 },
  { level: "12성", success: 40.0, fail: 60.0, destroy: 0 },
  { level: "13성", success: 35.0, fail: 65.0, destroy: 0 },
  { level: "14성", success: 30.0, fail: 70.0, destroy: 0 },
  { level: "15성", success: 30.0, fail: 67.9, destroy: 2.1 },
  { level: "16성", success: 30.0, fail: 67.9, destroy: 2.1 },
  { level: "17성", success: 15.0, fail: 78.2, destroy: 6.8 },
  { level: "18성", success: 15.0, fail: 78.2, destroy: 6.8 },
  { level: "19성", success: 15.0, fail: 76.5, destroy: 8.5 },
  { level: "20성", success: 30.0, fail: 59.5, destroy: 10.5 },
  { level: "21성", success: 15.0, fail: 72.25, destroy: 12.75 },
  { level: "22성", success: 15.0, fail: 68.0, destroy: 17.0 },
  { level: "23성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { level: "24성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { level: "25성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { level: "26성", success: 7.0, fail: 74.4, destroy: 18.6 },
  { level: "27성", success: 5.0, fail: 76.0, destroy: 19.0 },
  { level: "28성", success: 3.0, fail: 77.6, destroy: 19.4 },
  { level: "29성", success: 1.0, fail: 79.2, destroy: 19.8 },
  { level: "30성 달성!", success: 0, fail: 0, destroy: 0 },
 ]

export const MAX_STAR_FORCE = starData.length - 1;
