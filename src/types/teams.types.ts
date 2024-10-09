import { z } from "zod";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas/workspaces.schemas";

export type TTeamCreation = z.infer<typeof createWorkspaceSchema>;

export type TTeamUpdate = z.infer<typeof updateWorkspaceSchema>;
