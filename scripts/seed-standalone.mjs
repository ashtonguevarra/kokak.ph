import pg from "pg";

const { Client } = pg;

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();node:internal/modules/cjs/loader:1124:12)
    at Module._load (node:internal/modules/cjs/loader:1296:5)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v26.3.1
[ashton@ashton kokak.ph]$ cd ~/kokak.ph 
git pull
export DATABASE_URL="your-neon-connection-string"
node scripts/seed-standalone.mjs
remote: Enumerating objects: 41, done.
remote: Counting objects: 100% (41/41), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 22 (delta 15), reused 22 (delta 15), pack-reused 0 (from 0)
Unpacking objects: 100% (22/22), 3.09 KiB | 24.00 KiB/s, done.
From https://github.com/ashtonguevarra/kokak.ph
 * [new branch]      database   -> origin/database
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> workingBranchForUI

node:internal/modules/cjs/loader:1522
  throw err;
  ^

Error: Cannot find module '/home/ashton/kokak.ph/scripts/seed-standalone.mjs'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1519:15)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1073:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1097:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1124:12)
    at Module._load (node:internal/modules/cjs/loader:1296:5)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v26.3.1
[ashton@ashton kokak.ph]$ b

console.log("Creating tables if not exist...");
await client.query(`
  CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    filipino_word TEXT NOT NULL,
    target_word TEXT NOT NULL,
    language_code TEXT NOT NULL REFERENCES languages(code),
    meaning TEXT NOT NULL,
    pronunciation TEXT NOT NULL,
    example_sentence TEXT NOT NULL,
    usage_notes TEXT
  );
  CREATE TABLE IF NOT EXISTS contributions (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    language_code TEXT NOT NULL,
    meaning TEXT NOT NULL,
    filipino_equivalent TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    submitted_at TEXT NOT NULL,
    ai_validation_note TEXT
  );
`);

console.log("Seeding languages...");
await client.query(`
  INSERT INTO languages (code, name) VALUES
    ('ceb','Cebuano'),('ilo','Ilocano'),('hil','Hiligaynon')
  ON CONFLICT (code) DO NOTHING
`);

console.log("Seeding words...");
const words = [
  ["bahay","balay","ceb","A dwelling place or home.","ba-LAY","Dako ang akong balay.","Commonly used across the Visayas."],
  ["tubig","tubig","ceb","Water; the liquid essential for life.","TU-big","Hatagi ko og tubig, palihug.",null],
  ["araw","adlaw","ceb","The sun, or a day of the week.","AD-law","Mainit ang adlaw karon.","Can mean both the sun and a calendar day."],
  ["puso","puso","ceb","The heart; used for love and courage.","PU-so","Maayo ang puso ni Maria.",null],
  ["ilaw","suga","ceb","Light or illumination.","SU-ga","I-on ang suga sa sala.","Suga is Cebuano for light."],
  ["pagkain","pagkaon","ceb","Food; anything eaten for nourishment.","pag-KA-on","Lami ang pagkaon sa pyesta.",null],
  ["kaibigan","higala","ceb","A friend; someone you are close to.","hi-GA-la","Higala ko siya sukad pa sa bata.",null],
  ["gabi","gabii","ceb","Night; the dark period after sunset.","ga-BI-i","Mangadto ko ugma sa gabii.",null],
  ["buwan","buwan","ceb","The moon, or a calendar month.","BU-wan","Hayag ang buwan ganinay.",null],
  ["langit","langit","ceb","The sky or heaven.","LA-ngit","Asul ang langit karon.",null],

  ["bahay","balay","ilo","A home or dwelling place.","BA-lay","Adayo ti balay ko.",null],
  ["tubig","danum","ilo","Water; the liquid essential for life.","DA-num","Inum ka ti danum.",null],
  ["araw","aldaw","ilo","The sun, or a single day.","AL-daw","Napintas ti aldaw ita.",null],
  ["gabi","rabii","ilo","Night or evening.","ra-BI-i","Mapan ak iti rabii.","Note the distinctive r- prefix."],
  ["pagkain","kanon","ilo","Food; cooked rice or a meal.","KA-non","Naimas ti kanon.",null],
  ["kaibigan","gayyem","ilo","A friend or companion.","GAY-yem","Gayyem ko ni Juan.",null],
  ["langit","langit","ilo","The sky or heaven above.","LA-ngit","Berde ti langit.",null],
  ["buwan","bulan","ilo","The moon, or a month.","BU-lan","Napintas ti bulan ita rabii.",null],
  ["lupa","daga","ilo","Earth, soil, or land.","DA-ga","Nalukmeg ti daga ditoy.",null],
  ["puso","puso","ilo","The heart.","PU-so","Nasakit ti puso ko.",null],

  ["bahay","balay","hil","A house or place of residence.","BA-lay","Dako ang amon balay.",null],
  ["tubig","tubig","hil","Water; essential for life.","TU-big","Hatagan mo ako sang tubig.",null],
  ["araw","adlaw","hil","The sun, or a day.","AD-law","Mainit ang adlaw subong.",null],
  ["gabi","gab-i","hil","Night or evening.","GAB-i","Sige na, gab-i na.",null],
  ["pagkain","pagkaon","hil","Food; nourishment of any kind.","pag-KA-on","Masarap ang pagkaon sa fiesta.",null],
  ["kaibigan","abyan","hil","A close friend or companion.","AB-yan","Abyan ko si Pedro.",null],
  ["lupa","duta","hil","Land, soil, or earth.","DU-ta","Maayo ang duta sa Iloilo.",null],
  ["puso","puso","hil","The heart.","PU-so","Mapinalangga ang iya puso.",null],
  ["langit","langit","hil","Sky or heaven.","LA-ngit","Asul ang langit subong.",null],
  ["buwan","bulan","hil","The moon, or a calendar month.","BU-lan","Hayag ang bulan gahapon.",null],
];

for (const [fw, tw, lc, meaning, pron, ex, notes] of words) {
  await client.query(
    `INSERT INTO words (filipino_word, target_word, language_code, meaning, pronunciation, example_sentence, usage_notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
    [fw, tw, lc, meaning, pron, ex, notes]
  );
}

console.log("Done! Database seeded with 30 words.");
await client.end();
