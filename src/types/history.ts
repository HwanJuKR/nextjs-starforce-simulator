// 진행 중인 스타포스 강화 이벤트 정보
export interface IHistoryEvent {
  success_rate: string; // 이벤트 성공 확률
  destroy_decrease_rate: string; // 이벤트 파괴 확률 감소율
  cost_discount_rate: string; // 이벤트 비용 할인율
  plus_value: string; // 이벤트 강화 수치 가중값
  starforce_event_range: string; // 이벤트 적용 강화 시도 가능한 n성 범위
}

// 스타포스 히스토리
export interface IHistoryItem {
  id: string; // 스타포스 히스토리 식별자
  item_upgrade_result: string; // 강화 시도 결과
  before_starforce_count: number; // 강화 시도 전 스타포스 수치
  after_starforce_count: number; // 강화 시도 후 스타포스 수치
  starcatch_result: string; // 스타 캐치
  superior_item_flag: string; // 슈페리얼 장비
  destroy_defence: string; // 파괴 방지
  chance_time: string; // 찬스 타임
  event_field_flag: string; // 파괴 방지 필드 이벤트
  upgrade_item: string; // 사용 주문서 명
  protect_shield: string; // 프로텍트 실드
  bonus_stat_upgrade: string; // 보너스 스탯 부여 아이템 여부
  character_name: string; // 캐릭터 명
  world_name: string; // 월드 명
  target_item: string; // 대상 장비 아이템 명
  date_create: string; // 강화 일시 (KST)
  starforce_event_list: IHistoryEvent[];
}

// API 응답
export interface IHistoryResponse {
  count: number; // 결과 건 수
  starforce_history: IHistoryItem[];
}

// API 에러
export interface IHistoryApiError {
  error: {
    name: string;
    message: string;
  };
}

// API 파라미터
export interface IHistoryParams {
  apiKey: string;
  count: string;
  date: string;
}
