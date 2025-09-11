import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const dbPath = path.join(process.cwd(), "frontend", "mock-api", "db.json");
  const db = JSON.parse(await fs.readFile(dbPath, "utf-8"));

  if (req.method === "GET") {
    res.status(200).json(db.events);
    return;
  }

  if (req.method === "POST") {
    const newEvent = {
      ...req.body,
      id: uuidv4(),
      updatedAt: new Date().toISOString(),
    };
    db.events.push(newEvent);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(201).json(newEvent);
    return;
  }

  if (req.method === "PUT") {
    const { id, ...updateData } = req.body;
    const idx = db.events.findIndex((e) => e.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    db.events[idx] = {
      ...db.events[idx],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(200).json(db.events[idx]);
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const idx = db.events.findIndex((e) => e.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    const deleted = db.events.splice(idx, 1)[0];
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(200).json(deleted);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
