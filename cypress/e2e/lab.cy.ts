describe('Laboratory - HttpInterceptor Demonstration', () => {
  beforeEach(() => {
    cy.visit('/lab/interceptor');
  });

  it('should show a success message on a successful request', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
      statusCode: 200,
      body: { id: 1, title: 'Success!' },
    }).as('successfulRequest');

    cy.contains('button', 'Отправить успешный запрос').click();
    cy.get('.loader').should('be.visible');
    cy.wait('@successfulRequest');
    cy.get('div[role="alert"]').should('not.exist');
    cy.get('.text-green-300').should('contain.text', 'Запрос успешно выполнен!');
  });

  it('should show a 404 error message intercepted by the interceptor', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/99999999', {
      statusCode: 404,
    }).as('notFoundRequest');

    cy.contains('button', 'Вызвать ошибку (404 Not Found)').click();
    cy.wait('@notFoundRequest');
    cy.get('div[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Ошибка перехвачена интерцептором!')
      .and('contain.text', 'Запрошенный ресурс не найден (Ошибка 404).');
  });
});
