import { z } from "zod";
import { BoardSchema, updateboardRoleSchema, updateBoardSchema } from "../schemas/boards.schemas";

export const roles = ["Owner", "Editor", "Reader"] as const;
export type TBoardRole = typeof roles[number];

export type TBoardCreation = z.infer<typeof BoardSchema>;

export type TBoardUpdate = z.infer<typeof updateBoardSchema>;

export type TBoardRoleUpdate = z.infer<typeof updateboardRoleSchema>;
