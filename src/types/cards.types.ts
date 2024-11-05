import { z } from "zod";
import { createCardListSchema, createCardSchema, updateCardListSchema } from "../schemas/card.schema";

export type ICardListCreation = z.infer<typeof createCardListSchema>;
export type ICardListUpdate = z.infer<typeof updateCardListSchema>;

export type ICardCreation = z.infer<typeof createCardSchema>;
