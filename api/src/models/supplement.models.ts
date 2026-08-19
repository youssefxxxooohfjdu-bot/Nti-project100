import {
  model,
  Schema
} from "mongoose";

export type SupplementCategory =
  | "Protein"
  | "Creatine"
  | "Pre-Workout"
  | "Vitamins"
  | "Amino Acids"
  | "Mass Gainer";

export interface SupplementDocument {
  name: string;
  description: string;
  category: SupplementCategory;
  price: number;
  stock: number;
  flavor: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const supplementSchema =
  new Schema<SupplementDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      description: {
        type: String,
        required: true,
        trim: true
      },

      category: {
        type: String,
        enum: [
          "Protein",
          "Creatine",
          "Pre-Workout",
          "Vitamins",
          "Amino Acids",
          "Mass Gainer"
        ],
        required: true
      },

      price: {
        type: Number,
        required: true,
        min: 0
      },

      stock: {
        type: Number,
        required: true,
        min: 0
      },

      flavor: {
        type: String,
        required: true,
        trim: true
      },

      active: {
        type: Boolean,
        default: true
      }
    },

    {
      timestamps: true
    }
  );

export const Supplement =
  model<SupplementDocument>(
    "Supplement",
    supplementSchema
  );