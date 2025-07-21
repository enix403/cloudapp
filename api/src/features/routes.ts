import { ApiRouter } from "@/lib/ApiRouter";

import { router as healthRouter } from "./health/health.controller";
import { router as uploadsRouter } from "./uploads/uploads.controller";
import { router as authRouter } from "./auth/auth.controller";
import { router as userRouter } from "./user/user.controller";
import { router as jobRouter } from "./job/job.controller";
import { router as jobApplicationRouter } from "./job-application/job-application.controller";
import { router as interviewRouter } from "./interview/interview.controller";
import { router as communityRouter } from "./community/community.controller";
import { router as bookmarkRouter } from "./bookmark/bookmark.controller";
import { router as faqRouter } from "./faq/faq.controller";
import { router as reportRouter } from "./report/report.controller";

export function createRootApiRouter() {
  const router = new ApiRouter();

  router.use(healthRouter);
  router.use(uploadsRouter);
  router.use(authRouter);
  router.use(userRouter);
  router.use(jobRouter);
  router.use(jobApplicationRouter);
  router.use(interviewRouter);
  router.use(communityRouter);
  router.use(bookmarkRouter);
  router.use(faqRouter);
  router.use(reportRouter);

  return router;
}
