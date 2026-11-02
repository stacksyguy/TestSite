// Stage 8 Units 2–3 practice papers: content checks, marking, the review plan and the Paper B lock.
import test from "node:test";
import assert from "node:assert/strict";
globalThis.localStorage = { getItem: k => (k === "ckpt-stage" ? "8" : null), setItem() {}, removeItem() {} };
const PA = await import("../js/papers.js");
const { VOCAB } = await import("../js/vocab.js");
const { GRAMMAR } = await import("../js/curriculum.js");
const GL = await import("../js/glab.js");
const D = await import("../js/drill.js");
const P = await import("../js/practice.js");
const set = PA.paperSet(8);

test("each paper has the real test's shape: 30 marks, 10/10/4/3/3", () => {
  for (const p of Object.values(set.PAPERS)) {
    const m = PA.marksOf(p);
    assert.equal(m.length, 30, p.id);
    const by = k => m.filter(x => x.part === k).length;
    assert.deepEqual(set.PARTS.map(x => by(x.key)), [10, 10, 4, 3, 3], p.id);
    p.grammar.forEach(g => assert.equal((g.text.match(/___/g) || []).length, g.gaps.length, `${p.id} q${g.q}`));
  }
  assert.equal(PA.hasPapers(9), false);
});

test("reading questions: four different options, the answer is not usually the longest", () => {
  for (const p of Object.values(set.PAPERS)) {
    assert.equal(p.reading.qs.length, 10);
    let longest = 0;
    p.reading.qs.forEach(q => {
      assert.equal(q.opts.length, 4); assert.equal(new Set(q.opts).size, 4, q.stem);
      assert.ok(D.DRILL_SKILLS.includes(q.skill), q.skill);
      assert.ok(D.drillItems(q.skill, { unit: 3 }).length >= 2, `drill texts for ${q.skill}`);
      if (q.opts[0].length >= Math.max(...q.opts.map(o => o.length))) longest++;
    });
    assert.ok(longest <= 4, `${p.id}: the answer is the longest option in ${longest} of 10`);
  }
});

test("word banks: syllabus words (5 from each unit), one gap each", () => {
  for (const p of Object.values(set.PAPERS)) {
    const units = p.vocab.bank.map(([w, u]) => { assert.ok(VOCAB[u].flat().some(e => e[0] === w), `${w} in Unit ${u}`); return u; });
    assert.equal(units.filter(u => u === 2).length, 5); assert.equal(units.filter(u => u === 3).length, 5);
    p.vocab.bank.forEach((_, i) => assert.equal(p.vocab.text.split(`[${i}]`).length, 2, `${p.id} gap ${i}`));
  }
});

test("review targets exist: Grammar Lab missions, grammar sets, word list", () => {
  ["2.2", "3.3", "3.6", "2.1"].forEach(pt => {
    const t = set.REVIEW[pt]; assert.ok(t, pt);
    if (t.kind === "glab") assert.ok(GL.glabMission(t.id), t.id);
    else assert.ok(GRAMMAR.some(g => g.id === t.point), t.point);
  });
  for (const p of Object.values(set.PAPERS)) p.grammar.forEach(g => assert.ok(set.REVIEW[g.point], g.point));
});

const perfect = p => ({ r: Object.fromEntries(p.reading.qs.map((_, i) => [i, 0])), v: Object.fromEntries(p.vocab.bank.map(([w], i) => [i, w])),
  g: Object.fromEntries(p.grammar.flatMap((g, gi) => g.gaps.map((a, k) => [`${gi}-${k}`, a[0]]))) });

test("marking: full marks, typed answers forgive case, curly apostrophes and a full stop", () => {
  const A = set.PAPERS.a, ans = PA.markPaper(A, perfect(A));
  assert.equal(ans.filter(a => a.first_try).length, 30);
  assert.deepEqual(PA.reviewPlan(set, ans), []);
  assert.ok(PA.typedOk(["would play", "'d play"], "’d play"));
  assert.ok(PA.typedOk(["is being built"], " Is being  built. "));
  assert.ok(!PA.typedOk(["is being built"], "is built"));
  assert.ok(!PA.typedOk(["listened"], "listen"));
});

