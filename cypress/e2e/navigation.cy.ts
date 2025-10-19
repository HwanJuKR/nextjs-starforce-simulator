describe("네비게이션 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("시뮬레이터 ↔ 히스토리 탭 전환", () => {
    // 초기 페이지는 시뮬레이터
    cy.url().should("eq", "http://localhost:3000/");
    cy.get('[data-testid="btn-simulator"]').should(
      "have.class",
      "border-yellow-400"
    );

    // 히스토리 탭 클릭
    cy.get('[data-testid="btn-history"]').click();
    cy.url().should("include", "/history");
    cy.get('[data-testid="btn-history"]').should(
      "have.class",
      "border-yellow-400"
    );

    // 시뮬레이터 페이지로 다시 이동
    cy.get('[data-testid="btn-simulator"]').click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get('[data-testid="btn-simulator"]').should(
      "have.class",
      "border-yellow-400"
    );
  });

  it("URL 변경 및 페이지 새로고침 후 탭 유지", () => {
    // 히스토리 페이지로 이동
    cy.get('[data-testid="btn-history"]').click();
    cy.url().should("include", "/history");

    // 페이지 새로고침
    cy.reload();

    // 히스토리 페이지가 유지되어야 함
    cy.url().should("include", "/history");
    cy.get('[data-testid="btn-history"]').should(
      "have.class",
      "border-yellow-400"
    );
    cy.get('[data-testid="btn-history"]').should("be.visible");
  });
});
