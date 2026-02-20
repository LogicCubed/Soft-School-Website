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
    type: "SELECT",
    order: 1,
    question: "Your friend is upset after losing a game.",
    callToAction: "What should you say to support them?",
  },
  {
    id: 2,
    lessonId: 1,
    type: "SELECT",
    order: 2,
    question: "Your classmate feels overwhelmed with homework.",
    callToAction: "How can you help?",
  },
  {
    id: 3,
    lessonId: 1,
    type: "TRUE_FALSE",
    order: 3,
    question: "Interrupting someone when they talk is rude.",
    callToAction: "Is this statement true or false?",
  },
  {
    id: 4,
    lessonId: 1,
    type: "SELECT",
    order: 4,
    question: "Someone feels left out in your group.",
    callToAction: "What’s the best way to respond?",
  },
  {
    id: 5,
    lessonId: 1,
    type: "MULTI_SELECT",
    order: 5,
    question: "Your friend is nervous about a test.",
    callToAction: "Select all the supportive things you could say.",
  },
  {
    id: 6,
    lessonId: 1,
    type: "VIDEO",
    order: 6,
    question: "",
    videoUrl: "/videos/samplevideo.mp4",
    callToAction: "Watch the video and choose the best response.",
  },
  {
    id: 7,
    lessonId: 1,
    type: "SELECT",
    order: 7,
    question: "Your teammate forgot their part in the project.",
    callToAction: "How should you respond?",
  },
  {
    id: 8,
    lessonId: 1,
    type: "SORT",
    order: 8,
    question: "Your friend is upset. Drag the responses into Helpful or Unhelpful.",
    callToAction: "Sort the responses correctly.",
  },
  {
    id: 9,
    lessonId: 1,
    type: "AUDIO",
    order: 9,
    question: "",
    audio: "/sounds/sampleaudio1.mp3",
    callToAction: "Listen and choose the best response.",
  },
  {
    id: 10,
    lessonId: 1,
    type: "SELECT",
    order: 10,
    question: "Your friend is scared about a new activity.",
    callToAction: "What’s the best way to encourage them?",
  },
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

  // Lesson 1 Challenge 2
  {
    challengeId: 2,
    correct: false,
    text: "You should just work faster.",
    explanation:
      "Telling someone to hurry doesn’t show understanding and can make them feel pressured.",
  },
  {
    challengeId: 2,
    correct: true,
    text: "Let’s make a plan to finish the work together.",
    explanation: "Great Job!",
  },
  {
    challengeId: 2,
    correct: false,
    text: "It’s not a big deal; don’t stress.",
    explanation:
      "This might make your friend feel like their concerns aren’t taken seriously.",
  },
  {
    challengeId: 2,
    correct: false,
    text: "You’ll figure it out on your own.",
    explanation:
      "It’s nicer to offer help instead of leaving your friend to struggle alone.",
  },

  // Lesson 1 Challenge 3
  {
    challengeId: 3,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 3,
    correct: false,
    text: "False",
    explanation:
      "Interrupting when someone is talking can be rude and stop them from sharing their thoughts.",
  },

  // Lesson 1 Challenge 4
  {
    challengeId: 4,
    correct: false,
    text: "Maybe you should try harder to fit in.",
    explanation: "Saying this can make someone feel worse and isn’t helpful at all.",
  },
  {
    challengeId: 4,
    correct: true,
    text: "I’m sorry you feel that way. Want to sit with us today?",
    explanation: "Great Job!",
  },
  {
    challengeId: 4,
    correct: false,
    text: "It’s your own fault if you feel left out.",
    explanation:
      "Blaming someone doesn’t make them feel better and can hurt your friendship.",
  },

  // Lesson 1 Challenge 5
  {
    challengeId: 5,
    correct: false,
    text: "You’re just nervous because you didn’t study enough.",
    explanation:
      "Blaming someone for feeling nervous isn’t kind and won’t help them feel better.",
  },
  {
    challengeId: 5,
    correct: true,
    text: "You’re going to do great! Let’s study together.",
    explanation: "Great Job!",
  },
  {
    challengeId: 5,
    correct: false,
    text: "Don’t worry about it; it’s just a test.",
    explanation:
      "This might make your friend feel like their feelings aren’t important.",
  },
  {
    challengeId: 5,
    correct: true,
    text: "Take deep breaths and try your best.",
    explanation: "Great Job!",
  },

  // Lesson 1 Challenge 6
  {
    challengeId: 6,
    correct: false,
    text: "Ignore them",
    explanation:
      "Ignoring someone when they’re upset doesn’t help and can make them feel alone.",
  },
  {
    challengeId: 6,
    correct: true,
    text: "Ask if they want to talk about it",
    explanation: "Great Job!",
  },
  {
    challengeId: 6,
    correct: false,
    text: "Tell them to toughen up",
    explanation:
      "Being dismissive can hurt their feelings and doesn’t show you care.",
  },

  // Lesson 1 Challenge 7
  {
    challengeId: 7,
    correct: false,
    text: "You should have remembered better.",
    explanation: "Blaming your teammate won’t help them feel supported.",
  },
  {
    challengeId: 7,
    correct: false,
    text: "That’s your problem, not mine.",
    explanation: "Saying this is rude and doesn’t show teamwork.",
  },
  {
    challengeId: 7,
    correct: true,
    text: "It’s okay to forget sometimes. Need help?",
    explanation: "Great Job!",
  },

  // Lesson 1 Challenge 8 (SORT)
  {
    challengeId: 8,
    correct: true,
    text: "Listen to what your friend says.",
    explanation: "Great Job!",
  },
  {
    challengeId: 8,
    correct: true,
    text: "Ask how they are feeling.",
    explanation: "Great Job!",
  },
  {
    challengeId: 8,
    correct: true,
    text: "Offer to help with their problem.",
    explanation: "Great Job!",
  },
  {
    challengeId: 8,
    correct: false,
    text: "Tell them to stop being so dramatic.",
    explanation:
      "This response dismisses their feelings and is not supportive.",
  },
  {
    challengeId: 8,
    correct: false,
    text: "Ignore what they said and change the topic.",
    explanation: "Ignoring the issue does not help and can hurt your friendship.",
  },

  // Lesson 1 Challenge 9 (AUDIO)
  {
    challengeId: 9,
    correct: false,
    text: "Ignore the problem and hope it goes away.",
    explanation:
      "Avoiding problems doesn’t solve them. Asking for help is brave and smart.",
  },
  {
    challengeId: 9,
    correct: true,
    text: "Ask your teacher for help even if you’re unsure what to say.",
    explanation: "Great Job!",
  },
  {
    challengeId: 9,
    correct: false,
    text: "Copy others instead of asking questions.",
    explanation:
      "Trying to learn by copying doesn’t help you understand the material.",
  },

  // Lesson 1 Challenge 10
  {
    challengeId: 10,
    correct: false,
    text: "You’re just being scared for no reason.",
    explanation: "Telling someone their feelings don’t matter can make them feel worse.",
  },
  {
    challengeId: 10,
    correct: false,
    text: "You’ll never be good at this anyway.",
    explanation:
      "Negative words can hurt confidence and don’t help anyone.",
  },
  {
    challengeId: 10,
    correct: true,
    text: "You can do it! I’m here to help if you want.",
    explanation: "Great Job!",
  },
]);

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                         Lesson 2                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////

