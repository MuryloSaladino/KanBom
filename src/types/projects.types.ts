import { z } from "zod";
import { createProjectSchema, inviteToProjectSchema, participantUpdateSchema, updateProjectSchema } from "../schemas/projects.schemas";

export const roles = ["Owner", "Editor", "Reader"] as const;
export type TParticipantRole = typeof roles[number];

export type TProjectCreation = z.infer<typeof createProjectSchema>;

export type TProjectUpdate = z.infer<typeof updateProjectSchema>;

export type TInviteToProject = z.infer<typeof inviteToProjectSchema>;

export type TParticipantUpdate = z.infer<typeof participantUpdateSchema>;
