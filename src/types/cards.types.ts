import { z } from "zod";
import { CardListSchema, CardSchema, updateCardListSchema } from "../schemas/card.schema";

export type ICardListCreation = z.infer<typeof CardListSchema>;
export type ICardListUpdate = z.infer<typeof updateCardListSchema>;

export type ICardCreation = z.infer<typeof CardSchema>;
