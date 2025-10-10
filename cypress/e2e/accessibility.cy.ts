describe('Accessibility Checks', () => {
  it('Should have no detectable a11y violations on the home page', () => {
    cy.visit('/');
    cy.injectAxe();

    cy.checkA11y(undefined, undefined, (violations) => {
      cy.log('Найденные нарушения доступности:', violations);
    });
  });

  it('Should have no detectable a11y violations on the projects page', () => {
    cy.visit('/projects');

    cy.get('h1').contains('Мои проекты').should('be.visible');

    cy.get('.loader').should('not.exist');

    cy.injectAxe();
    cy.checkA11y();
  });
});
