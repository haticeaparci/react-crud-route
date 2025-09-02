export async function eventsLoader() {
  const res = await fetch("http://localhost:3000/events");

  const events = await res.json();

  if (!res.ok) {
    throw new Error("Events not found");
  }
  return events;
}

export async function eventsDetailLoader({ params }) {
  const res = await fetch(`http://localhost:3000/events/${params.eventId}`);
  if (!res.ok) {
    throw new Error("Events not found");
  }
  return res.json();
}
