import { z } from "zod";
import { createBoardSchema, boardRoleSchema, boardRoleUpdateSchema, updateBoardSchema } from "../schemas/boards.schemas";

export const roles = ["Owner", "Editor", "Reader"] as const;
export type TParticipantRole = typeof roles[number];

export type TProjectCreation = z.infer<typeof createBoardSchema>;

export type TProjectUpdate = z.infer<typeof updateBoardSchema>;

export type TInviteToProject = z.infer<typeof boardRoleSchema>;

export type TParticipantUpdate = z.infer<typeof boardRoleUpdateSchema>;
