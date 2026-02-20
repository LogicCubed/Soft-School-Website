import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql, { schema });

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
      { id: 1, title: "Conflict Resolution", imageSrc: "/courses/conflictresolution.svg" },
      { id: 2, title: "Problem Solving", imageSrc: "/courses/problemsolving.svg" },
      { id: 3, title: "Teamwork", imageSrc: "/courses/teamwork.svg" },
      { id: 4, title: "Speaking", imageSrc: "/courses/speaking.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1: Listening with Empathy",
        description: "Learn to listen and make others feel heard.",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Unit 2: Understanding Emotions",
        description: "Recognize and respond to emotions in others.",
        order: 2,
      },
      {
        id: 3,
        courseId: 1,
        title: "Unit 3: Speaking with Respect",
        description: "Express yourself clearly and calmly.",
        order: 3,
      },
      {
        id: 4,
        courseId: 1,
        title: "Unit 4: Resolving Tough Conflicts",
        description: "Work through disagreements and find solutions.",
        order: 4,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1,  unitId: 1, order: 1,  title: "Lesson 1" },
      { id: 2,  unitId: 1, order: 2,  title: "Lesson 2" },
      { id: 3,  unitId: 1, order: 3,  title: "Lesson 3" },
      { id: 4,  unitId: 1, order: 4,  title: "Lesson 4" },
      { id: 5,  unitId: 1, order: 5,  title: "Lesson 5" },

      { id: 6,  unitId: 2, order: 6,  title: "Lesson 1" },
      { id: 7,  unitId: 2, order: 7,  title: "Lesson 2" },
      { id: 8,  unitId: 2, order: 8,  title: "Lesson 3" },
      { id: 9,  unitId: 2, order: 9,  title: "Lesson 4" },
      { id: 10, unitId: 2, order: 10, title: "Lesson 5" },

      { id: 11, unitId: 3, order: 11, title: "Lesson 1" },
      { id: 12, unitId: 3, order: 12, title: "Lesson 2" },
      { id: 13, unitId: 3, order: 13, title: "Lesson 3" },
      { id: 14, unitId: 3, order: 14, title: "Lesson 4" },
      { id: 15, unitId: 3, order: 15, title: "Lesson 5" },

      { id: 16, unitId: 4, order: 16, title: "Lesson 1" },
      { id: 17, unitId: 4, order: 17, title: "Lesson 2" },
      { id: 18, unitId: 4, order: 18, title: "Lesson 3" },
      { id: 19, unitId: 4, order: 19, title: "Lesson 4" },
    ]);

await db.insert(schema.challenges).values([
  // Lesson 1 Challenges
  {
    id: 1,
    lessonId: 1,
    type: "VIDEO",
    order: 1,
    question: "Your friend is upset after losing a game.",
    videoUrl: "/videos/samplevideo.mp4",
    callToAction: "What should you say to support them?",
  }
]);

await db.insert(schema.challengeOptions).values([
  // Lesson 1 Challenge 1
  {
    challengeId: 1,
    correct: false,
    text: "You shouldn’t be upset; it’s just a game.",
    explanation:
      "Saying this might make your friend feel like their feelings aren’t important, which can hurt their trust.",
  },
  {
    challengeId: 1,
    correct: false,
    text: "You probably didn’t try hard enough.",
    explanation:
      "Blaming someone doesn’t help them feel better and can damage your friendship.",
  },
  {
    challengeId: 1,
    correct: true,
    text: "It’s okay to feel sad. Want to talk about it?",
    explanation: "Great Job!",
  },
  {
    challengeId: 1,
    correct: false,
    text: "Don’t be such a crybaby.",
    explanation:
      "Using words like this can really hurt someone’s feelings and isn’t a kind way to respond.",
  },
]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();