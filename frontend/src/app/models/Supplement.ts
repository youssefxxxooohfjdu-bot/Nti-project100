export type SupplementCategory =
  | "Protein"
  | "Creatine"
  | "Pre-Workout"
  | "Vitamins"
  | "Amino Acids"
  | "Mass Gainer";


export interface Supplement {
  _id: string;

  name: string;

  description: string;

  category: SupplementCategory;

  price: number;

  stock: number;

  flavor: string;

  active: boolean;

  createdAt?: string;

  updatedAt?: string;
}


export interface CreateSupplementInput {
  name: string;

  description: string;

  category: SupplementCategory;

  price: number;

  stock: number;

  flavor: string;

  active: boolean;
}


export type UpdateSupplementInput =
  Partial<CreateSupplementInput>;