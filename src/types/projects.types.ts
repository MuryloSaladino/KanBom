import { z } from "zod";
import Project from "../entities/Project.entity";
import { inviteToProjectSchema } from "../schemas/projects.schemas";

export type TProjectCreation = Pick<Project, "name" | "thumbnail">;

export type TProjectUpdate = Partial<TProjectCreation>;

export type TInviteToProject = z.infer<typeof inviteToProjectSchema>;
