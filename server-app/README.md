sim-app/
├─ client-app/                # React + Vite + TypeScript (frontend)
│  ├─ src/
│  │  ├─ App.tsx
│  │  └─ api.ts
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.ts
│
└─ server-app/                # FastAPI backend (Python 3.11+)
   ├─ main.py                 # API: /process, /models, health
   ├─ dispatcher/
   │  ├─ __init__.py
   │  ├─ base.py              # interface
   │  ├─ openai_adapter.py    # API provider example
   │  ├─ anthropic_adapter.py # API provider example
   │  └─ ollama_adapter.py    # local provider via Ollama
   ├─ processors/
   │  ├─ week1_wordfreq.py    # Week 1 placeholder (no LLM)
   │  └─ llm_summarize.py     # Week 2+ (LLM usage)
   ├─ model_registry.yaml     # Week 3 registry for dispatch
   ├─ requirements.txt
   └─ .env.example