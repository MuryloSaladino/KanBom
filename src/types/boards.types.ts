import { z } from "zod";
import { BoardSchema, BoardRoleSchema } from "../schemas/boards.schemas";

export const roles = ["Owner", "Editor", "Reader"] as const;
export type BoardRole = typeof roles[number];

export type IBoardPayload = z.infer<typeof BoardSchema>;

export type IBoardRolePayload = z.infer<typeof BoardRoleSchema>;
