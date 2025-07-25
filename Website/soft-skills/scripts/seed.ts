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
            {
                id: 1,
                title: "Conflict Resolution",
                imageSrc: "/conflictresolution.svg",
            },
            {
                id: 2,
                title: "Problem Solving",
                imageSrc: "/problemsolving.svg",
            },
            {
                id: 3,
                title: "Teamwork",
                imageSrc: "/teamwork.svg",
            },
            {
                id: 4,
                title: "Speaking",
                imageSrc: "/speaking.svg",
            }
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
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Lesson 1",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Lesson 2",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Lesson 3",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Lesson 4",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Lesson 5",
            },
            {
                id: 6,
                unitId: 2,
                order: 6,
                title: "Lesson 1",
            },
            {
                id: 7,
                unitId: 2,
                order: 7,
                title: "Lesson 2",
            }
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Your friend Alex says: I\'m really stressed about the group project. I feel like I\'m doing all the work and no one else is helping.',
                callToAction: "What should you tell Alex?",
            },
            {
                id: 2,
                lessonId: 1,
                type: "SELECT",
                order: 2,
                question: 'Your friend, Josh, says, "I have so much homework, and I can’t keep up with all the assignments. I’m really stressed out."',
                callToAction: "How do you support Josh?",
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: "Your classmate, Taylor, says, \"I\’m really upset because I didn\’t get the grade I wanted on the test. I studied so hard and thought I did well.\"",
                callToAction: "How can you encourage Taylor?",
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
                text: "You\'re probably just overreacting. It\'s not a big deal.",
                explanation: "You are minimizing Alex's feelings.",
            },
        ]);

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

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                correct: false,
                text: "Maybe you didn’t study enough. You should have worked harder next time.",
                explanation: "This does not offer Taylor a proper solution.",
            },
            {
                challengeId: 3,
                correct: true,
                text: "It\’s tough to get a grade you didn\’t expect. How about we go over the test together and see where things went wrong?",
                explanation: "This empathizes with Taylor, and allows you to help identify her problem",
            },
            {
                challengeId: 3,
                correct: false,
                text: "Grades don’t really matter that much. Just forget about it and move on.",
                explanation: "This does not acknowledge Taylor's problem.",
            },
        ]);

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

        await db.insert(schema.challenges).values([
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Your classmate Jamie was really quiet during your group project presentation. Normally, Jamie is outgoing and confident, but today they seemed distracted and barely spoke. After class, you approach Jamie to check in.',
                callToAction: "How do you check in with Jamie?",
            },
            {
                id: 7,
                lessonId: 2,
                type: "SELECT",
                order: 2,
                question: 'You are working on a team project, and your teammate Sam seems frustrated after receiving feedback from the teacher. What is the most supportive way to ask about how Sam is feeling?',
                callToAction: "What do you say to Sam?",
            },
            {
                id: 8,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Your friend Jordan didn’t get picked to join the school play cast, even though they worked really hard on their audition. You want to check in and see how they’re feeling about it.',
                callToAction: "How do you support Jordan?",
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 6,
                correct: false,
                text: "Why didn’t you say anything during the presentation?",
                explanation: "This question can feel accusatory. The word “why” puts Jamie on the defensive, as if they did something wrong. It focuses on their behavior rather than their feelings, which can shut down open conversation.",
            },
            {
                challengeId: 6,
                correct: false,
                text: "You seemed off today—what’s wrong with you?",
                explanation: "Even if well-meaning, this phrase sounds critical or judgmental. Saying “what’s wrong with you” targets the person, not their experience, and can make someone feel like they are being blamed for how they feel.",
            },
            {
                challengeId: 6,
                correct: true,
                text: "Hey, I noticed you were really quiet during the presentation. Are you feeling okay?",
                explanation: "This question is observational and empathetic. It notices a specific behavior (“quiet during the presentation”) and invites Jamie to share their emotional state (“Are you feeling okay?”), creating a safe and supportive space.",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 7,
                correct: true,
                text: "Hey, how are you feeling after that feedback?",
                explanation: "This is the best option because it’s open-ended, non-judgmental, and invites Sam to share their feelings in their own words. It shows genuine curiosity and support without making assumptions. Great for practicing emotional intelligence and empathy.",
            },
            {
                challengeId: 7,
                correct: false,
                text: "You took that feedback way too personally, didn’t you?",
                explanation: "This comes across as judgmental and assumes how the other person feels. It can make Sam feel defensive or invalidated. Even if it’s true, starting with empathy is key.",
            },
            {
                challengeId: 7,
                correct: false,
                text: "It's just feedback — don’t let it get to you.",
                explanation: "This dismisses Sam’s feelings entirely. Even if the intent is to comfort, it invalidates the emotion instead of recognizing it. Effective conflict resolution starts with acknowledging how someone feels before offering perspective.",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 8,
                correct: false,
                text: "You’re probably super upset, right? That sucks.",
                explanation: "This assumes Jordan’s emotion instead of giving them a chance to express it themselves. Even if the guess is accurate, it can feel a little limiting or overwhelming, especially if Jordan isn’t ready to talk.",
            },
            {
                challengeId: 8,
                correct: true,
                text: "Hey, I know you were really hoping to get in. How are you feeling about it?",
                explanation: "This is a compassionate and supportive response. It shows that you were paying attention to what mattered to Jordan and invites them to share how they really feel without judgment or assumption.",
            },
            {
                challengeId: 8,
                correct: false,
                text: "It’s just a school play. You’ll get over it.",
                explanation: "This dismisses Jordan’s feelings entirely. Even if well-meant, it invalidates the emotional weight of the situation for Jordan, which can make them feel unheard or alone.",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 9,
                lessonId: 3,
                type: "SELECT",
                order: 1,
                question: 'TEST QUESTION',
                callToAction: "What is the best response?",
            }
        ]);
        
        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();