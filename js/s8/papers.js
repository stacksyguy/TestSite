// Stage 8 Units 2–3 practice test, modelled on the school's unit test: 30 marks, 40 minutes, five parts.
// Part 1 reading (10 MCQs, first option correct, shuffled on screen), Part 2 a gap fill from a word bank (10 words,
// 5 from Unit 2 and 5 from Unit 3, spelled exactly as in js/s8/vocab.js so a missed word goes into spaced review),
// Parts 3–5 typed grammar gaps: second conditional / I wish / if only (4), present continuous passive (3), partitives (3).
// In a gap sentence each ___ is one mark; `gaps` lists the accepted answers for each ___ in order (lower case).
// Paper B has the same parts and marks with new content, for the retake after the review plan.

export const PAPER_MINUTES = 40;

export const PARTS = [
 { key: "reading", name: "Reading", short: "Reading", intro: "Read the text, then choose the correct answer, A, B, C or D." },
 { key: "vocab", name: "Vocabulary", short: "Vocabulary", intro: "Fill in the gaps with words from the word bank. Use each word once." },
 { key: "cond", name: "Second conditional, I wish and if only", short: "Conditionals", intro: "Complete the sentences with the correct form of the verbs in brackets." },
 { key: "pass", name: "Present continuous passive", short: "Passive", intro: "Complete the sentences using the present continuous passive form of the verbs in brackets." },
 { key: "part", name: "Partitives", short: "Partitives", intro: "Fill in the gaps with a partitive (a word like piece)." }
];

// What a wrong answer in each part (or grammar point) sets as a review task. Labels are what the student sees.
export const REVIEW = {
 words: { kind: "words", id: "paper8-words", label: "Practise the words you missed" },
 "2.2": { kind: "glab", id: "glab-8-2.2", label: "Grammar Lab: If I Were the Architect (second conditional)" },
 "3.3": { kind: "grammar", point: "3.3", id: "grammar-3.3", label: "Grammar 3.3: I wish and if only" },
 "3.6": { kind: "glab", id: "glab-8-3.6", label: "Grammar Lab: Makeover Day (present continuous passive)" },
 "2.1": { kind: "grammar", point: "2.1", id: "grammar-2.1", label: "Grammar 2.1: Partitives" }
};

