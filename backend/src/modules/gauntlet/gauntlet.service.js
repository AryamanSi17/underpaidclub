import Anthropic from '@anthropic-ai/sdk';
import User from '../../models/User.js';

const PROMPTS = [
  "You're building a B2B SaaS for small restaurants. Your first paying customer wants a feature that'll take 3 months to build, but they're threatening to cancel. You have 2 engineers and 60 days of runway. What do you do?",
  "You discover your co-founder has been taking private meetings with a top competitor behind your back. You have a big investor pitch in 48 hours. How do you handle this?",
  "Your startup's runway is 45 days. You have 3 warm leads, none closed. A VC offers bridge funding but wants 25% equity with a full ratchet clause. What's your move and why?",
  "Your MVP just went viral — 10,000 signups overnight. Your servers are down, your solo engineer quit last week, and TechCrunch wants a comment in 2 hours. Walk me through exactly what you do.",
  "You built a product for Gen Z but your only traction is with 45-year-old professionals who love it. Your investors want you to stay the course. What do you do?",
];

export const getRandomPrompt = () => {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
};

export const scoreWithClaude = async (prompt, answer) => {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are evaluating a student applicant for "The Underestimate Club" — an exclusive community for India's most ambitious student founders and hustlers.

STARTUP SCENARIO: ${prompt}

STUDENT'S RESPONSE: ${answer}

Score this response from 0–100 based on:
- Clarity of thinking (25 pts)
- Understanding of startup dynamics (25 pts)
- Decisiveness and confidence (25 pts)
- Creativity and practicality (25 pts)

Also provide exactly 3 short, specific improvement notes.

Respond ONLY with valid JSON in this exact format:
{"score": <number 0-100>, "notes": ["note1", "note2", "note3"]}`,
      },
    ],
  });

  const raw = message.content[0].text.trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude returned invalid JSON');
  return JSON.parse(jsonMatch[0]);
};

export const submitGauntlet = async (userId, answer) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (user.gauntletAttempted) throw new Error('Gauntlet already attempted');

  const prompt = user.gauntletPrompt || getRandomPrompt();
  const result = await scoreWithClaude(prompt, answer);

  user.gauntletAttempted = true;
  user.gauntletPrompt = prompt;
  user.gauntletAnswer = answer;
  user.hustleScore = result.score;
  user.hustleNotes = result.notes;
  await user.save();

  return { score: result.score, notes: result.notes };
};

export const getOrAssignPrompt = async (userId) => {
  const user = await User.findById(userId);
  if (user.gauntletAttempted) throw new Error('Gauntlet already attempted');
  if (!user.gauntletPrompt) {
    user.gauntletPrompt = getRandomPrompt();
    await user.save();
  }
  return user.gauntletPrompt;
};
