describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should toggle password field visibility', () => {
    cy.getByTestId('password-input-field')
      .should('be.visible')
      .type('password')
      .should('have.attr', 'type', 'password');
    cy.getByTestId('toggle-visibility').should('be.visible').click();
    cy.getByTestId('password-input-field')
      .should('be.visible')
      .should('have.attr', 'type', 'text');
    cy.getByTestId('toggle-visibility').should('be.visible').click();
    cy.getByTestId('password-input-field')
      .should('be.visible')
      .should('have.attr', 'type', 'password');
  });

  it('should not login (wrong email or password)', () => {
    cy.getByTestId('email-input').should('be.visible').type('user@gmail.com');
    cy.getByTestId('password-input').should('be.visible').type('password');
    cy.getByTestId('submit-button').should('be.visible').click();
    cy.get('.mdc-snackbar__surface').should('be.visible');
    cy.getByTestId('api-error-message')
      .should('be.visible')
      .and('have.text', 'Wrong email or password!');
    cy.getByTestId('email-input-error')
      .should('be.visible')
      .and('have.text', 'Try again');
    cy.getByTestId('password-input-error')
      .should('be.visible')
      .and('have.text', 'Try again');
    cy.getByTestId('submit-button').should('be.disabled');
  });

  it('should login', () => {
    cy.getByTestId('email-input').should('be.visible').type('admin@gmail.com');
    cy.getByTestId('password-input').should('be.visible').type('Alisherov_044');
    cy.getByTestId('submit-button').should('be.visible').click();
    cy.get('.mdc-snackbar__surface').should('be.visible');
    cy.url().should('include', '/');
  });

  it('should logout', () => {
    cy.visit('/auth/logout');
    cy.url().should('include', 'auth/login');
    cy.get('.mdc-snackbar__surface').should('be.visible');
  });
});
