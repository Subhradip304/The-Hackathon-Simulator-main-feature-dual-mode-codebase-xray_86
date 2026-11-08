import { TECH_REGISTRY, TechRegistryItem } from '../data/techRegistry';

export interface Recommendation {
  techIds: string[];
  why: string;
}

/**
 * Returns a customized recommendation of 3 to 5 tech IDs and an explanation
 * of why they fit the chosen combination of Solution Direction, USP, and optional Problem Category.
 */
export function getRecommendations(
  solutionDirection: string | null,
  usp: string | null,
  problemCategory?: string | null
): Recommendation {
  const sol = solutionDirection || 'web-app';
  const u = usp || 'Fastest';

  let baseRecommendation: Recommendation = {
    techIds: ['reg-next', 'reg-vercel', 'reg-postgres'],
    why: "A balanced, production-ready stack offering strong execution and design foundation suitable for general hackathon submissions."
  };

  // 1. Web App Combinations
  if (sol === 'web-app') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-vercel', 'reg-supabase', 'reg-tailwind'],
          why: "Next.js on Vercel enables instant Server-Side Rendering (SSR) and edge caching, paired with Supabase's real-time Postgres for lightning fast response times."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-react', 'reg-netlify', 'reg-sqlite', 'reg-tailwind'],
          why: "Vanilla React hosted on Netlify's free tier with a local SQLite store minimizes cloud costs completely while delivering a responsive developer experience."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-aws', 'reg-postgres', 'reg-redis'],
          why: "A robust multi-region deployment on AWS using PostgreSQL and Redis caching ensures your web app can comfortably scale to millions of requests."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-vercel', 'reg-openai', 'reg-pinecone'],
          why: "OpenAI integrated seamlessly with Next.js API routes and Pinecone vector database for high-performance retrieval-augmented generation (RAG)."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-astro', 'reg-vercel', 'reg-supabase', 'reg-tailwind'],
          why: "Astro compiles to pure HTML with zero client-side JavaScript by default, significantly reducing server execution times and client carbon footprint."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-vercel', 'reg-postgres', 'reg-framermotion'],
          why: "Framer Motion micro-animations combined with Next.js dynamic routing and customized database profiles create a highly engaging, custom-tailored user experience."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-socketio', 'reg-postgres', 'reg-tailwind'],
          why: "Real-time interactive features powered by Socket.io and stable PostgreSQL profiles build trust and encourage massive community engagement."
        };
        break;
    }
  }

  // 2. Mobile App Combinations
  else if (sol === 'mobile-app') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-reactnative', 'reg-firebase', 'reg-figma', 'reg-tailwind'],
          why: "React Native allows shipping to iOS and Android from a single codebase, combined with Firebase's rapid SDK setup for authentication and storage."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-flutter', 'reg-sqlite', 'reg-figma'],
          why: "Flutter enables beautiful pixel-perfect widgets running locally on SQLite, completely bypassing expensive cloud database and hosting tiers."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-swiftui', 'reg-aws', 'reg-postgres', 'reg-docker'],
          why: "Native SwiftUI client backed by Go microservices running in Docker containers on AWS ECS ensures extreme performance under heavy load."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-reactnative', 'reg-gemini', 'reg-supabase', 'reg-langchain'],
          why: "React Native integrated with Google's Gemini API via LangChain orchestration provides low-latency multi-modal intelligence directly on user devices."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-reactnative', 'reg-sqlite', 'reg-figma'],
          why: "Native device storage and lightweight cross-platform rendering keep network transfers minimal, reducing wireless energy consumption."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-reactnative', 'reg-firebase', 'reg-framermotion', 'reg-figma'],
          why: "Fluid gesture animations via Framer Motion coupled with dynamic Firebase user segmentation provide an extremely responsive, tailored interface."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-reactnative', 'reg-socketio', 'reg-supabase'],
          why: "Real-time mesh synchronization using Socket.io and Supabase auth keeps your community connected in active channels."
        };
        break;
    }
  }

  // 3. AI Solution Combinations
  else if (sol === 'ai-solution') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-openai', 'reg-vercel', 'reg-langchain'],
          why: "FastAPI server utilizing OpenAI's pre-trained GPT models hosted on Vercel enables prototype development within hours."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-gemini', 'reg-render'],
          why: "Deploying FastAPI on Render's entry tier and leveraging Google's generous Gemini free API tokens maintains a rock-bottom development budget."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-claude', 'reg-aws', 'reg-weaviate'],
          why: "Enterprise AI architecture powered by Claude, orchestrated on AWS with Weaviate vector index clustering, guarantees enterprise scale."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-openai', 'reg-langchain', 'reg-pinecone'],
          why: "The ultimate AI cocktail: OpenAI LLM, LangChain conversational agents, and Pinecone vector search for perfect contextual memory."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-gemini', 'reg-render'],
          why: "Google's carbon-neutral GCP data centers hosting the efficient Gemini API keep computational energy offsets optimal."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-openai', 'reg-pinecone', 'reg-weaviate'],
          why: "Vector search filtering via Pinecone and customized dynamic system prompts via OpenAI enable individual-level persona learning."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-fastapi', 'reg-openai', 'reg-langchain'],
          why: "Multi-agent collaborative loops orchestrated via LangChain generate interactive group responses for cooperative networks."
        };
        break;
    }
  }

  // 4. IoT Hardware Product Combinations
  else if (sol === 'iot-product') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-arduino', 'reg-sqlite', 'reg-figma'],
          why: "Arduino's massive community package ecosystem paired with local SQLite storage enables physical breadboard validation in minutes."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-arduino', 'reg-sqlite', 'reg-cpp'],
          why: "Bare-metal C++ code running on cheap Arduino chips using local micro-SD storage bypasses expensive cloud hosting subscriptions."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-esp32', 'reg-mqtt', 'reg-aws', 'reg-postgres'],
          why: "ESP32 microcontrollers pushing data via MQTT protocols to AWS IoT Core, storing streams in Postgres, supports thousands of simultaneous sensors."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-raspberry', 'reg-tflite', 'reg-opencv'],
          why: "TensorFlow Lite running on a Raspberry Pi for edge machine learning, coupled with OpenCV for real-time computer vision without cloud latency."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-esp32', 'reg-ble', 'reg-sqlite'],
          why: "ESP32 in deep-sleep mode transmitting data via Bluetooth Low Energy (BLE) maximizes battery life and reduces absolute power usage."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-raspberry', 'reg-arduino', 'reg-tflite'],
          why: "On-device TF Lite neural model adjustments let the hardware item learn custom user habits locally, enhancing comfort and privacy."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-esp32', 'reg-mqtt', 'reg-raspberry'],
          why: "Decentralized MQTT broker mesh utilizing ESP32 clients creates a local resilient mesh network that works independently of global internet access."
        };
        break;
    }
  }

  // 5. Service Platform Combinations
  else if (sol === 'platform') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-vercel', 'reg-supabase', 'reg-postgres'],
          why: "Next.js dynamic routing deployed instantly to Vercel connected to auto-scaling Supabase databases enables launching platforms in a day."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-express', 'reg-mongodb', 'reg-render'],
          why: "Lightweight Express.js backend backed by MongoDB Atlas free tier deployed on Render minimizes baseline subscription costs."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-go', 'reg-postgres', 'reg-docker', 'reg-kubernetes'],
          why: "High-concurrency Go services built into Docker containers and clustered on Kubernetes ensure zero-downtime horizontal scaling."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-go', 'reg-openai', 'reg-pinecone', 'reg-weaviate'],
          why: "High-speed Go API gateways orchestrating massive parallel requests to OpenAI and Pinecone vector pools for platform-wide cognitive search."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-go', 'reg-postgres', 'reg-docker'],
          why: "Compiled Go binaries execute extremely fast with minimal CPU cycles, drastically reducing carbon emissions compared to heavy scripting runtimes."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-redis', 'reg-postgres', 'reg-tailwind'],
          why: "Redis in-memory store keeps user preferences warm, enabling instantaneous customized dashboard views on Next.js platforms."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-socketio', 'reg-postgres', 'reg-supabase'],
          why: "Supabase real-time events paired with Socket.io web socket rooms provide instant platform updates to all active community nodes."
        };
        break;
    }
  }

  // 6. Trading Marketplace Combinations
  else if (sol === 'marketplace') {
    switch (u) {
      case 'Fastest':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-vercel', 'reg-stripe', 'reg-clerk'],
          why: "Next.js dynamic routing with instant Stripe Checkout and pre-built Clerk auth components cuts development time to a fraction."
        };
        break;
      case 'Cheapest':
        baseRecommendation = {
          techIds: ['reg-express', 'reg-stripe', 'reg-mongodb', 'reg-render'],
          why: "Express.js utilizing Stripe APIs on Render with MongoDB keeps transaction database fees negligible until you make actual sales."
        };
        break;
      case 'Most Scalable':
        baseRecommendation = {
          techIds: ['reg-go', 'reg-postgres', 'reg-stripe', 'reg-docker'],
          why: "High-frequency transaction ledger in Go backed by PostgreSQL transaction isolation, prepared to handle millions in processing volume."
        };
        break;
      case 'AI-powered':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-openai', 'reg-stripe', 'reg-pinecone'],
          why: "Dynamic market matchmakers powered by OpenAI semantic search on Pinecone index, charging users via usage-based Stripe subscriptions."
        };
        break;
      case 'Sustainable':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-stripe', 'reg-supabase', 'reg-vercel'],
          why: "Sustainable commerce using automated Stripe climate donation pipelines and green edge servers hosted on Vercel's cloud infrastructure."
        };
        break;
      case 'Hyper-personalized':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-stripe', 'reg-postgres', 'reg-framermotion'],
          why: "Framer Motion animated shopping lists coupled with Postgres purchase history algorithms display tailored, custom-fit buying options."
        };
        break;
      case 'Community-first':
        baseRecommendation = {
          techIds: ['reg-next', 'reg-socketio', 'reg-stripe', 'reg-postgres'],
          why: "Peer-to-peer real-time negotiations using Socket.io and secure escrow transactions managed through Stripe build deep user community trust."
        };
        break;
    }
  }

  // Append dynamic domain-aware reasoning based on problem category
  let whyExtra = "";
  if (problemCategory) {
    const pc = problemCategory.toLowerCase();
    if (pc === 'edtech') {
      whyExtra = " Optimized for classroom metrics and distributed pupil response routing.";
    } else if (pc === 'healthtech') {
      whyExtra = " Engineered to align with medical record encryption frameworks.";
    } else if (pc === 'fintech') {
      whyExtra = " Secured for high-fidelity transaction bookkeeping and accounting audit lines.";
    } else if (pc === 'sustainability') {
      whyExtra = " Engineered to minimize carbon footprints and maximize green-hosting server offsets.";
    } else if (pc === 'ai') {
      whyExtra = " Configured for low-latency retrieval-augmented cognitive pipelining.";
    } else if (pc === 'smart-campus') {
      whyExtra = " Customized for university mesh networks and real-time localized campus alerts.";
    } else if (pc === 'social-impact') {
      whyExtra = " Structured to encourage community trust and open public audit trails.";
    }
  }

  return {
    techIds: baseRecommendation.techIds,
    why: baseRecommendation.why + whyExtra
  };
}
