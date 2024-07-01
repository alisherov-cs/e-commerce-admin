declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}
