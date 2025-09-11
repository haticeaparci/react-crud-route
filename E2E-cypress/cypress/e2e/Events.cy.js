import Login from "../pages/Login";
import Events from "../pages/events/Events";
import EventForm from "../pages/events/EventForm";
import EventDetail from "../pages/events/EventDetail";

// npx cypress open
// All cy.wait() commands are left entirely for video recording purposes.
describe("Event Management", () => {
  const event = {
    title: `Cypress Test Event - ${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    image:
      "https://www.ondemandcmo.com/app/uploads/2016/03/canstockphoto22402523-arcos-creator.com_.jpg",
    description: "This is an event created by a Cypress test.",
  };
  before(() => {
    cy.createTestUser();
    Login.login("user@user.com", "password123456");
  });

  beforeEach(() => {
    cy.session("user-session", () => {
      cy.createTestUser();
      Login.login("user@user.com", "password123456");
    });
  });

  it("  1️⃣ Visit /events and verify All Events", () => {
    Events.visit();
    cy.wait(1000);
    cy.url().should("include", "/events");
    cy.wait(1000);
    cy.contains("All Events").should("be.visible");
  });

  it("  2️⃣ Create a new event and verify it appears in the list", () => {
    Events.visit();
    cy.wait(1000);
    Events.getNewEventButton().click();
    cy.url().should("include", "/events/new");
    EventForm.fillForm(event);
    cy.wait(1000);
    EventForm.submit();
    cy.url().should("include", "/events");
    cy.wait(1000);
    cy.contains(event.title).should("be.visible");
    cy.contains(event.title, { timeout: 10000 }).should("exist");
  });

  it("  3️⃣ Edit an existing event and verify changes on the all events list", () => {
    Events.visit();

    cy.get("ul.event-list li").first().find("a").click();
    cy.wait(2000);

    cy.url().should("include", "/events/");
    cy.wait(2000);

    cy.get('[data-testid="edit-event-btn"]').click();
    cy.wait(1000);
    cy.url().should("include", "/edit");
    cy.wait(1000);

    cy.get('input[name="title"]').then(($input) => {
      const currentTitle = $input.val();
      const updatedTitle = currentTitle + "(✅Edited)";

      cy.get('input[name="title"]').clear().type(updatedTitle);

      cy.get('textarea[name="description"]').type(" (Edited description)");
      cy.wait(500);

      cy.get('input[name="date"]')
        .invoke("val")
        .then((dateVal) => {
          cy.get('input[name="date"]').clear().type(dateVal);
        });
      cy.wait(500);

      cy.get('input[name="image"]').then(($img) => {
        const val = $img.val();
        cy.get('input[name="image"]').clear().type(val);
      });
      cy.wait(500);

      cy.get('button[type="submit"]').click();
      cy.wait(1000);

      cy.contains(updatedTitle).should("be.visible");
    });
  });

  it("  4️⃣ Delete an existing event and verify removal", () => {
    Events.visit();

    cy.get("ul.event-list li").first().find("a").click();

    cy.get('[data-testid="delete-event-btn"]').click();
    cy.wait(2000);

    cy.on("window:confirm", () => true);
    cy.wait(1000);

    cy.url().should("include", "/events");
    cy.wait(1000);
    cy.get("ul.event-list li").first().should("not.contain.text", "(✅Edited)");
  });
});
