describe('Laboratory Section', () => {
  context('Interceptor Page', () => {
    beforeEach(() => {
      cy.visit('/lab/interceptor');
    });

    it('should show a success message on a successful request', () => {
      cy.intercept('GET', '**/posts/1', { statusCode: 200, body: { id: 1, title: 'Success!' } }).as(
        'successReq'
      );
      cy.contains('button', 'Отправить успешный запрос').click();
      cy.wait('@successReq');
      cy.get('.text-green-200').should('contain.text', 'Запрос успешно выполнен!');
    });

    it('should show a 404 error message', () => {
      cy.intercept('GET', '**/posts/99999999', { statusCode: 404 }).as('notFoundReq');
      cy.contains('button', 'Вызвать ошибку (404 Not Found)').click();
      cy.wait('@notFoundReq');
      cy.get('div[role="alert"]').should('contain.text', 'Запрошенный ресурс не найден');
    });

    it('should show a 500 error message', () => {
      cy.intercept('GET', '**/api/test-500', { statusCode: 500 }).as('serverErrorReq');
      cy.contains('button', 'Вызвать ошибку (500 Server Error)').click();
      cy.wait('@serverErrorReq');
      cy.get('div[role="alert"]').should('contain.text', 'Произошла внутренняя ошибка сервера');
    });
  });

  context('Directives Page', () => {
    beforeEach(() => {
      cy.visit('/lab/directives');
    });

    it('should toggle the *appUnless structural directive content', () => {
      cy.get('div.bg-teal-900\\/50')
        .should('be.visible')
        .and('contain.text', '*appUnless сработала!');
      cy.get('input#toggle-directive').parent().click();
      cy.get('div.bg-teal-900\\/50').should('not.exist');
      cy.get('div.bg-gray-700\\/50').should('be.visible');
    });

    it('should highlight the element on mouseover for the [appHighlight] attribute directive', () => {
      const highlightDiv = cy.get('div[apphighlight]');
      highlightDiv.should('not.have.css', 'background-color', 'rgba(22, 163, 74, 0.3)');
      highlightDiv.trigger('mouseenter');
      highlightDiv.should('have.css', 'background-color', 'rgba(22, 163, 74, 0.3)');
    });
    it('should remove highlight on mouseleave for [appHighlight]', () => {
      const highlightDiv = cy.get('div[apphighlight]');

      highlightDiv.trigger('mouseenter');
      highlightDiv.should('have.css', 'background-color', 'rgba(22, 163, 74, 0.3)');

      highlightDiv.trigger('mouseleave');
      highlightDiv.should('not.have.css', 'background-color', 'rgba(22, 163, 74, 0.3)');
    });
  });

  context('Pipes Pages', () => {
    it('should demonstrate pure pipe behavior correctly', () => {
      cy.visit('/lab/pipes');
      cy.contains('button', 'Мутировать массив').click();
      cy.get('div.bg-gray-900\\/50 ul').first().children('li').should('have.length', 2);
      cy.contains('button', 'Заменить массив').click();
      cy.get('div.bg-gray-900\\/50 ul').first().should('contain.text', 'Элемент C');
    });

    it('should demonstrate impure pipe behavior correctly', () => {
      cy.visit('/lab/pipes');
      cy.get('[data-cy=impure-pipe-list]').children('li').should('have.length', 2);

      cy.get('[data-cy=impure-mutate-button]').click();

      cy.get('[data-cy=impure-pipe-list]').children('li').should('have.length', 3);
    });

    it('should filter users with the advanced pure pipe', () => {
      cy.visit('/lab/pipes-advanced');
      cy.get('ul li').should('have.length', 1).and('contain.text', 'Виктория');

      cy.contains('button', "Мутировать статус 'Бориса'").click();
      cy.get('ul li').should('have.length', 1);

      cy.contains('button', 'Добавить пользователя').click();
      cy.get('ul li')
        .should('have.length', 3)
        .and('contain.text', 'Виктория')
        .and('contain.text', 'Борис')
        .and('contain.text', 'Пользователь 4');
    });
  });

  context('UI Elements Page', () => {
    beforeEach(() => {
      cy.visit('/lab/ui-elements');
    });

    it('should toggle the animated switch', () => {
      const toggle = cy.get('app-toggle-switch');
      toggle.should('contain.text', 'Выключено');
      toggle.click();
      toggle.should('contain.text', 'Включено');
    });

    it('should check the custom checkbox', () => {
      const checkbox = cy.get('app-custom-checkbox');
      checkbox.should('contain.text', 'Не выбран');
      checkbox.click();
      checkbox.should('contain.text', 'Выбран');
    });

    it('should display a tooltip on hover', () => {
      cy.get('.tooltip-host').scrollIntoView().trigger('mouseenter');

      cy.get('body')
        .find('div[role="tooltip"]')
        .should('have.class', 'tooltip-visible')
        .and('contain.text', 'Это динамическая и доступная подсказка!');

      cy.get('.tooltip-host').trigger('mouseleave');
      cy.get('body').find('div[role="tooltip"]').should('not.exist');
    });
    it('should apply and reset transform on 3D card', () => {
      cy.get('div[appcard3d]').as('card');

      cy.get('@card').trigger('mousemove', { clientX: 100, clientY: 50 });
      cy.get('@card').should('have.css', 'transform').and('not.eq', 'none');

      cy.get('@card').trigger('mouseleave');
      cy.get('@card').should('have.css', 'transform').and('include', 'matrix(1, 0, 0, 1, 0, 0)');
    });
  });

  context('Backend Test Page', () => {
    it('should load and display either a message or an error from the backend', () => {
      cy.visit('/lab/backend-test');
      cy.get('.loader', { timeout: 15000 }).should('not.exist');
      cy.get('body').then(($body) => {
        if ($body.find('.font-mono').length > 0) {
          cy.get('.font-mono').should('be.visible').and('not.be.empty');
        } else {
          cy.get('div[role="alert"]').should('be.visible').and('contain.text', 'Ошибка');
        }
      });
    });
  });
});
