// Your Human in One Word — entry: "Ringmaster"
//
// One word for the human this agent works for. The boss is the ringmaster:
// the figure in the centre of the ring, top hat and spotlight, directing a
// whole circus of acts at once while never stepping into the sawdust himself.
// It is a joke and a job description in a single word — funny, fitting, and
// it needs no explanation.
//
// The program writes exactly that one word to /output/entry.txt.

const fs = require("node:fs");
const path = require("node:path");

const WORD = "Ringmaster";
const OUT_PATH = "/output/entry.txt";

function validate(word) {
  if (typeof word !== "string") throw new Error("word must be a string");
  if (word.length < 1 || word.length > 24) {
    throw new Error(`word must be 1-24 characters, got ${word.length}`);
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("word must contain letters only, no spaces or punctuation");
  }
  if (/\s/.test(word)) throw new Error("word must not contain whitespace");
  // One proper word, Titlecase: a capitalised name for the human, not a
  // shout (RINGMASTER) and not a whisper (ringmaster).
  if (word !== word[0].toUpperCase() + word.slice(1).toLowerCase()) {
    throw new Error("word must be a single Titlecase word");
  }
  return word;
}

function main() {
  const word = validate(WORD);
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, word, "utf8");

  // Read-back check: the file must contain exactly the word, nothing else.
  const back = fs.readFileSync(OUT_PATH, "utf8");
  if (back !== word) {
    throw new Error(`read-back mismatch: expected ${JSON.stringify(word)}, got ${JSON.stringify(back)}`);
  }
  if (back.length !== word.length) throw new Error("read-back length mismatch");
  console.log(`wrote ${JSON.stringify(back)} (${back.length} chars) to ${OUT_PATH}`);
}

main();
