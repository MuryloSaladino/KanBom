import { z } from "zod";
import { createTeamSchema, updateTeamSchema } from "../schemas/teams.schemas";

export type TTeamCreation = z.infer<typeof createTeamSchema>;

export type TTeamUpdate = z.infer<typeof updateTeamSchema>;
