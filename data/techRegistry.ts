/**
 * @file Curated Expanded modern Technologies Registry for Update v1.3.
 * Includes 114 modern developer tools, databases, hardware APIs, and infra runtimes,
 * configured with precise scoring metrics, synergy arrays, and conflict warnings.
 *
 * @module data/techRegistry
 */

export interface TechRegistryItem {
  id: string;
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Hosting / Infra"
    | "AI / ML"
    | "IoT / Hardware"
    | "Authentication"
    | "Payments"
    | "Analytics"
    | "Realtime / Messaging"
    | "Mobile"
    | "Blockchain / Web3"
    | "AR / VR"
    | "DevOps"
    | "Productivity APIs"
    | "Automation"
    | "Design / UI";
  tags: string[];
  compatibleSolutions: Array<
    "web-app" | "mobile-app" | "ai-solution" | "iot-product" | "platform" | "marketplace"
  >;
  difficultyScore: number; // 1 to 5
  innovationWeight: number; // hidden score impact
  executionWeight: number; // hidden score impact
  designWeight: number; // hidden score impact
  pitchWeight: number; // hidden score impact
  synergy: string[]; // related tech IDs
  conflicts: string[]; // conflicting tech IDs
}

export const TECH_REGISTRY: TechRegistryItem[] = [
  // ─── Frontend (10 items) ──────────────────────────────────────────────────
  {
    id: "reg-next",
    name: "Next.js",
    category: "Frontend",
    tags: ["react", "ssr", "serverless"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 15,
    designWeight: 12,
    pitchWeight: 10,
    synergy: ["reg-vercel", "reg-supabase", "reg-clerk", "reg-stripe"],
    conflicts: []
  },
  {
    id: "reg-react",
    name: "React",
    category: "Frontend",
    tags: ["spa", "ui", "library"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 15,
    pitchWeight: 5,
    synergy: ["reg-vercel", "reg-firebase", "reg-tailwind"],
    conflicts: []
  },
  {
    id: "reg-vue",
    name: "Vue.js",
    category: "Frontend",
    tags: ["spa", "ui", "framework"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 14,
    pitchWeight: 5,
    synergy: ["reg-netlify", "reg-supabase"],
    conflicts: []
  },
  {
    id: "reg-svelte",
    name: "Svelte",
    category: "Frontend",
    tags: ["compiler", "ui", "fast"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 8,
    executionWeight: 18,
    designWeight: 15,
    pitchWeight: 8,
    synergy: ["reg-vercel", "reg-supabase"],
    conflicts: []
  },
  {
    id: "reg-angular",
    name: "Angular",
    category: "Frontend",
    tags: ["spa", "ui", "enterprise"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 4,
    innovationWeight: 5,
    executionWeight: 12,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-firebase", "reg-gcp"],
    conflicts: []
  },
  {
    id: "reg-solid",
    name: "SolidJS",
    category: "Frontend",
    tags: ["ui", "reactive", "fast"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 3,
    innovationWeight: 12,
    executionWeight: 18,
    designWeight: 12,
    pitchWeight: 6,
    synergy: ["reg-vercel", "reg-supabase"],
    conflicts: []
  },
  {
    id: "reg-remix",
    name: "Remix",
    category: "Frontend",
    tags: ["react", "ssr", "web-standards"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 12,
    executionWeight: 14,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-flyio", "reg-prisma", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-nuxt",
    name: "Nuxt.js",
    category: "Frontend",
    tags: ["vue", "ssr", "fullstack"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 10,
    executionWeight: 14,
    designWeight: 12,
    pitchWeight: 8,
    synergy: ["reg-vercel", "reg-supabase"],
    conflicts: []
  },
  {
    id: "reg-html5",
    name: "HTML5 / Vanilla JS",
    category: "Frontend",
    tags: ["no-framework", "raw", "compatible"],
    compatibleSolutions: ["web-app", "iot-product"],
    difficultyScore: 1,
    innovationWeight: 0,
    executionWeight: 20,
    designWeight: 5,
    pitchWeight: 2,
    synergy: ["reg-arduino", "reg-esp32"],
    conflicts: ["reg-kubernetes"]
  },
  {
    id: "reg-astro",
    name: "Astro",
    category: "Frontend",
    tags: ["static", "islands", "fast"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 18,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-vercel", "reg-tailwind"],
    conflicts: []
  },

  // ─── Backend (10 items) ───────────────────────────────────────────────────
  {
    id: "reg-node",
    name: "Node.js",
    category: "Backend",
    tags: ["javascript", "runtime", "scalable"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 5,
    synergy: ["reg-react", "reg-mongodb", "reg-docker"],
    conflicts: []
  },
  {
    id: "reg-fastapi",
    name: "FastAPI",
    category: "Backend",
    tags: ["python", "async", "apis"],
    compatibleSolutions: ["web-app", "ai-solution", "platform", "iot-product"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-postgres", "reg-openai", "reg-gemini", "reg-claude"],
    conflicts: []
  },
  {
    id: "reg-go",
    name: "Go (Gin)",
    category: "Backend",
    tags: ["golang", "concurrency", "fast"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 3,
    innovationWeight: 14,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-postgres", "reg-docker", "reg-aws"],
    conflicts: []
  },
  {
    id: "reg-express",
    name: "Express.js",
    category: "Backend",
    tags: ["node", "apis", "minimalist"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 2,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 4,
    synergy: ["reg-mongodb", "reg-react"],
    conflicts: []
  },
  {
    id: "reg-nestjs",
    name: "NestJS",
    category: "Backend",
    tags: ["typescript", "modular", "architecture"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 8,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-postgres", "reg-docker"],
    conflicts: []
  },
  {
    id: "reg-rails",
    name: "Ruby on Rails",
    category: "Backend",
    tags: ["ruby", "mvc", "productivity"],
    compatibleSolutions: ["web-app", "marketplace", "platform"],
    difficultyScore: 3,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-postgres", "reg-heroku"],
    conflicts: []
  },
  {
    id: "reg-django",
    name: "Django",
    category: "Backend",
    tags: ["python", "fullstack", "admin-panel"],
    compatibleSolutions: ["web-app", "ai-solution", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 6,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-postgres", "reg-openai"],
    conflicts: []
  },
  {
    id: "reg-springboot",
    name: "Spring Boot",
    category: "Backend",
    tags: ["java", "enterprise", "robust"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 4,
    innovationWeight: 5,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-postgres", "reg-docker", "reg-aws"],
    conflicts: ["reg-arduino", "reg-esp32"]
  },
  {
    id: "reg-dotnet",
    name: "ASP.NET Core",
    category: "Backend",
    tags: ["csharp", "microsoft", "fast"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 4,
    innovationWeight: 5,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-azure", "reg-postgres"],
    conflicts: ["reg-arduino"]
  },
  {
    id: "reg-bun",
    name: "Bun",
    category: "Backend",
    tags: ["javascript", "runtime", "ultra-fast"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-react", "reg-supabase"],
    conflicts: []
  },

  // ─── Database (10 items) ──────────────────────────────────────────────────
  {
    id: "reg-postgres",
    name: "PostgreSQL",
    category: "Database",
    tags: ["relational", "sql", "robust"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 5,
    synergy: ["reg-fastapi", "reg-supabase", "reg-prisma", "reg-go"],
    conflicts: []
  },
  {
    id: "reg-mongodb",
    name: "MongoDB",
    category: "Database",
    tags: ["nosql", "document", "flexible"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 5,
    synergy: ["reg-node", "reg-express"],
    conflicts: ["reg-prisma"]
  },
  {
    id: "reg-mysql",
    name: "MySQL",
    category: "Database",
    tags: ["relational", "sql", "standard"],
    compatibleSolutions: ["web-app", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 2,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 4,
    synergy: ["reg-node"],
    conflicts: []
  },
  {
    id: "reg-sqlite",
    name: "SQLite",
    category: "Database",
    tags: ["local", "embedded", "lean"],
    compatibleSolutions: ["web-app", "mobile-app", "iot-product"],
    difficultyScore: 1,
    innovationWeight: 0,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 2,
    synergy: ["reg-arduino", "reg-esp32", "reg-raspberry"],
    conflicts: ["reg-aws"]
  },
  {
    id: "reg-redis",
    name: "Redis",
    category: "Database",
    tags: ["cache", "in-memory", "fast"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 10,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-node", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-dynamodb",
    name: "DynamoDB",
    category: "Database",
    tags: ["nosql", "serverless", "aws"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 3,
    innovationWeight: 10,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-aws"],
    conflicts: []
  },
  {
    id: "reg-cassandra",
    name: "Cassandra",
    category: "Database",
    tags: ["nosql", "distributed", "massive"],
    compatibleSolutions: ["platform"],
    difficultyScore: 5,
    innovationWeight: 15,
    executionWeight: 8,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-aws", "reg-docker"],
    conflicts: ["reg-firebase"]
  },
  {
    id: "reg-neo4j",
    name: "Neo4j",
    category: "Database",
    tags: ["graph", "network", "relations"],
    compatibleSolutions: ["platform", "ai-solution"],
    difficultyScore: 4,
    innovationWeight: 20,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-fastapi", "reg-openai"],
    conflicts: []
  },
  {
    id: "reg-couchdb",
    name: "CouchDB",
    category: "Database",
    tags: ["nosql", "sync", "offline"],
    compatibleSolutions: ["mobile-app"],
    difficultyScore: 3,
    innovationWeight: 8,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 6,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-mariadb",
    name: "MariaDB",
    category: "Database",
    tags: ["relational", "sql", "fork"],
    compatibleSolutions: ["web-app"],
    difficultyScore: 2,
    innovationWeight: 2,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 4,
    synergy: ["reg-node"],
    conflicts: []
  },

  // ─── Hosting / Infra (10 items) ───────────────────────────────────────────
  {
    id: "reg-vercel",
    name: "Vercel",
    category: "Hosting / Infra",
    tags: ["hosting", "serverless", "edge"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 20,
    designWeight: 10,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-svelte", "reg-clerk", "reg-stripe"],
    conflicts: ["reg-esp32", "reg-arduino"]
  },
  {
    id: "reg-netlify",
    name: "Netlify",
    category: "Hosting / Infra",
    tags: ["hosting", "jamstack", "fast"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-vue", "reg-react"],
    conflicts: []
  },
  {
    id: "reg-aws",
    name: "AWS",
    category: "Hosting / Infra",
    tags: ["cloud", "enterprise", "scalable"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "ai-solution", "iot-product"],
    difficultyScore: 4,
    innovationWeight: 10,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-postgres", "reg-docker", "reg-dynamodb"],
    conflicts: []
  },
  {
    id: "reg-gcp",
    name: "Google Cloud Platform",
    category: "Hosting / Infra",
    tags: ["cloud", "ai", "kubernetes"],
    compatibleSolutions: ["web-app", "ai-solution", "platform"],
    difficultyScore: 4,
    innovationWeight: 12,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-gemini", "reg-docker", "reg-firebase"],
    conflicts: []
  },
  {
    id: "reg-azure",
    name: "Microsoft Azure",
    category: "Hosting / Infra",
    tags: ["cloud", "enterprise", "windows"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 4,
    innovationWeight: 8,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-dotnet", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-render",
    name: "Render",
    category: "Hosting / Infra",
    tags: ["hosting", "paas", "simple"],
    compatibleSolutions: ["web-app", "ai-solution", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 16,
    designWeight: 6,
    pitchWeight: 8,
    synergy: ["reg-fastapi", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-heroku",
    name: "Heroku",
    category: "Hosting / Infra",
    tags: ["hosting", "paas", "classic"],
    compatibleSolutions: ["web-app", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 2,
    executionWeight: 15,
    designWeight: 6,
    pitchWeight: 8,
    synergy: ["reg-rails", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-digitalocean",
    name: "DigitalOcean",
    category: "Hosting / Infra",
    tags: ["cloud", "droplets", "simple"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-postgres", "reg-docker"],
    conflicts: []
  },
  {
    id: "reg-flyio",
    name: "Fly.io",
    category: "Hosting / Infra",
    tags: ["hosting", "edge", "containers"],
    compatibleSolutions: ["web-app", "platform", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-remix", "reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-cloudflare",
    name: "Cloudflare Pages",
    category: "Hosting / Infra",
    tags: ["hosting", "jamstack", "edge-workers"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 18,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-astro", "reg-supabase"],
    conflicts: []
  },

  // ─── AI / ML (10 items) ────────────────────────────────────────────────────
  {
    id: "reg-openai",
    name: "OpenAI API",
    category: "AI / ML",
    tags: ["ai", "gpt4", "llm"],
    compatibleSolutions: ["ai-solution", "web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 25,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 20,
    synergy: ["reg-next", "reg-pinecone", "reg-langchain", "reg-weaviate"],
    conflicts: []
  },
  {
    id: "reg-gemini",
    name: "Gemini API",
    category: "AI / ML",
    tags: ["ai", "gemini-pro", "multimodal"],
    compatibleSolutions: ["ai-solution", "web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 25,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 20,
    synergy: ["reg-fastapi", "reg-next", "reg-langchain", "reg-weaviate"],
    conflicts: []
  },
  {
    id: "reg-claude",
    name: "Claude API",
    category: "AI / ML",
    tags: ["ai", "claude3", "llm"],
    compatibleSolutions: ["ai-solution", "web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 25,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 20,
    synergy: ["reg-fastapi", "reg-next", "reg-langchain", "reg-pinecone"],
    conflicts: []
  },
  {
    id: "reg-huggingface",
    name: "Hugging Face",
    category: "AI / ML",
    tags: ["ml", "models", "open-source"],
    compatibleSolutions: ["ai-solution", "platform"],
    difficultyScore: 4,
    innovationWeight: 22,
    executionWeight: 8,
    designWeight: 5,
    pitchWeight: 15,
    synergy: ["reg-fastapi", "reg-weaviate"],
    conflicts: []
  },
  {
    id: "reg-tensorflow",
    name: "TensorFlow",
    category: "AI / ML",
    tags: ["ml", "deep-learning", "google"],
    compatibleSolutions: ["ai-solution"],
    difficultyScore: 4,
    innovationWeight: 18,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 15,
    synergy: ["reg-gcp"],
    conflicts: []
  },
  {
    id: "reg-pytorch",
    name: "PyTorch",
    category: "AI / ML",
    tags: ["ml", "deep-learning", "meta"],
    compatibleSolutions: ["ai-solution"],
    difficultyScore: 4,
    innovationWeight: 18,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 15,
    synergy: ["reg-aws"],
    conflicts: []
  },
  {
    id: "reg-langchain",
    name: "LangChain",
    category: "AI / ML",
    tags: ["ai", "agents", "orchestration"],
    compatibleSolutions: ["ai-solution", "web-app", "mobile-app"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 15,
    synergy: ["reg-openai", "reg-gemini", "reg-claude", "reg-pinecone"],
    conflicts: []
  },
  {
    id: "reg-llamaindex",
    name: "LlamaIndex",
    category: "AI / ML",
    tags: ["ai", "rag", "indexing"],
    compatibleSolutions: ["ai-solution", "web-app"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-openai", "reg-pinecone"],
    conflicts: []
  },
  {
    id: "reg-pinecone",
    name: "Pinecone",
    category: "AI / ML",
    tags: ["ai", "vector-db", "rag"],
    compatibleSolutions: ["ai-solution", "web-app", "platform"],
    difficultyScore: 3,
    innovationWeight: 18,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-openai", "reg-claude", "reg-langchain"],
    conflicts: []
  },
  {
    id: "reg-weaviate",
    name: "Weaviate",
    category: "AI / ML",
    tags: ["ai", "vector-db", "open-source"],
    compatibleSolutions: ["ai-solution", "web-app", "platform"],
    difficultyScore: 3,
    innovationWeight: 18,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-openai", "reg-gemini", "reg-huggingface"],
    conflicts: []
  },

  // ─── IoT / Hardware (10 items) ────────────────────────────────────────────
  {
    id: "reg-arduino",
    name: "Arduino",
    category: "IoT / Hardware",
    tags: ["hardware", "microcontroller", "scrappy"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 2,
    innovationWeight: 18,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-esp32", "reg-sqlite"],
    conflicts: ["reg-vercel", "reg-netlify", "reg-clerk", "reg-stripe"]
  },
  {
    id: "reg-esp32",
    name: "ESP32",
    category: "IoT / Hardware",
    tags: ["hardware", "wifi-ble", "microcontroller"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 15,
    synergy: ["reg-arduino", "reg-mqtt", "reg-tflite", "reg-ble"],
    conflicts: ["reg-vercel", "reg-netlify", "reg-clerk"]
  },
  {
    id: "reg-raspberry",
    name: "Raspberry Pi",
    category: "IoT / Hardware",
    tags: ["hardware", "sbc", "linux"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 16,
    synergy: ["reg-sqlite", "reg-opencv", "reg-mqtt"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-ros",
    name: "ROS (Robot OS)",
    category: "IoT / Hardware",
    tags: ["hardware", "robotics", "linux"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 5,
    innovationWeight: 25,
    executionWeight: 5,
    designWeight: 5,
    pitchWeight: 18,
    synergy: ["reg-raspberry"],
    conflicts: ["reg-vercel", "reg-shopify"]
  },
  {
    id: "reg-mqtt",
    name: "MQTT Broker",
    category: "IoT / Hardware",
    tags: ["iot", "protocol", "pubsub"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-esp32", "reg-raspberry", "reg-fastapi"],
    conflicts: []
  },
  {
    id: "reg-ble",
    name: "BLE (Bluetooth)",
    category: "IoT / Hardware",
    tags: ["iot", "wireless", "local"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 3,
    innovationWeight: 14,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-esp32", "reg-mobile-native"],
    conflicts: []
  },
  {
    id: "reg-lorawan",
    name: "LoRaWAN",
    category: "IoT / Hardware",
    tags: ["iot", "wireless", "long-range"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 4,
    innovationWeight: 22,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-esp32"],
    conflicts: []
  },
  {
    id: "reg-blynk",
    name: "Blynk Cloud",
    category: "IoT / Hardware",
    tags: ["iot", "dashboard", "simple"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 10,
    pitchWeight: 12,
    synergy: ["reg-esp32", "reg-arduino"],
    conflicts: []
  },
  {
    id: "reg-micropython",
    name: "MicroPython",
    category: "IoT / Hardware",
    tags: ["iot", "python", "scripting"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-esp32"],
    conflicts: []
  },
  {
    id: "reg-pico",
    name: "Raspberry Pi Pico",
    category: "IoT / Hardware",
    tags: ["hardware", "microcontroller", "cheap"],
    compatibleSolutions: ["iot-product"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-arduino"],
    conflicts: ["reg-vercel"]
  },

  // ─── Authentication (6 items) ──────────────────────────────────────────────
  {
    id: "reg-clerk",
    name: "Clerk",
    category: "Authentication",
    tags: ["auth", "saas", "user-management"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 20,
    designWeight: 15,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel", "reg-stripe"],
    conflicts: ["reg-esp32", "reg-arduino"]
  },
  {
    id: "reg-auth0",
    name: "Auth0",
    category: "Authentication",
    tags: ["auth", "enterprise", "okta"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-react", "reg-node"],
    conflicts: []
  },
  {
    id: "reg-supabaseauth",
    name: "Supabase Auth",
    category: "Authentication",
    tags: ["auth", "open-source", "postgres"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 18,
    designWeight: 10,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-supabase"],
    conflicts: []
  },
  {
    id: "reg-firebaseauth",
    name: "Firebase Auth",
    category: "Authentication",
    tags: ["auth", "google", "simple"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "iot-product"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-react", "reg-firebase", "reg-esp32", "reg-arduino"],
    conflicts: []
  },
  {
    id: "reg-kinde",
    name: "Kinde",
    category: "Authentication",
    tags: ["auth", "simple", "modern"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 20,
    designWeight: 12,
    pitchWeight: 8,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-nextauth",
    name: "NextAuth.js (Auth.js)",
    category: "Authentication",
    tags: ["auth", "nextjs", "self-hosted"],
    compatibleSolutions: ["web-app", "marketplace", "platform"],
    difficultyScore: 2,
    innovationWeight: 8,
    executionWeight: 16,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-next", "reg-postgres"],
    conflicts: []
  },

  // ─── Payments (6 items) ───────────────────────────────────────────────────
  {
    id: "reg-stripe",
    name: "Stripe Checkout",
    category: "Payments",
    tags: ["payments", "merchant", "saas"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 20,
    designWeight: 12,
    pitchWeight: 12,
    synergy: ["reg-next", "reg-vercel", "reg-clerk"],
    conflicts: ["reg-esp32", "reg-arduino"]
  },
  {
    id: "reg-paypal",
    name: "PayPal SDK",
    category: "Payments",
    tags: ["payments", "merchant", "global"],
    compatibleSolutions: ["web-app", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 2,
    executionWeight: 15,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-braintree",
    name: "Braintree",
    category: "Payments",
    tags: ["payments", "paypal", "cards"],
    compatibleSolutions: ["web-app", "mobile-app"],
    difficultyScore: 3,
    innovationWeight: 5,
    executionWeight: 15,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-node"],
    conflicts: []
  },
  {
    id: "reg-lemonsqueezy",
    name: "Lemon Squeezy",
    category: "Payments",
    tags: ["payments", "saas", "merchant-of-record"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 10,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-adyen",
    name: "Adyen",
    category: "Payments",
    tags: ["payments", "enterprise", "global"],
    compatibleSolutions: ["platform", "marketplace"],
    difficultyScore: 4,
    innovationWeight: 5,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-postgres"],
    conflicts: []
  },
  {
    id: "reg-razorpay",
    name: "Razorpay",
    category: "Payments",
    tags: ["payments", "india", "merchant"],
    compatibleSolutions: ["web-app", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-react"],
    conflicts: []
  },

  // ─── Analytics (6 items) ──────────────────────────────────────────────────
  {
    id: "reg-plausible",
    name: "Plausible",
    category: "Analytics",
    tags: ["analytics", "privacy", "lean"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 12,
    executionWeight: 18,
    designWeight: 12,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-googleanalytics",
    name: "Google Analytics (GA4)",
    category: "Analytics",
    tags: ["analytics", "standard", "google"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 2,
    executionWeight: 16,
    designWeight: 8,
    pitchWeight: 8,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    tags: ["analytics", "funnels", "cohorts"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 8,
    executionWeight: 16,
    designWeight: 10,
    pitchWeight: 10,
    synergy: ["reg-node", "reg-react"],
    conflicts: []
  },
  {
    id: "reg-amplitude",
    name: "Amplitude",
    category: "Analytics",
    tags: ["analytics", "product", "cohorts"],
    compatibleSolutions: ["web-app", "mobile-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 8,
    executionWeight: 16,
    designWeight: 10,
    pitchWeight: 10,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-posthog",
    name: "PostHog",
    category: "Analytics",
    tags: ["analytics", "session-replay", "open-source"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 16,
    designWeight: 12,
    pitchWeight: 12,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-fathom",
    name: "Fathom Analytics",
    category: "Analytics",
    tags: ["analytics", "privacy", "cookie-free"],
    compatibleSolutions: ["web-app"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 18,
    designWeight: 10,
    pitchWeight: 8,
    synergy: ["reg-next"],
    conflicts: []
  },

  // ─── Realtime / Messaging (6 items) ───────────────────────────────────────
  {
    id: "reg-socketio",
    name: "Socket.io",
    category: "Realtime / Messaging",
    tags: ["realtime", "node", "websockets"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-node", "reg-react"],
    conflicts: []
  },
  {
    id: "reg-pusher",
    name: "Pusher",
    category: "Realtime / Messaging",
    tags: ["realtime", "saas", "websockets"],
    compatibleSolutions: ["web-app", "mobile-app", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 20,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-websockets",
    name: "Native WebSockets",
    category: "Realtime / Messaging",
    tags: ["realtime", "raw", "standards"],
    compatibleSolutions: ["web-app", "iot-product", "platform"],
    difficultyScore: 3,
    innovationWeight: 10,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-fastapi", "reg-go", "reg-esp32"],
    conflicts: []
  },
  {
    id: "reg-rabbitmq",
    name: "RabbitMQ",
    category: "Realtime / Messaging",
    tags: ["queue", "amqp", "pubsub"],
    compatibleSolutions: ["platform"],
    difficultyScore: 4,
    innovationWeight: 12,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-node", "reg-docker"],
    conflicts: ["reg-firebase"]
  },
  {
    id: "reg-kafka",
    name: "Apache Kafka",
    category: "Realtime / Messaging",
    tags: ["data-stream", "events", "massive"],
    compatibleSolutions: ["platform", "ai-solution"],
    difficultyScore: 5,
    innovationWeight: 18,
    executionWeight: 10,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-go", "reg-docker", "reg-aws"],
    conflicts: ["reg-firebase", "reg-supabase"]
  },
  {
    id: "reg-ably",
    name: "Ably Realtime",
    category: "Realtime / Messaging",
    tags: ["realtime", "saas", "edge"],
    compatibleSolutions: ["web-app", "mobile-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },

  // ─── Mobile (6 items) ─────────────────────────────────────────────────────
  {
    id: "reg-reactnative",
    name: "React Native",
    category: "Mobile",
    tags: ["mobile", "cross-platform", "react"],
    compatibleSolutions: ["mobile-app", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 10,
    executionWeight: 15,
    designWeight: 15,
    pitchWeight: 12,
    synergy: ["reg-node", "reg-supabase", "reg-expo"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-flutter",
    name: "Flutter",
    category: "Mobile",
    tags: ["mobile", "dart", "cross-platform"],
    compatibleSolutions: ["mobile-app", "marketplace"],
    difficultyScore: 3,
    innovationWeight: 12,
    executionWeight: 14,
    designWeight: 18,
    pitchWeight: 12,
    synergy: ["reg-firebase"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-swift",
    name: "Swift (iOS Native)",
    category: "Mobile",
    tags: ["mobile", "apple", "native"],
    compatibleSolutions: ["mobile-app"],
    difficultyScore: 4,
    innovationWeight: 14,
    executionWeight: 12,
    designWeight: 18,
    pitchWeight: 14,
    synergy: ["reg-supabase"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-kotlin",
    name: "Kotlin (Android Native)",
    category: "Mobile",
    tags: ["mobile", "google", "native"],
    compatibleSolutions: ["mobile-app"],
    difficultyScore: 4,
    innovationWeight: 14,
    executionWeight: 12,
    designWeight: 16,
    pitchWeight: 14,
    synergy: ["reg-firebase"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-expo",
    name: "Expo",
    category: "Mobile",
    tags: ["mobile", "react-native", "scrappy"],
    compatibleSolutions: ["mobile-app", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 15,
    pitchWeight: 12,
    synergy: ["reg-reactnative", "reg-supabase"],
    conflicts: ["reg-vercel"]
  },
  {
    id: "reg-capacitor",
    name: "Capacitor",
    category: "Mobile",
    tags: ["mobile", "web-tech", "hybrid"],
    compatibleSolutions: ["mobile-app"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 16,
    designWeight: 12,
    pitchWeight: 8,
    synergy: ["reg-react", "reg-next"],
    conflicts: []
  },

  // ─── Blockchain / Web3 (6 items) ──────────────────────────────────────────
  {
    id: "reg-solidity",
    name: "Solidity (Ethereum)",
    category: "Blockchain / Web3",
    tags: ["web3", "smart-contract", "defi"],
    compatibleSolutions: ["platform"],
    difficultyScore: 4,
    innovationWeight: 25,
    executionWeight: 5,
    designWeight: 5,
    pitchWeight: 18,
    synergy: ["reg-ethers", "reg-hardhat"],
    conflicts: ["reg-firebase"]
  },
  {
    id: "reg-ethers",
    name: "Ethers.js",
    category: "Blockchain / Web3",
    tags: ["web3", "library", "react"],
    compatibleSolutions: ["web-app", "mobile-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-react", "reg-solidity"],
    conflicts: []
  },
  {
    id: "reg-web3js",
    name: "Web3.js",
    category: "Blockchain / Web3",
    tags: ["web3", "library", "javascript"],
    compatibleSolutions: ["web-app", "platform"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-solidity"],
    conflicts: []
  },
  {
    id: "reg-alchemy",
    name: "Alchemy Node",
    category: "Blockchain / Web3",
    tags: ["web3", "infra", "rpc"],
    compatibleSolutions: ["platform"],
    difficultyScore: 2,
    innovationWeight: 15,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-ethers", "reg-next"],
    conflicts: []
  },
  {
    id: "reg-hardhat",
    name: "Hardhat",
    category: "Blockchain / Web3",
    tags: ["web3", "toolchain", "testing"],
    compatibleSolutions: ["platform"],
    difficultyScore: 3,
    innovationWeight: 12,
    executionWeight: 16,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-solidity"],
    conflicts: []
  },
  {
    id: "reg-ipfs",
    name: "IPFS (File Storage)",
    category: "Blockchain / Web3",
    tags: ["web3", "storage", "decentralized"],
    compatibleSolutions: ["platform", "web-app"],
    difficultyScore: 2,
    innovationWeight: 18,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-ethers"],
    conflicts: ["reg-vercel"]
  },

  // ─── AR / VR (5 items) ────────────────────────────────────────────────────
  {
    id: "reg-threejs",
    name: "Three.js",
    category: "AR / VR",
    tags: ["vr", "3d", "webgl"],
    compatibleSolutions: ["web-app", "ai-solution"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 12,
    designWeight: 20,
    pitchWeight: 16,
    synergy: ["reg-react", "reg-next"],
    conflicts: ["reg-esp32"]
  },
  {
    id: "reg-aframe",
    name: "A-Frame",
    category: "AR / VR",
    tags: ["vr", "3d", "html-tags"],
    compatibleSolutions: ["web-app"],
    difficultyScore: 1,
    innovationWeight: 18,
    executionWeight: 18,
    designWeight: 15,
    pitchWeight: 14,
    synergy: ["reg-html5"],
    conflicts: []
  },
  {
    id: "reg-unity",
    name: "Unity AR Foundation",
    category: "AR / VR",
    tags: ["ar", "vr", "csharp"],
    compatibleSolutions: ["mobile-app", "iot-product"],
    difficultyScore: 4,
    innovationWeight: 22,
    executionWeight: 8,
    designWeight: 18,
    pitchWeight: 18,
    synergy: ["reg-mobile-native"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-unreal",
    name: "Unreal Engine",
    category: "AR / VR",
    tags: ["ar", "vr", "high-fidelity"],
    compatibleSolutions: ["mobile-app"],
    difficultyScore: 5,
    innovationWeight: 25,
    executionWeight: 5,
    designWeight: 20,
    pitchWeight: 20,
    synergy: ["reg-mobile-native"],
    conflicts: ["reg-vercel", "reg-netlify"]
  },
  {
    id: "reg-webxr",
    name: "WebXR API",
    category: "AR / VR",
    tags: ["vr", "standards", "browser"],
    compatibleSolutions: ["web-app"],
    difficultyScore: 3,
    innovationWeight: 20,
    executionWeight: 12,
    designWeight: 15,
    pitchWeight: 15,
    synergy: ["reg-threejs"],
    conflicts: []
  },

  // ─── DevOps (6 items) ─────────────────────────────────────────────────────
  {
    id: "reg-docker",
    name: "Docker",
    category: "DevOps",
    tags: ["infra", "containers", "devops"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 3,
    innovationWeight: 12,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-node", "reg-fastapi", "reg-go", "reg-aws"],
    conflicts: ["reg-firebase"]
  },
  {
    id: "reg-kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    tags: ["infra", "orchestration", "massive"],
    compatibleSolutions: ["platform"],
    difficultyScore: 5,
    innovationWeight: 18,
    executionWeight: 6,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-docker", "reg-aws"],
    conflicts: ["reg-firebase", "reg-sqlite"]
  },
  {
    id: "reg-githubactions",
    name: "GitHub Actions",
    category: "DevOps",
    tags: ["cicd", "automation", "workflow"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-vercel", "reg-docker"],
    conflicts: []
  },
  {
    id: "reg-terraform",
    name: "Terraform",
    category: "DevOps",
    tags: ["infra-as-code", "automation", "hashicorp"],
    compatibleSolutions: ["platform"],
    difficultyScore: 4,
    innovationWeight: 12,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-aws"],
    conflicts: ["reg-firebase"]
  },
  {
    id: "reg-ansible",
    name: "Ansible",
    category: "DevOps",
    tags: ["automation", "config", "simple"],
    compatibleSolutions: ["platform"],
    difficultyScore: 3,
    innovationWeight: 8,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-docker"],
    conflicts: []
  },
  {
    id: "reg-jenkins",
    name: "Jenkins",
    category: "DevOps",
    tags: ["cicd", "java", "automation"],
    compatibleSolutions: ["platform"],
    difficultyScore: 4,
    innovationWeight: 2,
    executionWeight: 12,
    designWeight: 5,
    pitchWeight: 6,
    synergy: ["reg-docker"],
    conflicts: []
  },

  // ─── Productivity APIs (6 items) ──────────────────────────────────────────
  {
    id: "reg-sendgrid",
    name: "SendGrid",
    category: "Productivity APIs",
    tags: ["email", "notification", "twillio"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-next", "reg-node"],
    conflicts: []
  },
  {
    id: "reg-twilio",
    name: "Twilio SMS",
    category: "Productivity APIs",
    tags: ["sms", "telephony", "notifications"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 8,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-node", "reg-react"],
    conflicts: []
  },
  {
    id: "reg-resend",
    name: "Resend",
    category: "Productivity APIs",
    tags: ["email", "modern", "react-email"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 8,
    pitchWeight: 10,
    synergy: ["reg-next", "reg-vercel"],
    conflicts: []
  },
  {
    id: "reg-mapbox",
    name: "Mapbox",
    category: "Productivity APIs",
    tags: ["maps", "design", "vector-tiles"],
    compatibleSolutions: ["web-app", "mobile-app", "marketplace", "iot-product"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 18,
    designWeight: 18,
    pitchWeight: 12,
    synergy: ["reg-react", "reg-next"],
    conflicts: []
  },
  {
    id: "reg-googlemaps",
    name: "Google Maps API",
    category: "Productivity APIs",
    tags: ["maps", "places", "standard"],
    compatibleSolutions: ["web-app", "mobile-app", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 12,
    pitchWeight: 10,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-slackapi",
    name: "Slack API / Webhooks",
    category: "Productivity APIs",
    tags: ["messaging", "notifications", "bots"],
    compatibleSolutions: ["web-app", "platform", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 8,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-node", "reg-fastapi"],
    conflicts: []
  },

  // ─── Automation (5 items) ─────────────────────────────────────────────────
  {
    id: "reg-zapier",
    name: "Zapier Integrations",
    category: "Automation",
    tags: ["nocode", "flows", "simple"],
    compatibleSolutions: ["web-app", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 12,
    executionWeight: 20,
    designWeight: 5,
    pitchWeight: 14,
    synergy: ["reg-openai"],
    conflicts: ["reg-docker", "reg-kubernetes"]
  },
  {
    id: "reg-make",
    name: "Make (Integromat)",
    category: "Automation",
    tags: ["nocode", "visual-flows", "powerful"],
    compatibleSolutions: ["web-app"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-postgres"],
    conflicts: ["reg-kubernetes"]
  },
  {
    id: "reg-n8n",
    name: "n8n Workflow Engine",
    category: "Automation",
    tags: ["workflow", "open-source", "apis"],
    compatibleSolutions: ["web-app", "platform", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 14,
    executionWeight: 18,
    designWeight: 5,
    pitchWeight: 12,
    synergy: ["reg-node", "reg-docker"],
    conflicts: []
  },
  {
    id: "reg-selenium",
    name: "Selenium Grid",
    category: "Automation",
    tags: ["scraping", "testing", "browser"],
    compatibleSolutions: ["platform"],
    difficultyScore: 3,
    innovationWeight: 8,
    executionWeight: 14,
    designWeight: 5,
    pitchWeight: 8,
    synergy: ["reg-docker"],
    conflicts: []
  },
  {
    id: "reg-puppeteer",
    name: "Puppeteer",
    category: "Automation",
    tags: ["browser", "scraping", "node"],
    compatibleSolutions: ["web-app", "platform", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 10,
    executionWeight: 15,
    designWeight: 5,
    pitchWeight: 10,
    synergy: ["reg-node"],
    conflicts: []
  },

  // ─── Design / UI (6 items) ────────────────────────────────────────────────
  {
    id: "reg-tailwind",
    name: "Tailwind CSS",
    category: "Design / UI",
    tags: ["styling", "css", "utility-first"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 20,
    designWeight: 18,
    pitchWeight: 8,
    synergy: ["reg-react", "reg-next", "reg-astro"],
    conflicts: []
  },
  {
    id: "reg-radix",
    name: "Radix UI",
    category: "Design / UI",
    tags: ["primitives", "react", "accessible"],
    compatibleSolutions: ["web-app", "platform", "marketplace"],
    difficultyScore: 2,
    innovationWeight: 5,
    executionWeight: 18,
    designWeight: 16,
    pitchWeight: 8,
    synergy: ["reg-react", "reg-next"],
    conflicts: []
  },
  {
    id: "reg-shadcn",
    name: "Shadcn UI",
    category: "Design / UI",
    tags: ["components", "styling", "modern"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 1,
    innovationWeight: 10,
    executionWeight: 20,
    designWeight: 20,
    pitchWeight: 12,
    synergy: ["reg-react", "reg-next", "reg-tailwind"],
    conflicts: []
  },
  {
    id: "reg-figma",
    name: "Figma Mockups",
    category: "Design / UI",
    tags: ["prototyping", "design", "ux"],
    compatibleSolutions: ["web-app", "mobile-app", "platform", "marketplace"],
    difficultyScore: 1,
    innovationWeight: 5,
    executionWeight: 16,
    designWeight: 18,
    pitchWeight: 14,
    synergy: ["reg-react", "reg-reactnative"],
    conflicts: []
  },
  {
    id: "reg-adobexd",
    name: "Adobe XD",
    category: "Design / UI",
    tags: ["prototyping", "design", "wireframes"],
    compatibleSolutions: ["web-app", "mobile-app"],
    difficultyScore: 1,
    innovationWeight: 2,
    executionWeight: 15,
    designWeight: 14,
    pitchWeight: 12,
    synergy: ["reg-react"],
    conflicts: []
  },
  {
    id: "reg-framermotion",
    name: "Framer Motion",
    category: "Design / UI",
    tags: ["animations", "react", "premium-ux"],
    compatibleSolutions: ["web-app", "platform", "marketplace", "ai-solution"],
    difficultyScore: 2,
    innovationWeight: 12,
    executionWeight: 16,
    designWeight: 20,
    pitchWeight: 12,
    synergy: ["reg-react", "reg-next", "reg-tailwind"],
    conflicts: []
  }
];

/**
 * Resolves which game compile slot ID corresponding to the game state store
 * a registry visual category maps to.
 */
export function getSlotForCategory(
  category: TechRegistryItem["category"]
): "frontend" | "backend" | "database" | "devops" | "ai" {
  switch (category) {
    case "Frontend":
    case "Design / UI":
    case "AR / VR":
      return "frontend";
    case "Backend":
    case "Automation":
    case "Realtime / Messaging":
      return "backend";
    case "Database":
    case "Blockchain / Web3":
      return "database";
    case "Hosting / Infra":
    case "DevOps":
      return "devops";
    case "AI / ML":
    case "IoT / Hardware":
    case "Authentication":
    case "Payments":
    case "Analytics":
    case "Productivity APIs":
    case "Mobile":
    default:
      return "ai";
  }
}

/** Maps a registry or store technology ID to standard store format (tech- prefix for legacy items) */
export function toStoreId(id: string): string {
  const legacyList = [
    'next', 'react', 'node', 'fastapi', 'firebase', 'supabase',
    'postgres', 'mongodb', 'aws', 'vercel', 'docker', 'gemini',
    'openai', 'esp32', 'arduino'
  ];
  const core = id.replace('reg-', '').replace('tech-', '');
  if (legacyList.includes(core)) {
    return `tech-${core}`;
  }
  return id;
}

/** Maps a store or registry technology ID to standard registry format (reg- prefix) */
export function toRegistryId(id: string): string {
  const core = id.replace('reg-', '').replace('tech-', '');
  return `reg-${core}`;
}
