import EventForm from "./EventForm";
import "./EventForm.css";

const EventNew = () => {
  return (
    <div className="event-new">
      <h1>Create New Event</h1>
      <p>This is the new event page.</p>
      <EventForm method="post" />
    </div>
  );
};

export default EventNew;
