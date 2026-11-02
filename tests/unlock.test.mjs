import test from "node:test";
import assert from "node:assert/strict";
import * as UL from "../js/unlock.js";
import * as P from "../js/practice.js";
import * as D from "../js/drill.js";
import { PRACTICE_TEXTS } from "../js/content.js";

const nov2 = new Date("2026-11-02T05:00:00Z");

test("no rule: every unit is open (teacher page, old database)", () => {
  UL.setUnlock(null);
  assert.ok([1, 4, 9].every(u => UL.unitOpen(u, nov2)));
  assert.equal(P.focusUnit(nov2), 4);
});

test("manual: only the units the teacher opened; focus is the newest one", () => {
  UL.setUnlock({ mode: "manual", units: [3, 1, 2, 2] });
  assert.deepEqual(UL.getUnlock().units, [1, 2, 3]);
  assert.equal(UL.unitOpen(3, nov2), true);
  assert.equal(UL.unitOpen(4, nov2), false);
  assert.equal(P.unitStatus(4, nov2), "locked");
  assert.equal(P.focusUnit(nov2), 3);          // the calendar says Unit 4, but it is still locked
  assert.match(UL.lockNote(4, nov2), /teacher/);
  UL.setUnlock({ mode: "manual", units: [1, 2, 3, 4] });
  assert.equal(P.focusUnit(nov2), 4);
});

test("auto: units open on their calendar start date", () => {
  UL.setUnlock({ mode: "auto", units: [1, 2, 3] });
  assert.equal(UL.unitOpen(4, new Date("2026-11-01T05:00:00Z")), false);
  assert.equal(UL.unitOpen(4, nov2), true);
  assert.equal(UL.unitOpen(5, nov2), false);
  // Exam week: the calendar's next unit (5) has not started, so the focus stays on Unit 4.
  assert.equal(P.focusUnit(new Date("2026-11-25T05:00:00Z")), 4);
  assert.match(UL.lockNote(5, nov2), /opens on/);
});

test("skill drills leave out texts in locked units", () => {
  UL.setUnlock({ mode: "manual", units: [2] });
  const items = D.drillItems("Main idea", { unit: 4 });
  assert.ok(items.length > 0);
  const unitOf = id => PRACTICE_TEXTS.find(t => t.id === id).unitNo;
  assert.ok(items.every(it => unitOf(it.text) === 2));
  UL.setUnlock(null);
  assert.ok(D.drillItems("Main idea", { unit: 4 }).some(it => unitOf(it.text) === 4));   // all open: Unit 4 texts come first
  UL.setUnlock(null);
});

test("bad rules are ignored", () => {
  assert.equal(UL.cleanRule({ mode: "sometimes", units: [1] }), null);
  assert.deepEqual(UL.cleanRule({ mode: "manual", units: [0, 10, "4"] }).units, [4]);
  UL.setUnlock(null);
});
