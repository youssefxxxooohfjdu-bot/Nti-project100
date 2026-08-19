import {
  Router
} from "express";

import {
  createSupplement,
  deleteSupplement,
  getSupplementById,
  getSupplements,
  updateSupplement
} from "../controllers/supplement.controllers";

const router = Router();


router.post(
  "/",
  createSupplement
);


router.get(
  "/",
  getSupplements
);


router.get(
  "/:id",
  getSupplementById
);


router.patch(
  "/:id",
  updateSupplement
);


router.delete(
  "/:id",
  deleteSupplement
);


export default router;