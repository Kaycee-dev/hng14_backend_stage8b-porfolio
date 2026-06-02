export type ProofLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  stage: string;
  track: "Backend" | "DevOps";
  description: string;
  stack: string[];
  built: string;
  proof: string;
  links: ProofLink[];
  evidence: string;
  team?: boolean;
  featured?: boolean;
};

export type Skill = {
  name: string;
  detail: string;
  projects: string[];
};

export const profile = {
  name: "Kelechi Uba",
  title: "Backend Engineer",
  timezone: "West Africa Time (UTC+1)",
  availability: "Open to fully remote, global roles",
  email: "kelechiuba@proton.me",
  githubLabel: "github.com/Kaycee-dev",
  githubUrl: "https://github.com/Kaycee-dev",
  linkedinText: "ng.linkedin.com/in/kelechi-uba-8368aa126",
  bio: [
    "Backend engineer who spent HNG14 building auth platforms, query engines, a durable event store, and the CI/CD and container infrastructure around them.",
    "I care about correctness under failure and writing the specific, defensible version of a claim.",
  ],
};

export const projects: Project[] = [
  {
    id: "stage8",
    name: "Append-Only Event Store",
    stage: "Stage 8",
    track: "Backend",
    featured: true,
    description:
      "FastAPI prototype that stores events in an append-only NDJSON log with direct seek-reads and recovery on startup.",
    stack: ["Python 3.11", "FastAPI", "uvicorn", "stdlib file I/O"],
    built:
      "Append path, byte-offset index, seek-read lookup, stats endpoint, and torn-tail recovery.",
    proof: "Prototype, not deployed; repo proof.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng14-backend-stage8",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - Stage 8 backend track",
  },
  {
    id: "stage3",
    name: "Insighta Labs+ Secure Access",
    stage: "Stage 3",
    track: "Backend",
    description:
      "Secure-access backend for the Insighta platform: GitHub OAuth, app-issued JWTs, RBAC, and rate limiting.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    built:
      "OAuth login, 3-minute JWT access tokens, SHA-256-stored rotating refresh tokens, RBAC, per-user rate limiting, CSV export, and Promise.allSettled enrichment fallback.",
    proof: "Repo, backend base, and web proof.",
    links: [
      {
        label: "Backend repo",
        href: "https://github.com/Kaycee-dev/insighta-stage3-backend",
      },
      {
        label: "Web proof",
        href: "https://insighta-stage3-web.vercel.app",
      },
      {
        label: "Backend base",
        href: "https://insighta-stage3-backend-production.up.railway.app",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - Stage 3 backend track",
  },
  {
    id: "stage4",
    name: "Insighta Labs+ Scaling & Optimization",
    stage: "Stage 4",
    track: "Backend",
    description:
      "Extended the Stage 3 backend with caching, streaming ingestion, and a pagination rewrite.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    built:
      "LRU/TTL cache, 1,000-row streaming CSV batches, single COUNT(*) OVER() pagination query, composite indexes, and 69/69 tests. Average response dropped from 712ms to 369ms over 2,030 rows.",
    proof: "Repo and SOLUTION.md.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng14-backend-stage4",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - Stage 4 backend track",
  },
  {
    id: "anvila",
    name: "Anvila Backend",
    stage: "Stages 5-7",
    track: "Backend",
    team: true,
    description:
      "Production-style FastAPI auth backend for the Anvila platform. Team repository.",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "asyncpg",
      "PostgreSQL",
      "Alembic",
      "Docker",
    ],
    built:
      "Authored merged PRs for GitHub OAuth link-confirmation, persona generation and clarification worker flows, admin user endpoints, skill-folder fetch/cache/publish with path-traversal protection, and Python 3.12 CI.",
    proof: "Repo and staging API/docs.",
    links: [
      {
        label: "Team repo",
        href: "https://github.com/hngprojects/anvila-backend",
      },
      {
        label: "Staging API",
        href: "https://api.staging.anvila.hng14.com",
      },
      {
        label: "API docs",
        href: "https://api.staging.anvila.hng14.com/docs",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - Anvila backend track + gh PR evidence",
  },
  {
    id: "stage2",
    name: "Intelligence Query Engine",
    stage: "Stage 2",
    track: "Backend",
    description:
      "Filterable, sortable, paginated profile API with a rule-based natural-language search parser.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    built:
      "SQL-backed filtering/sorting, pagination capped at 50/page over a 2,000+ row dataset, and a rule-based NLP query parser. node:test + supertest.",
    proof: "Repo and Railway base.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng14-stage2-backend-intelligence-query-engine",
      },
      {
        label: "Railway base",
        href: "https://hng14-stage2-backend-intelligence-query-engine-production.up.railway.app",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - Stage 2 backend track",
  },
  {
    id: "swiftdeploy",
    name: "SwiftDeploy",
    stage: "DevOps 4A/4B",
    track: "DevOps",
    description:
      "Manifest-driven deploy CLI with policy checks, metrics, chaos endpoint, and audit trail.",
    stack: ["Docker Compose", "Nginx", "OPA Rego", "Prometheus", "CI"],
    built:
      "Templated Nginx/Compose deploys, OPA gates, history.jsonl audit report, and 3-job CI with Trivy.",
    proof: "Repo proof; GCP URL not linked unless revived.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng14-devops-stage4A",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - DevOps track",
  },
  {
    id: "sandbox",
    name: "devops-sandbox",
    stage: "DevOps 5",
    track: "DevOps",
    description:
      "Self-service isolated Docker environments behind Nginx with a FastAPI control plane.",
    stack: ["FastAPI", "Docker", "Nginx", "Newman CI"],
    built:
      "Environment creation, TTL cleanup, health monitor, outage simulation, and Newman CI.",
    proof: "Repo proof; timed-out GCP URLs not linked.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/devops-sandbox",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - DevOps track",
  },
  {
    id: "ddos",
    name: "DDoS Detection Engine",
    stage: "DevOps 3",
    track: "DevOps",
    description:
      "Go daemon that watches Nginx JSON logs and reacts to abnormal traffic.",
    stack: ["Go stdlib", "Nginx", "iptables", "Slack alerts"],
    built:
      "Sliding windows, 30-minute baseline, z-score detection, DROP/backoff unban, Slack alerts, and dashboard.",
    proof: "Repo proof; timed-out dashboard not linked.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng-stage3-devops-devsecops-ddos-detector",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - DevOps track",
  },
  {
    id: "jobs",
    name: "Containerized Job System",
    stage: "DevOps 2",
    track: "DevOps",
    description:
      "Fork-and-fix containerization task with application defects and infra gaps documented in a fixes ledger.",
    stack: ["Docker", "Compose", "pytest", "CI", "Redis queue"],
    built:
      "Fixed 18 app defects and 8 infra gaps, then added non-root Dockerfiles, health-gated Compose, pytest coverage, and 6-stage CI.",
    proof: "Repo proof.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/Kaycee-dev/hng14-stage2-devops",
      },
    ],
    evidence: "04_EVIDENCE_LEDGER.md - DevOps track",
  },
];

export const skills: Skill[] = [
  {
    name: "REST API design",
    detail: "Contract-first endpoints.",
    projects: ["stage8", "stage4", "stage3", "stage2", "anvila"],
  },
  {
    name: "Authentication",
    detail: "OAuth, JWT plus rotating refresh, link-confirmation.",
    projects: ["stage3", "anvila"],
  },
  {
    name: "RBAC",
    detail: "Admin/analyst enforcement.",
    projects: ["stage3", "anvila"],
  },
  {
    name: "PostgreSQL",
    detail: "pg.Pool/asyncpg, Alembic, indexes, window functions.",
    projects: ["stage2", "stage3", "stage4", "anvila"],
  },
  {
    name: "Caching",
    detail: "LRU/TTL query cache.",
    projects: ["stage4"],
  },
  {
    name: "Performance optimization",
    detail: "Measured 712ms to 369ms pagination rewrite.",
    projects: ["stage4"],
  },
  {
    name: "Streaming ingestion",
    detail: "Busboy plus csv-parse batches.",
    projects: ["stage4"],
  },
  {
    name: "Rate limiting",
    detail: "Per-user limiter.",
    projects: ["stage3"],
  },
  {
    name: "Testing",
    detail: "pytest, node:test, supertest.",
    projects: ["stage8", "stage4", "stage3", "jobs", "anvila"],
  },
  {
    name: "Durability",
    detail: "Torn-tail recovery.",
    projects: ["stage8"],
  },
  {
    name: "Deployment and CI/CD",
    detail: "Railway, staging API, Compose, Trivy, Newman.",
    projects: ["stage2", "stage3", "anvila", "swiftdeploy", "sandbox", "jobs"],
  },
  {
    name: "Redis-backed job queue",
    detail: "LPUSH/BRPOP queue framing.",
    projects: ["jobs"],
  },
];

export const featured = {
  title: "Stage 8 - Append-Only Event Store",
  problem:
    "Store events durably with O(1) reads and survive crashes mid-write without a database. The log file is the database.",
  flow: [
    "POST /events -> EventStore.append() -> asyncio write-lock -> append one UTF-8 JSON line to events.log -> record {id: (byte-offset, length)} in memory.",
    "GET /events/{id} -> index lookup -> seek(offset) -> read(length). No scan.",
    "Startup -> lifespan hook -> recover() replays the log to rebuild the index.",
  ],
  modules: [
    "app/main.py - FastAPI app, lifespan, routes",
    "app/event_store.py - append, get, stats, recover",
  ],
  endpoints: [
    "POST /events - 201 plus stamped UUID and ISO timestamp",
    "GET /events/{id} - seek-read, 404 if unknown",
    "GET /stats - total and bytes under write-lock",
  ],
  challenge:
    "After a crash, the last log line may be a torn partial write, which looks identical to corruption. recover() resolves the ambiguity by position: an unparseable last line is treated as a torn tail; an unparseable non-last line means a committed record is corrupt and fails loud.",
  caveat:
    "Prototype: in-memory index, no auth, not deployed; recovery rebuilds the index from the log on restart.",
};

export const reflection = [
  "The Stage 4 optimization made the rule concrete: measure before calling something faster. The pagination rewrite moved average response time from 712ms to 369ms over 2,030 rows.",
  "The Stage 8 event store made failure semantics less abstract: recovery treats a torn last line differently from a corrupted committed record.",
  "Anvila forced more careful wording. In a team repo, the honest claim is the merged PR surface I authored, not ownership of the whole backend.",
];
