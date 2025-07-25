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

    // Challenges for lesson 1 with updated question 3 as MULTI_SELECT
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question:
          "Your friend Alex says: I'm really stressed about the group project. I feel like I'm doing all the work and no one else is helping.",
        callToAction: "What should you tell Alex?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question:
          "Your friend, Josh, says, \"I have so much homework, and I can’t keep up with all the assignments. I’m really stressed out.\"",
        callToAction: "How do you support Josh?",
      },
      {
        id: 3,
        lessonId: 1,
        type: "MULTI_SELECT",
        order: 3,
        question:
          "Your classmate, Taylor, says, \"I'm really upset because I didn’t get the grade I wanted on the test. I studied so hard and thought I did well.\"",
        callToAction:
          "Select all the supportive things you could say to encourage Taylor.",
      },
      {
        id: 4,
        lessonId: 1,
        type: "VIDEO",
        question: "",
        order: 4,
        videoUrl: "/videos/samplevideo.mp4",
        callToAction: "Watch the video and choose the most empathetic response.",
      },
      {
        id: 5,
        lessonId: 1,
        type: "AUDIO",
        question: "",
        order: 5,
        audio: "/sounds/sampleaudio1.mp3",
        callToAction: "Listen and choose the best response.",
      },
    ]);

    // Challenge options for challenge 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "That sounds really frustrating. Do you want help talking to the group?",
        explanation: "That is a good way to initiate a solution!",
      },
      {
        challengeId: 1,
        correct: false,
        text: "You always complain about everything.",
        explanation: "This is not very helpful to Alex.",
      },
      {
        challengeId: 1,
        correct: false,
        text: "You're probably just overreacting. It's not a big deal.",
        explanation: "You are minimizing Alex's feelings.",
      },
    ]);

    // Challenge options for challenge 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: false,
        text: "Well, you should just do the homework faster and not worry so much about it.",
        explanation: "This does not offer a proper solution.",
      },
      {
        challengeId: 2,
        correct: true,
        text: "It sounds like you’re feeling overwhelmed. Want to talk about how we can break it down together?",
        explanation: "This invites Josh to talk more about their problems so you can help him further.",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Everyone has a lot of homework. You should just try to handle it better like everyone else does.",
        explanation: "This invalidates Josh's feelings.",
      },
    ]);

    // Challenge options for challenge 3 (MULTI_SELECT)
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        correct: true,
        text: "It’s tough to get a grade you didn’t expect. How about we go over the test together and see where things went wrong?",
        explanation: "Empathizes with Taylor and offers help reviewing the test.",
      },
      {
        challengeId: 3,
        correct: true,
        text: "I'm sorry you’re upset. Remember, one test doesn’t define you.",
        explanation: "Validates feelings and encourages perspective.",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Maybe you didn’t study enough. You should have worked harder next time.",
        explanation: "This does not offer Taylor a proper solution.",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Grades don’t really matter that much. Just forget about it and move on.",
        explanation: "This does not acknowledge Taylor's problem.",
      },
    ]);

    // Challenge options for challenge 4
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        correct: false,
        text: "Run away",
        explanation: "Running away gives them more of a reason to be sad!",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Call a teacher",
        explanation: "While calling a teacher may seem like a good idea, it does not resolve the overall problem of needing someone to empathize",
      },
      {
        challengeId: 4,
        correct: true,
        text: "Ask if they are okay",
        explanation: "That's the way to go! By asking if they're okay, you are giving them someone to empathize with",
      },
    ]);

    // Challenge options for challenge 5
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        correct: true,
        text: "Tell your teacher you’re struggling and ask for help, even if you’re not sure what specific questions to ask.",
        explanation: "They can guide you even if you’re unsure.",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Stop doing the homework for now and wait until you feel more confident.",
        explanation: "You’ll fall further behind.",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Don’t say anything — just copy what others are doing until you can figure it out on your own.",
        explanation: "You won’t actually learn that way.",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();