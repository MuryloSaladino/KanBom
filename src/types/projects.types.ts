import { z } from "zod";
import { createProjectSchema, inviteToProjectSchema, updateProjectSchema } from "../schemas/projects.schemas";

export type TProjectCreation = z.infer<typeof createProjectSchema>;

export type TProjectUpdate = z.infer<typeof updateProjectSchema>;

export type TInviteToProject = z.infer<typeof inviteToProjectSchema>;
