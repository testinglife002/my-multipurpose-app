// 📄 backend/scripts/seedAll.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import seedStory01 from "./story01_b2b.js";
import seedStory02 from "./story02_saas.js";
import seedStory03 from "./story03_consulting.js";

// import seedStory01 from "./seed/story01_b2b.js";
// import seedStory02 from "./seed/story02_saas.js";
// import seedStory03 from "./seed/story03_consulting.js";

dotenv.config();

async function runAllSeeds() {
  try {
    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🌱 Seeding Story 1...");
    await seedStory01();

    console.log("🌱 Seeding Story 2...");
    await seedStory02();

    console.log("🌱 Seeding Story 3...");
    await seedStory03();

    console.log("✅ ALL STORIES SEEDED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

runAllSeeds();
