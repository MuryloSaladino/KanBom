import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsRelations, Repository } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import AppDataSource from "../data-source";
import AppError from "../errors";

export default class BaseService<TEntity extends BaseEntity> {

    protected repo: Repository<TEntity>;

    protected constructor(entityClass: { new(): TEntity }) {
        this.repo = AppDataSource.getRepository(entityClass);
    }


    public async create(payload: DeepPartial<TEntity>): Promise<TEntity> {
        const creation = this.repo.create(payload);
        return await this.repo.save(creation);
    }

    public async findById(
        id: TEntity["id"], 
        relations?: FindOptionsRelations<TEntity>
    ): Promise<TEntity> {
        const entity = await this.repo.findOne({ where: { id } as any, relations })

        if (!entity) throw new AppError(`Entity not found`);
        return entity;
    }

    public async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
        return await this.repo.find(options);
    }

    public async findOne(options: FindOneOptions<TEntity>): Promise<TEntity> {
        const entity = await this.repo.findOne(options);
        if(!entity) throw new AppError(`Entity not found`);
        return entity;
    }

    public async update(id: TEntity["id"], payload: Omit<DeepPartial<TEntity>, "id">): Promise<TEntity> {
        const entity = await this.findById(id);
        return await this.repo.save({ ...entity, ...payload });
    }

    public async delete(id: TEntity["id"]): Promise<void> {
        const entity = await this.findById(id);
        await this.repo.softRemove(entity);
    }

    public async hardDelete(id: TEntity["id"]): Promise<void> {
        const entity = await this.findById(id);
        await this.repo.remove(entity);
    }
}