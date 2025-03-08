import { Model, Document } from "mongoose";

export class BaseRepository<T> {
  private entity: Model<T>;

  constructor(entity: Model<T>) {
    this.entity = entity;
  }

  async save(obj: T): Promise<T> {
    const doc = new this.entity(obj);
    doc.save();
    return doc;
  }

  async find(
    query: Partial<T> | any,
    page?: number,
    limit?: number,
    sort?: any
  ) {
    const pageNumber = page && page > 0 ? page : 1;
    const limitNumber = limit && limit > 0 ? limit : 10;

    const totalCount = await this.entity.countDocuments(query);
    const results = await this.entity
      .find(query)
      .lean()
      .sort(sort || { createdAt: -1 }) // Default sorting: Newest first
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    return {
      total: totalCount,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalCount / limitNumber),
      data: results,
    };
  }

  async findOne(query: Partial<T> | any) {
    return this.entity.findOne(query).lean().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.entity.findById(id).exec();
  }
}
