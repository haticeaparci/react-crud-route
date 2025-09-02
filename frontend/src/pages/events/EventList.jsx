import { Link, useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import "./EventList.css";

const EventList = () => {
  const events = useLoaderData();
  const [selectedMonth, setSelectedMonth] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: new Date(0, i).toLocaleString("de-DE", { month: "long" }),
  }));

  const filteredEvents = useMemo(() => {
    let filtered =
      selectedMonth === "all"
        ? [...events]
        : events.filter((event) => {
            const month = new Date(event.date).getMonth() + 1;
            return String(month) === selectedMonth;
          });

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();

      const startsWith = [];
      const includes = [];

      filtered.forEach((event) => {
        const title = event.title.toLowerCase();
        const desc = event.description.toLowerCase();

        if (title.startsWith(term) || desc.startsWith(term)) {
          startsWith.push(event);
        } else if (title.includes(term) || desc.includes(term)) {
          includes.push(event);
        }
      });

      filtered = [...startsWith, ...includes];
    }

    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return filtered;
  }, [events, selectedMonth, searchTerm]);

  console.log(filteredEvents);
  return (
    <div className="event-container">
      <h1> 👋 Hey! Check out what’s inside!</h1>
      <p>We have {events.length} events available.</p>

      <div className="top-bar">
        <div className={`search${searchActive ? " active" : ""}`}>
          <input
            type="text"
            className="input"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setSearchActive(false)}
            onFocus={() => setSearchActive(true)}
            tabIndex={searchActive ? 0 : -1}
          />
          <button
            className="btn"
            type="button"
            onClick={() => setSearchActive((prev) => !prev)}
            tabIndex={0}
            aria-label="Search"
          >
            <svg
              width="50"
              height="50"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <div className="filter-container">
          <label htmlFor="month-filter" className="filter-label">
            Filter by Month:{" "}
          </label>
          <select
            id="month-filter"
            className="filter-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="all">All</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="event-list">
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className="event-item">
                <h2>{event.title}</h2>
                <time>{new Date(event.date).toLocaleDateString()}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
