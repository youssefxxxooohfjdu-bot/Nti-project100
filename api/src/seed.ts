import "dotenv/config";

import mongoose from "mongoose";

import {
  Supplement
} from "./models/supplement.models";


const supplements = [

  {
    name: "Whey Protein Gold",
    description:
      "High quality whey protein for muscle recovery and daily protein intake.",
    category: "Protein",
    price: 1850,
    stock: 25,
    flavor: "Chocolate",
    active: true
  },

  {
    name: "Creatine Monohydrate",
    description:
      "Pure creatine monohydrate to support strength and workout performance.",
    category: "Creatine",
    price: 750,
    stock: 40,
    flavor: "Unflavored",
    active: true
  },

  {
    name: "Pre Workout Blast",
    description:
      "Powerful pre-workout formula for energy, focus and intense training.",
    category: "Pre-Workout",
    price: 1100,
    stock: 18,
    flavor: "Fruit Punch",
    active: true
  },

  {
    name: "Daily Multivitamins",
    description:
      "Complete daily vitamins and minerals for active lifestyles.",
    category: "Vitamins",
    price: 550,
    stock: 35,
    flavor: "Standard",
    active: true
  },

  {
    name: "Mass Gainer Pro",
    description:
      "High calorie mass gainer designed to support muscle and weight gain.",
    category: "Mass Gainer",
    price: 1650,
    stock: 12,
    flavor: "Vanilla",
    active: true
  }

];


async function seed(): Promise<void> {

  const mongoUri =
    process.env.MONGODB_URI?.trim();


  if (!mongoUri) {

    throw new Error(
      "MONGODB_URI is required"
    );

  }


  await mongoose.connect(
    mongoUri
  );


  await Supplement.deleteMany({});


  await Supplement.insertMany(
    supplements
  );


  console.log(
    "Supplements seeded successfully"
  );


  await mongoose.disconnect();

}


seed().catch(
  (error) => {

    console.error(
      "Seed failed",
      error
    );

    process.exit(1);

  }
);