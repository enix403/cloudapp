import { ApiRouter } from "@/lib/ApiRouter";

import { router as coreRouter } from "./core/core.controller";

export function createRootApiRouter() {
  const router = new ApiRouter();

  router.use(coreRouter);

  return router;
}
