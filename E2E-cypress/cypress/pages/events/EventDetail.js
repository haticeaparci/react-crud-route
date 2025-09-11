class EventDetail {
  editEvent() {
    return cy.get('[data-testid="edit-event-btn"]').click();
  }
  deleteEvent() {
    return cy.get('[data-testid="delete-event-btn"]').click();
  }
}
export default new EventDetail();
