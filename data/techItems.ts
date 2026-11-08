/**
 * @file Curated Technology Items & Synergy Weights Pool
 *
 * Defines the static pool of 15 frameworks, databases, platforms, and hardware cards.
 * Includes explicit synergy lists and hidden scoring modifiers.
 *
 * @module data/techItems
 */

import type { TechItem } from '@/types/game';

export const TECH_POOL: TechItem[] = [
  // ─── Frontend ─────────────────────────────────────────────────────────────
  {
    id: 'tech-next',
    name: 'Next.js',
    icon: 'layers',
    category: 'frontend',
    difficulty: 2,
    synergies: ['tech-vercel', 'tech-supabase', 'tech-openai'],
  },
  {
    id: 'tech-react',
    name: 'React',
    icon: 'layers',
    category: 'frontend',
    difficulty: 2,
    synergies: ['tech-vercel', 'tech-firebase', 'tech-node'],
  },

  // ─── Backend ──────────────────────────────────────────────────────────────
  {
    id: 'tech-node',
    name: 'Node.js',
    icon: 'server',
    category: 'backend',
    difficulty: 2,
    synergies: ['tech-react', 'tech-mongodb', 'tech-docker'],
  },
  {
    id: 'tech-fastapi',
    name: 'FastAPI',
    icon: 'server',
    category: 'backend',
    difficulty: 2,
    synergies: ['tech-postgres', 'tech-gemini', 'tech-docker'],
  },

  // ─── Database ──────────────────────────────────────────────────────────────
  {
    id: 'tech-firebase',
    name: 'Firebase',
    icon: 'database',
    category: 'database',
    difficulty: 1,
    synergies: ['tech-react'],
  },
  {
    id: 'tech-supabase',
    name: 'Supabase',
    icon: 'database',
    category: 'database',
    difficulty: 2,
    synergies: ['tech-next', 'tech-postgres'],
  },
  {
    id: 'tech-postgres',
    name: 'PostgreSQL',
    icon: 'database',
    category: 'database',
    difficulty: 3,
    synergies: ['tech-fastapi', 'tech-supabase', 'tech-aws'],
  },
  {
    id: 'tech-mongodb',
    name: 'MongoDB',
    icon: 'database',
    category: 'database',
    difficulty: 2,
    synergies: ['tech-node'],
  },

  // ─── Hosting (DevOps) ──────────────────────────────────────────────────────
  {
    id: 'tech-aws',
    name: 'AWS',
    icon: 'cloud',
    category: 'devops',
    difficulty: 4,
    synergies: ['tech-docker', 'tech-postgres'],
  },
  {
    id: 'tech-vercel',
    name: 'Vercel',
    icon: 'cloud',
    category: 'devops',
    difficulty: 1,
    synergies: ['tech-next', 'tech-react'],
  },
  {
    id: 'tech-docker',
    name: 'Docker',
    icon: 'container',
    category: 'devops',
    difficulty: 3,
    synergies: ['tech-node', 'tech-fastapi', 'tech-aws'],
  },

  // ─── Special Tech (AI & Hardware) ──────────────────────────────────────────
  {
    id: 'tech-gemini',
    name: 'Gemini API',
    icon: 'brain',
    category: 'ai',
    difficulty: 3,
    synergies: ['tech-fastapi', 'tech-next'],
  },
  {
    id: 'tech-openai',
    name: 'OpenAI API',
    icon: 'brain',
    category: 'ai',
    difficulty: 3,
    synergies: ['tech-next', 'tech-node'],
  },
  {
    id: 'tech-esp32',
    name: 'ESP32',
    icon: 'hexagon',
    category: 'ai',
    difficulty: 4,
    synergies: ['tech-arduino'],
  },
  {
    id: 'tech-arduino',
    name: 'Arduino',
    icon: 'hexagon',
    category: 'ai',
    difficulty: 3,
    synergies: ['tech-esp32'],
  },
];

export interface HiddenScoreWeights {
  innovation: number;
  feasibility: number; // execution
  design: number;
  pitchPotential: number; // pitch
}

/** Hidden scoring modifiers associated with each technology item */
export const TECH_WEIGHTS: Record<string, HiddenScoreWeights> = {
  'tech-next': { innovation: 10, feasibility: 15, design: 12, pitchPotential: 10 },
  'tech-react': { innovation: 5, feasibility: 15, design: 15, pitchPotential: 5 },
  'tech-node': { innovation: 5, feasibility: 15, design: 5, pitchPotential: 5 },
  'tech-fastapi': { innovation: 10, feasibility: 15, design: 5, pitchPotential: 5 },
  'tech-firebase': { innovation: 5, feasibility: 20, design: 5, pitchPotential: 5 },
  'tech-supabase': { innovation: 12, feasibility: 18, design: 5, pitchPotential: 10 },
  'tech-postgres': { innovation: 5, feasibility: 15, design: 5, pitchPotential: 5 },
  'tech-mongodb': { innovation: 5, feasibility: 15, design: 5, pitchPotential: 5 },
  'tech-aws': { innovation: 10, feasibility: 12, design: 5, pitchPotential: 10 },
  'tech-vercel': { innovation: 8, feasibility: 20, design: 10, pitchPotential: 10 },
  'tech-docker': { innovation: 12, feasibility: 12, design: 5, pitchPotential: 8 },
  'tech-gemini': { innovation: 25, feasibility: 10, design: 5, pitchPotential: 20 },
  'tech-openai': { innovation: 25, feasibility: 10, design: 5, pitchPotential: 20 },
  'tech-esp32': { innovation: 20, feasibility: 8, design: 5, pitchPotential: 15 },
  'tech-arduino': { innovation: 18, feasibility: 10, design: 5, pitchPotential: 12 },
};
