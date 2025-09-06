import type { EquipLevel, IEvent, StarLevel, IBenefit } from "@/types";
import {
  MVP_DISCOUNT_RATE,
  PC_ROOM_DISCOUNT_RATE,
  EVENT_DISCOUNT_RATE,
  PREVENT_DESTROY_MIN_LEVEL,
  PREVENT_DESTROY_MAX_LEVEL,
} from "@/constants/starData";

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
 *
 * 파괴 방지 옵션 (15성 ~ 17성)
 * - 파괴 방지 체크 시 200% 비용
 * - 파괴 확률 0%, 성공 확률은 동일
 * 
 * 혜택 적용 순서
 * 1. 기본 비용 계산
 * 2. PC방 + MVP 혜택 적용
 * 3. 이벤트 할인 적용 (30% 할인)
 * 4. 파괴 방지 비용 = 원래 기본 비용 × 2
 */

// 기본 비용 계산
export const calculateBaseCost = (
  equipLevel: EquipLevel,
  starLevel: StarLevel
): number => {
  const denominatorMap: Record<StarLevel, number> = {
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

  const denominator = denominatorMap[starLevel];

  if (!denominator) return 0;

  // 0~9성은 지수 1, 10성 이상은 2.7
  const pow = starLevel <= 9 ? 1 : 2.7;
  const numerator =
    1000 + Math.pow(equipLevel, 3) * Math.pow(starLevel + 1, pow);

  return Math.round(numerator / denominator / 10) * 10;
};

// PC방 + MVP 혜택 적용
export const applyBenefitDiscount = (
  baseCost: number,
  benefit: IBenefit
): number => {
  let discountRate = 0;

  // PC방 혜택 (5%)
  if (benefit.pcRoom) {
    discountRate += PC_ROOM_DISCOUNT_RATE;
  }

  // MVP 혜택 (등급별)
  discountRate += MVP_DISCOUNT_RATE[benefit.mvpGrade];

  // 할인 적용 (1 - 할인율)
  return Math.round(baseCost * (1 - discountRate));
};

// 이벤트 할인 (30% 할인)
export const applyEventDiscount = (baseCost: number, event: IEvent): number => {
  if (event.costDiscount || event.shiningStarforce) {
    return Math.round(baseCost * EVENT_DISCOUNT_RATE);
  }

  return baseCost;
};

// 파괴 방지 비용 (원래 기본 비용의 200%)
export const applyPreventDestroyCost = (
  baseCost: number,
  starLevel: StarLevel,
  preventDestroy: boolean
): number => {
  if (
    preventDestroy &&
    starLevel >= PREVENT_DESTROY_MIN_LEVEL &&
    starLevel <= PREVENT_DESTROY_MAX_LEVEL
  ) {
    return baseCost * 2;
  }

  return 0;
};

// 최종 비용 계산
export const calculateEnhanceCost = (
  equipLevel: EquipLevel,
  starLevel: StarLevel,
  event: IEvent,
  preventDestroy: boolean,
  benefit: IBenefit = { pcRoom: false, mvpGrade: "none" }
): number => {
  // 1. 기본 비용 계산
  const baseCost = calculateBaseCost(equipLevel, starLevel);

  // 2. PC방 + MVP 혜택 적용
  const benefitDiscountCost = applyBenefitDiscount(baseCost, benefit);

  // 3. 이벤트 할인 적용
  const eventDiscountCost = applyEventDiscount(benefitDiscountCost, event);

  // 4. 파괴 방지 비용
  const preventDestroyCost = applyPreventDestroyCost(
    baseCost,
    starLevel,
    preventDestroy
  );

  return eventDiscountCost + preventDestroyCost;
};