await db.insert(schema.challenges).values([
  // Lesson 2 Challenges
  {
    id: 11,
    lessonId: 2,
    type: "SELECT",
    order: 1,
    question: "Your friend looks upset but isn’t talking. What can you do?",
    callToAction: "Choose the best way to help.",
  },
  {
    id: 12,
    lessonId: 2,
    type: "TRUE_FALSE",
    order: 2,
    question: "Good listening means waiting your turn to talk.",
    callToAction: "True or False?",
  },
  {
    id: 13,
    lessonId: 2,
    type: "SELECT",
    order: 3,
    question: "Your friend is upset and sharing their feelings. What’s the best thing to say?",
    callToAction: "Choose the best response.",
  },
  {
    id: 14,
    lessonId: 2,
    type: "TRUE_FALSE",
    order: 4,
    question: "Interrupting someone when they’re upset helps them feel better.",
    callToAction: "True or False?",
  },
  {
    id: 15,
    lessonId: 2,
    type: "MULTI_SELECT",
    order: 5,
    question: "How can you show someone you’re listening carefully?",
    callToAction: "Select all that apply.",
  },
  {
    id: 16,
    lessonId: 2,
    type: "AUDIO",
    order: 6,
    question: "",
    audio: "/sounds/sampleaudio3.mp3",
    callToAction: "Listen and pick the best response.",
  },
  {
    id: 17,
    lessonId: 2,
    type: "SELECT",
    order: 7,
    question: "Your friend feels nervous about their test results. What should you say?",
    callToAction: "Choose the best way to respond.",
  },
  {
    id: 18,
    lessonId: 2,
    type: "SORT",
    order: 8,
    question: "Sort these actions into Helpful or Unhelpful when someone is talking.",
    callToAction: "Drag and drop the options.",
  },
  {
    id: 19,
    lessonId: 2,
    type: "TRUE_FALSE",
    order: 9,
    question: "Nodding while listening shows you care.",
    callToAction: "True or False?",
  },
  {
    id: 20,
    lessonId: 2,
    type: "SELECT",
    order: 10,
    question: "Your friend starts talking about a problem. What should you do?",
    callToAction: "Choose the best way to respond.",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Lesson 2 Challenge 11
  {
    challengeId: 11,
    correct: true,
    text: "Ask if they want to talk or need space.",
    explanation: "Great Job!",
  },
  {
    challengeId: 11,
    correct: false,
    text: "Ignore them until they feel better.",
    explanation:
      "Ignoring someone can make them feel even more alone.",
  },
  {
    challengeId: 11,
    correct: false,
    text: "Tell them to stop being so quiet.",
    explanation:
      "Pressuring someone to talk can make them uncomfortable.",
  },
  {
    challengeId: 11,
    correct: false,
    text: "Make fun of them to cheer them up.",
    explanation:
      "This can hurt their feelings and isn’t supportive.",
  },

  // Lesson 2 Challenge 12
  {
    challengeId: 12,
    correct: false,
    text: "False",
    explanation:
      "Good listening is about focusing on the speaker, not just waiting to talk.",
  },
  {
    challengeId: 12,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },

  // Lesson 2 Challenge 13 (updated)
  {
    challengeId: 13,
    correct: true,
    text: "I’m here for you. Do you want to talk more?",
    explanation: "Great Job!",
  },
  {
    challengeId: 13,
    correct: false,
    text: "You’re overreacting, it’s not a big deal.",
    explanation:
      "This can make your friend feel dismissed and hurt.",
  },
  {
    challengeId: 13,
    correct: false,
    text: "Just forget about it and move on.",
    explanation:
      "Ignoring feelings doesn’t help your friend feel better.",
  },
  {
    challengeId: 13,
    correct: false,
    text: "Maybe if you tried harder, you wouldn’t feel this way.",
    explanation:
      "This might sound like blaming and can hurt your friend.",
  },

  // Lesson 2 Challenge 14
  {
    challengeId: 14,
    correct: false,
    text: "True",
    explanation:
      "Interrupting can make someone feel ignored and upset.",
  },
  {
    challengeId: 14,
    correct: true,
    text: "False",
    explanation: "Great Job!",
  },

  // Lesson 2 Challenge 15
  {
    challengeId: 15,
    correct: true,
    text: "Make eye contact.",
    explanation: "Great Job!",
  },
  {
    challengeId: 15,
    correct: true,
    text: "Nod or show facial expressions.",
    explanation: "Great Job!",
  },
  {
    challengeId: 15,
    correct: false,
    text: "Look around the room.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 15,
    correct: true,
    text: "Ask questions about what they said.",
    explanation: "Great Job!",
  },
  {
    challengeId: 15,
    correct: false,
    text: "Check your phone while they talk.",
    explanation: "This is rude and shows you’re distracted.",
  },

  // Lesson 2 Challenge 16 (AUDIO)
  {
    challengeId: 16,
    correct: false,
    text: "Ignore your feelings and wait for the result.",
    explanation:
      "Ignoring your feelings can make anxiety worse.",
  },
  {
    challengeId: 16,
    correct: true,
    text: "Talk to someone you trust about how you feel.",
    explanation: "Great Job!",
  },
  {
    challengeId: 16,
    correct: false,
    text: "Pretend like nothing is wrong.",
    explanation:
      "It’s better to face your feelings than ignore them.",
  },

  // Lesson 2 Challenge 17
  {
    challengeId: 17,
    correct: true,
    text: "I know you’re nervous, but I believe in you!",
    explanation: "Great Job!",
  },
  {
    challengeId: 17,
    correct: false,
    text: "You probably failed anyway.",
    explanation: "This isn’t kind and won’t help your friend.",
  },
  {
    challengeId: 17,
    correct: false,
    text: "Don’t worry about it, it’s just a test.",
    explanation:
      "This can make your friend feel like their feelings don’t matter.",
  },
  {
    challengeId: 17,
    correct: false,
    text: "Stop being so dramatic.",
    explanation: "This can hurt your friend’s feelings.",
  },

  // Lesson 2 Challenge 18 (SORT) - randomized order
  {
    challengeId: 18,
    correct: false,
    text: "Interrupt and tell your own story.",
    explanation: "This can make the speaker feel ignored.",
  },
  {
    challengeId: 18,
    correct: true,
    text: "Ask questions about what they said.",
    explanation: "Great Job!",
  },
  {
    challengeId: 18,
    correct: false,
    text: "Check your phone while they talk.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 18,
    correct: true,
    text: "Repeat back what you heard.",
    explanation: "Great Job!",
  },
  {
    challengeId: 18,
    correct: true,
    text: "Look at the speaker and nod.",
    explanation: "Great Job!",
  },

  // Lesson 2 Challenge 19
  {
    challengeId: 19,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 19,
    correct: false,
    text: "False",
    explanation:
      "Nodding shows you care and are paying attention.",
  },

  // Lesson 2 Challenge 20
  {
    challengeId: 20,
    correct: true,
    text: "Listen carefully and let them finish.",
    explanation: "Great Job!",
  },
  {
    challengeId: 20,
    correct: false,
    text: "Interrupt to give your advice quickly.",
    explanation:
      "Interrupting can make the speaker feel unheard.",
  },
  {
    challengeId: 20,
    correct: false,
    text: "Change the subject to something else.",
    explanation: "This can make your friend feel ignored.",
  },
  {
    challengeId: 20,
    correct: false,
    text: "Tell them to stop complaining.",
    explanation: "This is not supportive and can hurt your friend.",
  },
]);

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                         Lesson 3                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////

await db.insert(schema.challenges).values([
  // Lesson 3 Challenges
  {
    id: 21,
    lessonId: 3,
    type: "SELECT",
    order: 1,
    question: "Your friend is talking about a problem at home. What’s a good first step?",
    callToAction: "Choose the best way to respond.",
  },
  {
    id: 22,
    lessonId: 3,
    type: "SELECT",
    order: 2,
    question: "If someone gets angry while talking, what should you do?",
    callToAction: "Pick the best way to stay calm.",
  },
  {
    id: 23,
    lessonId: 3,
    type: "MULTI_SELECT",
    order: 3,
    question: "Which actions help you listen better during a disagreement?",
    callToAction: "Select all that apply.",
  },
  {
    id: 24,
    lessonId: 3,
    type: "TRUE_FALSE",
    order: 4,
    question: "Interrupting sometimes helps solve problems faster.",
    callToAction: "True or False?",
  },
  {
    id: 25,
    lessonId: 3,
    type: "TRUE_FALSE",
    order: 5,
    question: "Repeating what someone says shows you’re really listening.",
    callToAction: "True or False?",
  },
  {
    id: 26,
    lessonId: 3,
    type: "SORT",
    order: 6,
    question: "Sort these responses into Helpful or Not Helpful during a tough talk.",
    callToAction: "Drag and drop the options.",
  },
  {
    id: 27,
    lessonId: 3,
    type: "MULTI_SELECT",
    order: 7,
    question: "What can you do if you don’t understand what someone means?",
    callToAction: "Select all correct answers.",
  },
  {
    id: 28,
    lessonId: 3,
    type: "SELECT",
    order: 8,
    question: "Your friend is upset because they feel ignored. What should you say?",
    callToAction: "Choose the best response.",
  },
  {
    id: 29,
    lessonId: 3,
    type: "TRUE_FALSE",
    order: 9,
    question: "Showing your own feelings helps others open up too.",
    callToAction: "True or False?",
  },
  {
    id: 30,
    lessonId: 3,
    type: "SELECT",
    order: 10,
    question: "If your friend tells you something important, what should you do next?",
    callToAction: "Pick the best choice.",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Lesson 3 Challenge 21
  {
    challengeId: 21,
    correct: true,
    text: "Listen quietly and let them talk.",
    explanation: "Great Job!",
  },
  {
    challengeId: 21,
    correct: false,
    text: "Change the topic quickly.",
    explanation: "Changing the topic can make your friend feel ignored.",
  },
  {
    challengeId: 21,
    correct: false,
    text: "Tell them your own problems first.",
    explanation: "This can make the conversation about you instead of your friend.",
  },
  {
    challengeId: 21,
    correct: false,
    text: "Walk away when they start talking.",
    explanation: "Walking away can hurt their feelings and trust.",
  },

  // Lesson 3 Challenge 22
  {
    challengeId: 22,
    correct: true,
    text: "Stay calm and listen without interrupting.",
    explanation: "Great Job!",
  },
  {
    challengeId: 22,
    correct: false,
    text: "Get angry back to show you care.",
    explanation: "Responding with anger can make things worse.",
  },
  {
    challengeId: 22,
    correct: false,
    text: "Walk away immediately.",
    explanation: "Leaving without listening can hurt your friendship.",
  },
  {
    challengeId: 22,
    correct: false,
    text: "Ignore their feelings and change the subject.",
    explanation: "This can make the person feel unheard and upset.",
  },

  // Lesson 3 Challenge 23
  {
    challengeId: 23,
    correct: true,
    text: "Look at the person while they talk.",
    explanation: "Great Job!",
  },
  {
    challengeId: 23,
    correct: true,
    text: "Ask questions to understand better.",
    explanation: "Great Job!",
  },
  {
    challengeId: 23,
    correct: false,
    text: "Check your phone while they speak.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 23,
    correct: true,
    text: "Nod to show you’re listening.",
    explanation: "Great Job!",
  },
  {
    challengeId: 23,
    correct: false,
    text: "Start talking about yourself.",
    explanation: "This can interrupt the speaker and is rude.",
  },

  // Lesson 3 Challenge 24
  {
    challengeId: 24,
    correct: false,
    text: "True",
    explanation:
      "Interrupting usually makes problems worse because it stops the other person from sharing.",
  },
  {
    challengeId: 24,
    correct: true,
    text: "False",
    explanation: "Great Job!",
  },

  // Lesson 3 Challenge 25
  {
    challengeId: 25,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 25,
    correct: false,
    text: "False",
    explanation:
      "Repeating shows you understand and helps the speaker feel heard.",
  },

  // Lesson 3 Challenge 26 (SORT) — randomized order
  {
    challengeId: 26,
    correct: false,
    text: "Ignore what they’re saying and talk about yourself.",
    explanation: "This makes the other person feel unimportant.",
  },
  {
    challengeId: 26,
    correct: true,
    text: "Look at them and nod while they speak.",
    explanation: "Great Job!",
  },
  {
    challengeId: 26,
    correct: false,
    text: "Check your phone during the talk.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 26,
    correct: true,
    text: "Ask questions to understand better.",
    explanation: "Great Job!",
  },
  {
    challengeId: 26,
    correct: true,
    text: "Repeat what you heard in your own words.",
    explanation: "Great Job!",
  },

  // Lesson 3 Challenge 27
  {
    challengeId: 27,
    correct: true,
    text: "Ask them to explain more.",
    explanation: "Great Job!",
  },
  {
    challengeId: 27,
    correct: true,
    text: "Say you don’t understand and want to listen better.",
    explanation: "Great Job!",
  },
  {
    challengeId: 27,
    correct: false,
    text: "Pretend you understand to avoid questions.",
    explanation: "This can cause confusion and hurt your friendship.",
  },
  {
    challengeId: 27,
    correct: false,
    text: "Ignore what they said and change the subject.",
    explanation: "This is not helpful and can upset your friend.",
  },

  // Lesson 3 Challenge 28
  {
    challengeId: 28,
    correct: true,
    text: "I’m sorry you feel ignored. I’m listening now.",
    explanation: "Great Job!",
  },
  {
    challengeId: 28,
    correct: false,
    text: "You’re just being too sensitive.",
    explanation: "This can make your friend feel worse.",
  },
  {
    challengeId: 28,
    correct: false,
    text: "Stop talking about it.",
    explanation: "This shuts down communication.",
  },
  {
    challengeId: 28,
    correct: false,
    text: "I don’t have time for this right now.",
    explanation: "This response isn’t supportive.",
  },

  // Lesson 3 Challenge 29
  {
    challengeId: 29,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 29,
    correct: false,
    text: "False",
    explanation:
      "Sharing feelings can help others open up and connect.",
  },

  // Lesson 3 Challenge 30
  {
    challengeId: 30,
    correct: true,
    text: "Keep what they told you private unless they say otherwise.",
    explanation: "Great Job!",
  },
  {
    challengeId: 30,
    correct: false,
    text: "Tell others about it to get advice.",
    explanation: "Sharing without permission can break trust.",
  },
  {
    challengeId: 30,
    correct: false,
    text: "Forget what they said and change the subject.",
    explanation: "Ignoring their trust can hurt your friendship.",
  },
  {
    challengeId: 30,
    correct: false,
    text: "Make fun of them to lighten the mood.",
    explanation: "This is not respectful or helpful.",
  },
]);

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                         Lesson 4                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////

await db.insert(schema.challenges).values([
  // Lesson 4 Challenges
  {
    id: 31,
    lessonId: 4,
    type: "SELECT",
    order: 1,
    question: "When someone is upset, what’s the best way to start listening?",
    callToAction: "Choose the best option.",
  },
  {
    id: 32,
    lessonId: 4,
    type: "TRUE_FALSE",
    order: 2,
    question: "It’s okay to interrupt if you think you know the answer.",
    callToAction: "True or False?",
  },
  {
    id: 33,
    lessonId: 4,
    type: "TRUE_FALSE",
    order: 3,
    question: "Nodding your head shows you’re paying attention.",
    callToAction: "True or False?",
  },
  {
    id: 34,
    lessonId: 4,
    type: "SORT",
    order: 4,
    question: "Sort these into Helpful and Not Helpful things to say when listening.",
    callToAction: "Drag and drop the options.",
  },
  {
    id: 35,
    lessonId: 4,
    type: "SELECT",
    order: 5,
    question: "If a friend is angry, what’s the best thing to do?",
    callToAction: "Pick the best response.",
  },
  {
    id: 36,
    lessonId: 4,
    type: "MULTI_SELECT",
    order: 6,
    question: "What are ways to show you’re really listening?",
    callToAction: "Select all that apply.",
  },
  {
    id: 37,
    lessonId: 4,
    type: "SELECT",
    order: 7,
    question: "If someone shares a secret, what should you do?",
    callToAction: "Choose the right answer.",
  },
  {
    id: 38,
    lessonId: 4,
    type: "TRUE_FALSE",
    order: 8,
    question: "Changing the subject can help if a conversation gets too emotional.",
    callToAction: "True or False?",
  },
  {
    id: 39,
    lessonId: 4,
    type: "MULTI_SELECT",
    order: 9,
    question: "Which are good ways to calm someone down when they’re upset?",
    callToAction: "Select all that apply.",
  },
  {
    id: 40,
    lessonId: 4,
    type: "SELECT",
    order: 10,
    question: "What’s the best way to respond when a friend thanks you for listening?",
    callToAction: "Choose the best response.",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Lesson 4 Challenge 31
  {
    challengeId: 31,
    correct: true,
    text: "Face them and give your full attention.",
    explanation: "Great Job!",
  },
  {
    challengeId: 31,
    correct: false,
    text: "Look around while they talk.",
    explanation: "Looking away can make them feel unimportant.",
  },
  {
    challengeId: 31,
    correct: false,
    text: "Start talking about your own problems.",
    explanation: "This can make the conversation about you instead of them.",
  },
  {
    challengeId: 31,
    correct: false,
    text: "Ignore their feelings and change the topic.",
    explanation: "This isn’t supportive and can hurt your friendship.",
  },

  // Lesson 4 Challenge 32
  {
    challengeId: 32,
    correct: false,
    text: "True",
    explanation:
      "Interrupting usually stops someone from sharing and isn’t respectful.",
  },
  {
    challengeId: 32,
    correct: true,
    text: "False",
    explanation: "Great Job!",
  },

  // Lesson 4 Challenge 33
  {
    challengeId: 33,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 33,
    correct: false,
    text: "False",
    explanation:
      "Nodding shows you’re paying attention and encourages the speaker.",
  },

  // Lesson 4 Challenge 34 (SORT) - randomized order
  {
    challengeId: 34,
    correct: true,
    text: "I understand how you feel.",
    explanation: "Great Job!",
  },
  {
    challengeId: 34,
    correct: false,
    text: "You’re overreacting.",
    explanation: "This response dismisses feelings and is not helpful.",
  },
  {
    challengeId: 34,
    correct: false,
    text: "Whatever, it’s not a big deal.",
    explanation: "This can hurt feelings and shut down communication.",
  },
  {
    challengeId: 34,
    correct: true,
    text: "Tell me more about what happened.",
    explanation: "Great Job!",
  },
  {
    challengeId: 34,
    correct: true,
    text: "I’m here to listen whenever you want to talk.",
    explanation: "Great Job!",
  },

  // Lesson 4 Challenge 35
  {
    challengeId: 35,
    correct: true,
    text: "Stay calm and listen carefully.",
    explanation: "Great Job!",
  },
  {
    challengeId: 35,
    correct: false,
    text: "Get angry back at them.",
    explanation: "Reacting with anger usually makes things worse.",
  },
  {
    challengeId: 35,
    correct: false,
    text: "Ignore them until they calm down.",
    explanation: "Ignoring their feelings can damage your friendship.",
  },
  {
    challengeId: 35,
    correct: false,
    text: "Tell them they’re wrong.",
    explanation: "This can make the person feel attacked and upset.",
  },

  // Lesson 4 Challenge 36
  {
    challengeId: 36,
    correct: true,
    text: "Make eye contact.",
    explanation: "Great Job!",
  },
  {
    challengeId: 36,
    correct: true,
    text: "Ask questions to understand better.",
    explanation: "Great Job!",
  },
  {
    challengeId: 36,
    correct: false,
    text: "Look at your phone while they talk.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 36,
    correct: true,
    text: "Repeat what they said in your own words.",
    explanation: "Great Job!",
  },
  {
    challengeId: 36,
    correct: false,
    text: "Start talking about yourself.",
    explanation: "This interrupts the speaker and is rude.",
  },

  // Lesson 4 Challenge 37
  {
    challengeId: 37,
    correct: true,
    text: "Keep their secret safe unless they say otherwise.",
    explanation: "Great Job!",
  },
  {
    challengeId: 37,
    correct: false,
    text: "Tell other friends to gossip.",
    explanation: "Sharing secrets breaks trust and can hurt friendships.",
  },
  {
    challengeId: 37,
    correct: false,
    text: "Forget about what they told you.",
    explanation: "Ignoring their trust can damage your friendship.",
  },
  {
    challengeId: 37,
    correct: false,
    text: "Make jokes about it to lighten the mood.",
    explanation: "This can be disrespectful and hurt feelings.",
  },

  // Lesson 4 Challenge 38
  {
    challengeId: 38,
    correct: false,
    text: "True",
    explanation:
      "Changing the subject can make the other person feel ignored.",
  },
  {
    challengeId: 38,
    correct: true,
    text: "False",
    explanation: "Great Job!",
  },

  // Lesson 4 Challenge 39
  {
    challengeId: 39,
    correct: true,
    text: "Speak in a calm voice.",
    explanation: "Great Job!",
  },
  {
    challengeId: 39,
    correct: true,
    text: "Offer to help if they want.",
    explanation: "Great Job!",
  },
  {
    challengeId: 39,
    correct: false,
    text: "Tell them to stop being so sensitive.",
    explanation: "This dismisses their feelings and isn’t helpful.",
  },
  {
    challengeId: 39,
    correct: true,
    text: "Give them space if they need it.",
    explanation: "Great Job!",
  },
  {
    challengeId: 39,
    correct: false,
    text: "Ignore them until they calm down.",
    explanation: "Ignoring feelings can damage your friendship.",
  },

  // Lesson 4 Challenge 40
  {
    challengeId: 40,
    correct: true,
    text: "You’re welcome! I’m here whenever you want to talk.",
    explanation: "Great Job!",
  },
  {
    challengeId: 40,
    correct: false,
    text: "It’s no big deal.",
    explanation: "This can make them feel like their feelings aren’t important.",
  },
  {
    challengeId: 40,
    correct: false,
    text: "Whatever, don’t mention it again.",
    explanation: "This shuts down communication.",
  },
  {
    challengeId: 40,
    correct: false,
    text: "I was just bored.",
    explanation: "This isn’t a kind or supportive response.",
  },
]);

///////////////////////////////////////////////////////////////////////
//                                                                   //
//                         Lesson 5                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////

await db.insert(schema.challenges).values([
  // Lesson 5 Challenges
  {
    id: 41,
    lessonId: 5,
    type: "SELECT",
    order: 1,
    question: "If a friend is upset about a mistake, what’s a good way to respond?",
    callToAction: "Choose the best response.",
  },
  {
    id: 42,
    lessonId: 5,
    type: "SORT",
    order: 2,
    question: "Sort these actions into Helpful and Not Helpful when someone is sharing their feelings.",
    callToAction: "Drag and drop the options.",
  },
  {
    id: 43,
    lessonId: 5,
    type: "MULTI_SELECT",
    order: 3,
    question: "What are good ways to show empathy when listening?",
    callToAction: "Select all that apply.",
  },
  {
    id: 44,
    lessonId: 5,
    type: "SELECT",
    order: 4,
    question: "What should you do if you don’t understand how someone feels?",
    callToAction: "Choose the best option.",
  },
  {
    id: 45,
    lessonId: 5,
    type: "SORT",
    order: 5,
    question: "Sort these phrases into Supportive and Unsupportive.",
    callToAction: "Drag and drop the options.",
  },
  {
    id: 46,
    lessonId: 5,
    type: "TRUE_FALSE",
    order: 6,
    question: "It’s helpful to give advice even if someone just wants to be heard.",
    callToAction: "True or False?",
  },
  {
    id: 47,
    lessonId: 5,
    type: "SELECT",
    order: 7,
    question: "If your friend is telling you about a problem, what’s the best thing to do?",
    callToAction: "Choose the best response.",
  },
  {
    id: 48,
    lessonId: 5,
    type: "TRUE_FALSE",
    order: 8,
    question: "Sometimes it’s okay to ask questions to understand better.",
    callToAction: "True or False?",
  },
  {
    id: 49,
    lessonId: 5,
    type: "SELECT",
    order: 9,
    question: "If someone thanks you for listening, what’s a kind way to reply?",
    callToAction: "Choose the best answer.",
  },
  {
    id: 50,
    lessonId: 5,
    type: "MULTI_SELECT",
    order: 10,
    question: "Which of these help you stay focused when listening?",
    callToAction: "Select all that apply.",
  },
]);

await db.insert(schema.challengeOptions).values([
  // Lesson 5 Challenge 41
  {
    challengeId: 41,
    correct: true,
    text: "It’s okay, everyone makes mistakes sometimes.",
    explanation: "Great Job!",
  },
  {
    challengeId: 41,
    correct: false,
    text: "You should’ve been more careful.",
    explanation: "This can make your friend feel worse.",
  },
  {
    challengeId: 41,
    correct: false,
    text: "Stop being so dramatic.",
    explanation: "This dismisses their feelings and isn’t kind.",
  },
  {
    challengeId: 41,
    correct: false,
    text: "Just forget about it and move on.",
    explanation: "Ignoring feelings can hurt your friendship.",
  },

  // Lesson 5 Challenge 42 (SORT)
  {
    challengeId: 42,
    correct: true,
    text: "Look at them and nod your head.",
    explanation: "Great Job!",
  },
  {
    challengeId: 42,
    correct: true,
    text: "Ask how they feel.",
    explanation: "Great Job!",
  },
  {
    challengeId: 42,
    correct: false,
    text: "Check your phone while they talk.",
    explanation: "This shows you’re not paying attention.",
  },
  {
    challengeId: 42,
    correct: false,
    text: "Interrupt to tell your own story.",
    explanation: "This can stop them from sharing and is rude.",
  },
  {
    challengeId: 42,
    correct: true,
    text: "Say, ‘I’m here for you.’",
    explanation: "Great Job!",
  },

  // Lesson 5 Challenge 43
  {
    challengeId: 43,
    correct: true,
    text: "Make eye contact.",
    explanation: "Great Job!",
  },
  {
    challengeId: 43,
    correct: true,
    text: "Repeat what they say in your own words.",
    explanation: "Great Job!",
  },
  {
    challengeId: 43,
    correct: false,
    text: "Look bored or distracted.",
    explanation: "This can hurt the conversation.",
  },
  {
    challengeId: 43,
    correct: true,
    text: "Ask questions to understand better.",
    explanation: "Great Job!",
  },
  {
    challengeId: 43,
    correct: false,
    text: "Start talking about yourself.",
    explanation: "This can make the other person feel ignored.",
  },

  // Lesson 5 Challenge 44
  {
    challengeId: 44,
    correct: true,
    text: "Ask them to explain more about how they feel.",
    explanation: "Great Job!",
  },
  {
    challengeId: 44,
    correct: false,
    text: "Pretend to understand without asking.",
    explanation: "This can make your friend feel unheard.",
  },
  {
    challengeId: 44,
    correct: false,
    text: "Tell them their feelings aren’t important.",
    explanation: "This isn’t supportive.",
  },
  {
    challengeId: 44,
    correct: false,
    text: "Change the subject quickly.",
    explanation: "Avoiding the topic can hurt trust.",
  },

  // Lesson 5 Challenge 45 (SORT)
  {
    challengeId: 45,
    correct: true,
    text: "I’m sorry you feel that way.",
    explanation: "Great Job!",
  },
  {
    challengeId: 45,
    correct: false,
    text: "Get over it already.",
    explanation: "This is unsupportive and rude.",
  },
  {
    challengeId: 45,
    correct: true,
    text: "How can I help?",
    explanation: "Great Job!",
  },
  {
    challengeId: 45,
    correct: false,
    text: "You’re making a big deal out of nothing.",
    explanation: "This dismisses feelings and isn’t helpful.",
  },
  {
    challengeId: 45,
    correct: true,
    text: "I’m here to listen.",
    explanation: "Great Job!",
  },

  // Lesson 5 Challenge 46
  {
    challengeId: 46,
    correct: false,
    text: "True",
    explanation:
      "Sometimes people just want to be heard, not given advice.",
  },
  {
    challengeId: 46,
    correct: true,
    text: "False",
    explanation: "Great Job!",
  },

  // Lesson 5 Challenge 47
  {
    challengeId: 47,
    correct: true,
    text: "Listen carefully and don’t interrupt.",
    explanation: "Great Job!",
  },
  {
    challengeId: 47,
    correct: false,
    text: "Tell them what you think right away.",
    explanation: "Interrupting can stop someone from sharing.",
  },
  {
    challengeId: 47,
    correct: false,
    text: "Ignore their feelings.",
    explanation: "Ignoring can hurt your friendship.",
  },
  {
    challengeId: 47,
    correct: false,
    text: "Change the subject.",
    explanation: "Avoiding the conversation isn’t helpful.",
  },

  // Lesson 5 Challenge 48
  {
    challengeId: 48,
    correct: true,
    text: "True",
    explanation: "Great Job!",
  },
  {
    challengeId: 48,
    correct: false,
    text: "False",
    explanation: "Asking questions helps you understand better.",
  },

  // Lesson 5 Challenge 49
  {
    challengeId: 49,
    correct: true,
    text: "You’re welcome! I’m here anytime you want to talk.",
    explanation: "Great Job!",
  },
  {
    challengeId: 49,
    correct: false,
    text: "No problem, whatever.",
    explanation: "This sounds rude and shuts down communication.",
  },
  {
    challengeId: 49,
    correct: false,
    text: "Don’t mention it again.",
    explanation: "This can hurt feelings and stop conversation.",
  },
  {
    challengeId: 49,
    correct: false,
    text: "I was bored anyway.",
    explanation: "This isn’t a kind response.",
  },

  // Lesson 5 Challenge 50
  {
    challengeId: 50,
    correct: true,
    text: "Put away your phone.",
    explanation: "Great Job!",
  },
  {
    challengeId: 50,
    correct: true,
    text: "Look at the person talking.",
    explanation: "Great Job!",
  },
  {
    challengeId: 50,
    correct: false,
    text: "Think about something else.",
    explanation: "This means you’re not really listening.",
  },
  {
    challengeId: 50,
    correct: true,
    text: "Ask questions if you don’t understand.",
    explanation: "Great Job!",
  },
  {
    challengeId: 50,
    correct: false,
    text: "Start texting someone else.",
    explanation: "This is rude and shows you aren’t paying attention.",
  },
]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();