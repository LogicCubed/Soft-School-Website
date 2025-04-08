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
                imageSrc: "/conflictresolution.svg"
            },
            {
                id: 2,
                title: "Problem Solving",
                imageSrc: "/problemsolving.svg"
            },
            {
                id: 3,
                title: "Teamwork",
                imageSrc: "/teamwork.svg"
            },
            {
                id: 4,
                title: "Speaking",
                imageSrc: "/speaking.svg"
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
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                //imageSrc: "/frustrated.svg",
                correct: true,
                text: "That sounds really frustrating. Do you want help talking to the group?",
                //audioSrc: "come up with a name here lol.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                //imageSrc: "/frustrated.svg",
                correct: false,
                text: "You always complain about everything.",
                //audioSrc: "come up with a name here lol.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                //imageSrc: "/frustrated.svg",
                correct: false,
                text: "You\'re probably just overreacting. It\'s not a big deal.",
                //audioSrc: "come up with a name here lol.mp3",
            },
        ])
        
        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();