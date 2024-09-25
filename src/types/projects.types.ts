import Project from "../entities/Project.entity";

export type TProjectCreation = Pick<Project, "name" | "thumbnail">;

export type TProjectUpdate = Partial<TProjectCreation>;
