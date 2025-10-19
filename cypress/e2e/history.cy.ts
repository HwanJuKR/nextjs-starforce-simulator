describe("히스토리 - 조회 기능", () => {
  beforeEach(() => {
    cy.visit("/history");
  });

  it("API 모킹 후 조회 → 성공 확인", () => {
    // API 모킹
    cy.intercept("GET", "/api/history*", {
      statusCode: 200,
      body: {
        count: 3,
        starforce_history: [
          {
            id: "1",
            item_upgrade_result: "성공",
            before_starforce_count: 10,
            after_starforce_count: 11,
            starcatch_result: "성공",
            superior_item_flag: "0",
            destroy_defence: "0",
            chance_time: "0",
            event_field_flag: "0",
            upgrade_item: "0",
            protect_shield: "0",
            bonus_stat_upgrade: "0",
            character_name: "테스트",
            world_name: "리부트",
            target_item: "루즈 컨트롤 머신 마크",
            date_create: "2025-01-01T10:00:00.000+09:00",
            starforce_event_list: [],
          },
          {
            id: "2",
            item_upgrade_result: "실패",
            before_starforce_count: 10,
            after_starforce_count: 10,
            starcatch_result: "실패",
            superior_item_flag: "0",
            destroy_defence: "0",
            chance_time: "0",
            event_field_flag: "0",
            upgrade_item: "0",
            protect_shield: "0",
            bonus_stat_upgrade: "0",
            character_name: "테스트",
            world_name: "리부트",
            target_item: "루즈 컨트롤 머신 마크",
            date_create: "2025-01-01T09:00:00.000+09:00",
            starforce_event_list: [],
          },
          {
            id: "3",
            item_upgrade_result: "파괴",
            before_starforce_count: 18,
            after_starforce_count: 12,
            starcatch_result: "실패",
            superior_item_flag: "0",
            destroy_defence: "0",
            chance_time: "0",
            event_field_flag: "0",
            upgrade_item: "0",
            protect_shield: "0",
            bonus_stat_upgrade: "0",
            character_name: "테스트",
            world_name: "리부트",
            target_item: "루즈 컨트롤 머신 마크",
            date_create: "2025-01-01T08:00:00.000+09:00",
            starforce_event_list: [],
          },
        ],
      },
    }).as("getHistory");

    // API 키 입력
    cy.get('[data-testid="apikey"]').type("test-api-key");

    // 조회하기 버튼 클릭
    cy.get('[data-testid="btn-submit"]').click();

    // API 호출 대기
    cy.wait("@getHistory");

    // 성공 메시지 확인
    cy.contains("조회 완료: 3건의 기록을 찾았습니다.").should("be.visible");

    // 테이블에 데이터가 표시되는지 확인
    cy.contains("스타포스 기록 (3건)").should("be.visible");
    cy.contains("테스트").should("be.visible");
    cy.contains("루즈 컨트롤 머신 마크").should("be.visible");
    cy.contains("리부트").should("be.visible");
  });

  it("API 모킹 → 에러 확인", () => {
    cy.intercept("GET", "/api/history*", {
      statusCode: 400,
      body: {
        error: {
          name: "ValidationError",
          message: "필수 파라미터가 누락되었습니다",
        },
      },
    }).as("getHistoryError");

    // API 키 입력
    cy.get('[data-testid="apikey"]').type("invalid-api-key");

    // 조회하기 버튼 클릭
    cy.get('[data-testid="btn-submit"]').click();

    // API 호출 대기
    cy.wait("@getHistoryError");

    // 에러 메시지 확인
    cy.contains("ValidationError", { timeout: 10000 }).should("be.visible");
    cy.contains("필수 파라미터가 누락되었습니다").should("be.visible");
  });

  it("초기화 버튼 → 입력값 및 테이블 리셋", () => {
    // API 모킹
    cy.intercept("GET", "/api/history*", {
      statusCode: 200,
      body: {
        count: 1,
        starforce_history: [
          {
            id: "1",
            item_upgrade_result: "성공",
            before_starforce_count: 10,
            after_starforce_count: 11,
            starcatch_result: "성공",
            superior_item_flag: "0",
            destroy_defence: "0",
            chance_time: "0",
            event_field_flag: "0",
            upgrade_item: "0",
            protect_shield: "0",
            bonus_stat_upgrade: "0",
            character_name: "테스트",
            world_name: "리부트",
            target_item: "루즈 컨트롤 머신 마크",
            date_create: "2025-01-01T10:00:00.000+09:00",
            starforce_event_list: [],
          },
        ],
      },
    }).as("getHistory");

    // API 키 입력
    cy.get('[data-testid="apikey"]').type("test-api-key");

    // 조회 갯수 입력
    cy.get('[data-testid="count"]').clear().type("50");

    // 조회하기 버튼 클릭
    cy.get('[data-testid="btn-submit"]').click();

    // API 호출 대기
    cy.wait("@getHistory");

    // 성공 메시지 확인
    cy.contains("조회 완료: 1건의 기록을 찾았습니다.").should("be.visible");

    // 초기화 버튼 클릭
    cy.get('[data-testid="btn-reset"]').click();

    // 입력값이 초기화되었는지 확인
    cy.get('[data-testid="apikey"]').should("have.value", "");
    cy.get('[data-testid="count"]').should("have.value", "100");

    // 성공 메시지가 사라졌는지 확인
    cy.contains("조회 완료").should("not.exist");

    // 테이블 데이터도 사라졌는지 확인
    cy.contains("루즈 컨트롤 머신 마크").should("not.exist");
  });
});
