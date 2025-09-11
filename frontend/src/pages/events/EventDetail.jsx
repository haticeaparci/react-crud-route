import { Link, useLoaderData, Form } from "react-router-dom";
import "./event-detail.css";

import { isAuthenticated } from "../../utils/auth";

const EventDetail = () => {
  const event = useLoaderData();

  function handleDelete(e) {
    if (!confirm("Are you sure you want to delete this event?")) {
      e.preventDefault();
    }
  }

  return (
    <div className="event-detail-container">
      <article className="event-detail-card">
        <img src={event.image} alt={event.title} />

        <h1>{event.title}</h1>

        <time>
          <strong>Date: </strong>{" "}
          {new Date(event.date).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <time hidden>
          <strong>Last Updated: </strong>{" "}
          {new Date(event.updatedAt).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <p>
          <strong>Description: </strong> {event.description}
        </p>

        <menu>
          <Link
            to={`/events/${event.id}/edit`}
            id={`tab-edit`}
            data-testid={`edit-event-btn`}
          >
            Edit
          </Link>
          <Form
            method="delete"
            action={`/events/${event.id}`}
            onSubmit={handleDelete}
          >
            <button
              type="submit"
              id={`tab-delete`}
              data-testid={`delete-event-btn`}
              disabled={!isAuthenticated()}
              title={!isAuthenticated() ? "Please Log in to DELETE." : ""}
              style={
                !isAuthenticated()
                  ? { opacity: 0.5, cursor: "not-allowed" }
                  : {}
              }
            >
              Delete
            </button>
          </Form>
        </menu>
      </article>
    </div>
  );
};

export default EventDetail;
