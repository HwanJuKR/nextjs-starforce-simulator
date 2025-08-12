interface IEnhanceCost {
  (equipLevel: number, starLevel: number): number;
}

/**
 * 스타포스 강화 비용 계산
 *
 * 강화 비용 공식
 * - 0~9성: (1000 + L^3 × (S+1)) / 분모
 * - 10~30성: (1000 + L^3 × (S+1)^2.7) / 분모
 *
 * L: 장비의 착용 가능 레벨
 * S: 현재 스타포스 강화 레벨
 * 결과는 십의 자리에서 반올림
 */
export default function useCost() {
  // 스타포스 레벨별 분모
  const denominatorMap: Record<number, number> = {
    0: 36,
    1: 36,
    2: 36,
    3: 36,
    4: 36,
    5: 36,
    6: 36,
    7: 36,
    8: 36,
    9: 36,
    10: 571,
    11: 314,
    12: 214,
    13: 157,
    14: 107,
    15: 200,
    16: 200,
    17: 150,
    18: 70,
    19: 45,
    20: 200,
    21: 125,
    22: 200,
    23: 200,
    24: 200,
    25: 200,
    26: 200,
    27: 200,
    28: 200,
    29: 200,
    30: 200,
  };

  const enhanceCost: IEnhanceCost = (equipLevel, starLevel) => {
    const denominator = denominatorMap[starLevel];

    if (!denominator) return 0;

    // 0~9성은 지수 1, 10성 이상은 2.7
    const pow = starLevel <= 9 ? 1 : 2.7;
    const numerator = 1000 + Math.pow(equipLevel, 3) * Math.pow(starLevel + 1, pow);

    return Math.round(numerator / denominator / 10) * 10;
  };

  return enhanceCost;
}
