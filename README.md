# 🐸 Kokak

**Kokak** is a web-based educational game inspired by **Wordle** that promotes learning and preserving Philippine languages through interactive word puzzles. To encourage community participation, players translate Filipino words into their chosen regional language while learning each word's meaning, pronunciation, and usage. Users can contribute new words that are reviewed and validated using AI before being added to the platform.

---

## 📖 Overview

The Philippines is home to more than 130 languages, yet many regional languages remain underrepresented in digital resources. Kokak aims to make language learning engaging through a familiar Wordle-style game while gradually building an open lexical resource of Philippine languages.

Rather than simply testing vocabulary, Kokak encourages users to discover new words, learn their pronunciation and context, and contribute local vocabulary from their own communities.

---

## 🎮 How It Works

1. **Choose a Language**
   - The player selects the regional language they want to translate Filipino words into.
   - Example:
     - Filipino → Cebuano
     - Filipino → Ilocano
     - Filipino → Hiligaynon

2. **Play the Word Puzzle**
   - The system randomly selects a Filipino word.
   - The player guesses its equivalent in the selected language using a simplified Wordle-style interface.
   - The puzzle is designed to be beginner-friendly and educational.

3. **Learn About the Word**
   - Once the correct answer is found, Kokak displays:
     - 📖 Meaning
     - 🔊 Pronunciation
     - 📝 Example sentence(s)
     - ℹ️ Additional usage notes

4. **Contribute New Words**
   - Players may submit words they know that are not yet included in the database.
   - Users provide:
     - Word
     - Language
     - Meaning or description
   - An AI-assisted validation process checks the submission before it is reviewed and added to the growing dictionary.

---

## ✨ Features

- 🎯 Wordle-inspired gameplay
- 🌏 Multiple Philippine dialects support
- 📚 Word definitions and translations
- 🔊 Pronunciation guide
- 📝 Example usage for every word
- 🤝 user-input word contributions

---

## 🧠 Motivation

Regional Philippine languages continue to lose speakers and digital representation. Many learners have limited access to accessible language-learning tools or open lexical resources.

Kokak aims to address this by:

- Making regional language learning enjoyable.
- Encouraging community participation via game interface.
- Preserving local vocabulary through crowdsourced contributions.
- Building a reusable lexical resource for Philippine languages.

---

## 🏗️ System Flow

```text
User
   │
   ▼
Choose Target Dialect
   │
   ▼
Receive Filipino Word
   │
   ▼
Generate Word Puzzle
   │
   ▼
Correct Answer
   │
   ├────────► Display Meaning
   │
   ├────────► Display Pronunciation
   │
   └────────► Display Example Usage
                    │
                    ▼
         Submit New Vocabulary
                    │
                    ▼
          AI Word Validation
                    │
                    ▼
          Vocabulary Database
```

---

## 🛠️ Tech Stack

### Frontend
- CSS

### Backend
- Node.js
- Express

### Database
- Supabase

### AI
- Gemini API 
- Text-to-Speech AI
- MCP
- Guardrails
- Gemini Studio

---

## 📂 Project Structure

```
frontend/
backend/
database/
public/
docs/
```

---

## 🚀 Getting Started

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/kokak run dev` — run the frontend (port 18748)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

---

## 🔮 Future Improvements

- Voice pronunciation checker
- Daily challenges
- Leaderboards
- Regional language packs
- Audio pronunciation recordings from native speakers
- Open API for Philippine language datasets
- Mobile application support

---

## 👥 Contributors

Sudo Froglets
- Shane Dela Rama
- Deanna de la Cruz
- Ashton Guevarra 
- JC Quidilla

---
