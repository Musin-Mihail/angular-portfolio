describe('Main Navigation', () => {
  it('should successfully load the main page and check the header', () => {
    cy.visit('/');
    cy.get('h1').should('contain.text', 'Привет, я Мусин Михаил!');
  });

  it('should navigate to the "Projects" page and check the header', () => {
    cy.visit('/');
    cy.get('nav .hidden.md\\:flex').contains('a', 'Проекты').click();
    cy.location('pathname').should('eq', '/projects');
    cy.get('h1').should('contain.text', 'Мои проекты');
  });

  it('should navigate to the "Laboratory" and check the section header', () => {
    cy.visit('/');
    cy.get('nav .hidden.md\\:flex').contains('a', 'Лаборатория').click();
    cy.location('pathname').should('include', '/lab');
    cy.get('h1').should('contain.text', 'Лаборатория Angular');
  });

  it('should open and close the mobile menu', () => {
    cy.viewport('iphone-6');
    cy.visit('/');

    cy.get('button[aria-label="Открыть меню"]').click();
    cy.get('#mobile-menu').should('be.visible');

    cy.get('button[aria-label="Закрыть меню"]').click();
    cy.get('#mobile-menu').should('not.exist');
  });

  it('should navigate via the mobile menu and close it afterward', () => {
    cy.viewport('iphone-6');
    cy.visit('/');

    cy.get('button[aria-label="Открыть меню"]').click();
    cy.get('#mobile-menu').should('be.visible');

    cy.get('#mobile-menu').contains('a', 'Проекты').click();

    cy.location('pathname').should('eq', '/projects');

    cy.get('#mobile-menu').should('not.exist');
  });
});
