// utils/pagination.ts
import { Model } from "mongoose";

interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  projection?: Record<string, 0 | 1>;
  populate?: string | Record<string, any> | Array<any>;
}

export async function paginateQuery<T>(
  model: Model<T>,
  filter: Record<string, any>,
  options: PaginateOptions
) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    model
      .find(filter, options.projection)
      .sort(options.sort)
      .skip(skip)
      .limit(limit)
      // @ts-ignore
      .populate(options.populate || "")
      .lean(),

    model.countDocuments(filter)
  ]);

  return {
    page,
    limit,
    total,
    results
  };
}
