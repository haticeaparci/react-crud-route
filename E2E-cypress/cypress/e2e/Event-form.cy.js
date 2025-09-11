import eventForm from "../pages/events/EventForm";
import { faker } from "@faker-js/faker";

describe("Event Form Tests", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          "token",
          JSON.stringify({ email: "user@user.com" })
        );
      });
    }).then(() => {
      cy.visit(Cypress.env("url") + "/");
      cy.contains("🌟 Welcome! Let’s dive into React magic!", {
        timeout: 10000,
      }).should("be.visible");
      cy.visit(Cypress.env("url") + "/events/new");
    });
  });

  it("  1️⃣ Create an event successfully", () => {
    const event = {
      title: faker.company.name(),
      date: faker.date.future().toISOString().split("T")[0],
      image: faker.image.url(),
      description: faker.lorem.sentence(),
    };

    eventForm.fillForm(event);
    eventForm.submit();

    cy.contains(event.title).should("be.visible");
  });
  it("  2️⃣ Show validation error when title is empty", () => {
    const invalidEvent = {
      title: "",
      date: faker.date.future().toISOString().split("T")[0],
      image: faker.image.url(),
      description: faker.lorem.sentence(),
    };

    eventForm.fillInvalidForm(invalidEvent);

    eventForm.submit();

    eventForm.getTitleInput().then(($input) => {
      expect($input[0].checkValidity()).to.eq(false);
      cy.log($input[0].validationMessage);
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });
});
