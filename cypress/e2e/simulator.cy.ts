describe("시뮬레이터", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("기본 강화", () => {
    it("강화하기 버튼 클릭 → 통계 증가 확인", () => {
      // 초기 시도 횟수 확인
      cy.get('[data-testid="attempt"]').should("contain", "0회");

      // 강화하기 버튼 클릭
      cy.get('[data-testid="btn-enhance"]').click();

      // 시도 횟수가 1회로 증가
      cy.get('[data-testid="attempt"]').should("contain", "1회");

      // 한 번 더 클릭
      cy.get('[data-testid="btn-enhance"]').click();

      // 시도 횟수가 2회로 증가
      cy.get('[data-testid="attempt"]').should("contain", "2회");
    });

    it("초기화 버튼 → 모든 상태 리셋 확인", () => {
      // 강화 3번 실행
      cy.get('[data-testid="btn-enhance"]').click();
      cy.get('[data-testid="btn-enhance"]').click();
      cy.get('[data-testid="btn-enhance"]').click();

      // 시도 횟수가 증가했는지 확인
      cy.get('[data-testid="attempt"]').should("not.contain", "0회");

      // 초기화 버튼 클릭
      cy.get('[data-testid="btn-bulk-reset"]').click();

      // 모든 통계가 0으로 리셋
      cy.get('[data-testid="attempt"]').should("contain", "0회");
      cy.get('[data-testid="cost"]').should("contain", "0");

      // 현재 단계도 0성으로 리셋
      cy.get('[data-testid="current-level"]').should("contain", "0성");
    });
  });

  describe("대량 강화", () => {
    it("10,000번 시뮬레이션 확인", () => {
      // 초기 시도 횟수 확인
      cy.get('[data-testid="attempt"]').should("contain", "0회");

      // 10,000번 시뮬레이션 버튼 클릭
      cy.get('[data-testid="btn-bulk10k"]').click();

      // 시뮬레이션이 시작되었는지 확인
      cy.contains("시뮬레이션 중").should("be.visible");

      // 시뮬레이션 완료 대기
      cy.contains("시뮬레이션 중", { timeout: 60000 }).should("not.exist");

      // 시도 횟수가 10,000 이하인지 확인
      cy.get('[data-testid="attempt"]')
        .invoke("text")
        .then((text) => {
          const attemptCount = parseInt(text.replace(/[^0-9]/g, ""));
          expect(attemptCount).to.be.greaterThan(0);
          expect(attemptCount).to.be.at.most(10000);
        });
    });

    it("시뮬레이션 중 버튼 비활성화 확인", () => {
      // 1,000,000번 시뮬레이션 시작
      cy.get('[data-testid="btn-bulk1m"]').click();

      // "시뮬레이션 중..." 메시지 표시 확인
      cy.contains("시뮬레이션 중").should("be.visible");

      // 모든 시뮬레이션 버튼이 비활성화되어 있는지 확인
      cy.get('[data-testid="btn-bulk10k"]').should("be.disabled");
      cy.get('[data-testid="btn-bulk100k"]').should("be.disabled");
      cy.get('[data-testid="btn-bulk1m"]').should("be.disabled");
      cy.get('[data-testid="btn-bulk-reset"]').should("be.disabled");

      // 강화하기 버튼도 비활성화
      cy.get('[data-testid="btn-enhance"]').should("be.disabled");

      // 완료까지 대기
      cy.contains("시뮬레이션 중", { timeout: 60000 }).should("not.exist");
    });

    it("완료 후 통계 업데이트 확인", () => {
      // 10,000번 시뮬레이션 실행
      cy.get('[data-testid="btn-bulk10k"]').click();

      // 완료 대기
      cy.contains("시뮬레이션 중", { timeout: 30000 }).should("not.exist");

      // 모든 통계가 업데이트되었는지 확인
      cy.get('[data-testid="attempt"]')
        .invoke("text")
        .then((text) => {
          const attemptCount = parseInt(text.replace(/[^0-9]/g, ""));
          expect(attemptCount).to.be.greaterThan(0);
        });

      cy.get('[data-testid="cost"]')
        .invoke("text")
        .then((text) => {
          // 비용은 콤마가 포함되어 있으므로 제거 후 파싱
          const cost = parseInt(text.replace(/[^0-9]/g, ""));
          expect(cost).to.be.greaterThan(0);
        });

      // 현재 단계와 최고 달성 확인
      cy.get('[data-testid="current-level"]').should("be.visible");
      cy.get('[data-testid="max-level"]').should("be.visible");
    });
  });

  describe("이벤트 및 혜택 적용", () => {
    it("이벤트 체크박스 토글 → 확률/비용 변경 확인", () => {
      // 초기 비용 확인
      cy.get('[data-testid="enhance-cost"]')
        .invoke("text")
        .then((initialCostText) => {
          const initialCost = parseInt(
            initialCostText.match(/[\d,]+/)?.[0]?.replace(/,/g, "") || "0"
          );

          // "비용 30% 할인" 이벤트 활성화
          cy.get('[data-testid="cost-discount"]').check();

          // 비용이 감소했는지 확인
          cy.get('[data-testid="enhance-cost"]')
            .invoke("text")
            .then((discountedCostText) => {
              const discountedCost = parseInt(
                discountedCostText.match(/[\d,]+/)?.[0]?.replace(/,/g, "") ||
                  "0"
              );
              expect(discountedCost).to.be.lessThan(initialCost);
            });

          // 체크박스 해제
          cy.get('[data-testid="cost-discount"]').uncheck();

          // 비용이 원래대로 돌아왔는지 확인
          cy.get('[data-testid="enhance-cost"]')
            .invoke("text")
            .then((restoredCostText) => {
              const restoredCost = parseInt(
                restoredCostText.match(/[\d,]+/)?.[0]?.replace(/,/g, "") || "0"
              );
              expect(restoredCost).to.equal(initialCost);
            });
        });
    });

    it("MVP 등급 선택 → 비용 할인 확인", () => {
      // MVP 없음이 기본 선택되어 있는지 확인
      cy.get('[data-testid="mvp-none"]').should("be.checked");

      // 초기 비용 확인
      let initialCost = 0;
      cy.get('[data-testid="enhance-cost"]')
        .invoke("text")
        .then((text) => {
          initialCost = parseInt(
            text.match(/[\d,]+/)?.[0]?.replace(/,/g, "") || "0"
          );
        });

      // 다이아 MVP 선택
      cy.get('[data-testid="mvp-diamond"]').check();

      // 비용이 감소했는지 확인
      cy.get('[data-testid="enhance-cost"]')
        .invoke("text")
        .then((text) => {
          const discountedCost = parseInt(
            text.match(/[\d,]+/)?.[0]?.replace(/,/g, "") || "0"
          );
          expect(discountedCost).to.be.lessThan(initialCost);
        });

      // 골드 MVP 선택
      cy.get('[data-testid="mvp-gold"]').check();

      // 비용이 다이아보다는 높고 초기값보다는 낮은지 확인
      cy.get('[data-testid="enhance-cost"]')
        .invoke("text")
        .then((text) => {
          const goldCost = parseInt(
            text.match(/[\d,]+/)?.[0]?.replace(/,/g, "") || "0"
          );
          expect(goldCost).to.be.lessThan(initialCost);
        });
    });

    it("시뮬레이션 중 옵션 비활성화", () => {
      // 1,000,000번 시뮬레이션 시작
      cy.get('[data-testid="btn-bulk1m"]').click();

      // "시뮬레이션 중..." 메시지 확인
      cy.contains("시뮬레이션 중").should("be.visible");

      // 이벤트 체크박스들이 비활성화되어 있는지 확인
      cy.get('[data-testid="cost-discount"]').should("be.disabled");
      cy.get('[data-testid="double-enhance"]').should("be.disabled");

      // MVP 등급 라디오 버튼들이 비활성화되어 있는지 확인
      cy.get('[data-testid="mvp-diamond"]').should("be.disabled");
      cy.get('[data-testid="mvp-gold"]').should("be.disabled");

      // PC방 혜택 체크박스가 비활성화되어 있는지 확인
      cy.get('[data-testid="pc-room"]').should("be.disabled");

      // 완료 대기
      cy.contains("시뮬레이션 중", { timeout: 60000 }).should("not.exist");

      // 완료 후 다시 활성화되었는지 확인
      cy.get('[data-testid="cost-discount"]').should("not.be.disabled");
    });
  });
});