test("review plan: one task per missed area, reading capped at two skills", () => {
  const A = set.PAPERS.a, r = perfect(A);
  [1, 4, 5, 8].forEach(i => { r.r[i] = 2; });          // Detail, Vocabulary in context, Inference, Inference
  r.v[3] = "practical"; r.v[4] = "curved";             // two words swapped
  r.g["0-1"] = "will play"; r.g["2-0"] = "listen"; r.g["6-0"] = "bar";
  const ans = PA.markPaper(A, r), plan = PA.reviewPlan(set, ans);
  assert.equal(ans.filter(a => a.first_try).length, 30 - 4 - 2 - 2 - 1);
  assert.deepEqual(plan.map(t => t.id), ["drill-inference", "drill-detail", "paper8-words", "glab-8-2.2", "grammar-3.3", "grammar-2.1"]);
  assert.deepEqual(plan[2].words, [{ w: "curved", unit: 2 }, { w: "practical", unit: 2 }]);
  // The missed words are practised as a set, and they also go into spaced review.
  const qs = P.vocabSet({ list: plan[2].words, history: [] });
  assert.deepEqual(qs.map(q => q.word || q.words.map(x => x.w)).flat().sort(), ["curved", "practical"]);
  const hist = [{ text_id: "paper8-a", created_at: "2026-11-03T02:00:00Z", answers: ans }];
  assert.ok(P.wordsToReview(hist, new Date("2026-11-03T05:00:00Z")).some(x => x.w === "curved"));
});

test("Paper B opens when every task from the latest Paper A is done after it", () => {
  const A = set.PAPERS.a, r = perfect(A); r.r[0] = 1; r.g["3-0"] = "is building";
  const ans = PA.markPaper(A, r), at = t => `2026-11-03T0${t}:00:00Z`;
  let h = [{ text_id: "paper8-a", score: 28, max_score: 30, created_at: at(2), answers: ans }];
  let st = PA.paperState(h, 8);
  assert.deepEqual(st.plan.map(t => t.id), ["drill-detail", "glab-8-3.6"]);
  assert.equal(st.bOpen, false); assert.equal(st.todo.length, 2);
  h.push({ text_id: "glab-8-3.6", score: 5, max_score: 6, created_at: at(1) });     // before the paper: does not count
  h.push({ text_id: "drill-detail", score: 3, max_score: 4, created_at: at(3) });
  assert.equal(PA.paperState(h, 8).bOpen, false);
  h.push({ text_id: "glab-8-3.6", score: 5, max_score: 6, created_at: at(4) });
  st = PA.paperState(h, 8); assert.equal(st.bOpen, true); assert.equal(st.todo.length, 0);
  // A perfect Paper A opens Paper B straight away; a Paper B attempt keeps it open.
  assert.equal(PA.paperState([{ text_id: "paper8-a", score: 30, max_score: 30, created_at: at(2), answers: PA.markPaper(A, perfect(A)) }], 8).bOpen, true);
  h.push({ text_id: "paper8-b", score: 29, max_score: 30, created_at: at(5), answers: [] });
  h.push({ text_id: "paper8-a", score: 20, max_score: 30, created_at: at(6), answers: PA.markPaper(A, { r: {}, v: {}, g: {} }) });
  st = PA.paperState(h, 8); assert.equal(st.bOpen, true); assert.equal(st.firstA.score, 28); assert.equal(st.bestB.score, 29);
});

test("XP: full XP and a bonus the first time, 1 per mark on a retake", () => {
  const A = set.PAPERS.a;
  assert.equal(PA.paperXP(20, [], A), 20 * PA.PAPER_XP.mark + PA.PAPER_XP.first);
  assert.equal(PA.paperXP(20, [{ text_id: A.id }], A), 20);
  assert.ok(30 * PA.PAPER_XP.mark + PA.PAPER_XP.first <= 400);
});
