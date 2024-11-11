import { z } from "zod";
import { WorkspaceSchema, updateWorkspaceSchema } from "../schemas/workspaces.schemas";

export type TWorkspaceCreation = z.infer<typeof WorkspaceSchema>;

export type TWorkspaceUpdate = z.infer<typeof updateWorkspaceSchema>;
