/**
 * @file Curated database of 50+ highly contextual judge comment templates.
 * Provides distinct voices and parameters matching the active project state.
 *
 * @module data/judgeComments
 */

import type { TechItem, Feature, Problem } from "@/types/game";
import { AVAILABLE_SLIDES } from "@/lib/pitchDeckEvaluator";
import { useGameStore } from "@/store/gameStore";

export interface ContextState {
  techStack: TechItem[];
  features: Feature[];
  usp: string | null;
  businessModel: string | null;
  problem: Problem | null;
  solutionDirection: string | null;
  pitchDeck?: string[];
  pitchDeckScore?: number;
  deckNarrativeQuality?: string;
  deckArchetype?: string;
  generatedBusinessModels?: any[];
  generatedAdvisorAdvice?: any[];
}

export interface CommentResult {
  comment: string;
  highlight: string;
}

/**
 * Enhanced Comments Generator for v1.4 Custom Judges Pass.
 * Features 5 distinct professional profiles: Uday Sharma, Nishika, Jitu, Bart, and Sejal.
 */
function generateJudgeFeedbackInternal(
  judgeId: string,
  score: number,
  state: ContextState
): CommentResult {
  let team: any[] = [];
  try {
    team = useGameStore.getState().team || [];
  } catch (e) {}

  const hasTeammates = team.length > 0;

  // Smart role-category detection (mirrors getRoleCategory in gameStore.ts)
  const detectRoleCategory = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('backend') || r.includes('database') || r.includes('full stack') || r.includes('fullstack') || r.includes('developer') || r.includes(' dev') || r.startsWith('dev')) return 'backend';
    if (r.includes('ai engineer') || r.includes('ai specialist') || r.includes('ml engineer') || r.includes('data scientist') || r.includes('machine learning') || (r.includes('ai') && !r.includes('assistant'))) return 'ai';
    if (r.includes('designer') || r.includes('ux') || r.includes('ui ') || r.includes('product design') || r.includes('frontend') || r.includes('front-end') || r.includes('front end')) return 'designer';
    if (r.includes('strategist') || r.includes('founder') || r.includes('business') || r.includes('co-founder') || r.includes('analyst')) return 'strategist';
    if (r.includes('pitch') || r.includes('marketing') || r.includes('sales')) return 'pitch';
    return 'general';
  };

  // Helper: get first teammate name for a given role category, fallback to generic label
  const getTeammateForRole = (category: string, fallback: string): string => {
    const found = team.find(t => detectRoleCategory(t.role || '') === category);
    return found?.name || fallback;
  };

  const primaryDev = getTeammateForRole('backend', 'the backend developer');
  const primaryDesigner = getTeammateForRole('designer', 'the designer');
  const primaryStrategist = getTeammateForRole('strategist', 'the strategist');
  const primaryAI = getTeammateForRole('ai', 'the AI engineer');

  const techIds = new Set(state.techStack.map((t) => t.id));
  const featureIds = new Set(state.features.map((f) => f.id));
  const isOverengineered = techIds.size >= 4 && state.features.length >= 4;
  const isMinimalist = state.features.length === 2 && techIds.size <= 3;
  const hasAI = techIds.has("tech-gemini") || techIds.has("tech-openai");
  const hasHardware = techIds.has("tech-esp32") || techIds.has("tech-arduino");

  // Dynamic Backlog Analysis
  const totalMustEffort = state.features.reduce((sum: number, f: any) => {
    const eff = f.effort === 'high' ? 3 : f.effort === 'medium' ? 2 : 1;
    return sum + eff;
  }, 0);

  // Check for missing dependencies
  const missingDependencyFeature = state.features.find(
    (f: any) => f.dependsOn && !state.features.some(x => x.id === f.dependsOn)
  ) as any;

  const appliedAdvice = state.generatedAdvisorAdvice ? state.generatedAdvisorAdvice.filter(a => a.status === 'applied') : [];
  const rejectedAdvice = state.generatedAdvisorAdvice ? state.generatedAdvisorAdvice.filter(a => a.status === 'rejected') : [];
  const activeModel = state.generatedBusinessModels && state.businessModel ? state.generatedBusinessModels.find(m => m.id === state.businessModel) : null;

  // ---------------------------------------------------------
  // 1. Uday Sharma (EdTech Creator & Hackathon Specialist)
  // Focus: Speed, MVPs, EdTech, practicality, actual user validation.
  // ---------------------------------------------------------
  if (judgeId === "judge-builder") {
    const ignoredTechRefactor = rejectedAdvice.some(a => a.id === 'adv-replace-tech');
    if (ignoredTechRefactor) {
      return {
        comment: "Building massive infrastructure like Kubernetes or Spring Boot for a student app is absurd. The team ignored engineering advice and built infrastructure instead of a product.",
        highlight: "Ignored backend engineering advice and built infrastructure instead of product."
      };
    }

    const ignoredScopePrune = rejectedAdvice.some(a => a.id === 'adv-reduce-scope');
    if (ignoredScopePrune) {
      return {
        comment: "The team ignored multiple warnings about scope creep, resulting in a cluttered, un-finishable presentation deck.",
        highlight: "Ignored backlog pruning advice, leading to scope creep."
      };
    }

    if (appliedAdvice.length > 0 && Math.random() > 0.4) {
      const hasDev = primaryDev !== 'the backend developer';
      return {
        comment: hasDev
          ? `The team clearly listened to strategic co-founder feedback. ${primaryDev}'s architecture decisions and feature prioritization helped secure a highly stable prototype build.`
          : "The team clearly listened to strategic co-founder feedback. Structuring your feature prioritization around active recommendations helped secure a highly stable prototype build.",
        highlight: "Refined backlog based on co-founder advice."
      };
    }

    if (state.pitchDeck) {
      const demoIdx = state.pitchDeck.indexOf('demo');
      if (demoIdx !== -1 && demoIdx > 4) {
        return {
          comment: "The demo arrived too late in the story, reducing impact. In a hackathon, you need to show the functional product before the judges lose interest.",
          highlight: "The demo arrived too late in the story, reducing impact."
        };
      }
    }

    if (missingDependencyFeature) {
      return {
        comment: `Your technical execution crashed. You built '${missingDependencyFeature.name}' but omitted its required baseline dependency '${missingDependencyFeature.dependsOnName || 'core system'}' from your Must-Have backlog.`,
        highlight: `System failed due to missing dependency: ${missingDependencyFeature.dependsOnName || 'core'}.`
      };
    }

    if (totalMustEffort > 6) {
      return {
        comment: `Your backlog contains severe scope bloat (${state.features.length} features with a heavy effort footprint). Trying to build complex modules like ${state.features.map(f => f.name).join(', ')} in a short hackathon is unrealistic.`,
        highlight: "Backlog displays severe scope bloat and high build complexity."
      };
    }

    if (score >= 90) {
      if (isMinimalist) {
        const devRef = primaryDev !== 'the backend developer' ? ` ${primaryDev} shipped it lean and clean.` : '';
        return {
          comment: `I love this minimalist approach! Good founders ship before they feel ready.${devRef} You solved the core user pain point with exactly two features and a super clean deployment. Real users can start validating this tomorrow morning.`,
          highlight: "Masterful minimalist execution with high speed-to-market focus."
        };
      }
      const devRef = primaryDev !== 'the backend developer' ? `${primaryDev} built the '${state.features[0]?.name || 'core feature'}' properly` : `The '${state.features[0]?.name || 'core feature'}' is built properly`;
      return {
        comment: `Excellent hackathon execution! ${devRef} with zero fluff. The MVP is highly practical and focused entirely on solving a real problem.`,
        highlight: "Practical product scoping with high speed-to-market value."
      };
    }
    if (score >= 70) {
      if (isOverengineered) {
        return {
          comment: `You spent too much time designing architecture and not enough time solving the user's pain. Why do you need multi-cloud clusters and complex databases for a simple prototype? Real users care about utility, not your docker registries.`,
          highlight: "Prototypes held back by early architectural overengineering."
        };
      }
      return {
        comment: "A decent functional build. It solves the core problem, but it needs a much tighter validation loop. Get it in front of a few active users immediately to see what they think.",
        highlight: "Sensible tech execution with a direct user workflow."
      };
    }
    return {
      comment: "Too much talking and planning, not enough shipping. Your prototype crashes on initial load due to unhandled database sync errors. Stop working on slides and focus on your MVP build.",
      highlight: "Unstable dependency routing and lack of functional MVP loop."
    };
  }

  // ---------------------------------------------------------
  // 2. Bart (Startup Founder)
  // Focus: Startup potential, PMF, customer discovery, differentiation.
  // ---------------------------------------------------------
  if (judgeId === "judge-founder") {
    if (activeModel && Math.random() > 0.3) {
      return {
        comment: `Excellent startup potential! Monetizing with the '${activeModel.name}' model targeting '${activeModel.customer}' is a high-margin wedge. Pricing at '${activeModel.pricingStructure.split(" // ")[0]}' feels extremely realistic for initial product-market validation.`,
        highlight: `Outstanding business strategy: ${activeModel.name}`
      };
    }

    if (state.deckArchetype === 'Engineer Deck') {
      return {
        comment: "The presentation focused heavily on implementation but never clearly explained the problem. Who is the customer and why do they desperately need this? Judges need stronger business validation.",
        highlight: "The presentation focused heavily on implementation but never clearly explained the problem."
      };
    }
    if (score >= 90) {
      if (state.usp) {
        const stratRef = primaryStrategist !== 'the strategist' ? ` ${primaryStrategist}'s business alignment on this was sharp.` : '';
        return {
          comment: `This is a venture-scale startup opportunity!${stratRef} The dynamic USP centering on '${state.usp}' is highly differentiated and solves a genuine customer pain point with an organic acquisition hook.`,
          highlight: `Outstanding, highly differentiated value proposition: ${state.usp}`
        };
      }
      const stratRef = primaryStrategist !== 'the strategist';
      return {
        comment: stratRef
          ? `Outstanding product strategy! ${primaryStrategist} spearheaded the business alignment — you've identified a massive customer pain point, validated it with a highly focused MVP, and formulated a clear growth path. This can absolutely become a real company.`
          : "Outstanding product strategy! You've identified a massive customer pain point, validated it with a highly focused MVP, and formulated a clear growth path. This can absolutely become a real company.",
        highlight: "Superb product-market fit and large initial addressable market."
      };
    }
    if (score >= 70) {
      if (state.usp) {
        return {
          comment: `The value proposition centering on '${state.usp}' has potential, but you need a much stronger customer validation moat to defend against competitors copying you.`,
          highlight: `USP has potential but lacks defensible engineering boundaries.`
        };
      }
      return {
        comment: "A solid commercial foundation, but the market feels highly niche. Focus on your wedge product first, then map out how you can scale from this tiny sector into larger adjacent opportunities.",
        highlight: "Sensible wedge positioning with modest initial market scale."
      };
    }
    return {
      comment: `This is a solution looking for a problem. Establishing a USP on '${state.usp || 'this concept'}' is extremely weak, customer discovery is absent, and the product moat is non-existent.`,
      highlight: `Muddled value proposition and absent distribution plans.`
    };
  }

  // ---------------------------------------------------------
  // 3. Nishika (Corporate Product Designer / UI-UX Specialist)
  // Focus: UI design, usability, onboarding, accessibility, user friction.
  // ---------------------------------------------------------
  if (judgeId === "judge-design") {
    if (state.pitchDeck) {
      const probIdx = state.pitchDeck.indexOf('problem');
      const solIdx = state.pitchDeck.indexOf('solution');
      if (probIdx !== -1 && solIdx !== -1 && solIdx < probIdx) {
        return {
          comment: "The solution is clear but the presentation flow felt fragmented because you didn't explain the problem before the solution.",
          highlight: "Fragmented presentation flow with solution before problem."
        };
      }
    }
    if (score >= 90) {
      const featureName = state.features[0]?.name || 'MVP modules';
      const hasRealDesigner = primaryDesigner !== 'the designer';
      return {
        comment: hasRealDesigner
          ? `A visual masterpiece! The typography scale is perfectly cohesive, interactive containers are beautifully responsive, and the screens ${primaryDesigner} designed for the '${featureName}' feature feel accessible and delightful.`
          : `A visual masterpiece! The typography scale is perfectly cohesive, interactive containers are beautifully responsive, and the screens for the '${featureName}' feature feel accessible and delightful.`,
        highlight: `Pixel-perfect visual design and frictionless workflow for ${featureName}.`
      };
    }
    if (score >= 70) {
      if (isOverengineered) {
        return {
          comment: "Impressive backend engineering, but the interface is a total cockpit. You've crammed logs, complex graphs, and dozens of options on a single dashboard, creating heavy cognitive load for the user.",
          highlight: "Cluttered visual hierarchy hampers usability."
        };
      }
      return {
        comment: "Highly functional screens with a clear layout. The buttons are highly interactive and forms are clean, though your headings would benefit from a bolder typographic contrast.",
        highlight: "Clean functional design with flat visual branding."
      };
    }
    return {
      comment: "The user flow is extremely confusing. Buttons overlap on mobile, form elements lack standard labels, and the onboarding is non-existent. You can't ignore accessibility and call it design.",
      highlight: "Heavy visual responsiveness and accessibility failures."
    };
  }

  // ---------------------------------------------------------
  // 4. Sejal (Business Analyst)
  // Focus: Monetization models, scalability, demand, sustainable revenue, risks.
  // ---------------------------------------------------------
  if (judgeId === "judge-investor") {
    if (activeModel && Math.random() > 0.3) {
      return {
        comment: `Excellent unit economics! Structuring the business strategy as a '${activeModel.name}' B2B license targeting '${activeModel.customerSegment}' shows thorough market discovery. The growth roadmap of '${activeModel.growthStrategy}' offers a highly defensible customer acquisition wedge.`,
        highlight: `Defensible commercial scaling strategy: ${activeModel.name}`
      };
    }

    if (state.pitchDeck) {
      const bizSlides = state.pitchDeck.filter(s => {
        const comp = AVAILABLE_SLIDES.find(item => item.id === s);
        return comp && comp.category === 'business';
      });
      if (bizSlides.length >= 3) {
        return {
          comment: "Strong business reasoning. The market opportunity was communicated effectively, showing clear growth paths and strategic customer acquisition wedge ideas.",
          highlight: "Strong business reasoning. The market opportunity was communicated effectively."
        };
      }
    }
    if (state.deckArchetype === 'Founder Deck') {
      return {
        comment: "Your deck archetype is a Founder Deck, which had great vision but lacked real traction metrics and business validations.",
        highlight: "Founder Deck archetype lacks analytical business metrics."
      };
    }
    if (score >= 90) {
      if (state.usp) {
        return {
          comment: `High margins, clean digital scalability. Coupling your B2B model with the differentiated strategy of '${state.usp}' makes this startup extremely capital-efficient and viable.`,
          highlight: `Capital-efficient unit economics driven by strategic USP: ${state.usp}`
        };
      }
      return {
        comment: "A highly viable business concept! Your monetization channels are planned properly, operational costs are realistic, and the customer acquisition math stands up under analyst scrutiny.",
        highlight: "Strong B2B SaaS unit economics and sustainable margins."
      };
    }
    if (score >= 70) {
      if (state.businessModel === "Freemium") {
        return {
          comment: "A sensible freemium model to capture market attention, but your premium features lack conversion triggers. Where exactly is the revenue hook that will sustain operations long-term?",
          highlight: "Reasonable freemium funnel but lacks premium monetization triggers."
        };
      }
      return {
        comment: "The business model is reasonable, but you need to demonstrate faster customer acquisition loops to capture market share before capital-heavy platforms decide to copy you.",
        highlight: "Stable pricing structure with modest expansion potential."
      };
    }
    return {
      comment: "The unit economics are completely broken. You have high development query costs, thin margins, and a tiny market with no clear revenue streams. This is not a sustainable business.",
      highlight: "Broken commercial math and high initial operational risk."
    };
  }

  // ---------------------------------------------------------
  // 5. Jitu (Professor & Academic Mentor)
  // Focus: CS fundamentals, software engineering, architecture, technical feasibility.
  // ---------------------------------------------------------
  if (judgeId === "judge-chaos") {
    if (state.pitchDeck) {
      const techIdx = state.pitchDeck.indexOf('tech-stack');
      const probIdx = state.pitchDeck.indexOf('problem');
      if (techIdx !== -1 && probIdx !== -1 && techIdx < probIdx) {
        return {
          comment: "The system architecture is solid, but the presentation slide sequencing was completely illogical—Tech Stack before Problem? That is a fundamental error.",
          highlight: "Fundamental logic failure: technical stack slide placed before problem statement."
        };
      }
    }
    if (state.deckArchetype === 'Engineer Deck') {
      return {
        comment: "The technical architecture was excellent but difficult for non-technical judges to follow. You focused heavily on developer-centric build performance but omitted human story context.",
        highlight: "The technical architecture was excellent but difficult for non-technical judges to follow."
      };
    }

    if (missingDependencyFeature) {
      return {
        comment: `Severe structural engineering faults! You integrated the advanced module '${missingDependencyFeature.name}' but omitted its baseline dependency '${missingDependencyFeature.dependsOnName || 'core'}' from your Must-Have scope, creating runtime exceptions.`,
        highlight: `Dangling promise chains and unhandled runtime exceptions from missing dependency.`
      };
    }

    if (score >= 90) {
      if (hasHardware) {
        return {
          comment: "Exceptional engineering discipline! Your low-level serial registers are beautifully managed, the firmware runs flawlessly without memory leaks, and the system is logically structured.",
          highlight: "Flawless embedded systems integration with proper data registers."
        };
      }
      return {
        comment: "A highly logical and technically sound solution. The database schema has clean indexing, the api endpoints follow standard architecture patterns, and your chosen technology stack is fully justified.",
        highlight: "Excellent systems architecture and strong engineering fundamentals."
      };
    }
    if (score >= 70) {
      if (isOverengineered) {
        return {
          comment: "The codebase displays decent technical skills, but the architecture lacks simplicity. You've introduced recursive containers and heavy frameworks when a simple SQLite script would suffice.",
          highlight: "Impressive database indexing held back by framework bloat."
        };
      }
      return {
        comment: "Solid software fundamentals. The API routes return appropriate response codes and elements are modular, though you should justify your data serialization methods more clearly.",
        highlight: "Stable modular code structures with clean interface routing."
      };
    }
    return {
      comment: "Severe engineering faults. I found numerous dangling connections, unhandled exceptions, and a complete lack of system modularity. You cannot build a scaling platform on a broken foundation.",
      highlight: "Dangling promise chains and unhandled runtime exceptions."
    };
  }

  // Final fallback
  return {
    comment: `Decent project demo. The concept is interesting, and the dynamic USP centering on '${state.usp || 'this concept'}' shows potential but requires deeper validation of features.`,
    highlight: "Standard hackathon project with balanced execution."
  };
}

