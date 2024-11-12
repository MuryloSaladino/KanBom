import { z } from "zod";
import { WorkspaceSchema } from "../schemas/workspaces.schemas";

export type IWorkspacePayload = z.infer<typeof WorkspaceSchema>;
