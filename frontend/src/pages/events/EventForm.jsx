import { Form, useLoaderData } from "react-router-dom";
import "./EventForm.css";

const EventForm = ({ method = "post" }) => {
  const event = useLoaderData() || {};
  return (
    <Form className="event-form" method={method}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={event.title || ""}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          defaultValue={event.date || ""}
          required
        />
      </div>
      <input
        type="hidden"
        name="updatedAt"
        defaultValue={event.updatedAt || new Date().toISOString()}
      />
      <div>
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          defaultValue={event.image || ""}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          defaultValue={event.description || ""}
          required
        />
      </div>
      <button type="submit">{method === "put" ? "Update" : "Create"}</button>
    </Form>
  );
};

export default EventForm;
