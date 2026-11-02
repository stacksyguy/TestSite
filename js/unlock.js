// Which units a student can open. Each class has an unlock rule, set by its teacher on the dashboard
// (ck_classes.unlock_mode and open_units):
//   manual: only the units the teacher has opened. New and existing classes start with Units 1-3.
//   auto:   each unit opens by itself on its start date in the school calendar.
// A locked unit hides everything in it: texts, listening, words, grammar, Labs, games, escape room and mini test.
// With no rule (the teacher page, tests, or a database without these columns yet) every unit is open.
import { SEQUENCE } from "./curriculum.js";

export const DEFAULT_OPEN = [1, 2, 3];
export const MODES = ["manual", "auto"];
let rule = null;

// Read a rule from the database's { mode, units } (or null). Returns the cleaned rule.
export function cleanRule(r) {
  if (!r || !MODES.includes(r.mode)) return null;
  return { mode: r.mode, units: [...new Set((r.units || []).map(Number).filter(u => u >= 1 && u <= 9))].sort((a, b) => a - b) };
}
export function setUnlock(r) { rule = cleanRule(r); return rule; }
export const getUnlock = () => rule;

const startOf = (u, seq) => { const e = seq.find(x => x.kind === "unit" && x.unit === u); return e ? new Date(e.start + "T00:00:00+07:00") : null; };
// True once a unit's start date in the calendar has come.
export function unitStarted(u, now = new Date(), seq = SEQUENCE) { const d = startOf(u, seq); return !d || d <= now; }
export function unitStartDate(u, seq = SEQUENCE) { return startOf(u, seq); }

export function unitOpenBy(r, u, now = new Date(), seq = SEQUENCE) {
  if (!r) return true;
  return r.mode === "auto" ? unitStarted(u, now, seq) : r.units.includes(u);
}
export const unitOpen = (u, now = new Date()) => unitOpenBy(rule, +u, now);
export const allUnits = (seq = SEQUENCE) => seq.filter(e => e.kind === "unit").map(e => e.unit);
export const openUnits = (now = new Date()) => allUnits().filter(u => unitOpen(u, now));

// The unit to focus on, given the calendar's choice. Manual: the newest unit the teacher has opened.
// Otherwise the calendar's unit if it is open, else the nearest open unit before it, else the first open one.
export function focusFrom(calUnit, now = new Date()) {
  if (!rule) return calUnit;
  const open = openUnits(now);
  if (!open.length) return calUnit;
  if (rule.mode === "manual") return open[open.length - 1];
  if (open.includes(calUnit)) return calUnit;
  const before = open.filter(u => u < calUnit);
  return before.length ? before[before.length - 1] : open[0];
}

// What a student sees on a locked unit.
export function lockNote(u, now = new Date()) {
  if (rule && rule.mode === "auto") { const d = startOf(+u, SEQUENCE);
    if (d && d > now) return `Unit ${u} opens on ${d.toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "Asia/Ho_Chi_Minh" })}.`; }
  return `Your teacher will open Unit ${u} when the class gets to it.`;
}
