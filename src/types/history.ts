// 스타포스 이벤트 정보
export interface IHistoryEvent {
  success_rate: string;
  destroy_decrease_rate: string;
  cost_discount_rate: string;
  plus_value: string;
  starforce_event_range: string;
}

// 스타포스 히스토리 항목
export interface IHistoryItem {
  id: string;
  item_upgrade_result: string;
  before_starforce_count: number;
  after_starforce_count: number;
  starcatch_result: string;
  superior_item_flag: string;
  destroy_defence: string;
  chance_time: string;
  event_field_flag: string;
  upgrade_item: string;
  protect_shield: string;
  bonus_stat_upgrade: string;
  character_name: string;
  world_name: string;
  target_item: string;
  date_create: string;
  starforce_event_list: IHistoryEvent[];
}

// API 응답
export interface IHistoryResponse {
  count: number;
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

// 히스토리 상태
export interface IHistoryState {
  isLoading: boolean;
  data: IHistoryResponse | null;
  error: IHistoryApiError | null;
}
