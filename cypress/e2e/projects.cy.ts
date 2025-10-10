describe('Projects Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/Projects', { fixture: 'projects.json' }).as('getProjects');
    cy.visit('/projects');
    cy.wait('@getProjects', { timeout: 10000 });
  });

  it('should display all projects on initial load', () => {
    cy.get('div.grid > a').should('have.length', 3);
  });

  it('should filter projects by name', () => {
    cy.get('input[placeholder*="Поиск"]').type('Angular');
    cy.get('div.grid > a').should('have.length', 2);
    cy.get('div.grid > a').first().should('contain.text', 'Angular App');
  });

  it('should filter projects by tag', () => {
    cy.get('input[placeholder*="Поиск"]').type('C#');
    cy.get('div.grid > a').should('have.length', 1);
    cy.get('div.grid > a').first().should('contain.text', '.NET Web API');
  });

  it('should display a message if projects are not found', () => {
    cy.get('input[placeholder*="Поиск"]').type('nonexistentquery');
    cy.get('div.grid > a').should('not.exist');
    cy.get('div.text-center').should('contain.text', 'Проекты не найдены.');
  });

  it('should show all projects again after clearing the filter', () => {
    cy.get('input[placeholder*="Поиск"]').type('Angular');
    cy.get('div.grid > a').should('have.length', 2);
    cy.get('input[placeholder*="Поиск"]').clear();
    cy.get('div.grid > a').should('have.length', 3);
  });

  it('should display an error message if the API fails', () => {
  cy.intercept('GET', '**/api/Projects', {
    statusCode: 500,
    body: 'Internal Server Error',
  }).as('getProjectsError');

  cy.visit('/projects');
  cy.wait('@getProjectsError');

  cy.get('.loader').should('not.exist');
  cy.get('div[role="alert"]')
    .should('be.visible')
    .and('contain.text', 'Не удалось загрузить проекты');
});
});