export const PAPERS = {
 a: { key: "a", id: "paper8-a", name: "Paper A", title: "Units 2–3 practice test: Paper A",
  reading: { title: "Streets for people", paras: [
   ["A", "Ten years ago, Green Lane was one of the busiest roads in the city. Lorries and motorbikes filled it from early morning until late at night, and the traffic congestion was so bad that a short journey to school could take forty minutes. Families who lived there kept their windows shut because of the noise and the smoke."],
   ["B", "Then the city council tried an experiment. For one month, Green Lane was closed to cars on Sundays. Children drew pictures on the road with chalk, older residents brought chairs outside, and street sellers set up small stalls. At the end of the month, more than nine out of ten residents voted to make the street car-free every day."],
   ["C", "The street was redesigned by a young architect, Mai Anh. Instead of building something new and expensive, she kept the old shop houses with their colourful facades and added what the street was missing: trees, benches, a small playground and a raised garden where residents grow vegetables. The pavements are made of a special stone that lets rainwater pass through, so the street no longer floods in the rainy season."],
   ["D", "The changes have not pleased everyone. Some shop owners worried that they would lose the customers who used to park outside. In the first year, two shops closed. However, most businesses now say they are busier than before, because people walk slowly and stop to look in the windows instead of driving past."],
   ["E", "Perhaps the biggest change is one you cannot see. Before, many neighbours had never spoken to each other. Now there is a street party every month, and volunteers take turns looking after the garden. \"We used to live on the same street,\" says one resident. \"Now we live in the same community.\" Other cities are watching closely. If Green Lane's success continues, many more streets may soon belong to people instead of cars."]],
   gloss: "resident: a person who lives in a place · council: the group of people who run a city",
   qs: [
    { skill: "Detail", stem: "What was Green Lane like ten years ago?", opts: ["Busy, noisy and full of traffic", "Quiet, with very few cars", "Green, with many parks and trees", "A road used only by lorries at night"] },
    { skill: "Detail", stem: "What happened during the council's experiment?", opts: ["The street was closed to cars on Sundays.", "The street was closed to cars every day.", "Lorries could only use it in the morning.", "Residents had to keep their windows shut."] },
    { skill: "Cause and effect", stem: "Why did Green Lane become car-free every day?", opts: ["Most residents voted for it.", "The architect asked the council to close it.", "The road was too damaged for lorries and motorbikes.", "The shop owners wanted more space for stalls."] },
    { skill: "Detail", stem: "What did Mai Anh do with the old shop houses?", opts: ["She kept them.", "She knocked them down and built new shops.", "She painted all their facades white.", "She turned them into a playground for children."] },
    { skill: "Vocabulary in context", stem: "In paragraph C, \"what the street was missing\" means…", opts: ["the things the street did not have", "the things that were stolen from the street", "the shops that had closed down", "the people who had moved away from the area"] },
    { skill: "Inference", stem: "What can we infer about the shop owners in paragraph D?", opts: ["At first, some expected the change to be bad for business.", "They all supported the idea from the start.", "They had to close their shops for a year.", "They now drive their customers to the street."] },
    { skill: "Writer's purpose", stem: "Why does the writer include the resident's words in paragraph E?", opts: ["To show how the change brought neighbours together", "To explain who looks after the vegetable garden", "To show that residents want to move away", "To describe what happens at the monthly street party"] },
    { skill: "Main idea", stem: "What is the text mainly about?", opts: ["How closing a busy street to cars changed life there", "Why cars should be banned from every city", "The life and work of a young architect", "How to stop streets from flooding in the rainy season"] },
    { skill: "Inference", stem: "What does \"Other cities are watching closely\" suggest?", opts: ["Other cities may copy the idea if it keeps working.", "Other cities think the idea will fail.", "Other cities have already closed all their streets to cars.", "Tourists come to Green Lane to take photos."] },
    { skill: "Writer's view", stem: "Which statement best expresses the writer's overall message?", opts: ["Streets for people, not cars, can help a whole community.", "Car-free streets are always bad for local shops and businesses.", "Only young architects can design good streets.", "Every street should have a vegetable garden."] }] },
  vocab: {
   bank: [["traffic congestion", 3], ["car-free", 3], ["facade", 2], ["curved", 2], ["practical", 2], ["resistant", 2], ["green spaces", 3], ["landscape", 2], ["volunteer", 3], ["community spirit", 3]],
   // The paragraph in order; each [n] is the gap for bank word n (0-based in `bank`), shown as questions 11–20.
   text: "The old market square in our town used to be a car park. Every morning there was terrible [0], and the air was full of smoke. Last year, the council decided to make the square [1], so now only people on foot and on bicycles can enter. An architect designed a new library for the north side. Its [2] is made of glass and local stone, and its [3] roof looks like a wave. The design is also very [4]: the roof collects rainwater for the gardens. The windows are [5] to storms, so they won't break in the rainy season. Around the library there are [6] with trees and benches, which fit well into the [7] of hills and rice fields behind the town. Every weekend, at least one [8] from each street helps to water the plants. Now neighbours meet in the square every evening, and there is real [9] in our town." },
  grammar: [
   { part: "cond", q: 21, point: "2.2", text: "If our town ___ (have) more green spaces, children ___ (play) outside more.", gaps: [["had"], ["would play", "'d play"]] },
   { part: "cond", q: 22, point: "3.3", text: "I wish my street ___ (be) car-free, because it is too dangerous to cycle there.", gaps: [["were", "was"]] },
   { part: "cond", q: 23, point: "3.3", text: "If only the council ___ (listen) to young people more often, our neighbourhood would be a better place.", gaps: [["listened"]] },
   { part: "pass", q: 24, point: "3.6", text: "A new shopping centre ___ (build) next to our school at the moment.", gaps: [["is being built", "'s being built"]] },
   { part: "pass", q: 25, point: "3.6", text: "The old houses in the square ___ (paint) this week.", gaps: [["are being painted"]] },
   { part: "pass", q: 26, point: "3.6", text: "Right now, the streets ___ (clean) by a team of volunteers.", gaps: [["are being cleaned"]] },
   { part: "part", q: 27, point: "2.1", text: "He ate a ___ of pizza and then he wasn't hungry any more.", gaps: [["slice", "piece"]] },
   { part: "part", q: 28, point: "2.1", text: "I bought a ___ of bread at the bakery for our sandwiches.", gaps: [["loaf"]] },
   { part: "part", q: 29, point: "2.1", text: "We picked a ___ of flowers for Grandma's birthday.", gaps: [["bunch"]] }] },

 b: { key: "b", id: "paper8-b", name: "Paper B", title: "Units 2–3 practice test: Paper B",
  reading: { title: "The library a village built", paras: [
   ["A", "Until three years ago, the 600 children of Ban Mong, a small village in the hills, had no library. The nearest one was in the town, two hours away by bus, and few families could afford the ticket. Most children owned no books except their school textbooks."],
   ["B", "Everything changed when Ms Linh, a teacher at the village school, asked the community a simple question: \"If we had a library, would you help to build it?\" Almost every family said yes. Some gave money, but most gave their time. Farmers carried bamboo down from the hills, grandparents taught teenagers how to weave walls, and a retired builder planned the roof."],
   ["C", "The building follows a traditional design. It stands on wooden legs, which keeps the books dry when heavy rain floods the ground, and its wide roof keeps the reading room cool without air conditioning. Instead of glass, the windows have bamboo shutters, which let in light and air but keep out the sun at midday."],
   ["D", "The project was not easy. Twice, storms damaged the half-finished roof, and some people said that a village of farmers did not need books. But the volunteers kept going, and the library opened with 2,000 books, many of them given by schools in the city."],
   ["E", "Today the library is open every evening, and it is used by far more than students. Parents come to read newspapers, farmers look up information about their crops online, and older residents meet there to play chess. \"It belongs to all of us,\" says Ms Linh, \"because all of us built it.\" Last year, three other villages in the area asked for her advice on building libraries of their own."]],
   gloss: "weave: make something by crossing long thin pieces over and under each other · shutters: wooden covers for a window",
   qs: [
    { skill: "Detail", stem: "Why did few children use the town library before?", opts: ["It was far away and the bus was expensive.", "It had no books for children.", "It was only open in the evenings.", "Their teachers did not allow them to go there."] },
    { skill: "Detail", stem: "What did most families give to the project?", opts: ["Their time", "Money for the roof", "Books from their homes", "Land for the building"] },
    { skill: "Cause and effect", stem: "Why does the library stand on wooden legs?", opts: ["To keep the books dry when the ground floods", "To give visitors a better view of the hills", "Because there was not enough bamboo for walls", "To keep animals out"] },
    { skill: "Detail", stem: "What do the bamboo shutters do?", opts: ["They let in light and air but keep out the midday sun.", "They keep the reading room warm.", "They protect the roof from storms.", "They make the library look more modern than the houses around it."] },
    { skill: "Vocabulary in context", stem: "In paragraph D, \"kept going\" means…", opts: ["continued and did not give up", "went home early", "travelled to the city to collect books", "kept the books safe"] },
    { skill: "Inference", stem: "What can we infer from paragraph D about some people in the village?", opts: ["They did not think the library was important.", "They were angry about the storms.", "They gave most of the books.", "They wanted the library to be built in the city instead."] },
    { skill: "Writer's purpose", stem: "Why does the writer describe who uses the library in paragraph E?", opts: ["To show that the whole community benefits from it", "To explain why the library is only open in the evening", "To complain that students can't find a seat", "To show that farmers prefer the internet"] },
    { skill: "Main idea", stem: "What is the text mainly about?", opts: ["How a village worked together to build a library", "Why traditional houses are better than modern ones", "The life of a teacher called Ms Linh", "How to build a roof that is resistant to storms and heavy rain"] },
    { skill: "Inference", stem: "What does the last sentence suggest?", opts: ["The idea may spread to other villages.", "Ms Linh wants to leave Ban Mong.", "The other villages already have libraries.", "The library in Ban Mong will close soon because it is too small."] },
    { skill: "Writer's view", stem: "Which statement best expresses the writer's overall message?", opts: ["A community that works together can achieve big things.", "Every village should send its children to a library in the city.", "Traditional buildings are cheaper than modern ones.", "Children only need their school textbooks."] }] },
  vocab: {
   bank: [["neighbourhood", 3], ["narrow", 3], ["traditional", 2], ["balcony", 2], ["handmade", 2], ["hexagonal", 2], ["efficiency", 2], ["raised walkway", 3], ["population", 3], ["lively", 3]],
   text: "My grandmother lives in an old [0] near the river. The streets there are so [1] that two cars can't pass each other. Her house is a [2] wooden house, more than a hundred years old, with a small [3] upstairs where she grows flowers. Inside, all the chairs are [4]: my grandfather made them himself. Across the road, there is a new library with an unusual [5] shape: it has six sides, like the cells in a beehive. Solar panels on the roof improve the energy [6] of the building. Because the main road is so busy, the city built a [7] above it, so people can cross safely. The [8] of the area has grown quickly in the last ten years, and on market days the streets are very [9], full of music and people." },
  grammar: [
   { part: "cond", q: 21, point: "2.2", text: "If I ___ (be) an architect, I ___ (design) a school with a garden on the roof.", gaps: [["were", "was"], ["would design", "'d design"]] },
   { part: "cond", q: 22, point: "3.3", text: "I wish we ___ (live) in a quieter neighbourhood. I can't sleep because of the traffic.", gaps: [["lived"]] },
   { part: "cond", q: 23, point: "3.3", text: "If only my flat ___ (have) a balcony! I could grow tomatoes.", gaps: [["had"]] },
   { part: "pass", q: 24, point: "3.6", text: "The library roof ___ (repair) at the moment, so the library is closed.", gaps: [["is being repaired", "'s being repaired"]] },
   { part: "pass", q: 25, point: "3.6", text: "Hundreds of trees ___ (plant) along the river this month.", gaps: [["are being planted"]] },
   { part: "pass", q: 26, point: "3.6", text: "Look! The new bridge ___ (open) by the mayor right now.", gaps: [["is being opened", "'s being opened"]] },
   { part: "part", q: 27, point: "2.1", text: "Could you give me a ___ of paper? I need to write a note.", gaps: [["sheet", "piece"]] },
   { part: "part", q: 28, point: "2.1", text: "She bought a ___ of chocolate at the shop and shared it with her brother.", gaps: [["bar", "piece"]] },
   { part: "part", q: 29, point: "2.1", text: "He drank a ___ of milk with his breakfast.", gaps: [["glass", "cup", "carton", "bottle"]] }] }
};
