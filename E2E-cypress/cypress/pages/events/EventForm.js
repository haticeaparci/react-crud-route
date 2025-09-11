class EventForm {
  getTitleInput() {
    return cy.get('input[name="title"]');
  }

  getDateInput() {
    return cy.get('input[name="date"]');
  }

  getImageInput() {
    return cy.get('input[name="image"]');
  }

  getDescriptionInput() {
    return cy.get('textarea[name="description"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  fillForm(event) {
    if (event.title) this.getTitleInput().type(event.title);
    if (event.date) this.getDateInput().type(event.date);
    if (event.image) this.getImageInput().type(event.image);
    if (event.description) this.getDescriptionInput().type(event.description);
  }

  fillInvalidForm(event) {
    if (event.title !== undefined) this.getTitleInput().clear();
    if (event.date !== undefined) this.getDateInput().clear().type(event.date);
    if (event.image !== undefined)
      this.getImageInput().clear().type(event.image);
    if (event.description !== undefined)
      this.getDescriptionInput().clear().type(event.description);
  }

  submit() {
    this.getSubmitButton().click();
  }
}

export default new EventForm();
