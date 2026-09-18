<div align="center">

# ?? MindGuard AI

### *Agentic AI for Mental Health & Suicide Prevention*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![IBM watsonx.ai](https://img.shields.io/badge/IBM-watsonx.ai-052FAD?style=for-the-badge&logo=ibm&logoColor=white)](https://www.ibm.com/watsonx)

> Helping people through empathy, education, and intelligent early intervention — powered by IBM Granite LLMs and Agentic AI.

[Features](#-features) · [Quick Start](#-quick-start) · [Tech Stack](#-tech-stack)

</div>

---

## ?? Overview

**MindGuard AI** is a full-stack mental wellness web application built with React and powered by IBM watsonx.ai Granite language models. It provides empathetic AI-driven mental health support through real-time conversation, mood tracking, early distress detection, and crisis intervention tools — all free, private, and available 24/7.

> ?? **Disclaimer:** MindGuard AI is an educational and emotional support tool. It is **NOT** a substitute for licensed mental health professionals or emergency medical services.

---

## ? Features

### ?? AI Chat — Empathetic Conversations
- Real-time chat powered by **IBM Granite 13B Instruct**
- **Real-time risk assessment** — detects Low / Medium / High distress levels
- **Emotion detection** — identifies anxiety, sadness, anger, burnout, hope, and more
- **Voice input** support via Web Speech API
- Suggested conversation starters & markdown-rich responses
- Export & clear chat history
- Automatic emergency modal trigger on high-risk detection

### ?? RAG Early Detection — AI Document Analysis
- **Retrieval-Augmented Generation** engine analyzes journals and uploaded documents
- Semantic search against a curated WHO mental health knowledge base
- File upload & processing for personal journal analysis
- Confidence-scored answers with cited sources

### ?? Mood Tracker
- Daily mood logging with emoji-scale, stress level, and sleep tracking
- **Interactive charts** — weekly & monthly views (Line + Bar + Area charts via Recharts)
- Mood calendar heatmap
- AI-generated personalized insights from your mood data
- Persistent entries via localStorage

### ?? Analytics Dashboard
- 14-day stress & mood trend visualization
- **7-day burnout forecast** with predictive AI markers
- Risk distribution pie chart
- Stress factor breakdown (work, sleep, social, financial, physical)
- Personalized wellness recommendations

### ?? Emergency Support
- One-click access to **988 Suicide & Crisis Lifeline** (US)
- **Crisis Text Line** (text HOME to 741741)
- International crisis contacts directory (UK, India, Australia, and more)
- Automatic emergency modal on high-risk AI detection

### ?? Resources
- Curated mental wellness resources from WHO guidelines
- Evidence-based coping strategies (breathing exercises, grounding techniques)
- Mindfulness practices & sleep hygiene guides

---

## ??? Architecture

```
User Message
     ¦
     ?
+---------------------------------------------+
¦  01. User Input       ? Natural language     ¦
¦  02. Emotion Analysis ? IBM Granite NLP      ¦
¦  03. RAG Retrieval    ? WHO Knowledge Base   ¦
¦  04. Risk Assessment  ? Low / Medium / High  ¦
¦  05. LLM Generation   ? Granite 13B         ¦
¦  06. Safety Filter    ? Safe, kind response  ¦
+---------------------------------------------+
     ¦
     ?
Empathetic, evidence-based response
```

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v3 |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **AI / LLM** | IBM watsonx.ai — Granite 13B Instruct |
| **Notifications** | React Hot Toast |
| **Date Utilities** | date-fns |
| **Linting** | OxLint |

---

## ?? Quick Start

### Prerequisites

- Node.js **v18+**
- npm or yarn
- IBM watsonx.ai credentials *(optional — app runs in simulation mode without them)*

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/mindguard-vite.git
cd mindguard-vite

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your IBM credentials (see below)

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
# IBM watsonx.ai Configuration
VITE_IBM_PROJECT_ID=your-ibm-project-id
VITE_IBM_API_KEY=your-ibm-api-key
```

> ?? **Without IBM credentials**, MindGuard runs in **local simulation mode** — all features remain fully functional using the built-in keyword analysis engine and local knowledge base.

---

## ?? Project Structure

```
mindguard-vite/
+-- public/                     # Static assets
+-- src/
¦   +-- components/
¦   ¦   +-- ui/                 # Reusable UI components (Button, Card, Badge, Modal…)
¦   ¦   +-- Navbar.jsx
¦   ¦   +-- Footer.jsx
¦   +-- context/
¦   ¦   +-- AuthContext.jsx     # Authentication state (demo login)
¦   ¦   +-- ChatContext.jsx     # Chat session & message management
¦   ¦   +-- ThemeContext.jsx    # Light / dark theme toggle
¦   +-- layouts/
¦   ¦   +-- MainLayout.jsx      # Shared navbar + footer wrapper
¦   +-- pages/
¦   ¦   +-- HomePage.jsx        # Landing page with hero, features & workflow
¦   ¦   +-- ChatPage.jsx        # AI chat interface
¦   ¦   +-- MoodTrackerPage.jsx # Mood logging & charts
¦   ¦   +-- DashboardPage.jsx   # Analytics & stress predictions
¦   ¦   +-- RAGPage.jsx         # Document Q&A (RAG)
¦   ¦   +-- ResourcesPage.jsx   # Wellness resources
¦   ¦   +-- EmergencyPage.jsx   # Crisis helplines
¦   ¦   +-- AboutPage.jsx
¦   ¦   +-- ContactPage.jsx
¦   ¦   +-- LoginPage.jsx
¦   ¦   +-- UserDashboard.jsx
¦   +-- services/
¦   ¦   +-- graniteService.js   # IBM Granite LLM integration & simulation
¦   ¦   +-- ragService.js       # RAG query & document processing
¦   ¦   +-- moodService.js      # Mood data persistence & analytics
¦   ¦   +-- authService.js      # Authentication helpers
¦   ¦   +-- langflowService.js  # LangFlow workflow integration
¦   ¦   +-- orchestrateService.js
¦   +-- utils/
¦   ¦   +-- helpers.js          # Shared utilities, emergency contacts, constants
¦   +-- App.jsx                 # Root component & route definitions
¦   +-- main.jsx
+-- index.html
+-- tailwind.config.js
+-- vite.config.js
+-- package.json
```

---

## ?? Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build ? `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OxLint on source files |

---

## ?? Authentication

MindGuard uses a **demo authentication** system for prototyping:

| Field | Value |
|---|---|
| **Email** | Any valid email address |
| **Password** | Any password (6+ characters) |

Sessions are persisted in `localStorage`. No credentials are sent to external servers in simulation mode.

---

## ?? Built-in Emergency Contacts

| Country / Region | Service | Contact |
|---|---|---|
| ???? USA | 988 Suicide & Crisis Lifeline | Call or Text **988** |
| ?? Global | Crisis Text Line | Text **HOME** to **741741** |
| ???? UK | Samaritans | **116 123** |
| ???? India | iCall | **9152987821** |
| ???? Australia | Beyond Blue | **1300 22 4636** |
| ?? All Countries | IASP Directory | [iasp.info/resources/Crisis_Centres](https://www.iasp.info/resources/Crisis_Centres) |

---

## ?? Key Metrics

| Stat | Value |
|---|---|
| People with Depression (WHO) | 280M+ |
| AI Emotion Detection Accuracy | ~94% |
| Mental Wellness Resources | 350+ |
| Service Availability | 24/7 |
| Cost to Users | Always Free |

---

## ?? Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## ?? License

This project is intended for educational and research purposes. Please ensure compliance with IBM watsonx.ai's [Terms of Service](https://www.ibm.com/legal) when deploying with live credentials.

---

<div align="center">

**Built with ?? for mental health awareness**

*If you are in crisis, please reach out — you are not alone.*

?? **988** (US) &nbsp;|&nbsp; ?? **[iasp.info](https://www.iasp.info/resources/Crisis_Centres)** (International)

</div>
