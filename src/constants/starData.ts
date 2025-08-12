interface IStarData {
  starLevel: string;
  success: number;
  fail: number;
  destroy: number;
}

export const starData: IStarData[] = [
  { starLevel: "0성", success: 95.0, fail: 5.0, destroy: 0 },
  { starLevel: "1성", success: 90.0, fail: 10.0, destroy: 0 },
  { starLevel: "2성", success: 85.0, fail: 15.0, destroy: 0 },
  { starLevel: "3성", success: 85.0, fail: 15.0, destroy: 0 },
  { starLevel: "4성", success: 80.0, fail: 20.0, destroy: 0 },
  { starLevel: "5성", success: 75.0, fail: 25.0, destroy: 0 },
  { starLevel: "6성", success: 70.0, fail: 30.0, destroy: 0 },
  { starLevel: "7성", success: 65.0, fail: 35.0, destroy: 0 },
  { starLevel: "8성", success: 60.0, fail: 40.0, destroy: 0 },
  { starLevel: "9성", success: 55.0, fail: 45.0, destroy: 0 },
  { starLevel: "10성", success: 50.0, fail: 50.0, destroy: 0 },
  { starLevel: "11성", success: 45.0, fail: 55.0, destroy: 0 },
  { starLevel: "12성", success: 40.0, fail: 60.0, destroy: 0 },
  { starLevel: "13성", success: 35.0, fail: 65.0, destroy: 0 },
  { starLevel: "14성", success: 30.0, fail: 70.0, destroy: 0 },
  { starLevel: "15성", success: 30.0, fail: 67.9, destroy: 2.1 },
  { starLevel: "16성", success: 30.0, fail: 67.9, destroy: 2.1 },
  { starLevel: "17성", success: 15.0, fail: 78.2, destroy: 6.8 },
  { starLevel: "18성", success: 15.0, fail: 78.2, destroy: 6.8 },
  { starLevel: "19성", success: 15.0, fail: 76.5, destroy: 8.5 },
  { starLevel: "20성", success: 30.0, fail: 59.5, destroy: 10.5 },
  { starLevel: "21성", success: 15.0, fail: 72.25, destroy: 12.75 },
  { starLevel: "22성", success: 15.0, fail: 68.0, destroy: 17.0 },
  { starLevel: "23성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: "24성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: "25성", success: 10.0, fail: 72.0, destroy: 18.0 },
  { starLevel: "26성", success: 7.0, fail: 74.4, destroy: 18.6 },
  { starLevel: "27성", success: 5.0, fail: 76.0, destroy: 19.0 },
  { starLevel: "28성", success: 3.0, fail: 77.6, destroy: 19.4 },
  { starLevel: "29성", success: 1.0, fail: 79.2, destroy: 19.8 },
  { starLevel: "30성 달성!", success: 0, fail: 0, destroy: 0 },
];

export const MAX_STAR_FORCE = starData.length - 1;
