import dotenv from "dotenv";
import mongoose from "mongoose";

import Course from "../src/models/course.js";
import Module from "../src/models/module.js";
import Resource from "../src/models/resource.js";
import User from "../src/models/User.js";

dotenv.config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seed");

        await Resource.deleteMany({});
        await Module.deleteMany({});
        await Course.deleteMany({});

        let trainer = await User.findOne({
            role: "trainer"
        });

        if (!trainer) {
            trainer = await User.create({
                name:"hiba",
                email: "hiba@gmail.com",
                password: "password123",
                role: "trainer",
                accountStatus: "active"
            });

            console.log("Trainer created");
        }

        const courses = await Course.insertMany([
            {
                title: "JavaScript Fundamentals",
                description:
                    "Learn the fundamentals of JavaScript and modern programming concepts.",
                objectives: [
                    "Understand JavaScript basics",
                    "Work with variables, functions and arrays",
                    "Manipulate objects and data"
                ],
                level: "beginner",
                category: "JavaScript",
                estimatedDuration: 20,
                status: "published",
                trainer: trainer._id,
                publishedAt: new Date()
            },
        ]);

        const modules = await Module.insertMany([
            {
                title: "JavaScript Basics",
                description:
                    "Introduction to variables, data types and operators.",
                position: 1,
                estimatedDuration: 6,
                status: "published",
                course: courses[0]._id
            },
        ]);

        const resources = await Resource.insertMany([
            {
                title: "JavaScript Variables PDF",
                type: "pdf",
                description:
                    "Introduction to variables and data types in JavaScript.",
                file: {
                    originalName: "javascript-variables.pdf",
                    filename: "javascript-variables.pdf",
                    path: "uploads/javascript-variables.pdf",
                    size: 1024,
                    mimetype: "application/pdf"
                },
                position: 1,
                status: "published",
                module: modules[0]._id
            },

            {
                title: "JavaScript Basics Video",
                type: "video",
                url: "https://example.com/javascript-basics",
                description:
                    "Video explaining the basic concepts of JavaScript.",
                position: 2,
                status: "published",
                module: modules[0]._id
            },
        ]);

        console.log("Seed completed successfully");

        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Seed failed:", error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seed();