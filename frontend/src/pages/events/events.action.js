import { redirect } from "react-router-dom";

export async function eventAction({ request, params }) {
  const method = request.method;
  const eventId = params.eventId;
  let url = "http://localhost:3000/events" + (eventId ? `/${eventId}` : "");

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    const formData = await request.formData();
    const eventData = {
      title: formData.get("title"),
      date: formData.get("date"),
      image: formData.get("image"),
      description: formData.get("description"),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Could not save data.");
    }

    return method === "POST"
      ? redirect("/events")
      : redirect(`/events/${eventId}`);
  }

  if (method === "DELETE") {
    const response = await fetch(url, { method: "DELETE", headers });
    if (!response.ok) {
      throw new Error("Could not delete event.");
    }
    return redirect("/events");
  }

  return null;
}
