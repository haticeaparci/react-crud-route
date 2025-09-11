class Events {
  visit() {
    const base = Cypress.env("url");
    if (!base) {
      throw new Error("❌ Cypress env 'url' is not defined!");
    }
    cy.visit(`${base}/events`);
  }

  getNewEventButton() {
    return cy.contains("a", "New Event");
  }

  getEventLinkByTitle(title) {
    return cy.contains("li", title).find("a");
  }
}

export default new Events();
