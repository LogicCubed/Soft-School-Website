import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Conflict Resolution", imageSrc: "/conflictresolution.svg" },
      { id: 2, title: "Problem Solving", imageSrc: "/problemsolving.svg" },
      { id: 3, title: "Teamwork", imageSrc: "/teamwork.svg" },
      { id: 4, title: "Speaking", imageSrc: "/speaking.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn how to listen for Conflict Resolution",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Unit 2",
        description: "Learn about feelings in Conflict Resolution",
        order: 2,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Lesson 1" },
      { id: 2, unitId: 1, order: 2, title: "Lesson 2" },
      { id: 3, unitId: 1, order: 3, title: "Lesson 3" },
      { id: 4, unitId: 1, order: 4, title: "Lesson 4" },
      { id: 5, unitId: 1, order: 5, title: "Lesson 5" },
      { id: 6, unitId: 2, order: 6, title: "Lesson 1" },
      { id: 7, unitId: 2, order: 7, title: "Lesson 2" },
    ]);

await db.insert(schema.challenges).values([
  {
    id: 1,
    lessonId: 1,
    type: "SORT",
    order: 1,
    question:
      "Your friend Alex is stressed about a group project.",
    callToAction: "Drag and drop the options into the correct categories.",
  },
  {
    id: 2,
    lessonId: 1,
    type: "TRUE_FALSE",
    order: 2,
    question: "Listening is an important part of resolving conflicts.",
    callToAction: "Is this statement true or false?",
  },
  {
    id: 3,
    lessonId: 1,
    type: "SELECT",
    order: 3,
    question:
      "Your friend, Josh, says, \"I have so much homework, and I can’t keep up with all the assignments. I’m really stressed out.\"",
    callToAction: "How do you support Josh?",
  },
  {
    id: 4,
    lessonId: 1,
    type: "TRUE_FALSE",
    order: 4,
    question: "It's okay to ignore someone if you disagree with them.",
    callToAction: "Is this statement true or false?",
  },
  {
    id: 5,
    lessonId: 1,
    type: "MULTI_SELECT",
    order: 5,
    question:
      "Your classmate, Taylor, says, \"I'm really upset because I didn’t get the grade I wanted on the test. I studied so hard and thought I did well.\"",
    callToAction:
      "Select all the supportive things you could say to encourage Taylor.",
  },
  {
    id: 6,
    lessonId: 1,
    type: "VIDEO",
    question: "",
    order: 6,
    videoUrl: "/videos/samplevideo.mp4",
    callToAction: "Watch the video and choose the most empathetic response.",
  },
  {
    id: 7,
    lessonId: 1,
    type: "AUDIO",
    question: "",
    order: 7,
    audio: "/sounds/sampleaudio1.mp3",
    callToAction: "Listen and choose the best response.",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Challenge 1 (SORT)
  {
    challengeId: 1,
    correct: true,
    text: "That sounds really frustrating. Do you want help talking to the group?",
    explanation: "Helpful: supports Alex and offers help.",
  },
  {
    challengeId: 1,
    correct: false,
    text: "You always complain about everything.",
    explanation: "Unhelpful: dismisses Alex's feelings.",
  },
  {
    challengeId: 1,
    correct: false,
    text: "You're probably just overreacting. It's not a big deal.",
    explanation: "Unhelpful: minimizes Alex's feelings.",
  },
  {
    challengeId: 1,
    correct: true,
    text: "Let's figure out how to share the workload together.",
    explanation: "Helpful: encourages teamwork and problem-solving.",
  },

  // Challenge 2
  {
    challengeId: 2,
    correct: true,
    text: "True",
    explanation: "Listening helps build trust and understanding.",
  },
  {
    challengeId: 2,
    correct: false,
    text: "False",
    explanation: "Listening is critical to resolving misunderstandings.",
  },

  // Challenge 3
  {
    challengeId: 3,
    correct: false,
    text: "Well, you should just do the homework faster and not worry so much about it.",
    explanation: "This does not offer a proper solution.",
  },
  {
    challengeId: 3,
    correct: true,
    text: "It sounds like you’re feeling overwhelmed. Want to talk about how we can break it down together?",
    explanation: "This invites Josh to talk more about their problems so you can help him further.",
  },
  {
    challengeId: 3,
    correct: false,
    text: "Everyone has a lot of homework. You should just try to handle it better like everyone else does.",
    explanation: "This invalidates Josh's feelings.",
  },

  // Challenge 4
  {
    challengeId: 4,
    correct: false,
    text: "True",
    explanation: "Ignoring someone shows disrespect and avoids resolving the issue.",
  },
  {
    challengeId: 4,
    correct: true,
    text: "False",
    explanation: "Even if you disagree, it's important to listen and communicate respectfully.",
  },

  // Challenge 5
  {
    challengeId: 5,
    correct: true,
    text: "It’s tough to get a grade you didn’t expect. How about we go over the test together and see where things went wrong?",
    explanation: "Empathizes with Taylor and offers help reviewing the test.",
  },
  {
    challengeId: 5,
    correct: true,
    text: "I'm sorry you’re upset. Remember, one test doesn’t define you.",
    explanation: "Validates feelings and encourages perspective.",
  },
  {
    challengeId: 5,
    correct: false,
    text: "Maybe you didn’t study enough. You should have worked harder next time.",
    explanation: "This does not offer Taylor a proper solution.",
  },
  {
    challengeId: 5,
    correct: false,
    text: "Grades don’t really matter that much. Just forget about it and move on.",
    explanation: "This does not acknowledge Taylor's problem.",
  },

  // Challenge 6
  {
    challengeId: 6,
    correct: false,
    text: "Run away",
    explanation: "Running away gives them more of a reason to be sad!",
  },
  {
    challengeId: 6,
    correct: false,
    text: "Call a teacher",
    explanation: "While calling a teacher may seem like a good idea, it does not resolve the overall problem of needing someone to empathize",
  },
  {
    challengeId: 6,
    correct: true,
    text: "Ask if they are okay",
    explanation: "That's the way to go! By asking if they're okay, you are giving them someone to empathize with",
  },

  // Challenge 7
  {
    challengeId: 7,
    correct: true,
    text: "Tell your teacher you’re struggling and ask for help, even if you’re not sure what specific questions to ask.",
    explanation: "They can guide you even if you’re unsure.",
  },
  {
    challengeId: 7,
    correct: false,
    text: "Stop doing the homework for now and wait until you feel more confident.",
    explanation: "You’ll fall further behind.",
  },
  {
    challengeId: 7,
    correct: false,
    text: "Don’t say anything — just copy what others are doing until you can figure it out on your own.",
    explanation: "You won’t actually learn that way.",
  },
]);

// Lesson 2
await db.insert(schema.challenges).values([
  {
    id: 8,
    lessonId: 2,
    type: "MULTI_SELECT",
    order: 1,
    question:
      "Your peer says, “I feel like I never get to talk during group discussions. No one listens to me.”",
    callToAction: "Select all the things you could say to make them feel heard.",
  },
  {
    id: 9,
    lessonId: 2,
    type: "SELECT",
    order: 2,
    question:
      "Someone says: “Why do people always ignore what I say?”",
    callToAction: "What's the most supportive response?",
  },
  {
    id: 10,
    lessonId: 2,
    type: "TRUE_FALSE",
    order: 3,
    question: "You should always try to understand someone's feelings before offering advice.",
    callToAction: "Is this statement true or false?",
  },
  {
    id: 11,
    lessonId: 2,
    type: "SELECT",
    order: 4,
    question:
      "Your classmate says, “No one seems to care when I’m having a hard time.”",
    callToAction: "Which response shows empathy?",
  },
  {
    id: 12,
    lessonId: 2,
    type: "SELECT",
    order: 5,
    question:
      "A teammate says: “I don’t think anyone notices the work I do in the group.”",
    callToAction: "What could you say to support them?",
  },
  {
    id: 13,
    lessonId: 2,
    type: "SELECT",
    order: 6,
    question:
      "Your classmate says, “I feel embarrassed when I speak and people laugh.”",
    callToAction: "What is the best way to respond?",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Challenge 8
  {
    challengeId: 8,
    correct: true,
    text: "I’m sorry you feel ignored. I’ll make sure to ask for your opinion next time.",
    explanation: "Shows support and intention to include them.",
  },
  {
    challengeId: 8,
    correct: true,
    text: "Let’s talk to the group together about taking turns to speak.",
    explanation: "Offers a direct solution to the issue.",
  },
  {
    challengeId: 8,
    correct: false,
    text: "Maybe your ideas aren’t interesting enough.",
    explanation: "This is dismissive and hurtful.",
  },
  {
    challengeId: 8,
    correct: false,
    text: "Just speak louder next time so they have to listen.",
    explanation: "This doesn't address the underlying issue of respect.",
  },

  // Challenge 9
  {
    challengeId: 9,
    correct: true,
    text: "I’m sorry you’re feeling this way. I’m here to listen.",
    explanation: "Acknowledges their feelings and offers support.",
  },
  {
    challengeId: 9,
    correct: false,
    text: "That’s just how people are. Don’t take it personally.",
    explanation: "Invalidates the concern.",
  },
  {
    challengeId: 9,
    correct: false,
    text: "Maybe you need to speak more clearly.",
    explanation: "Blames the person rather than showing empathy.",
  },

  // Challenge 10
  {
    challengeId: 10,
    correct: true,
    text: "True",
    explanation: "Understanding someone’s emotions builds connection before jumping into solutions.",
  },
  {
    challengeId: 10,
    correct: false,
    text: "False",
    explanation: "Ignoring emotions may make the person feel unheard or judged.",
  },

  // Challenge 11
  {
    challengeId: 11,
    correct: true,
    text: "That sounds really hard. I’m here if you want to talk.",
    explanation: "Provides comfort and presence.",
  },
  {
    challengeId: 11,
    correct: false,
    text: "Well, everyone has problems. Try not to think about it.",
    explanation: "Dismisses their feelings.",
  },
  {
    challengeId: 11,
    correct: false,
    text: "Maybe you're just being dramatic.",
    explanation: "Insensitive and invalidating.",
  },

  // Challenge 12
  {
    challengeId: 12,
    correct: true,
    text: "I’ve noticed your work and it really helps the team!",
    explanation: "Acknowledges and appreciates their contribution.",
  },
  {
    challengeId: 12,
    correct: false,
    text: "Well, if it’s important, people will notice eventually.",
    explanation: "Passive and doesn’t address their need for affirmation.",
  },
  {
    challengeId: 12,
    correct: false,
    text: "You shouldn’t expect praise for doing your part.",
    explanation: "Cold and dismissive.",
  },

  // Challenge 13
  {
    challengeId: 13,
    correct: true,
    text: "You don’t deserve to be laughed at. I thought what you said made sense.",
    explanation: "Affirms and supports them.",
  },
  {
    challengeId: 13,
    correct: false,
    text: "Don’t be so sensitive, it’s just a joke.",
    explanation: "Minimizes their embarrassment.",
  },
  {
    challengeId: 13,
    correct: false,
    text: "That happens to everyone. Just ignore it.",
    explanation: "Doesn’t help them feel seen or supported.",
  },
]);

// Lesson 3
await db.insert(schema.lessons).values([
  {
    id: 8,
    unitId: 2,
    order: 8,
    title: "Lesson 3",
  },
]);

await db.insert(schema.challenges).values([
  {
    id: 14,
    lessonId: 8,
    type: "TRUE_FALSE",
    order: 1,
    question: "It's important to validate someone's feelings during a disagreement.",
    callToAction: "Is this statement true or false?",
  },
]);

await db.insert(schema.challengeOptions).values([
  {
    challengeId: 14,
    correct: true,
    text: "True",
    explanation: "Validating someone's feelings helps them feel heard and respected.",
  },
  {
    challengeId: 14,
    correct: false,
    text: "False",
    explanation: "Dismissing feelings can escalate conflict and break down communication.",
  },
]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();