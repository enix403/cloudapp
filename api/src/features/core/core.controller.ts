import { ApiRouter } from "@/lib/ApiRouter";
import { reply } from "@/lib/app-reply";

import { User } from "@/models/sample";

export const router = new ApiRouter({
  defaultTags: ["Core"]
});

router.add(
  {
    path: "/",
    method: "GET",
    summary: "Basic Endpoint",
    desc: "Basic Endpoint long description"
  },
  async (req, res) => {
    const users = await User.findAll({});

    return reply(res, {
      users,
      hello: "world"
    });
  }
);

router.add(
  {
    path: "/",
    method: "POST",
    summary: "Basic Endpoint",
    desc: "Basic Endpoint long description"
  },
  async (req, res) => {
    // Nested creation
    const user = await User.create({
      firstName: "john"
    });

    return reply(res, {
      user,
      hello: "world"
    });
  }
);
