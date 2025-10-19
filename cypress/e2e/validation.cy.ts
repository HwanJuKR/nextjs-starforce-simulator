describe('입력 유효성 검증', () => {
  it('장비 레벨 범위 (1~300)', () => {
    cy.visit('/');

    // 장비 레벨 입력
    cy.get('[data-testid="equip-level"]').as('equipLevel');

    // 초기값 확인
    cy.get('@equipLevel').should('have.value', '150');

    // 장비 레벨 범위 확인
    cy.get('@equipLevel').should('have.attr', 'min', '1');
    cy.get('@equipLevel').should('have.attr', 'max', '300');
    cy.get('@equipLevel').should('have.attr', 'type', 'number');

    // 유효한 값 입력 테스트
    cy.get('@equipLevel').invoke('val', '200').trigger('input');
    cy.get('@equipLevel').should('have.value', '200');

    // 최소값 테스트
    cy.get('@equipLevel').invoke('val', '1').trigger('input');
    cy.get('@equipLevel').should('have.value', '1');

    // 최대값 테스트
    cy.get('@equipLevel').invoke('val', '300').trigger('input');
    cy.get('@equipLevel').should('have.value', '300');

    // 0 입력 테스트
    cy.get('@equipLevel').invoke('val', '0').trigger('input');
    cy.get('@equipLevel').invoke('prop', 'validity').its('valid').should('be.false');

    // 301 입력 테스트
    cy.get('@equipLevel').invoke('val', '301').trigger('input');
    cy.get('@equipLevel').invoke('prop', 'validity').its('valid').should('be.false');
  });

  it('조회 갯수 범위 (10~1000)', () => {
    cy.visit('/history');

    // 조회 개수 입력
    cy.get('[data-testid="count"]').as('count');

    // 초기값 확인
    cy.get('@count').should('have.value', '100');

    // 유효한 값 입력 테스트
    cy.get('@count').clear().type('500');
    cy.get('@count').should('have.value', '500');

    // 최소값 테스트
    cy.get('@count').clear().type('10');
    cy.get('@count').should('have.value', '10');

    // 최대값 테스트
    cy.get('@count').clear().type('1000');
    cy.get('@count').should('have.value', '1000');

    // 조회 개수 범위 확인
    cy.get('@count').should('have.attr', 'min', '10');
    cy.get('@count').should('have.attr', 'max', '1000');

    // 9 입력 테스트
    cy.get('@count').clear().type('9');
    cy.get('@count').invoke('prop', 'validity').its('valid').should('be.false');

    // 1001 입력 테스트
    cy.get('@count').clear().type('1001');
    cy.get('@count').invoke('prop', 'validity').its('valid').should('be.false');

    // 안내 텍스트 확인
    cy.contains('최소 10, 최대 1000').should('be.visible');
  });
});
