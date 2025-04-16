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
                courseId: 1, // Conflict Resolution
                title: "Unit 1",
                description: "Learn the basics of Conflict Resolution",
                order: 1,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 1,
                title: "Listening",
            },
            {
                id: 2,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 2,
                title: "Feelings",
            },
            {
                id: 3,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 3,
                title: "Feelings",
            },
            {
                id: 4,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 4,
                title: "Feelings",
            },
            {
                id: 5,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 5,
                title: "Feelings",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Listening
                type: "SELECT",
                order: 1,
                question: 'Your friend Alex says: I\'m really stressed about the group project. I feel like I\'m doing all the work and no one else is helping.'
            },
            {
                id: 2,
                lessonId: 1, // Listening
                type: "SELECT",
                order: 2,
                question: 'Your friend, Josh, says, "I have so much homework, and I can’t keep up with all the assignments. I’m really stressed out."'
            },
            {
                id: 3,
                lessonId: 1, // Listening
                type: "SELECT",
                order: 3,
                question: "Your classmate, Taylor, says, \"I\’m really upset because I didn\’t get the grade I wanted on the test. I studied so hard and thought I did well.\""
            },
        ])

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

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2, // Feelings
                type: "SELECT",
                order: 1,
                question: 'Your friend Alex says: I\'m really stressed about the group project. I feel like I\'m doing all the work and no one else is helping.'
            },
            {
                id: 5,
                lessonId: 2, // Feelings
                type: "SELECT",
                order: 2,
                question: 'Your friend, Josh, says, "I have so much homework, and I can’t keep up with all the assignments. I’m really stressed out."'
            },
            {
                id: 6,
                lessonId: 2, // Feelings
                type: "SELECT",
                order: 3,
                question: "Your classmate, Taylor, says, \"I\’m really upset because I didn\’t get the grade I wanted on the test. I studied so hard and thought I did well.\""
            },
        ])
        
        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();