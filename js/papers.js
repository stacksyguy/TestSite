// Unit test practice papers (Stage 8, Units 2–3): marking, the diagnostic review plan and when Paper B opens.
// Pure functions; the student page draws the test and the teacher page draws the results.
// A wrong answer in a part sets review tasks with the app's own activities: a skill drill per missed reading skill
// (up to 2), the missed words (they also go into spaced review), and the Grammar Lab mission or grammar set for each
// missed grammar point. Paper B opens once every task from the latest Paper A is done after it (or straight away
// after a perfect Paper A). Saved as mode "vocab", text_id paper8-a / paper8-b, with one answer per mark.
import { STAGE } from "./stage.js";
import * as S8 from "./s8/papers.js";
import { drillId } from "./drill.js";

export const SETS = { 8: S8 };
const setOf = stage => SETS[stage] || null;
export const hasPapers = (stage = STAGE) => !!setOf(stage);
export const paperSet = (stage = STAGE) => setOf(stage);
export const PAPER_XP = { mark: 4, retakeMark: 1, first: 30 };
export const READING_TASKS = 2;

// Every mark of a paper in order: reading questions, vocabulary gaps, then each gap of each grammar sentence.
export function marksOf(paper) {
  const rows = paper.reading.qs.map((q, i) => ({ part: "reading", q: i + 1, skill: q.skill, key: `r${i}` }));
  paper.vocab.bank.forEach(([w, unit], i) => rows.push({ part: "vocab", q: 11 + i, word: w, unit, key: `v${i}` }));
  paper.grammar.forEach((g, gi) => g.gaps.forEach((acc, k) => rows.push({ part: g.part, q: g.q, point: g.point, accept: acc, key: `g${gi}-${k}`, gap: k, of: g.gaps.length })));
  return rows;
}
export const maxMarks = paper => marksOf(paper).length;

// Typed answers: lower case, curly apostrophes made straight, spaces tidied, a full stop or brackets ignored.
export const normTyped = s => String(s || "").toLowerCase().replace(/[’‘`]/g, "'").replace(/[().!?,]/g, " ").replace(/\s+/g, " ").trim();
export const typedOk = (accept, v) => accept.map(normTyped).includes(normTyped(v));

// resp: { r: { index: option index }, v: { gap index: word }, g: { "gi-k": text } }. Returns one answer per mark,
// in the format the rest of the app reads (reading skill, Vocabulary + word, Grammar + point).
export function markPaper(paper, resp) {
  const r = resp.r || {}, v = resp.v || {}, g = resp.g || {};
  return marksOf(paper).map(m => {
    if (m.part === "reading") return { skill: m.skill, part: "reading", q: m.q, first_try: r[m.q - 1] === 0, support: "none" };
    if (m.part === "vocab") { const i = m.q - 11; return { skill: "Vocabulary", word: m.word, unit: m.unit, part: "vocab", q: m.q, first_try: v[i] === m.word, support: "none" }; }
    const key = m.key.slice(1), typed = (g[key] || "").slice(0, 40);
    return { skill: "Grammar", point: m.point, part: m.part, q: m.q, gap: m.gap, typed, first_try: typedOk(m.accept, typed), support: "none" };
  });
}
export function partScores(set, answers) {
  return set.PARTS.map(p => { const a = answers.filter(x => x.part === p.key); return { key: p.key, name: p.name, short: p.short, right: a.filter(x => x.first_try).length, total: a.length }; });
}

// The review tasks for one attempt's answers, in the order of the paper's parts.
export function reviewPlan(set, answers) {
  const wrong = answers.filter(a => !a.first_try), tasks = [];
  const skills = {};
  wrong.filter(a => a.part === "reading").forEach(a => { skills[a.skill] = (skills[a.skill] || 0) + 1; });
  Object.entries(skills).sort((a, b) => b[1] - a[1]).slice(0, READING_TASKS)
    .forEach(([skill, n]) => tasks.push({ kind: "drill", id: drillId(skill), skill, part: "reading", missed: n, label: `Skill drill: ${skill}` }));
  const words = wrong.filter(a => a.part === "vocab").map(a => ({ w: a.word, unit: a.unit }));
  if (words.length) tasks.push({ ...set.REVIEW.words, part: "vocab", words, missed: words.length,
    label: `${set.REVIEW.words.label} (${words.length} word${words.length > 1 ? "s" : ""})` });
  const points = [];
  wrong.filter(a => a.point).forEach(a => { if (!points.includes(a.point)) points.push(a.point); });
  points.forEach(pt => { const t = set.REVIEW[pt]; if (t) tasks.push({ ...t, part: wrong.find(a => a.point === pt).part, missed: wrong.filter(a => a.point === pt).length }); });
  return tasks;
}

const tries = (history, id) => history.filter(h => h.text_id === id && h.max_score > 0).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
const pct = h => h ? h.score / h.max_score : null;
// A task counts as done once the student finishes that activity after the paper.
export const taskDone = (history, task, after) => history.some(h => h.text_id === task.id && new Date(h.created_at) > new Date(after));

// Everything the Home card and the teacher page need, from one student's history.
export function paperState(history, stage = STAGE) {
  const set = setOf(stage); if (!set) return null;
  const A = tries(history, set.PAPERS.a.id), B = tries(history, set.PAPERS.b.id), lastA = A[A.length - 1] || null;
  const plan = lastA ? reviewPlan(set, lastA.answers || []).map(t => ({ ...t, done: taskDone(history, t, lastA.created_at) })) : [];
  const bOpen = B.length > 0 || (!!lastA && plan.every(t => t.done));
  const best = xs => xs.length ? xs.reduce((b, h) => (pct(h) > pct(b) ? h : b)) : null;
  return { set, a: A, b: B, firstA: A[0] || null, lastA, bestA: best(A), lastB: B[B.length - 1] || null, bestB: best(B), plan, bOpen,
           todo: plan.filter(t => !t.done) };
}

export function paperXP(score, history, paper) {
  const first = !history.some(h => h.text_id === paper.id);
  return first ? score * PAPER_XP.mark + PAPER_XP.first : score * PAPER_XP.retakeMark;
}
