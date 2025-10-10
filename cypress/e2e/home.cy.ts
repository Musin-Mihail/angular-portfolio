describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main headline and introduction', () => {
    cy.get('h1').should('contain.text', 'Привет, я Мусин Михаил!');
    cy.get('p.text-xl').should('contain.text', 'FullStack-разработчик (.NET & Angular)');
  });

  it('should display the key skills section with specific skills', () => {
    cy.get('h2').should('contain.text', 'Ключевые навыки:');
    const skills = cy.get('.flex-wrap');
    skills.should('contain.text', 'Angular');
    skills.should('contain.text', '.NET / C#');
    skills.should('contain.text', 'AI-агенты / LLM');
  });

  it('should contain links to projects and the lab within the body text', () => {
    cy.get('p a[routerLink="/projects"]').should('exist');
    cy.get('p a[routerLink="/lab"]').should('exist');
  });
});