export function generateJudgeFeedback(
  judgeId: string,
  score: number,
  state: ContextState
): CommentResult {
  const result = generateJudgeFeedbackInternal(judgeId, score, state);

  let contributionLogs: string[] = [];
  try {
    contributionLogs = useGameStore.getState().teamContributionLogs || [];
  } catch (e) {}

  if (contributionLogs.length > 0) {
    const extraComments: string[] = [];
    contributionLogs.forEach(log => {
      const name = log.split(" ")[0];
      if (log.includes("MongoDB") || log.includes("database")) {
        extraComments.push(`${name}'s database change improved feasibility.`);
      } else if (log.includes("pitch structure") || log.includes("pitch deck") || log.includes("slide flow") || log.includes("elevator pitch")) {
        extraComments.push(`${name}'s pitch restructuring made the story easier to follow.`);
      } else if (log.includes("AI pipeline") || log.includes("AI layer")) {
        extraComments.push(`${name}'s simplification of the AI pipeline reduced integration risk.`);
      } else if (log.includes("monetization") || log.includes("Local Sponsorship")) {
        extraComments.push(`${name}'s pivot to Local Sponsorship made the business model highly realistic.`);
      } else if (log.includes("UI scope") || log.includes("design") || log.includes("features")) {
        extraComments.push(`${name}'s UI scope adjustments made the interface cleaner.`);
      } else if (log.includes("chai") || log.includes("morale")) {
        extraComments.push(`The tea break organized by ${name} clearly kept the team's energy high.`);
      }
    });

    if (extraComments.length > 0) {
      const commentToAdd = extraComments[0];
      if (result.comment && !result.comment.includes(commentToAdd)) {
        result.comment = result.comment.trim() + " " + commentToAdd;
      }
    }
  }

  let decisions: any[] = [];
  try {
    decisions = useGameStore.getState().teammateDecisions || [];
  } catch (e) {}

  if (decisions.length > 0) {
    const extraComments: string[] = [];
    decisions.forEach(dec => {
      if (dec.status === 'accepted') {
        const name = dec.teammateName;
        const rec = (dec.recommendation || "").toLowerCase();
        
        if (name.includes("Chloe") || rec.includes("ux") || rec.includes("design") || rec.includes("layout")) {
          extraComments.push(`Chloe's UX recommendation improved clarity.`);
        } else if (name.includes("Tanmay") || rec.includes("database") || rec.includes("backend") || rec.includes("architecture")) {
          extraComments.push(`Tanmay's backend architecture decisions helped stabilize the system.`);
        } else if (name.includes("Riya") || rec.includes("ai") || rec.includes("model") || rec.includes("pipeline")) {
          extraComments.push(`Riya's AI direction and stack refinements reduced operational risk.`);
        } else if (rec.includes("pricing") || rec.includes("revenue") || rec.includes("monetization") || rec.includes("business") || rec.includes("freemium") || rec.includes("enterprise")) {
          extraComments.push(`${name}'s commercial model recommendations strengthened their pitch viability.`);
        } else {
          extraComments.push(`${name}'s strategic contribution aligned the prototype features.`);
        }
      }
    });

    if (extraComments.length > 0) {
      extraComments.forEach(commentToAdd => {
        if (result.comment && !result.comment.includes(commentToAdd)) {
          result.comment = result.comment.trim() + " " + commentToAdd;
        }
      });
    }
  }

  if (result.comment) {
    result.comment = result.comment.replace(/!/g, ".");
  }
  if (result.highlight) {
    result.highlight = result.highlight.replace(/!/g, ".");
  }

  return result;
}
