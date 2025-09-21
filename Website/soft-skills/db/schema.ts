import { relations } from "drizzle-orm";
import { boolean, date, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
        userProgress: many(userProgress),
        units: many(units),
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

// CREATE FUTURE CHALLENGE TYPES HERE
export const challengesEnum = pgEnum("type", [
    "SELECT",
    "VIDEO",
    "AUDIO",
    "MULTI_SELECT",
    "TRUE_FALSE",
    "SORT",
    "VIDEO_QUIZ",
]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    callToAction: text("call_to_action").notNull(),
    order: integer("order").notNull(),
    videoUrl: text("video_url"),
    audio: text("audio"),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    text: text("question").notNull(),
    correct: boolean("correct").notNull(),
    explanation: text("explanation").notNull(),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/softy-assets/softyhappy.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    points: integer("points").notNull().default(0),

    // USER STREAKS
    currentStreak: integer("current_streak").notNull().default(0),
    longestStreak: integer("longest_streak").notNull().default(0),
    lastActivityDate: date("last_activity_date"),  
})

export const userProgressRelations = relations(userProgress, ({ one }) =>
({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}))

// VIDEO QUIZ STUFF
// Sub-questions that appear at timestamps inside a VIDEO_QUIZ challenge
export const videoQuizQuestions = pgTable("video_quiz_questions", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id")
        .references(() => challenges.id, { onDelete: "cascade" })
        .notNull(),
    timestamp: integer("timestamp").notNull(), // in seconds, where the question pops up
    question: text("question").notNull(),
    callToAction: text("call_to_action").notNull(),
    order: integer("order").notNull(), // order within the video quiz
});

// Options for each video quiz question
export const videoQuizOptions = pgTable("video_quiz_options", {
    id: serial("id").primaryKey(),
    videoQuizQuestionId: integer("video_quiz_question_id")
        .references(() => videoQuizQuestions.id, { onDelete: "cascade" })
        .notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    explanation: text("explanation").notNull(),
});

// Track user progress per sub-question in VIDEO_QUIZ
export const videoQuizProgress = pgTable("video_quiz_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    videoQuizQuestionId: integer("video_quiz_question_id")
        .references(() => videoQuizQuestions.id, { onDelete: "cascade" })
        .notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const videoQuizQuestionsRelations = relations(videoQuizQuestions, ({ one, many }) => ({
    challenge: one(challenges, {
        fields: [videoQuizQuestions.challengeId],
        references: [challenges.id],
    }),
    options: many(videoQuizOptions),
    progress: many(videoQuizProgress),
}));

export const videoQuizOptionsRelations = relations(videoQuizOptions, ({ one }) => ({
    question: one(videoQuizQuestions, {
        fields: [videoQuizOptions.videoQuizQuestionId],
        references: [videoQuizQuestions.id],
    }),
}));

export const videoQuizProgressRelations = relations(videoQuizProgress, ({ one }) => ({
    question: one(videoQuizQuestions, {
        fields: [videoQuizProgress.videoQuizQuestionId],
        references: [videoQuizQuestions.id],
    }),
}));