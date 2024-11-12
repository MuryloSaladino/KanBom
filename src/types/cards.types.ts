import { z } from "zod";
import { CardListSchema, CardSchema } from "../schemas/card.schema";

export type ICardListPayload = z.infer<typeof CardListSchema>;

export type ICardPayload = z.infer<typeof CardSchema>;
