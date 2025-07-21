
import { ApiRouter } from "@/lib/ApiRouter";
import { reply } from "@/lib/app-reply";

export const router = new ApiRouter({
  defaultTags: ["Core"]
});

router.add(
  {
    path: "/",
    method: "GET",
    summary: "Basic Endpoint",
    desc: "Basic Endpoint long description",
  },
  async (req, res) => {
    return reply(res, {
      hello: "world",
    });
  }
);
