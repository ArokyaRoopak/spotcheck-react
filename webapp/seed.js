const { faker } = require("@faker-js/faker");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(
      process.env.MONGO_URI || "mongodb://localhost:27017/spotcheck",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    await client.connect();
    console.log(" MongoDB Connected...");
    return client;
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

const generatePurchases = async () => {
  try {
    const client = await connectDB();
    const db = client.db();
    const purchasesCollection = db.collection("purchases");

    const purchases = [];

    for (let i = 0; i < 100; i++) {
      purchases.push({
        username: faker.internet.username(),
        productName: faker.commerce.productName(),
        productCount: Math.floor(Math.random() * 4) + 1,
        purchaseAmount: faker.helpers.arrayElement([100, 129, 300, 499, 699]),
        deliveryStatus: faker.helpers.arrayElement([
          "pending",
          "shipped",
          "delivered",
          "canceled",
        ]),
        createdAt: faker.date.past(),
      });
    }

    await purchasesCollection.insertMany(purchases);
    console.log("100 Purchases Added to MongoDB");

    client.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to Insert Purchases:", error);
    process.exit(1);
  }
};

const generateUser = async () => {
  try {
    const client = await connectDB();
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = {
      name: "Arokya Roopak",
      email: "roopak@sp.com",
      password: "123456",
      role: "admin",
    };

    await usersCollection.insertOne(user);
    console.log("User Added to MongoDB");

    client.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to Insert User:", error);
    process.exit(1);
  }
};

generatePurchases();
generateUser();
