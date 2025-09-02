import EventForm from "./EventForm";
import "./EventForm.css";

const EventEdit = () => {
  return (
    <div className="event-edit">
      <h1>Edit Event</h1>
      <p>This is the event edit page.</p>

      <EventForm method="put" />
    </div>
  );
};

export default EventEdit;
