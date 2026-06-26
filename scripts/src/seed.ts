import { db, languagesTable, wordsTable } from "@workspace/db";

async function seed() {
  console.log("Seeding languages...");
  await db.insert(languagesTable).values([
    { code: "ceb", name: "Cebuano" },
    { code: "ilo", name: "Ilocano" },
    { code: "hil", name: "Hiligaynon" },
  ]).onConflictDoNothing();

  console.log("Seeding words...");
  await db.insert(wordsTable).values([
    { filipinoWord: "bahay", targetWord: "balay", languageCode: "ceb", meaning: "A dwelling place or home where a family lives.", pronunciation: "ba-LAY", exampleSentence: "Dako ang akong balay.", usageNotes: "Commonly used in everyday speech across the Visayas." },
    { filipinoWord: "tubig", targetWord: "tubig", languageCode: "ceb", meaning: "Water; the liquid essential for life.", pronunciation: "TU-big", exampleSentence: "Hatagi ko og tubig, palihug.", usageNotes: null },
    { filipinoWord: "araw", targetWord: "adlaw", languageCode: "ceb", meaning: "The sun, or a day of the week.", pronunciation: "AD-law", exampleSentence: "Mainit ang adlaw karon.", usageNotes: "Can mean both the sun and a calendar day." },
    { filipinoWord: "puso", targetWord: "puso", languageCode: "ceb", meaning: "The heart; also used metaphorically for love and courage.", pronunciation: "PU-so", exampleSentence: "Maayo ang puso ni Maria.", usageNotes: null },
    { filipinoWord: "ilaw", targetWord: "suga", languageCode: "ceb", meaning: "Light, illumination.", pronunciation: "SU-ga", exampleSentence: "I-on ang suga sa sala.", usageNotes: "Suga is the Cebuano term while ilaw is the Filipino word." },
    { filipinoWord: "pagkain", targetWord: "pagkaon", languageCode: "ceb", meaning: "Food; anything eaten for nourishment.", pronunciation: "pag-KA-on", exampleSentence: "Lami ang pagkaon sa pyesta.", usageNotes: null },
    { filipinoWord: "kaibigan", targetWord: "higala", languageCode: "ceb", meaning: "A friend; someone you are close to.", pronunciation: "hi-GA-la", exampleSentence: "Higala ko siya sukad pa sa bata.", usageNotes: null },
    { filipinoWord: "gabi", targetWord: "gabii", languageCode: "ceb", meaning: "Night; the dark period between sunset and sunrise.", pronunciation: "ga-BI-i", exampleSentence: "Mangadto ko ugma sa gabii.", usageNotes: null },
    { filipinoWord: "buwan", targetWord: "buwan", languageCode: "ceb", meaning: "The moon, or a month in the calendar.", pronunciation: "BU-wan", exampleSentence: "Hayag ang buwan ganinay.", usageNotes: null },
    { filipinoWord: "langit", targetWord: "langit", languageCode: "ceb", meaning: "The sky or heaven.", pronunciation: "LA-ngit", exampleSentence: "Asul ang langit karon.", usageNotes: null },

    { filipinoWord: "bahay", targetWord: "balay", languageCode: "ilo", meaning: "A home or dwelling place.", pronunciation: "BA-lay", exampleSentence: "Adayo ti balay ko.", usageNotes: null },
    { filipinoWord: "tubig", targetWord: "danum", languageCode: "ilo", meaning: "Water; the liquid essential for life.", pronunciation: "DA-num", exampleSentence: "Inum ka ti danum.", usageNotes: null },
    { filipinoWord: "araw", targetWord: "aldaw", languageCode: "ilo", meaning: "The sun, or a single day.", pronunciation: "AL-daw", exampleSentence: "Napintas ti aldaw ita.", usageNotes: null },
    { filipinoWord: "gabi", targetWord: "rabii", languageCode: "ilo", meaning: "Night or evening.", pronunciation: "ra-BI-i", exampleSentence: "Mapan ak iti rabii.", usageNotes: "Note the distinctive r- prefix in Ilocano." },
    { filipinoWord: "pagkain", targetWord: "kanon", languageCode: "ilo", meaning: "Food; cooked rice or a meal.", pronunciation: "KA-non", exampleSentence: "Naimas ti kanon.", usageNotes: null },
    { filipinoWord: "kaibigan", targetWord: "gayyem", languageCode: "ilo", meaning: "A friend or companion.", pronunciation: "GAY-yem", exampleSentence: "Gayyem ko ni Juan.", usageNotes: null },
    { filipinoWord: "langit", targetWord: "langit", languageCode: "ilo", meaning: "The sky or heaven above.", pronunciation: "LA-ngit", exampleSentence: "Berde ti langit.", usageNotes: null },
    { filipinoWord: "buwan", targetWord: "bulan", languageCode: "ilo", meaning: "The moon, or a month.", pronunciation: "BU-lan", exampleSentence: "Napintas ti bulan ita rabii.", usageNotes: null },
    { filipinoWord: "lupa", targetWord: "daga", languageCode: "ilo", meaning: "Earth, soil, or land.", pronunciation: "DA-ga", exampleSentence: "Nalukmeg ti daga ditoy.", usageNotes: null },
    { filipinoWord: "puso", targetWord: "puso", languageCode: "ilo", meaning: "The heart.", pronunciation: "PU-so", exampleSentence: "Nasakit ti puso ko.", usageNotes: null },

    { filipinoWord: "bahay", targetWord: "balay", languageCode: "hil", meaning: "A house or place of residence.", pronunciation: "BA-lay", exampleSentence: "Dako ang amon balay.", usageNotes: null },
    { filipinoWord: "tubig", targetWord: "tubig", languageCode: "hil", meaning: "Water; essential for life and drinking.", pronunciation: "TU-big", exampleSentence: "Hatagan mo ako sang tubig.", usageNotes: null },
    { filipinoWord: "araw", targetWord: "adlaw", languageCode: "hil", meaning: "The sun, or a day.", pronunciation: "AD-law", exampleSentence: "Mainit ang adlaw subong.", usageNotes: null },
    { filipinoWord: "gabi", targetWord: "gab-i", languageCode: "hil", meaning: "Night or evening.", pronunciation: "GAB-i", exampleSentence: "Sige na, gab-i na.", usageNotes: null },
    { filipinoWord: "pagkain", targetWord: "pagkaon", languageCode: "hil", meaning: "Food; nourishment of any kind.", pronunciation: "pag-KA-on", exampleSentence: "Masarap ang pagkaon sa fiesta.", usageNotes: null },
    { filipinoWord: "kaibigan", targetWord: "abyan", languageCode: "hil", meaning: "A close friend or companion.", pronunciation: "AB-yan", exampleSentence: "Abyan ko si Pedro.", usageNotes: null },
    { filipinoWord: "lupa", targetWord: "duta", languageCode: "hil", meaning: "Land, soil, or earth.", pronunciation: "DU-ta", exampleSentence: "Maayo ang duta sa Iloilo.", usageNotes: null },
    { filipinoWord: "puso", targetWord: "puso", languageCode: "hil", meaning: "The heart.", pronunciation: "PU-so", exampleSentence: "Mapinalangga ang iya puso.", usageNotes: null },
    { filipinoWord: "langit", targetWord: "langit", languageCode: "hil", meaning: "Sky or heaven.", pronunciation: "LA-ngit", exampleSentence: "Asul ang langit subong.", usageNotes: null },
    { filipinoWord: "buwan", targetWord: "bulan", languageCode: "hil", meaning: "The moon, or a calendar month.", pronunciation: "BU-lan", exampleSentence: "Hayag ang bulan gahapon.", usageNotes: null },
  ]).onConflictDoNothing();

  console.log("Done! Database seeded.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
